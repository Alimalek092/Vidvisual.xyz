import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube to Notes AI — Convert YouTube Videos to Study Notes | Vid Visual',
  description:
    'Turn any YouTube video, lecture, or podcast into structured study notes, concept cards, and takeaway lists in 20 seconds with AI. Built for students and researchers. Free to start.',
  keywords: [
    'youtube to notes',
    'take notes from youtube video ai',
    'convert youtube video to study notes',
    'ai lecture notes from youtube',
    'youtube video note taker',
    'study from youtube videos',
    'ai study notes from video',
    'summarize youtube lecture',
    'free youtube notes ai',
  ],
  alternates: {
    canonical: `${SITE_URL}/youtube-to-notes`,
  },
  openGraph: {
    title: 'YouTube to Notes AI — Convert YouTube Videos to Study Notes',
    description:
      'Turn long university lectures, coding tutorials, and research videos into exam-ready whiteboard notes and mind maps in 20 seconds with AI.',
    url: `${SITE_URL}/youtube-to-notes`,
    siteName: 'Vid Visual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vid Visual — AI YouTube to Notes Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube to Notes AI — Convert YouTube Videos to Study Notes',
    description:
      'Turn long university lectures, coding tutorials, and research videos into exam-ready whiteboard notes and mind maps in 20 seconds with AI.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const FAQ_NOTES = [
  [
    'How do I take notes from a YouTube video automatically?',
    'With Vid Visual, you simply paste the YouTube video link. The AI reads the entire spoken transcript, extracts the core definitions, organizes the key concepts into visual study cards, and generates bulleted takeaways in under 20 seconds.',
  ],
  [
    'Can I use Vid Visual to study university lectures and prepare for exams?',
    'Yes! Vid Visual is widely used by college students to convert 60-to-120-minute recorded lectures into high-yield visual summary sheets, active recall cards, and actionable takeaway lists the night before exams.',
  ],
  [
    'What formats can I export my study notes in?',
    'You can export your notes as JPG, watermark-free HD PNG, or vector PDF documents for printing or importing into GoodNotes, Notion, or Obsidian.',
  ],
  [
    'Does it work for foreign language tutorials or lectures?',
    'Yes, Vid Visual processes caption tracks in any language and creates your notes in that same language.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_NOTES.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'YouTube to Notes', item: `${SITE_URL}/youtube-to-notes` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert a YouTube Lecture into Study Notes',
  description: 'Easily turn any YouTube educational video into visual study notes with AI.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy YouTube URL',
      text: 'Copy the link of any recorded lecture or tutorial with captions.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Generate Visual Notes',
      text: 'Paste the link into Vid Visual and click Generate.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Review Key Takeaways',
      text: 'Read through the synthesized concept cards, mind map, and takeaway checklist.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Export to PDF',
      text: 'Download as a vector PDF or HD PNG to study anytime offline.',
    },
  ],
};

export default function YouTubeToNotesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <nav className="nav">
        <Link href="/" className="brand vv-hand"><img src="/logo.png" alt="Vid Visual" className="brand-icon" width="32" height="32" /><span>Vid Visual</span></Link>
        <div className="nav-links">
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <Link href="/whiteboard-summary">Whiteboard</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>YouTube to Study Notes</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--green)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--green)' }}>
            <span>📝 AI Note Taking Engine</span>
            <span>·</span>
            <span>20s Study Notes</span>
          </div>
          <h1 className="vv-hand">Convert YouTube Videos into High-Yield Study Notes in 20 Seconds</h1>
          <p>
            Skip typing notes by hand. Vid Visual automatically turns recorded lectures, podcasts,
            and tutorials into structured concept cards, visual diagrams, and bulleted takeaways you can study from.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Generate Study Notes Free</Link>
            <a href="#how" className="link small">See how it works &darr;</a>
          </div>
          <span className="muted small">3 free summaries/week · No card required</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="infographic" theme="ocean" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Study Notes Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average note generation speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Exam retention with visual spatial notes</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Tablet Ready</span>
          <span className="stat-pill-label">Exports to PDF for GoodNotes &amp; Notion</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">4.9 / 5.0</span>
          <span className="stat-pill-label">Rated by college students &amp; researchers</span>
        </div>
      </section>

      {/* Direct Answer Box for Google AI Overviews */}
      <section className="answer-box" aria-label="Direct Answer">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you convert YouTube videos to notes?</h2>
        <p>
          To convert YouTube videos into notes, paste any captioned video URL into <strong>Vid Visual</strong>.
          The AI engine analyzes the transcript, filters out conversational filler, and extracts core concepts
          into structured whiteboard cards, mind map relationships, and actionable takeaways in under 60 seconds.
          Notes can be exported to PDF or PNG for exam preparation.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates complete lecture notes in under 60s</span>
          </div>
          <div className="answer-highlight">
            <strong>📝 Format</strong>
            <span>Key concepts, takeaways & visual node map</span>
          </div>
          <div className="answer-highlight">
            <strong>🎓 Perfect for</strong>
            <span>Students, researchers, developers & exam review</span>
          </div>
        </div>
      </section>

      {/* Comparison: Vid Visual vs Manual Notes */}
      <section className="section">
        <h2 className="vv-hand">Vid Visual vs. Taking Notes by Hand</h2>
        <p className="section-lead">Why automated visual note-taking saves you 10+ hours every week:</p>
        <div className="card-grid">
          <div className="info-card accent-blue">
            <span className="card-emoji">✍️</span>
            <h3>No More Pausing & Typing</h3>
            <p>Focus on absorbing the lecture instead of constantly pausing the video to write down bullet points.</p>
          </div>
          <div className="info-card accent-green">
            <span className="card-emoji">🎯</span>
            <h3>Zero Fluff, 100% Core Ideas</h3>
            <p>Our AI strips away jokes, sponsorship breaks, and repetitive filler so you only keep the ideas that matter.</p>
          </div>
          <div className="info-card accent-violet">
            <span className="card-emoji">📚</span>
            <h3>Searchable Cloud Library</h3>
            <p>Every set of notes you create is saved to your account, creating your personal knowledge base.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section how">
        <h2 className="vv-hand">4 Easy Steps to Your Notes</h2>
        <div className="steps-detailed">
          <div className="step-detailed">
            <div className="step-num vv-hand">1</div>
            <div>
              <h3>Paste video link</h3>
              <p>Enter any YouTube lecture, podcast, or tutorial URL with captions.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">2</div>
            <div>
              <h3>AI reads transcript</h3>
              <p>The AI extracts key concepts, definitions, and relationships.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">3</div>
            <div>
              <h3>Visual notes generated</h3>
              <p>Review the concept cards and connected mind map.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">4</div>
            <div>
              <h3>Export to PDF</h3>
              <p>Download clean, vector PDF notes for printing or digital note apps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_NOTES.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Start taking smarter notes today.</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Make Notes Free</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-podcast-summarizer">Podcasts</Link>
          <Link href="/youtube-lecture-summarizer">Lectures</Link>
          <Link href="/video-to-infographic">Infographics</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <Link href="/whiteboard-summary">Whiteboard Visuals</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}
