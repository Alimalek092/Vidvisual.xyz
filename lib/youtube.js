import { YoutubeTranscript } from 'youtube-transcript';

export function extractVideoId(input) {
  try {
    const url = new URL(input.trim());
    if (url.hostname === 'youtu.be') return url.pathname.slice(1).split('/')[0] || null;
    if (url.hostname.endsWith('youtube.com')) {
      if (url.searchParams.get('v')) return url.searchParams.get('v');
      const m = url.pathname.match(/^\/(embed|shorts|live)\/([\w-]{11})/);
      if (m) return m[2];
    }
  } catch {}
  return null;
}

export async function getVideoTitle(videoId) {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (res.ok) return (await res.json()).title;
  } catch {}
  return null;
}

function shapeParts(parts) {
  const text = parts.map((p) => p.text).join(' ').replace(/\s+/g, ' ').trim();
  const last = parts[parts.length - 1];
  const minutes = last ? Math.max(1, Math.round((last.offset + (last.duration || 0)) / 60000)) : null;
  return { text, minutes };
}

// Backup transcript source: YouTube blocks caption scraping from most cloud
// server IPs (Vercel, AWS, etc.), so when the free method below fails, this
// paid/metered fallback (100 free transcripts/month) steps in instead.
async function getTranscriptViaSupadata(videoId) {
  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) return null;
  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const res = await fetch(
      `https://api.supadata.ai/v1/youtube/transcript?url=${encodeURIComponent(videoUrl)}`,
      { headers: { 'x-api-key': apiKey } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.content?.length) return null;
    return shapeParts(data.content);
  } catch {
    return null;
  }
}

export async function getTranscript(videoId) {
  try {
    const parts = await YoutubeTranscript.fetchTranscript(videoId);
    return shapeParts(parts);
  } catch (err) {
    const fallback = await getTranscriptViaSupadata(videoId);
    if (fallback) return fallback;
    throw err;
  }
}