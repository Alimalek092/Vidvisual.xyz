import Link from 'next/link';
import Visual from '@/components/Visual';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Best Glasp Alternative for YouTube Summaries (No Extension Needed) | vidvisual',
  description:
    'Looking for the best Glasp alternative? vidvisual turns long YouTube videos into whiteboard concept cards and visual mind maps in under 20s. 100% web-based with no Chrome extension or OpenAI login required.',
  keywords: [
    'glasp alternative',
    'best glasp alternative',
    'youtube summary with chatgpt alternative',
    'glasp vs vidvisual',
    'youtube summarizer without chrome extension',
    'free glasp alternative',
    'visual youtube summarizer',
  ],
  alternates: {
    canonical: `${SITE_URL}/compare/glasp-alternative`,
  },
  openGraph: {
    title: 'Best Glasp Alternative for YouTube Summaries (No Extension Needed)',
    description:
      'Ditch the Chrome extension. vidvisual converts YouTube videos into spatial whiteboard cards and visual mind maps in 20s on any device.',
    url: `${SITE_URL}/compare/glasp-alternative`,
    siteName: 'vidvisual',
    type: 'article',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Glasp Alternative · vidvisual',
    description:
      'Web-based YouTube summarizer that creates visual mind maps and whiteboard notes without an extension.',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
};

const FAQ_GLASP = [
  [
    'Why is vidvisual considered the best Glasp alternative?',
    'Glasp requires installing a Chrome extension, signing into an OpenAI ChatGPT account, and only generates linear text markdown bullets. vidvisual is 100% web-based (works on any device, iPhone, iPad, Mac, PC), requires zero extensions or OpenAI accounts, and outputs spatial whiteboard concept cards and an interactive vector mind map that boosts retention by 65%.',
  ],
  [
    'Do I need an OpenAI account or API key to use vidvisual?',
    'No! vidvisual includes its own high-speed visual AI engine built directly into the web platform. You never need an OpenAI account, ChatGPT Plus subscription, or API key.',
  ],
  [
    'Does vidvisual work on mobile devices and Safari?',
    'Yes! Because Glasp relies on a desktop Chrome extension, it cannot be used on standard mobile browsers or tablets. vidvisual is a responsive web application that runs directly in any browser on iPhone, Android, iPad, Mac, or Windows.',
  ],
  [
    'Is vidvisual free to use compared to Glasp?',
    'Yes! vidvisual gives every user 3 complete visual summaries every week completely free with zero credit card or account registration required.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_GLASP.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 3, name: 'Glasp Alternative', item: `${SITE_URL}/compare/glasp-alternative` },
  ],
};

const comparisonTable = [
  { feature: 'Core Output Format', vidvisual: 'Whiteboard Concept Cards & Mind Maps', glasp: 'Linear Markdown Text Bullets' },
  { feature: 'Installation Required', vidvisual: 'Zero (100% Web-Based)', glasp: 'Desktop Chrome Extension required' },
  { feature: 'OpenAI Account Needed', vidvisual: 'No (Integrated AI Engine)', glasp: 'Requires ChatGPT account/login' },
  { feature: 'Mobile / iPad Support', vidvisual: 'Full native mobile & tablet web', glasp: 'Desktop Chrome browser only' },
  { feature: 'No-Login Free Tier', vidvisual: '3 free summaries/week (Instant)', glasp: 'Requires Google/OpenAI sign-in' },
  { feature: 'Vector PDF & HD PNG Exports', vidvisual: 'High-res image & vector PDF', glasp: 'Copy text to clipboard only' },
  { feature: 'Memory Retention Boost', vidvisual: '65% higher (Dual-Coding Theory)', glasp: 'Low (linear text skimming)' },
];

export default function GlaspAlternativePage() {
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
        <span>Glasp Alternative</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚡ The #1 Glasp Alternative</span>
            <span>·</span>
            <span>No Browser Extension Required</span>
          </div>
          <h1 className="vv-hand">The Best Glasp Alternative for Visual Learners</h1>
          <p>
            Ditch browser extension hassles and OpenAI login pop-ups.
            <strong> vidvisual</strong> works in any browser, turning long YouTube videos and podcasts into spatial whiteboard concept cards and visual mind maps in 20 seconds.
          </p>
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
          <span className="stat-pill-num">0 Extensions</span>
          <span className="stat-pill-label">100% web-based on any browser</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Retention using spatial concept cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">No OpenAI Key</span>
          <span className="stat-pill-label">Instant built-in high-speed AI</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries/week with zero card needed</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>Why do users switch from Glasp to vidvisual?</h2>
        <p>
          While Glasp (YouTube Summary with ChatGPT) requires installing a desktop Chrome extension and linking your personal ChatGPT account to get text bullets, <strong>vidvisual</strong> is a completely standalone web platform.
          Users simply paste a video link on any device and receive structured whiteboard concept cards, visual diagrams, and an interactive vector mind map with zero configuration or OpenAI subscriptions.
        </p>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="section" id="matrix" aria-label="Feature Comparison Matrix">
        <h2 className="vv-hand">vidvisual vs Glasp: Side-by-Side Comparison</h2>
        <p className="section-sub">See how visual whiteboard note-taking compares to extension-based text markdown skims.</p>
        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>vidvisual</th>
                <th>Glasp (YouTube Summary)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row) => (
                <tr key={row.feature}>
                  <td><strong>{row.feature}</strong></td>
                  <td><span className="check">✓</span> {row.vidvisual}</td>
                  <td>{row.glasp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_GLASP.map(([q, a]) => (
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
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">&copy; {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
