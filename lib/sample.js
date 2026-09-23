export const SAMPLE = {
  title: 'How Memory Actually Works',
  level: 'Beginner',
  minutes: 12,
  quote: 'Testing yourself beats re-reading, every single time.',
  concepts: [
    { emoji: '🧩', title: 'Active recall', text: 'Pulling an answer from memory strengthens it more than looking at it again.' },
    { emoji: '⏳', title: 'Spaced review', text: 'Reviewing just before you forget makes the memory last longer.' },
    { emoji: '🔗', title: 'Connections', text: 'Ideas linked to things you already know are easier to find later.' },
    { emoji: '😴', title: 'Sleep', text: 'Sleep is when the brain files the day into long-term memory.' },
  ],
  mindmap: {
    center: 'Memory',
    branches: [
      { label: 'Encode', children: ['Pay attention', 'Make links'] },
      { label: 'Store', children: ['Sleep', 'Repeat'] },
      { label: 'Recall', children: ['Self-test', 'Explain it'] },
      { label: 'Forget', children: ['Curve', 'Review early'] },
    ],
  },
  takeaways: [
    'Close the video and write down what you remember.',
    'Review after a day, a week, then a month.',
    'Explain the idea to someone else in your own words.',
    'Sleep before big exams instead of cramming.',
  ],
};
