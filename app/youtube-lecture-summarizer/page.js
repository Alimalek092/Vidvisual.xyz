import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube Lecture Summarizer (AI) — Convert College Lectures to Study Notes | Vid Visual',
  description:
    'Turn 60 to 120-minute university lectures into visual whiteboard study sheets, mind maps, and exam takeaways in under 20 seconds. Free AI lecture summarizer for college students and researchers.',
  keywords: [
    'youtube lecture summarizer',
    'turn lecture video into notes',
    'ai study notes from youtube',
    'college lecture summarizer',
    'exam prep lecture notes',
    'university lecture to mind map',
    'summarize recorded lecture',
    'ai lecture note taker',
    'mit opencourseware notes',
    'free lecture summarizer ai',
  ],
  alternates: {
    canonical: `${SITE_URL}/youtube-lecture-summarizer`,
  },
  openGraph: {
    title: 'YouTube Lecture Summarizer (AI) — Convert College Lectures to Study Notes',
    description:
      'Turn 60 to 120-minute university lectures into visual whiteboard study sheets and mind maps in under 20 seconds with AI.',
    url: `${SITE_URL}/youtube-lecture-summarizer`,
    siteName: 'Vid Visual',
    type: 'website',
    images: [
      {
        url: `/og-image.jpg?v=2`,
        width: 1200,
        height: 630,
        alt: 'Vid Visual — AI YouTube Lecture Summarizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Lecture Summarizer (AI) — Convert College Lectures to Study Notes',
    description:
      'Turn 60 to 120-minute university lectures into visual whiteboard study sheets and mind maps in under 20 seconds with AI.',
    images: [`/og-image.jpg?v=2`],
  },
};

const FAQ_LECTURE = [
  [
    'How does Vid Visual turn a university lecture into study notes?',
    'Paste the link to any recorded YouTube lecture. Vid Visual’s AI reads the transcript, extracts core academic definitions, mathematical theorems, and experimental proofs, and arranges them into concept cards and a connected knowledge mind map in around 20 seconds.',
  ],
  [
    'Can I use Vid Visual the night before an exam?',
    'Yes! That is one of the most popular student use cases. Instead of panicking and trying to re-watch 15 hours of recorded semester lectures, you can generate 15 visual whiteboard cheat sheets in minutes and revise all core concepts before test time.',
  ],
  [
    'Does it work with complex STEM lectures like Calculus, Physics, and Computer Science?',
    'Yes. Vid Visual excels at structured STEM content (MIT OpenCourseWare, Stanford Online, Harvard CS50). It isolates algorithmic steps, formulas, and structural hierarchies clearly on separate concept cards.',
  ],
  [
    'Can I download or print the lecture notes?',
    'Yes! You can download your visual lecture summaries as high-resolution PNGs or vector PDFs that are optimized for printing, digital annotation on iPads/tablets, or importing directly into Notion and Anki.',
  ],
  [
    'Is the lecture summarizer free for students?',
    'Yes. Every student gets 3 free lecture summaries every week forever, with no credit card required. Paid plans unlock unlimited weekly summaries for heavy exam study periods.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_LECTURE.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Lecture Summarizer', item: `${SITE_URL}/youtube-lecture-summarizer` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert a YouTube Lecture into Visual Study Notes in 20 Seconds',
  description: 'Transform recorded college lectures into high-yield visual whiteboard notes and mind maps using AI.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Lecture URL',
      text: 'Copy the YouTube link for any university lecture, exam review, or recorded class with captions.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste into Vid Visual',
      text: 'Paste the URL into Vid Visual and select the Whiteboard format for detailed study notes.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Generates Study Notes',
      text: 'Our AI extracts academic definitions, formulas, and conceptual relationships into spatial visual cards in 20s.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Print or Revise Digitally',
      text: 'Download as high-res PNG or PDF to print, annotate on your tablet, or export to Notion.',
    },
  ],
};

export default function YouTubeLectureSummarizerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <nav className="nav">
        <Link href="/" className="brand vv-hand">
          <img src="/logo.png" alt="Vid Visual" className="brand-icon" width="32" height="32" />
          <span>Vid Visual</span>
        </Link>
        <div className="nav-links">
          <Link href="/#formats">Formats</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>YouTube Lecture Summarizer</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--green)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--green)' }}>
            <span>🎓 High-Yield Academic Engine</span>
            <span>·</span>
            <span>Study Smarter</span>
          </div>
          <h1 className="vv-hand">Convert 2-Hour College Lectures into Visual Study Notes in 20 Seconds</h1>
          <p>
            Stop wasting hours frantically pausing recorded college lectures to scribble notes.
            Vid Visual automatically extracts key definitions, core academic concepts, and logical relationships,
            rendering them into exam-ready whiteboard notes and mind maps you can revise from in 60 seconds.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Summarize a lecture free</Link>
            <a href="#benefits" className="link small">Explore academic features &darr;</a>
          </div>
          <span className="muted small">Free: 3 lecture summaries/week · No credit card required</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Lecture Summarizer Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">To distill a 90-minute lecture</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Exam recall through spatial visual cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries/week with zero card needed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">90% Saved</span>
          <span className="stat-pill-label">Lecture review time saved before exams</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you summarize YouTube college lectures with AI?</h2>
        <p>
          To turn a recorded YouTube lecture into study notes, copy any lecture URL with subtitles and paste it into{' '}
          <strong>Vid Visual</strong>. The AI reads the transcript, organizes technical concepts into structured visual cards,
          and draws a connected mind map outlining topic relationships in about 20 seconds.
          According to cognitive dual-coding science, visual concept maps boost exam recall by up to 65% over traditional linear text notes.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⚡ Speed</strong>
            <span>Generates complete study notes in under 20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>📚 Academic Focus</strong>
            <span>Extracts definitions, proofs, and key takeaways</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Print-Ready</strong>
            <span>Exports to JPG, HD PNG, and PDF for tablets</span>
          </div>
        </div>
      </section>

      {/* Academic Disciplines */}
      <section id="benefits" className="section">
        <h2 className="vv-hand">Built for Hard STEM &amp; Humanities Courses</h2>
        <p className="section-lead">Transform dense academic lectures into clear visual mental models across any subject.</p>
        <div className="card-grid">
          <div className="info-card accent-blue">
            <span className="card-emoji">💻</span>
            <h3>Computer Science &amp; Coding</h3>
            <p>Summarize algorithm lectures, system design tutorials, and data structures into node-link flowcharts and architecture diagrams.</p>
          </div>
          <div className="info-card accent-green">
            <span className="card-emoji">🔬</span>
            <h3>Biology, Chemistry &amp; Medicine</h3>
            <p>Understand complex physiological pathways, cellular mechanisms, and organic chemistry mechanisms with clear visual hierarchy.</p>
          </div>
          <div className="info-card accent-amber">
            <span className="card-emoji">📐</span>
            <h3>Mathematics &amp; Engineering</h3>
            <p>Break down multi-variable calculus, differential equations, and signal processing steps into discrete concept cards.</p>
          </div>
          <div className="info-card accent-violet">
            <span className="card-emoji">🏛️</span>
            <h3>History, Law &amp; Economics</h3>
            <p>Map historical timelines, legal case precedents, and macroeconomic theories with clear cause-and-effect branches.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section how">
        <h2 className="vv-hand">How to Turn Any Lecture into Study Notes in 4 Steps</h2>
        <div className="steps-detailed">
          <div className="step-detailed">
            <div className="step-num vv-hand">1</div>
            <div>
              <h3>Copy any YouTube lecture link</h3>
              <p>Grab the link to any class recording, tutorial, or webinar with subtitles.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">2</div>
            <div>
              <h3>Paste into Vid Visual</h3>
              <p>Paste the link into our generator box and select the Whiteboard format.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">3</div>
            <div>
              <h3>AI structures your study notes</h3>
              <p>Gemini 2.5 Flash extracts core concepts, maps their relationships, and highlights takeaways.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">4</div>
            <div>
              <h3>Review and ace your exam</h3>
              <p>Save to your private library, or export as a high-res PDF to annotate on your tablet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_LECTURE.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Ready to ace your next exam with visual study notes?</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Create Free Lecture Notes</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-podcast-summarizer">Podcast Summaries</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <Link href="/video-to-infographic">Infographics</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}
