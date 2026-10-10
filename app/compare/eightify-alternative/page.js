import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Best Eightify Alternative: Free AI YouTube Summarizer & Mind Maps · vidvisual',
  description:
    'Looking for a free Eightify alternative? vidvisual summarizes long YouTube videos and podcasts into visual concept cards and mind maps. No Chrome extension required.',
  keywords: [
    'eightify alternative',
    'free eightify alternative',
    'eightify vs vidvisual',
    'eightify competitor',
    'eightify pricing alternative',
    'youtube summarizer without extension',
    'ai youtube summarizer mind map',
    'free youtube video summarizer',
  ],
  alternates: {
    canonical: `${SITE_URL}/compare/eightify-alternative`,
  },
  openGraph: {
    title: 'Best Eightify Alternative: Free AI YouTube Summarizer & Mind Maps · vidvisual',
    description:
      'No Chrome extension needed. vidvisual turns long YouTube videos into whiteboard concept cards and visual mind maps in under 20 seconds.',
    url: `${SITE_URL}/compare/eightify-alternative`,
    siteName: 'vidvisual',
    type: 'article',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Eightify Alternative: Free Visual Summaries & Mind Maps · vidvisual',
    description:
      'Stop paying for basic Chrome extension text bullets. vidvisual creates spatial concept cards and vector mind maps in 20 seconds.',
    images: [`${SITE_URL}/twitter-image.jpg?v=2`],
  },
};

const FAQ_EIGHTIFY = [
  [
    'Why is vidvisual a better alternative to Eightify?',
    'Eightify is a browser extension that quickly hits you with a paywall after just 3 trial summaries, and only produces basic text bullets with emojis. vidvisual works directly on the web (on laptop, iPad, or mobile phone) without installing browser plugins. It generates rich spatial whiteboard concept cards and connected mind maps, giving you 3 free summaries every single week forever without a credit card.',
  ],
  [
    'Do I need to install a Chrome extension to use vidvisual?',
    'No! vidvisual is 100% web-based. Simply paste any YouTube URL on our site from any browser (Chrome, Safari, Firefox, Edge, or mobile phones) and get your visual concept breakdown in ~20 seconds.',
  ],
  [
    'How does vidvisual compare on pricing?',
    'Eightify locks users out after 3 trial runs and requires a paid subscription ($4.99/mo or $39.99/yr). vidvisual offers a generous free tier of 3 visual summaries every week forever, plus affordable upgrades for power learners who need unlimited visual syntheses.',
  ],
  [
    'Can vidvisual handle multi-hour podcasts and college lectures?',
    'Yes! While Chrome extension summarizers often fail or truncate long 2-to-4 hour videos due to browser memory and token constraints, vidvisual is built to easily compress multi-hour episodes of Huberman Lab, Lex Fridman, and university semester lectures.',
  ],
  [
    'Can I export the summary for my study notes?',
    'Yes. vidvisual provides one-click export to high-resolution PNG, JPG, and vector PDF, making it seamless to paste your visual notes into Notion, GoodNotes, Obsidian, or Anki.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_EIGHTIFY.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 3, name: 'Eightify Alternative', item: `${SITE_URL}/compare/eightify-alternative` },
  ],
};

