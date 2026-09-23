import { NextResponse } from 'next/server';
import { admin, getUser, getProfile, weeklyUsage } from '@/lib/supabaseAdmin';
import { getPlan } from '@/lib/plans';
import { extractVideoId, getVideoTitle, getTranscript } from '@/lib/youtube';
import { summarize } from '@/lib/gemini';

export const maxDuration = 60;

export async function POST(request) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Please log in.' }, { status: 401 });

  const { url, format } = await request.json().catch(() => ({}));
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

  const model = plan.priority
    ? process.env.GEMINI_MODEL_PRIORITY || 'gemini-2.5-pro'
    : process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  let data;
  try {
    data = await summarize(transcript.text, model);
  } catch (e) {
    return NextResponse.json({ error: 'The AI could not build this summary. Please try again.' }, { status: 502 });
  }
  data.minutes = transcript.minutes;
  const ytTitle = await getVideoTitle(videoId);

  const { data: row, error } = await admin()
    .from('summaries')
    .insert({
      user_id: user.id,
      video_id: videoId,
      video_url: url.trim(),
      title: ytTitle || data.title,
      format,
      data,
    })
    .select('id')
    .single();
  if (error) return NextResponse.json({ error: 'Could not save the summary.' }, { status: 500 });

  return NextResponse.json({ id: row.id });
}
