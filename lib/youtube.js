import { YoutubeTranscript } from 'youtube-transcript';

export function extractVideoId(input) {
  if (!input || typeof input !== 'string') return null;
  const raw = input.trim();

  // 1. Direct 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
    return raw;
  }

  // 2. youtu.be/<id>
  const youtuBe = raw.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (youtuBe) return youtuBe[1];

  // 3. ?v=<id> or &v=<id>
  const vParam = raw.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (vParam) return vParam[1];

  // 4. /shorts/<id>, /embed/<id>, /live/<id>, /v/<id>
  const pathId = raw.match(/(?:embed|shorts|live|v)\/([a-zA-Z0-9_-]{11})/i);
  if (pathId) return pathId[1];

  // 5. Fallback URL parsing
  try {
    const cleanUrl = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`;
    const url = new URL(cleanUrl);
    if (url.hostname === 'youtu.be' || url.hostname.endsWith('.youtu.be')) {
      const seg = url.pathname.slice(1).split('/')[0].split('?')[0];
      if (seg && seg.length === 11) return seg;
    }
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v');
      if (v && v.length === 11) return v;
    }
  } catch {}

  return null;
}

export async function getVideoTitle(videoId) {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (res.ok) {
      const data = await res.json();
      return data.title || null;
    }
  } catch {}
  return null;
}

function shapeParts(parts) {
  if (!parts) return { text: '', minutes: null };

  if (typeof parts === 'string') {
    const cleanText = parts.replace(/\s+/g, ' ').trim();
    return { text: cleanText, minutes: Math.max(1, Math.round(cleanText.length / 800)) };
  }

  if (Array.isArray(parts)) {
    const text = parts
      .map((p) => (typeof p === 'string' ? p : p?.text || ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();

    const last = parts[parts.length - 1];
    let minutes = null;
    if (last && typeof last === 'object' && last.offset !== undefined) {
      minutes = Math.max(1, Math.round(((last.offset || 0) + (last.duration || 0)) / 60000));
    } else {
      minutes = Math.max(1, Math.round(text.length / 800));
    }

    return { text, minutes };
  }

  return { text: '', minutes: null };
}

// Backup transcript source: YouTube blocks scraping from serverless IPs (Vercel/AWS).
// Supadata fetches captions via official residential proxies.
async function getTranscriptViaSupadata(videoId) {
  const apiKey = process.env.SUPADATA_API_KEY;
  if (!apiKey) return null;

  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const res = await fetch(
      `https://api.supadata.ai/v1/youtube/transcript?url=${encodeURIComponent(videoUrl)}`,
      { headers: { 'x-api-key': apiKey } }
    );

    if (!res.ok) {
      console.warn(`[Supadata] API responded with status ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data?.content) {
      return shapeParts(data.content);
    }
    return null;
  } catch (e) {
    console.warn('[Supadata] Fetch error:', e.message);
    return null;
  }
}

export async function getTranscript(videoId) {
  // 1. First try direct YoutubeTranscript scraper
  try {
    const parts = await YoutubeTranscript.fetchTranscript(videoId);
    if (parts && parts.length > 0) {
      return shapeParts(parts);
    }
  } catch (err) {
    console.log(`[Transcript] Direct scraper failed for ${videoId} (${err.message}). Trying Supadata API...`);
  }

  // 2. Fallback to Supadata API
  const fallback = await getTranscriptViaSupadata(videoId);
  if (fallback && fallback.text && fallback.text.length > 100) {
    return fallback;
  }

  throw new Error('Could not read captions for this video. Please make sure captions are enabled on the YouTube video.');
}