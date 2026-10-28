import Link from 'next/link';
import Visual from '@/components/Visual';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Best Summarize.tech Alternative for Long Video Visual Summaries | vidvisual',
  description:
    'Looking for the best summarize.tech alternative? vidvisual turns long YouTube videos and multi-hour podcasts into whiteboard concept cards and visual mind maps in under 20s. 100% free with no login required.',
  keywords: [
    'summarize tech alternative',
    'summarize.tech alternative',
    'summarize tech vs vidvisual',
    'best summarize tech alternatives',
    'ai video summarizer long videos',
    'podcast visual summarizer',
  ],
  alternates: {
    canonical: `${SITE_URL}/compare/summarize-tech-alternative`,
  },
  openGraph: {
    title: 'Best Summarize.tech Alternative for Long Video Visual Summaries',
    description:
      'Why read walls of timestamps? vidvisual converts multi-hour YouTube podcasts and lectures into spatial whiteboard concept cards in 20s.',
    url: `${SITE_URL}/compare/summarize-tech-alternative`,
    siteName: 'vidvisual',
    type: 'article',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Summarize.tech Alternative · vidvisual',
    description:
      'Convert 2-to-4-hour YouTube podcasts into spatial whiteboard concept cards and mind maps in 20s.',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
};

const FAQ_SUMMARIZETECH = [
  [
    'Why is vidvisual considered the best summarize.tech alternative?',
    'summarize.tech generates long, linear text breakdowns grouped strictly by 5-minute intervals. While useful, reading through 20 blocks of text still requires considerable time. vidvisual synthesizes the entire video into a conceptual hierarchy: spatial whiteboard cards for core topics and an interconnected vector mind map in 20 seconds.',
  ],
  [
    'Does vidvisual handle 2-hour to 4-hour podcasts like summarize.tech?',
    'Yes! vidvisual is engineered specifically for long-form content. Paste any 3-to-4-hour podcast (Huberman Lab, Lex Fridman, Joe Rogan) or multi-hour university lecture, and vidvisual extracts the central thesis and actionable protocols without token limits.',
  ],
  [
    'Is vidvisual free to use?',
    'Yes! vidvisual provides 3 complete visual summaries every week completely free with zero credit card or registration required.',
  ],
  [
    'Can I download visual notes as PDF or HD images?',
    'Yes! You can export your visual summaries as high-resolution PNG or vector PDF documents for import into Notion, Obsidian, and GoodNotes.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SUMMARIZETECH.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Compare', item: `${SITE_URL}/compare` },
    { '@type': 'ListItem', position: 3, name: 'Summarize.tech Alternative', item: `${SITE_URL}/compare/summarize-tech-alternative` },
  ],
};

const comparisonTable = [
  { feature: 'Core Output Format', vidvisual: 'Whiteboard Concept Cards & Mind Maps', summarizetech: 'Linear 5-Minute Text Blocks' },
  { feature: 'Turnaround Speed', vidvisual: 'Sub-20 seconds', summarizetech: '30 to 60 seconds' },
  { feature: 'Memory Retention', vidvisual: '65% higher (Dual-Coding Theory)', summarizetech: 'Standard text retention' },
  { feature: 'No-Login Free Use', vidvisual: '3 free visual summaries/week', summarizetech: 'Free daily limits' },
  { feature: 'Vector PDF & HD PNG Exports', vidvisual: 'High-res image & vector PDF', summarizetech: 'Plain text only' },
  { feature: 'Multi-Language Translation', vidvisual: '16+ global languages', summarizetech: 'Original language primarily' },
];

export default function SummarizeTechAlternativePage() {
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
          <Link href="/free-youtube-summarizer-no-login">Free No Login</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/youtube-video-mind-map-generator">Mind Maps</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/compare">Compare</Link>
        <span>&rsaquo;</span>
        <span>Summarize.tech Alternative</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚡ The #1 Summarize.tech Alternative</span>
            <span>·</span>
            <span>Visual Concept Cards</span>
          </div>
          <h1 className="vv-hand">The Best Summarize.tech Alternative for Visual Learners</h1>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.45', color: 'var(--ink-soft)', margin: '0 0 18px', maxWidth: '520px' }}>Replace disjointed 5-minute timestamp snippets with a unified conceptual whiteboard model in 20 seconds.</p>
          <HomeHeroGenerator />
          <div style={{ marginTop: '12px' }}>
            <a href="#matrix" className="link small">See feature comparison &darr;</a>
          </div>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Performance Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average turnaround speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Retention using spatial concept cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">4-Hour Videos</span>
          <span className="stat-pill-label">Effortless long-form compression</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries/week with zero card needed</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>Why do podcast listeners choose vidvisual over summarize.tech?</h2>
        <p>
          While summarize.tech splits a video into linear timestamp blocks, <strong>vidvisual</strong> creates a synthesized conceptual mental model.
          It arranges the core arguments into spatial whiteboard cards with an interconnected vector mind map that can be absorbed in under 60 seconds with 65% higher recall.
        </p>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="section" id="matrix" aria-label="Feature Comparison Matrix">
        <h2 className="vv-hand">vidvisual vs Summarize.tech: Side-by-Side Comparison</h2>
        <p className="section-sub">See how spatial visual summaries compare to timestamped text blocks.</p>
        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>vidvisual</th>
                <th>summarize.tech</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row) => (
                <tr key={row.feature}>
                  <td><strong>{row.feature}</strong></td>
                  <td><span className="check">✓</span> {row.vidvisual}</td>
                  <td>{row.summarizetech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_SUMMARIZETECH.map(([q, a]) => (
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
          <Link href="/free-youtube-summarizer-no-login">Free No Login</Link>
          <Link href="/video-visual-summarizer">Visual Summarizer</Link>
          <Link href="/compare/notegpt-alternative">NoteGPT Alternative</Link>
          <Link href="/compare/eightify-alternative">Eightify Alternative</Link>
          <Link href="/compare/glasp-alternative">Glasp Alternative</Link>
          <Link href="/compare/summarize-tech-alternative">Summarize.tech Alternative</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">&copy; {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
