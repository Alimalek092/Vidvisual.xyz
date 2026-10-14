import { NextResponse } from 'next/server';
import { admin, getUser, getProfile } from '@/lib/supabaseAdmin';
import {
  getDeviceFingerprint,
  getOrCreateGuestUser,
  getMondayResetInfo,
  weeklyUsageSinceMonday,
} from '@/lib/guestAuth';
import { getPlan } from '@/lib/plans';
import { extractVideoId, getVideoTitle, getTranscript } from '@/lib/youtube';
import { summarize } from '@/lib/gemini';
import { sendUserLimitUpgradeEmail } from '@/lib/email';

export const maxDuration = 60;

export async function POST(request) {
  let user = await getUser(request);
  let isGuest = false;
  let activeGuestId = null;
  const resetInfo = getMondayResetInfo();

  // Multi-layered bulletproof guest identification:
  // Combines client token + IP/User-Agent fingerprint to prevent Incognito / cookie-clearing bypasses
  if (!user) {
    const deviceFingerprint = getDeviceFingerprint(request);
    const headerGuestId = request.headers.get('x-guest-id');
    const cookieGuestId = request.cookies.get('vv_guest_id')?.value;
    const clientGuestId = headerGuestId || cookieGuestId;

    const guestUser = await getOrCreateGuestUser(clientGuestId, deviceFingerprint);
    if (!guestUser) {
      return NextResponse.json({ error: 'Could not initialize guest session. Please try again.' }, { status: 500 });
    }

    user = guestUser;
    isGuest = true;
    activeGuestId = guestUser.guestKey || deviceFingerprint;
  }

  const { url, format, language } = await request.json().catch(() => ({}));
  if (!['whiteboard', 'infographic'].includes(format)) {
    return NextResponse.json({ error: 'Choose Whiteboard or Infographic.' }, { status: 400 });
  }
  const videoId = extractVideoId(url || '');
  if (!videoId) {
    return NextResponse.json({ error: 'That does not look like a YouTube link.' }, { status: 400 });
  }

  let plan;
  let used;

  if (isGuest) {
    plan = { id: 'free', name: 'Free Guest', weekly: 3, priority: false };
    used = user.used || 0;
  } else {
    const profile = await getProfile(user);
    plan = getPlan(profile.plan);
    used = await weeklyUsageSinceMonday(user.id);
  }

  // Strict enforcement: 3 free summaries per week (recharges every Monday)
  if (used >= plan.weekly) {
    // If logged-in user hits limit, dispatch personalized upgrade email from vidvisual.xyz@gmail.com
    if (!isGuest && plan.id === 'free' && user.email) {
      (async () => {
        try {
          const db = admin();
          const profile = await getProfile(user);
          const lastSent = profile.last_upgrade_email_at ? new Date(profile.last_upgrade_email_at).getTime() : 0;
          const oneWeek = 6 * 24 * 60 * 60 * 1000;
          if (Date.now() - lastSent > oneWeek) {
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
      {
        error: `You just reached your limit of this week (${used}/${plan.weekly}). Free allowances recharge on every Monday of every week at 00:00 UTC (${resetInfo.countdownText} remaining). If you want to generate more summaries, buy pro version now.`,
        code: 'LIMIT',
        used,
        limit: plan.weekly,
        resetInfo,
        isGuest,
      },
      { status: 402 }
    );
  }

  let transcript;
  try {
    transcript = await getTranscript(videoId, language || 'en');
  } catch (err) {
    console.warn('[Generate Route] Transcript extraction failed for', videoId, ':', err?.message || err);
  }

  // Graceful fallback: If captions are completely disabled on YouTube, recover via video title
  if (!transcript || !transcript.text || transcript.text.length < 50) {
    const fallbackTitle = await getVideoTitle(videoId);
    if (fallbackTitle) {
      transcript = {
        text: `Topic & Lecture: "${fallbackTitle}". Video Reference: https://www.youtube.com/watch?v=${videoId}. Provide an in-depth visual whiteboard concept breakdown, core thesis statements, and structured study takeaways for this subject.`,
        minutes: 10,
      };
    } else {
      return NextResponse.json(
        { error: 'Could not read captions for this video. Try a video that has captions turned on.' },
        { status: 422 }
      );
    }
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
    const raw = (e?.message || '').toLowerCase();
    const friendly = raw.includes('abort') || raw.includes('timeout')
      ? 'Video processing timed out. Please try another video or try again.'
      : (e?.message || 'The AI could not build this summary. Please try again.');
    return NextResponse.json({ error: friendly }, { status: 502 });
  }
  data.minutes = transcript.minutes;
  data.language = language || 'auto';
  const ytTitle = await getVideoTitle(videoId);

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

  if (insertError) {
    console.error('[Generate Route] Primary DB insert failed:', insertError.message || insertError);
    
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

  const response = NextResponse.json({
    id: row.id,
    isGuest,
    guestId: activeGuestId,
    used: used + 1,
    limit: plan.weekly,
    resetInfo,
  });

  if (isGuest && activeGuestId) {
    response.cookies.set('vv_guest_id', activeGuestId, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
      httpOnly: false,
    });
  }

  return response;
}
