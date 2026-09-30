import Link from 'next/link';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Vid Visual Blog & Learning Hub — AI Video Summaries & Study Guides',
  description:
    'Read the latest guides on AI video summarization, visual note-taking, podcast compression, and exam preparation. Learn how to save 90% of your watch time.',
  keywords: [
    'vidvisual blog',
    'ai video summarization guide',
    'youtube to mind map tutorial',
    'how to summarize youtube videos',
    'study notes from youtube lectures',
    'best ai youtube summarizer 2026',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Vid Visual Blog & Learning Hub — AI Video Summaries & Study Guides',
    description:
      'Guides and strategies on AI video summarization, visual mind maps, and saving 90% of your watch time.',
    url: `${SITE_URL}/blog`,
    siteName: 'Vid Visual',
    type: 'website',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vid Visual Blog & Learning Hub',
    description: 'Guides on AI video summarization, visual notes, and podcast compression.',
    images: [`${SITE_URL}/twitter-image.jpg?v=2`],
  },
};

const ARTICLES = [
  {
    slug: 'how-to-summarize-youtube-videos-ai',
    title: 'How to Summarize Any YouTube Video with AI in 20 Seconds',
    date: 'September 2026',
    readTime: '4 min read',
    category: 'Guides & Tutorials',
    description:
      'Learn the fastest, most effective way to extract main key points from long YouTube videos, podcasts, and webinars into visual concept cards without reading walls of text.',
    emoji: '⚡',
  },
  {
    slug: 'best-ai-youtube-summarizers',
    title: 'The Best AI YouTube Video Summarizers of 2026: Visual Cards vs Plain Text',
    date: 'September 2026',
    readTime: '6 min read',
    category: 'Product Comparisons',
    description:
      'Comparing Vid Visual, ChatGPT, NoteGPT, and Glasp. Why traditional bullet-point text summaries cause reading fatigue and why spatial whiteboard cards increase retention by 65%.',
    emoji: '🧠',
  },
  {
    slug: 'youtube-lecture-to-study-notes',
    title: 'How to Turn 2-Hour College Lectures into A+ Study Notes and PDFs',
    date: 'September 2026',
    readTime: '5 min read',
    category: 'Student Study Hacks',
    description:
      'The step-by-step framework used by top university students to synthesize recorded semester lectures, STEM proofs, and slide decks into GoodNotes and Notion-ready PDFs.',
    emoji: '🎓',
  },
];

const blogIndexJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Vid Visual Blog',
  url: `${SITE_URL}/blog`,
  description: 'Articles and guides on AI video summarization, visual learning, and study workflows.',
  blogPost: ARTICLES.map((a) => ({
    '@type': 'BlogPosting',
    headline: a.title,
    url: `${SITE_URL}/blog/${a.slug}`,
    description: a.description,
    datePublished: '2026-09-30',
    author: { '@type': 'Organization', name: 'Vid Visual Team' },
  })),
};

export default function BlogIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }} />

      <nav className="nav">
        <Link href="/" className="brand vv-hand">
          <img src="/logo.png" alt="Vid Visual" className="brand-icon" width="32" height="32" />
          <span>Vid Visual</span>
        </Link>
        <div className="nav-links">
          <Link href="/youtube-video-summarizer">Summarizer</Link>
          <Link href="/#formats">Formats</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Blog &amp; Knowledge Hub</span>
      </div>

      <header className="hero" style={{ paddingBottom: '20px' }}>
        <div className="hero-copy" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>📚 Guides, Tutorials &amp; Research</span>
          </div>
          <h1 className="vv-hand" style={{ fontSize: '2.6rem' }}>Vid Visual Learning &amp; SEO Knowledge Hub</h1>
          <p style={{ margin: '0 auto 20px', maxWidth: '650px' }}>
            Actionable guides on how to learn 10x faster from long YouTube videos, podcasts, and lectures.
            Stop scrubbing timestamps and start remembering what you watch.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="grid-3">
          {ARTICLES.map((art) => (
            <div key={art.slug} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.8rem' }}>{art.emoji}</span>
                  <span className="muted small">{art.readTime}</span>
                </div>
                <span className="answer-badge" style={{ marginBottom: '10px', fontSize: '0.75rem' }}>{art.category}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '8px', marginBottom: '10px' }}>
                  <Link href={`/blog/${art.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {art.title}
                  </Link>
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.5' }}>{art.description}</p>
              </div>
              <div style={{ marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                <Link href={`/blog/${art.slug}`} className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                  Read Guide &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Try the world's fastest visual video summarizer</h2>
        <p className="section-sub">Paste any YouTube URL and get concept cards and a mind map in under 20 seconds.</p>
        <Link href="/register" className="btn btn-primary btn-lg">Start Free (3/week forever)</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/youtube-video-summarizer">Video Summarizer</Link>
          <Link href="/youtube-podcast-summarizer">Podcast Summarizer</Link>
          <Link href="/youtube-lecture-summarizer">Lecture Summaries</Link>
          <Link href="/youtube-to-pdf">YouTube to PDF</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}
