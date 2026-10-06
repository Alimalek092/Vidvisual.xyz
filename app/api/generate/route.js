import { NextResponse } from 'next/server';
import { admin, getUser, getProfile, weeklyUsage } from '@/lib/supabaseAdmin';
import { getPlan } from '@/lib/plans';
import { extractVideoId, getVideoTitle, getTranscript } from '@/lib/youtube';
import { summarize } from '@/lib/gemini';
import { sendUserLimitUpgradeEmail } from '@/lib/email';

export const maxDuration = 60;

export async function POST(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });

  const { url, format, language } = await request.json().catch(() => ({}));
  if (!['whiteboard', 'infographic'].includes(format)) {
    return NextResponse.json({ error: 'Choose Whiteboard or Infographic.' }, { status: 400 });
  }
  const videoId = extractVideoId(url || '');
  if (!videoId) {
    return NextResponse.json({ error: 'That does not look like a YouTube link.' }, { status: 400 });
  }

  const profile = await getProfile(user);
  const plan = getPlan(profile.plan);
  const used = await weeklyUsage(user.id);
  if (used >= plan.weekly) {
    // If user is on a free plan, trigger personalized recall & upgrade email (non-blocking)
    if (plan.id === 'free' && user.email) {
      (async () => {
        try {
          const db = admin();
          const lastSent = profile.last_upgrade_email_at ? new Date(profile.last_upgrade_email_at).getTime() : 0;
          const oneWeek = 6 * 24 * 60 * 60 * 1000; // 6 days cooldown
          if (Date.now() - lastSent > oneWeek) {
            // Update timestamp first to prevent race condition duplicates
            await db.from('profiles').update({ last_upgrade_email_at: new Date().toISOString() }).eq('id', user.id);
            await sendUserLimitUpgradeEmail({
              recipientEmail: user.email,
              recipientName: user.user_metadata?.full_name || user.user_metadata?.name || '',
              plan: plan.id,
              weeklyLimit: plan.weekly,
              proWeeklyLimit: 50,
            });
          }
        } catch (emailErr) {
          console.error('[Generate Route] Error sending limit upgrade email:', emailErr?.message || emailErr);
        }
      })();
    }

    return NextResponse.json(
      { error: `You have used all ${plan.weekly} summaries for this week. Upgrade for more.`, code: 'LIMIT' },
      { status: 402 }
    );
  }

  let transcript;
  try {
    transcript = await getTranscript(videoId);
  } catch {
    return NextResponse.json(
      { error: 'Could not read captions for this video. Try a video that has captions turned on.' },
      { status: 422 }
    );
  }
  if (!transcript.text || transcript.text.length < 200) {
    return NextResponse.json({ error: 'This video has too little spoken content to summarize.' }, { status: 422 });
  }

  const rawModel = plan.priority
    ? process.env.GEMINI_MODEL_PRIORITY || 'gemini-2.5-flash'
    : process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const model = rawModel.includes('1.5') || rawModel.includes('1.0') || rawModel.includes('pro')
    ? 'gemini-2.5-flash'
    : rawModel;

  let data;
  try {
    data = await summarize(transcript.text, model, language || 'auto');
  } catch (e) {
    console.error('[Generate Route] Summarization failed:', e?.message || e);
    return NextResponse.json({
      error: e?.message || 'The AI could not build this summary. Please try again.'
    }, { status: 502 });
  }
  data.minutes = transcript.minutes;
  data.language = language || 'auto';
  const ytTitle = await getVideoTitle(videoId);

  // Sanitize fields to ensure clean database storage
  const cleanTitle = (ytTitle || data.title || 'Untitled Visual Summary')
    .toString()
    .replace(/\0/g, '')
    .trim()
    .slice(0, 255);

  const cleanUrl = (url || `https://www.youtube.com/watch?v=${videoId}`)
    .toString()
    .trim()
    .slice(0, 500);

  const insertPayload = {
    user_id: user.id,
    video_id: videoId.slice(0, 50),
    video_url: cleanUrl,
    title: cleanTitle,
    format,
    data,
  };

  const db = admin();
  let { data: row, error: insertError } = await db
    .from('summaries')
    .insert(insertPayload)
    .select('id')
    .single();

  // If initial insert fails, attempt a resilient fallback with streamlined data payload
  if (insertError) {
    console.error('[Generate Route] Primary DB insert failed:', insertError.message || insertError);
    
    // Fallback: retry with minimal core summary structure
    const fallbackPayload = {
      user_id: user.id,
      video_id: videoId.slice(0, 50),
      video_url: cleanUrl,
      title: cleanTitle,
      format,
      data: {
        title: data.title || cleanTitle,
        level: data.level || 'Intermediate',
        quote: data.quote || '',
        concepts: (data.concepts || []).slice(0, 6),
        mindmap: data.mindmap || { center: 'Core Concepts', branches: [] },
        takeaways: (data.takeaways || []).slice(0, 5),
        minutes: data.minutes,
        language: data.language,
      },
    };

    const retry = await db
      .from('summaries')
      .insert(fallbackPayload)
      .select('id')
      .single();

    if (retry.error) {
      console.error('[Generate Route] Fallback DB insert failed:', retry.error.message || retry.error);
      return NextResponse.json({
        error: `Could not save summary: ${retry.error.message || 'Database error'}. Please try again.`
      }, { status: 500 });
    }

    row = retry.data;
  }

  return NextResponse.json({ id: row.id });
}
