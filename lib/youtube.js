import { YoutubeTranscript } from 'youtube-transcript';

export function extractVideoId(input) {
  try {
    const clean = input.trim();
    const url = new URL(clean);
    if (url.hostname === 'youtu.be') {
      return url.pathname.slice(1).split('/')[0].split('?')[0] || null;
    }
    if (url.hostname.endsWith('youtube.com')) {
      if (url.searchParams.get('v')) return url.searchParams.get('v');
      const m = url.pathname.match(/^\/(embed|shorts|live|v)\/([\w-]{11})/);
      if (m) return m[2];
    }
  } catch {
    // If not a full URL, check if input is directly an 11-char video ID
    const directMatch = input.trim().match(/^[\w-]{11}$/);
    if (directMatch) return directMatch[0];
  }
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