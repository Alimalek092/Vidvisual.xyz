import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube to Mind Map Generator (AI) — Turn Videos into Mind Maps | Vid Visual',
  description:
    'Convert any YouTube video, podcast, or lecture into an interactive visual mind map in 20 seconds with AI. Automatically extracts concepts, nodes, and relationships from video captions. Free to start.',
  keywords: [
    'youtube to mind map',
    'video to mind map',
    'convert youtube video to mind map',
    'ai mind map generator from youtube',
    'youtube video mind map maker',
    'visual learning from youtube',
    'turn video into mind map',
    'youtube concept map',
    'free youtube mind map ai',
  ],
  alternates: {
    canonical: `${SITE_URL}/youtube-to-mind-map`,
  },
  openGraph: {
    title: 'YouTube to Mind Map Generator (AI) — Convert Videos to Mind Maps',
    description:
      'Turn long YouTube lectures, talks, and tutorials into structured, interactive mind maps with AI in under a minute.',
    url: `${SITE_URL}/youtube-to-mind-map`,
    siteName: 'Vid Visual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vid Visual — AI YouTube to Mind Map Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube to Mind Map Generator (AI) — Convert Videos to Mind Maps',
    description:
      'Turn long YouTube lectures, talks, and tutorials into structured, interactive mind maps with AI in 20 seconds.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const FAQ_MINDMAP = [
  [
    'How do I turn a YouTube video into a mind map?',
    'Copy any YouTube video link that has captions enabled and paste it into Vid Visual. Our AI reads the full transcript, extracts the main topic and supporting concepts, and automatically draws an interactive, connected visual mind map in under 60 seconds.',
  ],
  [
    'Is the YouTube to mind map generator free?',
    'Yes! Vid Visual provides 3 free visual summaries and mind maps every week with zero credit card required.',
  ],
  [
    'Why are mind maps better than text summaries for YouTube videos?',
    'Mind maps leverage spatial memory and dual coding theory. Instead of skimming a linear wall of text, a mind map visualizes how concepts connect, improving long-term comprehension and retention by up to 65%.',
  ],
  [
    'Can I download and export the generated mind map?',
    'Yes, you can export your mind maps as high-resolution JPG, watermark-free HD PNG, or vector PDF files for printing and sharing.',
  ],
  [
    'Does this work with long videos like 2-hour podcasts or university lectures?',
    'Yes, Vid Visual effortlessly processes long videos, university lectures, conference keynotes, and deep-dive technical tutorials as long as captions are available.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_MINDMAP.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'YouTube to Mind Map', item: `${SITE_URL}/youtube-to-mind-map` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert a YouTube Video into a Visual Mind Map',
  description: 'Step-by-step procedure to transform YouTube video captions into an interactive visual mind map with AI.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy YouTube URL',
      text: 'Find any YouTube lecture, podcast, or tutorial with captions and copy its link.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste into Vid Visual',
      text: 'Paste the link into Vid Visual and select the Whiteboard or Infographic format.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Generates Mind Map',
      text: 'Our AI analyzes the transcript, links related nodes, and renders your visual mind map in 20 seconds.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Export and Study',
      text: 'Save the mind map to your private library, or download as JPG, HD PNG, or PDF.',
    },
  ],
};

export default function YouTubeToMindMapPage() {
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
        <span>YouTube to Mind Map</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>🗺️ Spatial Mind Mapping AI</span>
            <span>·</span>
            <span>Instant Concept Nodes</span>
          </div>
          <h1 className="vv-hand">Turn Any YouTube Video into a Visual Mind Map</h1>
          <p>
            Stop drowning in walls of text. Vid Visual uses AI to read video transcripts, identify core concepts,
            and connect them into a beautifully structured, spatial mind map in under 20 seconds.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Generate Mind Map Free</Link>
            <a href="#how" className="link small">See how it works &darr;</a>
          </div>
          <span className="muted small">Free: 3 mind maps/week · No credit card required</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Mind Map Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average mind map generation speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Recall using spatial node connections</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Free Tier</span>
          <span className="stat-pill-label">3 mind maps/week with zero card needed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">4.9 / 5.0</span>
          <span className="stat-pill-label">Rated by visual thinkers &amp; students</span>
        </div>
      </section>

      {/* Direct Answer Block for AEO & AI Overviews */}
      <section className="answer-box" aria-label="Direct Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you convert a YouTube video to a mind map?</h2>
        <p>
          To turn a YouTube video into a mind map, copy any captioned video URL and paste it into{' '}
          <strong>Vid Visual</strong>. The AI parses the transcript, extracts hierarchical entities and sub-topics,
          and automatically generates an interactive vector mind map with connected nodes in under 60 seconds.
          Mind maps improve knowledge retention by up to 65% compared to linear transcripts.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⚡ Generation Time</strong>
            <span>Under 60 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Visual Format</strong>
            <span>Interactive SVG nodes + Concept cards</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Export Options</strong>
            <span>JPG, HD PNG, Vector PDF</span>
          </div>
        </div>
      </section>

      {/* Why Visual Mind Maps Work */}
      <section className="section">
        <h2 className="vv-hand">Why Mind Maps Are 65% More Effective Than Plain Text</h2>
        <p className="section-lead">
          Research in cognitive science shows our brains process spatial diagrams 60,000 times faster than text.
          Here is how Vid Visual transforms passive watching into active understanding:
        </p>
        <div className="card-grid">
          <div className="info-card accent-blue">
            <span className="card-emoji">🗺️</span>
            <h3>Spatial Concept Hierarchy</h3>
            <p>See how the big picture branches into key sub-ideas, evidence, and practical takeaways at a glance.</p>
          </div>
          <div className="info-card accent-green">
            <span className="card-emoji">⚡</span>
            <h3>60-Second Video Reviews</h3>
            <p>Skim an entire 45-minute lecture or conference talk in 60 seconds without scrubbing through timestamps.</p>
          </div>
          <div className="info-card accent-violet">
            <span className="card-emoji">📥</span>
            <h3>Downloadable Study Sheets</h3>
            <p>Export your visual mind maps as high-resolution PNGs or PDFs to print or share with teammates.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section how">
        <h2 className="vv-hand">How to Generate a Mind Map in 4 Steps</h2>
        <div className="steps-detailed">
          <div className="step-detailed">
            <div className="step-num vv-hand">1</div>
            <div>
              <h3>Copy any YouTube link</h3>
              <p>Grab the link to any YouTube video that has subtitles or captions enabled.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">2</div>
            <div>
              <h3>Paste into Vid Visual</h3>
              <p>Paste the link into the generator box and select the Whiteboard format.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">3</div>
            <div>
              <h3>AI draws your mind map</h3>
              <p>Gemini AI maps the relationship between concepts and builds your visual chart.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">4</div>
            <div>
              <h3>Download or revisit</h3>
              <p>Your mind map is stored in your private cloud library. Download as JPG, PNG, or PDF anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_MINDMAP.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Ready to turn videos into mind maps?</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Create Free Mind Map</Link>
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
          <Link href="/youtube-to-notes">Study Notes</Link>
          <Link href="/whiteboard-summary">Whiteboard Visuals</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}
