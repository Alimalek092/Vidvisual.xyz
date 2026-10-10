import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Best NoteGPT Alternative for Visual Learners (2026) · vidvisual',
  description:
    'Looking for the best NoteGPT alternative? vidvisual turns long YouTube videos into whiteboard concept cards and visual mind maps in under 20 seconds. Zero reading fatigue.',
  keywords: [
    'notegpt alternative',
    'best notegpt alternative',
    'notegpt vs vidvisual',
    'notegpt competitor',
    'free notegpt alternative',
    'visual youtube summarizer',
    'ai youtube summarizer mind map',
    'youtube video to concept cards',
  ],
  alternates: {
    canonical: `${SITE_URL}/compare/notegpt-alternative`,
  },
  openGraph: {
    title: 'Best NoteGPT Alternative for Visual Learners (2026) · vidvisual',
    description:
      'Why read walls of text? vidvisual turns long YouTube videos into whiteboard concept cards and visual mind maps in under 20 seconds.',
    url: `${SITE_URL}/compare/notegpt-alternative`,
    siteName: 'vidvisual',
    type: 'article',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NoteGPT Alternative for Visual Learners · vidvisual',
    description:
      'Stop reading walls of plain text. vidvisual converts YouTube lectures and podcasts into spatial concept cards in 20s.',
    images: [`${SITE_URL}/twitter-image.jpg?v=2`],
  },
};

const FAQ_NOTEGPT = [
  [
    'Why is vidvisual considered the best NoteGPT alternative?',
    'NoteGPT primarily outputs dense, linear text bullet points and timestamps. While useful, reading a 2,000-word bulleted summary causes severe reading fatigue. vidvisual is built specifically for visual learners: it condenses any YouTube video into spatial whiteboard concept cards and an interconnected vector mind map in under 20 seconds, boosting retention by 65%.',
  ],
  [
    'Is vidvisual free to use compared to NoteGPT?',
    'Yes! vidvisual gives every user 3 complete visual summaries every single week forever without requiring a credit card. You get full access to spatial concept cards, interactive mind maps, and high-resolution exports.',
  ],
  [
    'Can vidvisual summarize long 2-hour to 4-hour YouTube podcasts and lectures?',
    'Absolutely. vidvisual is optimized for long-form video compression. It effortlessly digests multi-hour technical podcasts (like Lex Fridman and Huberman Lab) and university lectures, extracting core theses and actionable takeaways without token errors.',
  ],
  [
    'Can I export summaries to Notion, Obsidian, or GoodNotes?',
    'Yes. vidvisual lets you export crisp HD PNGs, JPGs, and vector PDFs with a single click, perfectly sized for digital notebooks like Notion, GoodNotes, Obsidian, and Apple Notes.',
  ],
  [
    'Does vidvisual translate foreign-language videos?',
    'Yes! vidvisual supports over 16+ languages. You can paste a foreign lecture or tutorial and generate your visual summary and mind map in English, Spanish, French, German, Hindi, Japanese, and more.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_NOTEGPT.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 3, name: 'NoteGPT Alternative', item: `${SITE_URL}/compare/notegpt-alternative` },
  ],
};

export default function NoteGPTAlternativePage() {
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
        <span>NoteGPT Alternative</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚡ The #1 NoteGPT Alternative</span>
            <span>·</span>
            <span>Visual Concept Cards</span>
          </div>
          <h1 className="vv-hand">The Best NoteGPT Alternative for Visual Learners</h1>
          <p>
            Replacing a 2-hour video with a 2,000-word wall of plain text doesn't save time—it just creates reading fatigue.
            <strong> vidvisual</strong> turns YouTube videos into spatial whiteboard cards and interactive mind maps in under 20 seconds.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Try vidvisual free</Link>
            <a href="#matrix" className="link small">See feature comparison &darr;</a>
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
          <span className="stat-pill-label">Average turnaround speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Retention using spatial concept cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">16+ Langs</span>
          <span className="stat-pill-label">Instant foreign lecture translation</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries/week with zero card needed</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>Why do students &amp; professionals switch from NoteGPT to vidvisual?</h2>
        <p>
          While NoteGPT provides traditional bullet-point text summaries, <strong>vidvisual</strong> is designed around how the human brain actually retains complex information. Instead of forcing you to read long paragraphs, vidvisual breaks down videos into bite-sized concept cards with interconnected vector mind maps, saving 90% of watch time while making study reviews effortless.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>🧠 Spatial Memory</strong>
            <span>Visual cards boost long-term retention by 65% vs plain text bullets</span>
          </div>
          <div className="answer-highlight">
            <strong>⏱️ Under 60s Review</strong>
            <span>Grasp a 90-minute lecture in under 1 minute without scrubbing timestamps</span>
          </div>
          <div className="answer-highlight">
            <strong>📄 Digital Note Exports</strong>
            <span>One-click export to high-res PNG and vector PDF for Notion &amp; GoodNotes</span>
          </div>
          <div className="answer-highlight">
            <strong>🌐 Multi-Language</strong>
            <span>Translate any video into clean structured notes in 16+ languages</span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section" id="matrix" aria-label="NoteGPT vs vidvisual Comparison">
        <h2 className="vv-hand">Side-by-Side: NoteGPT vs vidvisual</h2>
        <p className="section-sub">
          See why visual spatial notes beat linear text-heavy bullet points every single time.
        </p>

        <div className="table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>vidvisual</th>
                <th>NoteGPT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Summary Format</strong></td>
                <td><span className="check">✓</span> Whiteboard Concept Cards &amp; Vector Mind Maps</td>
                <td><span className="cross">&times;</span> Plain text paragraphs &amp; linear bullets</td>
              </tr>
              <tr>
                <td><strong>Retention &amp; Recall</strong></td>
                <td><span className="check">✓</span> 65% higher recall through spatial layout</td>
                <td><span className="cross">&times;</span> Fast reading fatigue from dense text</td>
              </tr>
              <tr>
                <td><strong>Average Review Time</strong></td>
                <td><span className="check">✓</span> Under 60 seconds</td>
                <td><span className="cross">&times;</span> 8 to 12 minutes of reading</td>
              </tr>
              <tr>
                <td><strong>Multi-Language Support</strong></td>
                <td><span className="check">✓</span> 16+ languages built-in</td>
                <td><span className="cross">&times;</span> Limited translation modes</td>
              </tr>
              <tr>
                <td><strong>Visual PDF &amp; HD PNG Exports</strong></td>
                <td><span className="check">✓</span> Vector PDF + High-res PNG</td>
                <td><span className="cross">&times;</span> Raw markdown copy-paste</td>
              </tr>
              <tr>
                <td><strong>Free Tier Access</strong></td>
                <td><span className="check">✓</span> 3 free visual summaries every week forever</td>
                <td><span className="cross">&times;</span> Strict monthly limits / paywall</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_NOTEGPT.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Ready to experience visual learning?</h2>
        <p className="section-sub">Paste any YouTube video link and see your whiteboard summary in 20 seconds.</p>
        <Link href="/register" className="btn btn-primary btn-lg">Start Free (3/week forever)</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> vidvisual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/compare">All Comparisons</Link>
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
