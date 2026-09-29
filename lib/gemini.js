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
  return modelName.trim();
}

export async function summarize(transcript, initialModel) {
  const key = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_KEY ||
    ''
  ).trim();

  if (!key) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }

  const preferredModel = normalizeModel(initialModel);
  // Gemini models in order of availability and speed
  const modelsToTry = [
    preferredModel,
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-pro',
    'gemini-2.5-flash',
  ].filter((m, i, arr) => m && arr.indexOf(m) === i);

  // Send the first 40,000 characters (plenty for 1-2 hour lectures, super fast processing)
  const trimmedTranscript = transcript.slice(0, 40000);

  const body = {
    systemInstruction: { parts: [{ text: PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: trimmedTranscript }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: SCHEMA,
      temperature: 0.3,
    },
  };

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

      // Use x-goog-api-key header (Google's official method for AQ. and AIza keys)
      let res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        }
      );

      // Fallback: If header returned 401 or 403, try query parameter URL
      if (!res.ok && (res.status === 401 || res.status === 403)) {
        res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: controller.signal,
          }
        );
      }

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.warn(`[Gemini API] Model ${model} returned ${res.status}: ${errBody.slice(0, 300)}`);
        lastError = new Error(`AI request failed for model ${model} (${res.status}): ${errBody.slice(0, 250)}`);
        continue;
      }

      const json = await res.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        console.warn(`[Gemini API] Model ${model} returned empty content parts`);
        continue;
      }

      const cleaned = rawText
        .replace(/^\s*```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/i, '')
        .trim();

      const parsed = JSON.parse(cleaned);
      if (parsed && parsed.title && parsed.concepts && parsed.mindmap) {
        return parsed;
      }
    } catch (err) {
      console.warn(`[Gemini API] Error with ${model}:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('The AI engine could not build the summary. Please check Gemini API key.');
}
