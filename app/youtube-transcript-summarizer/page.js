import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube Transcript Summarizer (AI) — Summarize Captions in 20s | Vid Visual',
  description:
    'Free AI YouTube transcript summarizer. Instantly extract and distill YouTube transcripts into visual whiteboard concept cards and connected mind maps in under 20 seconds. Save 90% of your time.',
  keywords: [
    'youtube transcript summarizer',
    'summarize youtube transcript',
    'summarize transcript ai',
    'youtube transcript to mind map',
    'extract transcript from youtube video',
    'free youtube transcript summarizer',
    'ai transcript to notes',
    'youtube captions summarizer',
    'transcript to visual summary',
    'video transcript key points',
  ],
  alternates: {
    canonical: `${SITE_URL}/youtube-transcript-summarizer`,
  },
  openGraph: {
    title: 'YouTube Transcript Summarizer (AI) — Summarize Captions in 20s',
    description:
      'Extract and turn YouTube transcripts into scannable whiteboard concept cards and visual mind maps in under 20 seconds with AI.',
    url: `${SITE_URL}/youtube-transcript-summarizer`,
    siteName: 'Vid Visual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg?v=2`,
        width: 1200,
        height: 630,
        alt: 'Vid Visual — AI YouTube Transcript Summarizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Transcript Summarizer (AI) — Summarize Captions in 20s',
    description:
      'Extract and turn YouTube transcripts into scannable whiteboard concept cards and visual mind maps in under 20 seconds with AI.',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
};

const FAQ_TRANSCRIPT = [
  [
    'How do I summarize a YouTube video transcript with AI?',
    'Paste the link to any YouTube video that has subtitles or captions into Vid Visual. The AI engine automatically extracts the complete caption stream, strips out filler words and sponsor interruptions, and structures the core insights into visual whiteboard cards and an interactive mind map in about 20 seconds.',
  ],
  [
    'Do I need to copy and paste the transcript text manually?',
    'No! You never have to manually open YouTube’s transcript box or copy thousands of words of text. Simply paste the video link into Vid Visual, and our automated engine fetches and analyzes the transcript directly from the URL.',
  ],
  [
    'Does it work with auto-generated YouTube captions?',
    'Yes! Vid Visual works seamlessly with both creator-uploaded closed captions and YouTube’s automated speech-to-text captions across English, Spanish, German, French, Hindi, Japanese, and dozens of other languages.',
  ],
  [
    'Can Vid Visual summarize transcripts from 2-hour to 4-hour videos?',
    'Yes! Traditional chatbots crash with token limit errors when trying to process transcripts from 3-hour podcasts or college lectures. Vid Visual is engineered specifically for long transcripts, distilling 25,000+ words into 5 to 7 high-impact visual concept cards.',
  ],
  [
    'Can I download the transcript notes?',
    'Yes. You can download the synthesized visual cards and connected mind map as high-resolution PNG, vector PDF, or JPG documents.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_TRANSCRIPT.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'YouTube Transcript Summarizer', item: `${SITE_URL}/youtube-transcript-summarizer` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Summarize a YouTube Transcript into Visual Notes',
  description: 'Transform raw YouTube captions into scannable whiteboard concept cards and mind maps in under 20 seconds.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Video Link',
      text: 'Copy the URL of any captioned YouTube video or podcast.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste into Vid Visual',
      text: 'Paste the link into Vid Visual — no need to copy raw transcript text manually.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Synthesizes Transcript',
      text: 'Gemini 2.5 Flash filters fluff and generates visual concept cards and mind maps in ~20 seconds.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review & Export',
      text: 'Scan the visual concept cards and download high-resolution PNG or PDF notes for your second brain.',
    },
  ],
};

export default function YouTubeTranscriptSummarizerPage() {
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
        <span>YouTube Transcript Summarizer</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>📝 Automated Transcript Engine</span>
            <span>·</span>
            <span>No Manual Copy-Pasting</span>
          </div>
          <h1 className="vv-hand">Summarize YouTube Transcripts into Visual Notes in 20 Seconds</h1>
          <p>
            Don't waste time scrolling through 30,000 words of messy unformatted captions.
            Vid Visual reads the full transcript, strips out sponsor breaks and repetitive tangents, and delivers
            scannable whiteboard concept cards and an interconnected mind map in under 20 seconds.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Summarize a transcript free</Link>
            <a href="#how-it-works" className="link small">See how it works &darr;</a>
          </div>
          <span className="muted small">100% Free · 3 summaries every week · No credit card required</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Transcript Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average transcript processing speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">30k Words</span>
          <span className="stat-pill-label">Compressed into 5 scannable visual cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">90% Saved</span>
          <span className="stat-pill-label">Reading time saved compared to raw transcripts</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries/week with zero card needed</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you summarize a YouTube transcript with AI?</h2>
        <p>
          To summarize a YouTube transcript with AI, copy any captioned video URL and paste it into <strong>Vid Visual</strong>.
          The platform automatically extracts the full caption stream from YouTube, removes filler words, and groups core topics into
          structured whiteboard concept cards and an interactive node mind map in under 20 seconds.
          Users never need to manually copy transcript text or open external transcription software.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⚡ Automated</strong>
            <span>Direct URL extraction — no manual transcript copy-pasting</span>
          </div>
          <div className="answer-highlight">
            <strong>🌐 Multi-Language</strong>
            <span>Supports all YouTube caption languages with automatic translation</span>
          </div>
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates complete visual notes in under 20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>📊 Retention</strong>
            <span>Spatial mind maps increase knowledge recall by up to 65%</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" id="how-it-works" aria-label="Step-by-Step Guide">
        <h2 className="vv-hand">How the Automated Transcript Summarizer Works</h2>
        <div className="grid-3">
          <div className="card">
            <span className="step-num">01</span>
            <h3>Fetch Video Captions</h3>
            <p>
              Paste any YouTube URL. Our engine securely queries the caption stream directly from the video without needing you to click or copy text.
            </p>
          </div>
          <div className="card">
            <span className="step-num">02</span>
            <h3>Filter Fluff &amp; Filler</h3>
            <p>
              Our Gemini 2.5 Flash pipeline identifies the central arguments, strips sponsor reads and conversational tangents, and isolates core takeaways.
            </p>
          </div>
          <div className="card">
            <span className="step-num">03</span>
            <h3>Generate Visual Map</h3>
            <p>
              Instead of dumping another wall of plain text, Vid Visual maps topic hierarchies onto visual whiteboard cards and an interconnected mind map.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_TRANSCRIPT.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Ready to summarize YouTube transcripts visually?</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Start Summarizing Free</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-video-summarizer">Video Summarizer</Link>
          <Link href="/youtube-transcript-summarizer">Transcript Summarizer</Link>
          <Link href="/youtube-to-pdf">YouTube to PDF</Link>
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