export default function EightifyAlternativePage() {
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
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/compare">Compare</Link>
        <span>&rsaquo;</span>
        <span>Eightify Alternative</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚡ #1 Free Eightify Alternative</span>
            <span>·</span>
            <span>No Extension Required</span>
          </div>
          <h1 className="vv-hand">The Free Eightify Alternative That Gives You Visual Mind Maps</h1>
          <p>
            Tired of paying for Chrome extension paywalls that only spit out bullet points?
            <strong> vidvisual</strong> works on all devices and transforms long YouTube videos into whiteboard concept cards and visual mind maps in 20 seconds.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Start Free (3/week forever)</Link>
            <a href="#matrix" className="link small">See feature comparison &darr;</a>
          </div>
          <span className="muted small">100% Free · Works on Desktop, iPad &amp; Mobile · No credit card</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Performance Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">0 Installs</span>
          <span className="stat-pill-label">No buggy Chrome extensions needed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">3 / Week</span>
          <span className="stat-pill-label">Free visual summaries forever</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">4-Hour</span>
          <span className="stat-pill-label">Long-form podcast &amp; lecture support</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Vector PDF</span>
          <span className="stat-pill-label">High-res export for GoodNotes &amp; Notion</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>Why is vidvisual the best free alternative to Eightify?</h2>
        <p>
          Unlike Eightify, which locks users behind a subscription after 3 basic trials and requires an installed Chrome extension, <strong>vidvisual</strong> is completely web-based and provides 3 free visual summaries every single week forever. Instead of plain text bullets, vidvisual produces structured whiteboard cards and interconnected vector mind maps, boosting memory recall by 65%.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>🚫 No Extension Needed</strong>
            <span>Works anywhere in your browser on phone, tablet, and PC</span>
          </div>
          <div className="answer-highlight">
            <strong>🗺️ Visual Mind Maps</strong>
            <span>Understand idea relationships visually rather than reading isolated bullets</span>
          </div>
          <div className="answer-highlight">
            <strong>💳 Truly Free Tier</strong>
            <span>3 free visual summaries every week with zero credit card required</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Vector &amp; PNG Exports</strong>
            <span>Export crisp HD notes ready for your second brain in Notion &amp; Obsidian</span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section" id="matrix" aria-label="Eightify vs vidvisual Comparison">
        <h2 className="vv-hand">Side-by-Side: Eightify vs vidvisual</h2>
        <p className="section-sub">
          Compare features, pricing, and visual output formats.
        </p>

        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>vidvisual</th>
                <th>Eightify</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Summary Structure</strong></td>
                <td><span className="check">✓</span> Spatial Concept Cards &amp; Vector Mind Maps</td>
                <td><span className="cross">&times;</span> Linear text bullet points with emojis</td>
              </tr>
              <tr>
                <td><strong>Platform Access</strong></td>
                <td><span className="check">✓</span> Universal Web (Desktop, iPad, Phone)</td>
                <td><span className="cross">&times;</span> Chrome / Safari extension only</td>
              </tr>
              <tr>
                <td><strong>Free Tier Policy</strong></td>
                <td><span className="check">✓</span> 3 free visual summaries every week forever</td>
                <td><span className="cross">&times;</span> Strict 3-summary lifetime trial</td>
              </tr>
              <tr>
                <td><strong>Long Videos (3-4 hours)</strong></td>
                <td><span className="check">✓</span> Full compression for long lectures &amp; podcasts</td>
                <td><span className="cross">&times;</span> Frequently truncates long transcripts</td>
              </tr>
              <tr>
                <td><strong>Note Taking Exports</strong></td>
                <td><span className="check">✓</span> Vector PDF &amp; HD PNG for Notion/GoodNotes</td>
                <td><span className="cross">&times;</span> Copy plain text only</td>
              </tr>
              <tr>
                <td><strong>Multi-Language Translation</strong></td>
                <td><span className="check">✓</span> 16+ languages supported natively</td>
                <td><span className="cross">&times;</span> English-first focus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_EIGHTIFY.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Ready to ditch extension paywalls?</h2>
        <p className="section-sub">Paste any YouTube URL and generate your visual whiteboard summary in 20 seconds.</p>
        <Link href="/register" className="btn btn-primary btn-lg">Start Free (3/week forever)</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/compare">All Comparisons</Link>
          <Link href="/compare/notegpt-alternative">NoteGPT Alternative</Link>
          <Link href="/youtube-video-summarizer">Video Summarizer</Link>
          <Link href="/youtube-podcast-summarizer">Podcast Summarizer</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
