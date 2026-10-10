import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Huberman Lab Podcast Summarizer (AI Protocol Notes & Mind Maps) · vidvisual',
  description:
    'Summarize 3-hour Huberman Lab & Lex Fridman podcast episodes into science protocols, concept cards, and mind maps in under 20 seconds with AI.',
  keywords: [
    'huberman lab podcast summary',
    'summarize huberman lab',
    'huberman lab notes ai',
    'huberman sleep protocol summary',
    'lex fridman podcast summarizer',
    'ai podcast notes',
    'long podcast to mind map',
    'podcast to whiteboard notes',
  ],
  alternates: {
    canonical: `${SITE_URL}/summarize-huberman-lab-podcast`,
  },
  openGraph: {
    title: 'Huberman Lab Podcast Summarizer (AI Protocol Notes & Mind Maps) · vidvisual',
    description:
      'Distill 3+ hour science podcasts into actionable protocols, whiteboard concept cards, and mind maps in 20 seconds.',
    url: `${SITE_URL}/summarize-huberman-lab-podcast`,
    siteName: 'vidvisual',
    type: 'website',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huberman Lab Podcast Summarizer (AI Protocols & Mind Maps) · vidvisual',
    description:
      'Get actionable health and science protocols from multi-hour podcasts in 20s without sitting through 3 hours of audio.',
    images: [`${SITE_URL}/twitter-image.jpg?v=2`],
  },
};

const FAQ_HUBERMAN = [
  [
    'Can vidvisual summarize entire 3-hour Huberman Lab episodes?',
    'Yes! vidvisual is engineered specifically for long-form audio-visual compression. It effortlessly digests 2-hour, 3-hour, and 4-hour episodes of Huberman Lab, Lex Fridman, Tim Ferriss, and Joe Rogan without truncation or token memory crashes.',
  ],
  [
    'Does vidvisual extract the actionable protocols and dosages?',
    'Yes. The AI extracts the core physiological mechanisms, experimental evidence, and specific action protocols (such as morning sunlight exposure, cold plunge protocols, sleep routines, and supplement stacks) into distinct, readable concept cards.',
  ],
  [
    'How long does it take to summarize a 3-hour podcast?',
    'Approximately 20 seconds. Instead of spending 180 minutes listening or scrubbing through endless timestamps, you get an instant whiteboard breakdown and mind map that takes under 60 seconds to absorb.',
  ],
  [
    'Can I export the protocols to Notion or my health journal?',
    'Yes. Export high-resolution HD PNGs, JPGs, or vector PDFs to embed directly into your personal Notion dashboard, Apple Notes, Obsidian, or GoodNotes.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_HUBERMAN.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Huberman Lab Podcast Summarizer', item: `${SITE_URL}/summarize-huberman-lab-podcast` },
  ],
};

export default function HubermanLabSummarizerPage() {
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
          <Link href="/youtube-podcast-summarizer">Podcast Summarizer</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Huberman Lab Podcast Summarizer</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>🧬 Deep Science Podcast Compression</span>
            <span>·</span>
            <span>Actionable Protocols</span>
          </div>
          <h1 className="vv-hand">Summarize 3-Hour Science Podcasts into Actionable Protocols in 20 Seconds</h1>
          <p>
            Love Huberman Lab and Lex Fridman but don't have 3.5 hours every week?
            <strong> vidvisual</strong> filters out filler and organizes biological mechanisms into scannable whiteboard cards and mind maps.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Summarize a Podcast Free</Link>
            <a href="#how-it-works" className="link small">See how it works &darr;</a>
          </div>
          <span className="muted small">100% Free · 3 summaries every week · Save 90% of listening time</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Podcast Performance">
        <div className="stat-pill">
          <span className="stat-pill-num">180 Mins &rarr; 60 Sec</span>
          <span className="stat-pill-label">Absorb 3-hour episodes in 1 minute</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Action Protocols</span>
          <span className="stat-pill-label">Direct actionable takeaways extracted</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Zero Ad Fluff</span>
          <span className="stat-pill-label">Removes 10-minute sponsor reads</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Vector PDF</span>
          <span className="stat-pill-label">Save protocols directly into Notion</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you summarize a Huberman Lab podcast episode with AI?</h2>
        <p>
          To summarize a Huberman Lab podcast episode, copy the YouTube episode URL and paste it into <strong>vidvisual</strong>. The AI digests the full multi-hour transcript, cuts out sponsor segments, and isolates the core biological mechanisms into structured whiteboard cards and an interconnected mind map in ~20 seconds. You receive exact protocols for sleep, focus, fitness, or nutrition ready to implement immediately.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>🔬 Science Rigor</strong>
            <span>Extracts biological mechanisms and study citations accurately</span>
          </div>
          <div className="answer-highlight">
            <strong>📋 Protocol Cards</strong>
            <span>Organizes daily habits, timing, and actionable dosages clearly</span>
          </div>
          <div className="answer-highlight">
            <strong>🗺️ Interconnected Mind Map</strong>
            <span>Shows how neurological circuits and behaviors tie together</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Export to Second Brain</strong>
            <span>Save as high-resolution PNG or vector PDF for Notion &amp; Obsidian</span>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="section" id="how-it-works" aria-label="How It Works">
        <h2 className="vv-hand">From 3-Hour Episode to Visual Protocol in 3 Steps</h2>
        <div className="grid-3">
          <div className="card">
            <span className="step-num">01</span>
            <h3>Paste Episode Link</h3>
            <p>Paste any YouTube link from Huberman Lab, Lex Fridman, Peter Attia, or Tim Ferriss.</p>
          </div>
          <div className="card">
            <span className="step-num">02</span>
            <h3>AI Synthesizes Protocols</h3>
            <p>Gemini 2.5 Flash filters out ads, banter, and tangential stories to isolate core protocols.</p>
          </div>
          <div className="card">
            <span className="step-num">03</span>
            <h3>Implement &amp; Export</h3>
            <p>Review the visual cards in 60 seconds, save to Notion or GoodNotes, and take action.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_HUBERMAN.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Upgrade your health knowledge without the 3-hour time sink</h2>
        <p className="section-sub">Summarize your next podcast into visual protocols in 20 seconds.</p>
        <Link href="/register" className="btn btn-primary btn-lg">Start Free (3/week forever)</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-podcast-summarizer">Podcast Summarizer</Link>
          <Link href="/youtube-video-summarizer">Video Summarizer</Link>
          <Link href="/compare">Tool Comparisons</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
