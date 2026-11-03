'use client';

const CHANNELS = [
  { icon: '🎙️', name: 'Huberman Lab', topic: 'Neuroscience & Health' },
  { icon: '🎓', name: 'MIT OpenCourseWare', topic: 'Math & Physics' },
  { icon: '🧠', name: '3Blue1Brown', topic: 'Neural Networks' },
  { icon: '💻', name: 'Harvard CS50', topic: 'Computer Science' },
  { icon: '⚡', name: 'Veritasium', topic: 'Science & Paradoxes' },
  { icon: '🚀', name: 'Lex Fridman', topic: 'AI & Engineering' },
  { icon: '🔬', name: 'Stanford Online', topic: 'Machine Learning' },
  { icon: '💡', name: 'TED Talks', topic: 'Psychology & Ideas' },
  { icon: '📈', name: 'Y Combinator', topic: 'Startup Playbooks' },
  { icon: '🏛️', name: 'Yale Courses', topic: 'History & Philosophy' },
];

export default function SlidingTopicTicker() {
  // We double the list so the infinite ticker slides seamlessly
  const tickerList = [...CHANNELS, ...CHANNELS];

  return (
    <div className="sliding-ticker-wrapper" aria-label="Popular Channels and Topics Summarized by vidvisual">
      <div className="sliding-ticker-inner">
        {tickerList.map((item, index) => (
          <div key={index} className="ticker-item">
            <span>{item.icon}</span>
            <span>{item.name}</span>
            <span className="ticker-item-tag">{item.topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
