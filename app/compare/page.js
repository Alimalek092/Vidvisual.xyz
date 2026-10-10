import Link from 'next/link';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Compare vidvisual vs NoteGPT, Eightify & ChatGPT (2026) · vidvisual',
  description:
    'Compare vidvisual with NoteGPT, Eightify, and ChatGPT. Discover why visual concept cards and vector mind maps beat walls of plain text for learning.',
  keywords: [
    'vidvisual alternatives',
    'compare youtube summarizers',
    'notegpt vs vidvisual',
    'eightify vs vidvisual',
    'best ai youtube summarizer',
    'youtube to mind map',
  ],
  alternates: {
    canonical: `${SITE_URL}/compare`,
  },
  openGraph: {
    title: 'Compare vidvisual vs NoteGPT, Eightify & ChatGPT · vidvisual',
    description:
      'Compare top AI video summarizers side-by-side. See why visual learners choose vidvisual for spatial concept cards and mind maps.',
    url: `${SITE_URL}/compare`,
    siteName: 'vidvisual',
    type: 'website',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare vidvisual vs NoteGPT, Eightify & ChatGPT · vidvisual',
    description:
      'See why visual concept cards beat text-heavy summarizers for YouTube videos.',
    images: [`${SITE_URL}/twitter-image.jpg?v=2`],
  },
};

const COMPARISONS = [
  {
    slug: 'notegpt-alternative',
    title: 'vidvisual vs NoteGPT',
    badge: 'Best NoteGPT Alternative',
    desc: 'Why reading 2,000 words of plain text bullet points causes reading fatigue, and how spatial concept cards boost retention by 65%.',
    winner: 'Concept Cards & Vector Mind Maps',
  },
  {
    slug: 'eightify-alternative',
    title: 'vidvisual vs Eightify',
    badge: 'Free Eightify Alternative',
    desc: 'Ditch the browser extension paywall. Summarize multi-hour videos and podcasts on any device with 3 free weekly summaries forever.',
    winner: 'No Browser Extension Needed',
  },
];

const compareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI Video Summarizer Tool Comparisons',
  url: `${SITE_URL}/compare`,
  description: 'In-depth comparisons between vidvisual and popular YouTube video summarizers like NoteGPT and Eightify.',
};

export default function CompareHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareJsonLd) }} />

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
        <span>Compare</span>
      </div>

      <header className="hero" style={{ paddingBottom: '20px' }}>
        <div className="hero-copy" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚖️ In-Depth Product Comparisons</span>
          </div>
          <h1 className="vv-hand" style={{ fontSize: '2.6rem' }}>How vidvisual Compares to Other AI Summarizers</h1>
          <p style={{ margin: '0 auto 20px', maxWidth: '650px' }}>
            Not all video summarizers are created equal. Discover why students, researchers, and professionals choose
            <strong> vidvisual</strong> over traditional plain-text tools.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {COMPARISONS.map((comp) => (
            <div key={comp.slug} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="answer-badge" style={{ marginBottom: '12px' }}>{comp.badge}</span>
                <h3 style={{ fontSize: '1.4rem', marginTop: '10px', marginBottom: '12px' }}>
                  <Link href={`/compare/${comp.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {comp.title}
                  </Link>
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: '1.5', marginBottom: '16px' }}>{comp.desc}</p>
                <div style={{ background: 'var(--board)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)', fontSize: '0.85rem' }}>
                  <strong>Key Advantage:</strong> {comp.winner}
                </div>
              </div>
              <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                <Link href={`/compare/${comp.slug}`} className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                  Read Full Comparison &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Try the visual difference for yourself</h2>
        <p className="section-sub">Experience why spatial concept cards and mind maps improve retention by 65%.</p>
        <Link href="/register" className="btn btn-primary btn-lg">Start Free (3/week forever)</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/compare/notegpt-alternative">NoteGPT Alternative</Link>
          <Link href="/compare/eightify-alternative">Eightify Alternative</Link>
          <Link href="/youtube-video-summarizer">Video Summarizer</Link>
          <Link href="/youtube-to-pdf">YouTube to PDF</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
