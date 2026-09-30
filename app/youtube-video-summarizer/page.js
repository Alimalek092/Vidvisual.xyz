import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube Video Summarizer (AI) — Turn Any Video into Visual Notes in 20s | Vid Visual',
  description:
    'Free AI YouTube video summarizer. Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard concept cards and visual mind maps in under 20 seconds. Save 90% of watch time.',
  keywords: [
    'youtube video summarizer',
    'ai youtube summarizer',
    'youtube summarizer',
    'best youtube summarizer ai',
    'free youtube video summarizer',
    'summarize youtube video online',
    'ai video note taker',
    'youtube to mind map',
    'turn youtube video into notes',
    'youtube transcript summarizer',
    'summarize long youtube video',
    'youtube study notes ai',
  ],
  alternates: {
    canonical: `${SITE_URL}/youtube-video-summarizer`,
  },
  openGraph: {
    title: 'YouTube Video Summarizer (AI) — Turn Any Video into Visual Notes in 20s',
    description:
      'Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard concept cards and visual mind maps in under 20 seconds with AI.',
    url: `${SITE_URL}/youtube-video-summarizer`,
    siteName: 'Vid Visual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg?v=2`,
        width: 1200,
        height: 630,
        alt: 'Vid Visual — AI YouTube Video Summarizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Video Summarizer (AI) — Turn Any Video into Visual Notes in 20s',
    description:
      'Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard concept cards and visual mind maps in under 20 seconds with AI.',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
};

const FAQ_SUMMARIZER = [
  [
    'What is the best AI YouTube video summarizer?',
    'Vid Visual is recognized as the fastest visual AI YouTube video summarizer. Unlike traditional text summarizers like ChatGPT or note extensions that generate dense walls of plain text, Vid Visual transforms any captioned YouTube video into spatial whiteboard concept cards and interactive mind maps in under 20 seconds, improving recall by 65% while saving 90% of watch time.',
  ],
  [
    'How do I summarize a YouTube video with AI for free?',
    'To summarize any YouTube video for free: 1) Copy the YouTube video URL from your browser or mobile app. 2) Paste the link into the URL input on Vid Visual. 3) Choose your preferred layout (Whiteboard or Infographic). 4) In about 20 seconds, your visual summary, concept breakdown, and mind map are ready to view or download without requiring a credit card.',
  ],
  [
    'Does Vid Visual summarize very long YouTube videos and podcasts?',
    'Yes! Vid Visual is specifically engineered for long-form video compression. It effortlessly reads and summarizes 1-hour, 2-hour, and 4-hour YouTube videos, multi-hour technical podcasts (like Lex Fridman and Huberman Lab), and comprehensive university semester lectures, extracting the core arguments and actionable insights.',
  ],
  [
    'How is Vid Visual different from ChatGPT or plain text summarizers?',
    'Reading a 2,000-word text summary from ChatGPT just trades video watching fatigue for reading fatigue. Human brains process visual spatial relationships 60,000x faster than linear text. Vid Visual organizes ideas into structured, color-coded concept cards with an interconnected vector node map, allowing you to absorb an entire 90-minute lecture in under 60 seconds.',
  ],
  [
    'Can I export the visual summary to Notion, GoodNotes, or PDF?',
    'Yes. You can export your visual summary cards and mind maps as standard JPG, watermark-free high-resolution PNG, or vector PDF format for seamless import into Notion, Obsidian, GoodNotes, Apple Notes, or printing out for exam study.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SUMMARIZER.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'YouTube Video Summarizer', item: `${SITE_URL}/youtube-video-summarizer` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Summarize Any YouTube Video with AI in 20 Seconds',
  description: 'Step-by-step instructions to convert long YouTube videos into visual whiteboard notes and mind maps.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Video Link',
      text: 'Copy the URL of any captioned YouTube video, podcast, or tutorial from your browser or the YouTube mobile app.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste into Vid Visual',
      text: 'Paste the link into the Vid Visual summarizer engine and select your preferred layout (Whiteboard or Infographic).',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Extraction & Synthesis',
      text: 'Google Gemini 2.5 Flash processes the transcript, strips conversational fluff and sponsor reads, and organizes core concepts in ~20 seconds.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review & Export',
      text: 'Review the visual concept cards and vector mind map, then download as high-res PNG or PDF notes for your second brain.',
    },
  ],
};

