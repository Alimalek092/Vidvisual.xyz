const SCHEMA = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING' },
    level: { type: 'STRING', enum: ['Beginner', 'Intermediate', 'Advanced'] },
    quote: { type: 'STRING' },
    concepts: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          emoji: { type: 'STRING' },
          title: { type: 'STRING' },
          text: { type: 'STRING' },
        },
        required: ['emoji', 'title', 'text'],
      },
    },
    mindmap: {
      type: 'OBJECT',
      properties: {
        center: { type: 'STRING' },
        branches: {
          type: 'ARRAY',
          items: {
            type: 'OBJECT',
            properties: {
              label: { type: 'STRING' },
              children: { type: 'ARRAY', items: { type: 'STRING' } },
            },
            required: ['label', 'children'],
          },
        },
      },
      required: ['center', 'branches'],
    },
    takeaways: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: ['title', 'level', 'quote', 'concepts', 'mindmap', 'takeaways'],
};

const PROMPT = `You turn a YouTube video transcript into a visual study summary.
Return JSON only. Rules:
- title: short, clear title of the video's topic (max 60 chars).
- level: Beginner, Intermediate or Advanced.
- quote: one memorable idea from the video, in your own words (max 90 chars).
- concepts: 4 to 6 key concepts. emoji: one fitting emoji. title: 1-3 words. text: one plain sentence (max 110 chars).
- mindmap: center = topic in 1-3 words. 4 to 6 branches, each label 1-3 words with 2-3 short children (max 3 words each).
- takeaways: 4 to 5 short action-oriented sentences the learner should remember.
Use only what the transcript says. Write in the transcript's language.`;

function normalizeModel(modelName) {
  if (!modelName) return 'gemini-1.5-flash';
  const clean = modelName.trim().toLowerCase();
  // Map any invalid 2.5 references to official Google LTS models
  if (clean.includes('2.5-pro')) return 'gemini-1.5-pro';
  if (clean.includes('2.5-flash')) return 'gemini-1.5-flash';
  return clean;
}

export async function summarize(transcript, initialModel) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY is not set in environment variables');

  const preferredModel = normalizeModel(initialModel);
  // Resilient multi-model cascade
  const modelsToTry = [
    preferredModel,
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash',
  ].filter((m, i, arr) => arr.indexOf(m) === i); // deduplicate

  const body = {
    systemInstruction: { parts: [{ text: PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: transcript.slice(0, 60000) }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: SCHEMA,
      temperature: 0.4,
    },
  };

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.warn(`[Gemini] Model ${model} failed (${res.status}): ${errBody.slice(0, 150)}`);
        lastError = new Error(`AI request failed for ${model} (${res.status})`);
        continue; // try next fallback model
      }

      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        console.warn(`[Gemini] Model ${model} returned empty content parts`);
        continue;
      }

      // Clean markdown code blocks if returned
      const cleaned = rawText
        .replace(/^\s*```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/i, '')
        .trim();

      const parsed = JSON.parse(cleaned);
      if (parsed && parsed.title && parsed.concepts && parsed.mindmap) {
        console.log(`[Gemini] Successfully generated visual summary using model: ${model}`);
        return parsed;
      }
    } catch (err) {
      console.warn(`[Gemini] Error with model ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('All AI models failed to generate summary');
}
