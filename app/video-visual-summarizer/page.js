import Link from 'next/link';
import Visual from '@/components/Visual';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Video Visual Summarizer (AI) — Convert Videos to Visual Notes & Mind Maps | vidvisual',
  description:
    'Free AI video visual summarizer. Turn long YouTube videos, lectures, and podcasts into scannable whiteboard concept cards and visual mind maps in 20s. 100% free with no login required.',
  keywords: [
    'video visual summarizer',
    'youtube video visual summarizer',
    'visual video summarizer',
    'ai video visual summarizer',
    'visual youtube summarizer',
    'visual video notes ai',
    'youtube visual notes generator',
    'video to visual summary',
    'free video visual summarizer',
  ],
  alternates: {
    canonical: `${SITE_URL}/video-visual-summarizer`,
  },
  openGraph: {
    title: 'Video Visual Summarizer (AI) — Convert Videos to Visual Notes & Mind Maps',
    description:
      'Turn long YouTube videos, lectures, and podcasts into scannable whiteboard concept cards and visual mind maps in under 20s with AI.',
    url: `${SITE_URL}/video-visual-summarizer`,
    siteName: 'vidvisual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg?v=3`,
        width: 1200,
        height: 630,
        alt: 'vidvisual — AI Video Visual Summarizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Visual Summarizer (AI) — Convert Videos to Visual Notes & Mind Maps',
    description:
      'Turn long YouTube videos, lectures, and podcasts into scannable whiteboard concept cards and visual mind maps in under 20s with AI.',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
};

const FAQ_VISUAL = [
  [
    'What is an AI video visual summarizer?',
    'A video visual summarizer is an AI-powered tool that analyzes video transcripts and converts spoken information into spatial concept cards, relational node mind maps, and structured takeaways rather than dense paragraphs of plain text. Visual summaries leverage cognitive dual-coding science to boost memory retention by up to 65% while cutting watch time by 90%.',
  ],
  [
    'How do I generate a visual summary from a YouTube video for free?',
    'Paste the link of any YouTube video that has subtitles into the vidvisual generator input above. Select your preferred visual layout (Whiteboard or Infographic) and language. In under 20 seconds, your visual concept cards and interactive mind map are generated without requiring any registration or credit card.',
  ],
  [
    'How does a video visual summarizer differ from NoteGPT, Eightify, or ChatGPT?',
    'Standard tools like ChatGPT, NoteGPT, or Eightify generate linear walls of bulleted text that induce reading fatigue. vidvisual is specifically engineered as a visual-first summarizer: it turns speech into color-coded whiteboard concept cards and an interconnected vector mind map that you can absorb at a glance in under 60 seconds.',
  ],
  [
    'Can I download or export the visual summary?',
    'Yes. You can export your visual whiteboard cards and mind maps as standard JPG, watermark-free high-resolution PNG, or vector PDF documents for import into Notion, GoodNotes, Obsidian, or Apple Notes.',
  ],
  [
    'Does the video visual summarizer work on long podcasts and university lectures?',
    'Yes. vidvisual is built to compress 1-to-4-hour long-form videos (such as Huberman Lab, Lex Fridman, MIT OpenCourseWare, and Stanford lectures) into 5 to 7 high-impact visual concept cards without hitting token limits.',
  ],
];

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'vidvisual - AI Video Visual Summarizer',
  url: `${SITE_URL}/video-visual-summarizer`,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All Modern Web Browsers',
  description:
    'Free AI video visual summarizer that converts YouTube videos, podcasts, and lectures into whiteboard concept cards and visual mind maps in under 20 seconds.',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1480',
    bestRating: '5',
    worstRating: '1',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_VISUAL.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Video Visual Summarizer', item: `${SITE_URL}/video-visual-summarizer` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a Visual Video Summary with AI in 20 Seconds',
  description: 'Convert any YouTube video into visual whiteboard concept cards and mind maps using AI.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Video Link',
      text: 'Copy the URL of any captioned YouTube video, lecture, or podcast.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste into Generator',
      text: 'Paste the link into vidvisual and select Whiteboard or Infographic format.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Visual Synthesis',
      text: 'Advanced visual AI reads the transcript, discards fluff, and renders spatial concept cards in 20 seconds.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Export Visual Notes',
      text: 'Review the visual nodes and download high-resolution PNG or PDF study notes.',
    },
  ],
};