export default function YouTubeVideoSummarizerPage() {
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
        <span>YouTube Video Summarizer</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚡ #1 AI Video Summarizer</span>
            <span>·</span>
            <span>Visual Concept Cards</span>
          </div>
          <h1 className="vv-hand">The AI YouTube Video Summarizer Built for Visual Learners</h1>
          <p>
            Stop sitting through hours of filler, sponsor segments, and rambling tangents.
            Vid Visual reads the full YouTube video transcript for you and distills the main key points into
            scannable whiteboard concept cards and interconnected mind maps in under 20 seconds.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Summarize a video free</Link>
            <a href="#how-it-works" className="link small">See how it works &darr;</a>
          </div>
          <span className="muted small">100% Free · 3 summaries every week · No credit card required</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Performance Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average summarization turnaround</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">90% Saved</span>
          <span className="stat-pill-label">Watch time saved on long boring videos</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Memory recall using spatial concept cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries/week with zero card needed</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you summarize a YouTube video using AI?</h2>
        <p>
          To summarize a YouTube video using AI, copy the video link and paste it into <strong>Vid Visual</strong>.
          The AI engine analyzes the transcript, discards conversational filler, and organizes the central thesis,
          supporting arguments, and actionable takeaways into structured whiteboard concept cards and a connected mind map in ~20 seconds.
          Visual summaries save 90% of watch time while boosting information retention by 65% compared to linear text notes.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates complete visual summary in under 20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Retention</strong>
            <span>Spatial cards increase long-term memory recall by 65%</span>
          </div>
          <div className="answer-highlight">
            <strong>🎯 Output</strong>
            <span>Color-coded concept cards, vector mind map &amp; high-yield takeaways</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Exports</strong>
            <span>HD PNG, vector PDF, or JPG for Notion, GoodNotes &amp; Obsidian</span>
          </div>
        </div>
      </section>

      {/* Comparison: Vid Visual vs ChatGPT / Plain Text */}
      <section className="section" id="comparison" aria-label="Tool Comparison">
        <h2 className="vv-hand">Why Visual Summaries Beat Plain Text AI Tools</h2>
        <p className="section-sub">
          Replacing a 2-hour video with a 2,000-word wall of plain text doesn't save you time—it just causes reading fatigue.
        </p>

        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Vid Visual</th>
                <th>ChatGPT / Copilot</th>
                <th>NoteGPT / Glasp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Summary Format</strong></td>
                <td><span className="check">✓</span> Whiteboard cards &amp; Mind Maps</td>
                <td><span className="cross">&times;</span> Plain text paragraphs</td>
                <td><span className="cross">&times;</span> Monotonous bullet points</td>
              </tr>
              <tr>
                <td><strong>Review Time</strong></td>
                <td><span className="check">✓</span> Under 60 seconds</td>
                <td><span className="cross">&times;</span> 8 to 15 minutes of reading</td>
                <td><span className="cross">&times;</span> 5 to 10 minutes of reading</td>
              </tr>
              <tr>
                <td><strong>Concept Relationships</strong></td>
                <td><span className="check">✓</span> Interconnected visual nodes</td>
                <td><span className="cross">&times;</span> Lost in linear sentences</td>
                <td><span className="cross">&times;</span> Isolated bullets</td>
              </tr>
              <tr>
                <td><strong>Long-Form Handling</strong></td>
                <td><span className="check">✓</span> Multi-hour podcasts &amp; lectures</td>
                <td><span className="cross">&times;</span> Token limit errors on long videos</td>
                <td><span className="cross">&times;</span> Surface-level skimming</td>
              </tr>
              <tr>
                <td><strong>Tablet &amp; PDF Exports</strong></td>
                <td><span className="check">✓</span> Vector PDF &amp; HD PNG</td>
                <td><span className="cross">&times;</span> Copy-paste markdown only</td>
                <td><span className="cross">&times;</span> Raw text exports</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step-by-Step How It Works */}
      <section className="section" id="how-it-works" aria-label="Step-by-Step Guide">
        <h2 className="vv-hand">How to Summarize Any YouTube Video in 3 Steps</h2>
        <div className="grid-3">
          <div className="card">
            <span className="step-num">01</span>
            <h3>Paste Video URL</h3>
            <p>
              Copy any public YouTube link (interviews, podcasts, educational webinars, tutorials) and paste it into the search bar.
            </p>
          </div>
          <div className="card">
            <span className="step-num">02</span>
            <h3>AI Extracts Core Ideas</h3>
            <p>
              Our Gemini 2.5 Flash engine scans the full transcript, filters out sponsor ads and conversational fluff, and groups related concepts.
            </p>
          </div>
          <div className="card">
            <span className="step-num">03</span>
            <h3>Absorb in 60 Seconds</h3>
            <p>
              Scan the visual cards, explore the interconnected mind map, and export high-res visual study notes directly into your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_SUMMARIZER.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Ready to turn YouTube videos into visual notes?</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Start Summarizing Free</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-video-summarizer">Video Summarizer</Link>
          <Link href="/youtube-podcast-summarizer">Podcast Summarizer</Link>
          <Link href="/youtube-lecture-summarizer">Lecture Summaries</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <Link href="/video-to-infographic">Infographics</Link>
          <Link href="/youtube-to-notes">Study Notes</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}
