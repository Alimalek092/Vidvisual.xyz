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

export async function summarize(transcript, model) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY is not set');
  const body = {
    systemInstruction: { parts: [{ text: PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: transcript.slice(0, 60000) }] }],
    generationConfig: { responseMimeType: 'application/json', responseSchema: SCHEMA, temperature: 0.4 },
  };
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  );
  if (!res.ok) throw new Error(`AI request failed (${res.status})`);
  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('AI returned an empty response');
  return JSON.parse(text);
}