export default function VideoVisualSummarizerPage() {
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
        <span>Video Visual Summarizer</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>🧠 #1 Video Visual Summarizer</span>
            <span>·</span>
            <span>Spatial Knowledge Maps</span>
          </div>
          <h1 className="vv-hand">AI Video Visual Summarizer: Turn Videos into Visual Notes in 20s</h1>
          <p>
            Stop drowning in 2,000-word walls of plain text.
            <strong> vidvisual</strong> is the dedicated video visual summarizer that converts YouTube videos, university lectures, and podcasts into scannable whiteboard concept cards and relational mind maps.
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
      <section className="stats-strip" aria-label="Visual Summarizer Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">To distill any 2-hour video</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Memory recall using spatial concept cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Zero Login</span>
          <span className="stat-pill-label">Summarize right away with no barriers</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 visual summaries every week</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>What is a video visual summarizer?</h2>
        <p>
          A <strong>video visual summarizer</strong> is an AI-powered tool that analyzes video transcripts and arranges spoken knowledge into spatial whiteboard cards, visual diagrams, and connected mind maps rather than plain linear text.
          By combining semantic concept extraction with spatial layout (cognitive dual-coding theory), visual summarizers allow learners to absorb 90 minutes of video content in under 60 seconds with 65% higher long-term retention.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>🎨 Spatial Layout</strong>
            <span>Color-coded concept cards and interconnected node maps</span>
          </div>
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates complete visual summary in under 20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Dual-Coding Science</strong>
            <span>Visual diagrams boost memory retention by up to 65%</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Vector Exports</strong>
            <span>Save as high-res PNG or vector PDF for Notion &amp; GoodNotes</span>
          </div>
        </div>
      </section>

      {/* Comparison: Visual vs Text-Only */}
      <section className="section" id="comparison" aria-label="Visual vs Text Comparison">
        <h2 className="vv-hand">Why Visual Summaries Beat Text-Only Summarizers</h2>
        <p className="section-sub">
          Replacing a 2-hour video with a 2,000-word wall of plain text doesn't save time—it just creates reading fatigue.
        </p>
        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>vidvisual (Visual)</th>
                <th>ChatGPT / Plain Text</th>
                <th>NoteGPT / Eightify</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Summary Format</strong></td>
                <td><span className="check">✓</span> Spatial Whiteboard &amp; Mind Maps</td>
                <td><span className="cross">&times;</span> Linear text paragraphs</td>
                <td><span className="cross">&times;</span> Dense bullet lists</td>
              </tr>
              <tr>
                <td><strong>Review Time</strong></td>
                <td><span className="check">✓</span> Under 60 seconds</td>
                <td><span className="cross">&times;</span> 8 to 15 minutes of reading</td>
                <td><span className="cross">&times;</span> 5 to 10 minutes of reading</td>
              </tr>
              <tr>
                <td><strong>Memory Retention</strong></td>
                <td><span className="check">✓</span> 65% higher (Dual Coding)</td>
                <td><span className="cross">&times;</span> Low retention after 24h</td>
                <td><span className="cross">&times;</span> Low retention</td>
              </tr>
              <tr>
                <td><strong>No-Login Free Use</strong></td>
                <td><span className="check">✓</span> 3 free summaries / week instant</td>
                <td><span className="cross">&times;</span> Account login required</td>
                <td><span className="cross">&times;</span> Friction on free tiers</td>
              </tr>
              <tr>
                <td><strong>Tablet &amp; PDF Exports</strong></td>
                <td><span className="check">✓</span> Vector PDF &amp; HD PNG</td>
                <td><span className="cross">&times;</span> Markdown copy only</td>
                <td><span className="cross">&times;</span> Plain text export</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step-by-Step How It Works */}
      <section className="section" id="how-it-works" aria-label="Step-by-Step Guide">
        <h2 className="vv-hand">How to Use the Video Visual Summarizer in 3 Steps</h2>
        <div className="grid-3">
          <div className="card">
            <span className="step-num">01</span>
            <h3>Paste Any YouTube URL</h3>
            <p>
              Copy the URL of any captioned video (podcasts, lectures, tutorials, interviews) and paste it into the generator.
            </p>
          </div>
          <div className="card">
            <span className="step-num">02</span>
            <h3>AI Extracts Core Visual Nodes</h3>
            <p>
              Our high-speed visual AI engine reads the full transcript, filters out conversational filler and ads, and organizes core concepts.
            </p>
          </div>
          <div className="card">
            <span className="step-num">03</span>
            <h3>Absorb in Under 60 Seconds</h3>
            <p>
              Review the visual concept cards, explore the interconnected mind map, and export high-resolution study notes directly into your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_VISUAL.map(([q, a]) => (
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
          <Link href="/youtube-transcript-summarizer">Transcript Summarizer</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <Link href="/whiteboard-summary">Whiteboard</Link>
          <Link href="/video-to-infographic">Infographics</Link>
          <Link href="/multilingual-youtube-summarizer">Multilingual</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">&copy; {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
