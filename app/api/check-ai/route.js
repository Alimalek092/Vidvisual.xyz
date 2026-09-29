import { NextResponse } from 'next/server';

export async function GET() {
  const geminiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_KEY;

  const supaKey = process.env.SUPADATA_API_KEY;

  return NextResponse.json({
    status: 'ok',
    has_gemini_api_key: !!geminiKey,
    gemini_key_preview: geminiKey ? `${geminiKey.slice(0, 5)}...${geminiKey.slice(-4)}` : 'MISSING',
    has_supadata_api_key: !!supaKey,
  });
}
