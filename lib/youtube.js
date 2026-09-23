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

export async function getTranscript(videoId) {
  const parts = await YoutubeTranscript.fetchTranscript(videoId);
  const text = parts.map((p) => p.text).join(' ').replace(/\s+/g, ' ').trim();
  const last = parts[parts.length - 1];
  const minutes = last ? Math.max(1, Math.round((last.offset + (last.duration || 0)) / 60000)) : null;
  return { text, minutes };
}
