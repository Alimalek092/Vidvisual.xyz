import { NextResponse } from 'next/server';

export async function GET() {
  const geminiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_KEY ||
    ''
  ).trim();

  const supaKey = (process.env.SUPADATA_API_KEY || '').trim();

  const diagnostics = {
    status: 'ok',
    has_gemini_api_key: !!geminiKey,
    gemini_key_prefix: geminiKey ? geminiKey.slice(0, 6) : 'MISSING',
    gemini_key_suffix: geminiKey ? geminiKey.slice(-4) : 'MISSING',
    gemini_key_length: geminiKey ? geminiKey.length : 0,
    has_supadata_api_key: !!supaKey,
  };

  if (!geminiKey) {
    return NextResponse.json(diagnostics);
  }

  // 1. Test listing available models via x-goog-api-key header
  try {
    const listRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models',
      {
        headers: {
          'x-goog-api-key': geminiKey,
        },
      }
    );
    diagnostics.list_models_status = listRes.status;
    if (listRes.ok) {
      const data = await listRes.json();
      diagnostics.available_models = (data.models || [])
        .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
        .map(m => m.name.replace('models/', ''))
        .slice(0, 15);
    } else {
      diagnostics.list_models_error = (await listRes.text()).slice(0, 300);
    }
  } catch (err) {
    diagnostics.list_models_exception = err.message;
  }

  // 2. Test quick generation with gemini-1.5-flash
  try {
    const testModel = diagnostics.available_models?.[0] || 'gemini-1.5-flash';
    const genRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${testModel}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Respond with the single word: OK' }] }],
        }),
      }
    );
    diagnostics.test_generation_model = testModel;
    diagnostics.test_generation_status = genRes.status;
    if (genRes.ok) {
      const data = await genRes.json();
      diagnostics.test_generation_response = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    } else {
      diagnostics.test_generation_error = (await genRes.text()).slice(0, 300);
    }
  } catch (err) {
    diagnostics.test_generation_exception = err.message;
  }

  return NextResponse.json(diagnostics);
}

