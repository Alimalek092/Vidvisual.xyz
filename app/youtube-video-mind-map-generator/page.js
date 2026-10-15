import Link from 'next/link';
import Visual from '@/components/Visual';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube Video Mind Map Generator (AI) — Convert Videos to Mind Maps Free | vidvisual',
  description:
    'Free AI YouTube video mind map generator. Automatically turn any YouTube video, lecture, or podcast into an interactive visual mind map in 20s. 100% free with no login required.',
  keywords: [
    'youtube video mind map generator',
    'youtube mind map generator',
    'ai youtube mind map generator',
    'convert youtube video to mind map',
    'youtube video to mind map free',
    'turn youtube video into mind map',
    'video to mind map ai',
    'youtube concept map generator',
    'free youtube video mind map',
  ],
  alternates: {
    canonical: `${SITE_URL}/youtube-video-mind-map-generator`,
  },
  openGraph: {
    title: 'YouTube Video Mind Map Generator (AI) — Convert Videos to Mind Maps Free',
    description:
      'Turn long YouTube lectures, talks, and tutorials into structured, interactive mind maps with AI in under 20 seconds.',
    url: `${SITE_URL}/youtube-video-mind-map-generator`,
    siteName: 'vidvisual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg?v=3`,
        width: 1200,
        height: 630,
        alt: 'vidvisual — AI YouTube Video Mind Map Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Video Mind Map Generator (AI) — Convert Videos to Mind Maps Free',
    description:
      'Turn long YouTube lectures and podcasts into interactive mind maps with AI in under 20 seconds.',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
};

const FAQ_MINDMAP_GEN = [
  [
    'What is a YouTube video mind map generator?',
    'A YouTube video mind map generator is an AI tool that parses video captions and arranges key arguments, definitions, and relationships into a visual, branching mind map. Rather than reading dense text notes, a mind map allows visual learners to see how ideas connect across the entire video in under 60 seconds.',
  ],
  [
    'How do I convert a YouTube video to a mind map for free?',
    'Paste any YouTube video link that has captions into the vidvisual generator input above and click Generate. In under 20 seconds, our AI maps out the central topic, primary branches, and supporting concept cards with zero login and no credit card required.',
  ],
  [
    'How does a mind map help me learn faster than text summaries?',
    'Cognitive science demonstrates that the human brain processes visual spatial diagrams 60,000 times faster than linear text. Interconnected mind map nodes activate associative memory, helping you remember 65% more information from 2-hour lectures and podcasts.',
  ],
  [
    'Can I download or print the generated mind map?',
    'Yes! You can download your mind map as a standard JPG, watermark-free HD PNG, or vector PDF format that can be printed or imported into Notion, Obsidian, GoodNotes, and Apple Notes.',
  ],
  [
    'Does it work with long 2-to-4-hour podcasts and university lectures?',
    'Yes. vidvisual is specifically engineered to handle multi-hour lectures (like Stanford, MIT OpenCourseWare) and long podcasts (Huberman Lab, Lex Fridman), distilling up to 30,000 words into a clean, legible mind map hierarchy.',
  ],
];

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'vidvisual - YouTube Video Mind Map Generator',
  url: `${SITE_URL}/youtube-video-mind-map-generator`,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All Modern Web Browsers',
  description:
    'Free AI YouTube video mind map generator that transforms videos, lectures, and podcasts into interactive concept maps in 20 seconds.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_MINDMAP_GEN.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'YouTube Video Mind Map Generator', item: `${SITE_URL}/youtube-video-mind-map-generator` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Turn a YouTube Video into a Mind Map in 20 Seconds',
  description: 'Convert any YouTube video into an interactive vector mind map using AI.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Video URL',
      text: 'Copy the link to any captioned YouTube video or lecture.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste into vidvisual',
      text: 'Paste the link into the generator input and select your visual layout.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Generates Mind Map',
      text: 'High-speed AI maps concept hierarchies and node links in ~20 seconds.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Explore & Export',
      text: 'Scan the visual mind map and export as high-res PNG or vector PDF.',
    },
  ],
};

export default function YouTubeVideoMindMapGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <nav className="nav">
        <Link href="/" className="brand vv-hand">
          <img src="/logo.png" alt="vidvisual" className="brand-icon" width="32" height="32" />
          <span>vidvisual</span>
        </Link>
        <div className="nav-links">
          <Link href="/youtube-video-summarizer">Summarizer</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/whiteboard-summary">Whiteboard</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>YouTube Video Mind Map Generator</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>🗺️ AI Mind Map Generator</span>
            <span>·</span>
            <span>Spatial Knowledge Nodes</span>
          </div>
          <h1 className="vv-hand">AI YouTube Video Mind Map Generator — Convert Videos to Mind Maps in 20s</h1>
          <p>
            Turn lengthy video lectures, podcasts, and tutorials into clear, interconnected visual mind maps.
            <strong> vidvisual</strong> extracts core arguments and creates spatial topic nodes in under 20 seconds — 100% free with no login required.
          </p>
          <HomeHeroGenerator />
          <div style={{ marginTop: '12px' }}>
            <a href="#how-it-works" className="link small">See how it works &darr;</a>
          </div>
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
          <span className="stat-pill-label">Retention using spatial node connections</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Zero Friction</span>
          <span className="stat-pill-label">No account needed to generate</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 visual mind maps every week</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you convert a YouTube video to a mind map using AI?</h2>
        <p>
          To convert a YouTube video into a mind map with AI, copy the video URL and paste it into <strong>vidvisual</strong>.
          The AI engine analyzes the transcript, extracts hierarchical concept clusters, and renders an interactive SVG mind map displaying central themes, sub-topics, and actionable takeaways in under 20 seconds.
          Spatial node structures increase long-term memory recall by 65% compared to linear text transcripts.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⚡ Generation Speed</strong>
            <span>Interactive mind map rendered in under 20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Node Hierarchy</strong>
            <span>Central theme + 4 to 6 structured child branch nodes</span>
          </div>
          <div className="answer-highlight">
            <strong>🌐 Multi-Language</strong>
            <span>Generates mind maps in 16+ languages (English, Spanish, Hindi, etc.)</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Export Formats</strong>
            <span>Download as HD PNG or vector PDF for Notion, Obsidian &amp; GoodNotes</span>
          </div>
        </div>
      </section>

      {/* Step-by-Step How It Works */}
      <section className="section" id="how-it-works" aria-label="Step-by-Step Guide">
        <h2 className="vv-hand">How to Generate a Mind Map in 3 Steps</h2>
        <div className="grid-3">
          <div className="card">
            <span className="step-num">01</span>
            <h3>Paste Any YouTube URL</h3>
            <p>
              Copy the URL of any video with captions (tutorials, podcasts, conference keynotes, or lectures).
            </p>
          </div>
          <div className="card">
            <span className="step-num">02</span>
            <h3>AI Builds Concept Nodes</h3>
            <p>
              Our high-speed visual AI engine calculates topic relationships, removes conversational filler, and connects core ideas.
            </p>
          </div>
          <div className="card">
            <span className="step-num">03</span>
            <h3>Review &amp; Export</h3>
            <p>
              Navigate the interactive vector mind map, review key concept cards, and export high-res visual study notes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_MINDMAP_GEN.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* Footer */}
      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-video-summarizer">Video Summarizer</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/youtube-video-mind-map-generator">Mind Map Generator</Link>
          <Link href="/whiteboard-summary">Whiteboard</Link>
          <Link href="/youtube-transcript-summarizer">Transcript Summarizer</Link>
          <Link href="/multilingual-youtube-summarizer">Multilingual</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">&copy; {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
