import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube to Anki Flashcards & Visual Study Notes (AI) · vidvisual',
  description:
    'Convert YouTube lectures, medical videos, and STEM tutorials into active-recall concept flashcards and mind maps in 20 seconds with AI.',
  keywords: [
    'youtube to anki',
    'convert youtube video to flashcards',
    'youtube lecture to study cards',
    'ai flashcard generator from youtube',
    'youtube to active recall',
    'medical student youtube summarizer',
    'stem lecture to anki',
    'youtube to study notes',
  ],
  alternates: {
    canonical: `${SITE_URL}/youtube-to-anki-flashcards`,
  },
  openGraph: {
    title: 'YouTube to Anki Flashcards & Visual Study Notes (AI) · vidvisual',
    description:
      'Turn long university lectures and YouTube tutorials into active-recall concept flashcards and mind maps in under 20 seconds.',
    url: `${SITE_URL}/youtube-to-anki-flashcards`,
    siteName: 'vidvisual',
    type: 'website',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube to Anki Flashcards & Study Cards (AI) · vidvisual',
    description:
      'Generate active recall study flashcards and spatial concept cards from any YouTube lecture in 20s.',
    images: [`${SITE_URL}/twitter-image.jpg?v=2`],
  },
};

const FAQ_ANKI = [
  [
    'How do I convert a YouTube lecture into study flashcards?',
    'Simply paste any YouTube lecture or tutorial URL into vidvisual. In ~20 seconds, our AI extracts the central thesis, key mechanisms, and core facts into bite-sized whiteboard concept cards. Each card contains an emoji, primary principle, and active recall explanation ready to transfer directly into Anki or Notion.',
  ],
  [
    'Why is visual concept cards better than reading lecture slides?',
    'Cognitive psychology shows that active recall and spatial arrangement increase memory retention by up to 65%. Instead of passively re-reading slides or transcripts, vidvisual prompts your brain to understand the conceptual hierarchy through connected node maps and clear takeaway rules.',
  ],
  [
    'Can I export the flashcards to Anki or Notion?',
    'Yes! You can export your visual cards as high-resolution PNG, vector PDF, or clean structured study text to quickly import or embed inside Anki decks, GoodNotes notebooks, or Notion databases.',
  ],
  [
    'Does this work for complex STEM and medical lectures?',
    'Yes. vidvisual is powered by Gemini 2.5 Flash, which excels at breaking down intricate medical protocols, organic chemistry mechanisms, computer science algorithms, and engineering proofs into digestible concept cards.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ANKI.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'YouTube to Anki Flashcards', item: `${SITE_URL}/youtube-to-anki-flashcards` },
  ],
};

export default function YouTubeToAnkiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav className="nav">
        <Link href="/" className="brand vv-hand">
          <img src="/logo.png" alt="vidvisual" className="brand-icon" width="32" height="32" />
          <span>vidvisual</span>
        </Link>
        <div className="nav-links">
          <Link href="/youtube-video-summarizer">Summarizer</Link>
          <Link href="/youtube-to-pdf">PDF Notes</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>YouTube to Anki Flashcards</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>🧠 Active Recall Study Engine</span>
            <span>·</span>
            <span>Fast Exam Prep</span>
          </div>
          <h1 className="vv-hand">Turn YouTube Lectures into Active-Recall Study Cards &amp; Mind Maps</h1>
          <p>
            Stop re-watching 2-hour college lectures before exams.
            <strong> vidvisual</strong> extracts high-yield facts, core definitions, and conceptual hierarchies into scannable flashcard cards and mind maps in 20 seconds.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Generate Study Cards Free</Link>
            <a href="#how-it-works" className="link small">See how it works &darr;</a>
          </div>
          <span className="muted small">100% Free · 3 summaries every week · Perfect for Anki &amp; GoodNotes</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Study Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Card generation from any lecture</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Retention with spatial recall cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Zero Ad Fluff</span>
          <span className="stat-pill-label">Removes filler &amp; sponsor segments</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Vector PDF</span>
          <span className="stat-pill-label">Printable exam revision sheets</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you turn a YouTube lecture into Anki flashcards with AI?</h2>
        <p>
          To create active recall study flashcards from a YouTube lecture, copy the YouTube URL and paste it into <strong>vidvisual</strong>. The AI analyzes the transcript, discards filler, and structures the high-yield concepts into distinct whiteboard cards with memory triggers and an interconnected mind map. You can then export the visual cards directly to PDF or copy the core facts into Anki and Notion.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>🎯 High-Yield Focus</strong>
            <span>Extracts exam-relevant definitions and arguments only</span>
          </div>
          <div className="answer-highlight">
            <strong>🧩 Concept Cards</strong>
            <span>Structured with emojis and clear explanations for rapid self-testing</span>
          </div>
          <div className="answer-highlight">
            <strong>🗺️ Spatial Node Map</strong>
            <span>Visualizes how complex formulas and theories link together</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Vector Exports</strong>
            <span>One-click export to HD PNG or vector PDF for digital notebooks</span>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="section" id="how-it-works" aria-label="3-Step Process">
        <h2 className="vv-hand">How to Build Study Cards in 3 Steps</h2>
        <div className="grid-3">
          <div className="card">
            <span className="step-num">01</span>
            <h3>Paste Lecture Link</h3>
            <p>Paste any university lecture, biology review, STEM proof, or coding tutorial from YouTube.</p>
          </div>
          <div className="card">
            <span className="step-num">02</span>
            <h3>AI Extracts Core Ideas</h3>
            <p>Gemini 2.5 Flash analyzes timestamps and groups related concepts into structured cards.</p>
          </div>
          <div className="card">
            <span className="step-num">03</span>
            <h3>Export &amp; Revise</h3>
            <p>Revise with active recall, test your knowledge in 60 seconds, and export to Anki, Notion, or GoodNotes.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_ANKI.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Ace your next exam with visual notes</h2>
        <p className="section-sub">Turn any YouTube lecture into bite-sized concept cards in 20 seconds.</p>
        <Link href="/register" className="btn btn-primary btn-lg">Start Free (3/week forever)</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-lecture-summarizer">Lecture Summaries</Link>
          <Link href="/youtube-to-notes">Study Notes</Link>
          <Link href="/youtube-to-pdf">YouTube to PDF</Link>
          <Link href="/compare">Competitor Comparisons</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
