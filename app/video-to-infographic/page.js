import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube Video to Infographic Generator (AI) — Visual Video Summaries | Vid Visual',
  description:
    'Convert any YouTube video into an aesthetic, high-resolution infographic summary in 20 seconds using AI. Perfect for visual learners, executive briefings, and team sharing. Free to start.',
  keywords: [
    'video to infographic',
    'youtube to infographic',
    'convert youtube video to infographic',
    'ai infographic generator from video',
    'visual video summary',
    'one page video summary',
    'video summary infographic',
    'turn video into infographic',
    'free youtube infographic maker',
  ],
  alternates: {
    canonical: `${SITE_URL}/video-to-infographic`,
  },
  openGraph: {
    title: 'YouTube Video to Infographic Generator (AI) — Visual Video Summaries',
    description:
      'Convert any YouTube video into an aesthetic, high-resolution infographic summary in 20 seconds using AI. Free to start.',
    url: `${SITE_URL}/video-to-infographic`,
    siteName: 'Vid Visual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vid Visual — YouTube Video to Infographic Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Video to Infographic Generator (AI) — Visual Video Summaries',
    description:
      'Convert any YouTube video into an aesthetic, high-resolution infographic summary in 20 seconds using AI.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const FAQ_INFOGRAPHIC = [
  [
    'How does Vid Visual convert a YouTube video into an infographic?',
    'Paste the YouTube link into Vid Visual and select the Infographic format. Our AI reads the entire video transcript, extracts the core theme and high-yield takeaways, and structures them into a clean, colorful one-page infographic in about 20 seconds.',
  ],
  [
    'Why are infographics better than standard text summaries?',
    'Infographics synthesize complex arguments into spatial visual clusters. They allow you to grasp the complete narrative and core insights in a 30-second glance, making them ideal for quick team sharing and executive briefs.',
  ],
  [
    'Can I customize the color themes of my infographic?',
    'Yes! Unlimited accounts can choose between vibrant visual palettes including Ocean Blue, Forest Green, Sunset Amber, and Slate Dark mode.',
  ],
  [
    'What formats can I export the infographic in?',
    'You can export your infographics as high-resolution JPGs, watermark-free HD PNGs, or crisp vector PDFs suitable for slide decks, presentations, and printouts.',
  ],
  [
    'Is the YouTube to infographic generator free?',
    'Yes. You get 3 free visual summaries and infographics every week forever, with no credit card required.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_INFOGRAPHIC.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Video to Infographic', item: `${SITE_URL}/video-to-infographic` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert a YouTube Video into an Infographic in 20 Seconds',
  description: 'Turn any YouTube video into an aesthetic visual infographic summary using AI.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Video Link',
      text: 'Copy the URL of any YouTube video with captions.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select Infographic Format',
      text: 'Paste the link into Vid Visual and select the Infographic layout option.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Renders Infographic',
      text: 'Our AI extracts key insights and renders a high-definition infographic in 20 seconds.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Download & Share',
      text: 'Export as high-resolution PNG or PDF to share on Slack, LinkedIn, or in team presentations.',
    },
  ],
};

export default function VideoToInfographicPage() {
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
        <span>Video to Infographic Generator</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--violet, #8b5cf6)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--violet, #8b5cf6)' }}>
            <span>🎨 Visual Infographic Engine</span>
            <span>·</span>
            <span>One-Page Summaries</span>
          </div>
          <h1 className="vv-hand">Convert YouTube Videos into Aesthetic Infographics in 20 Seconds</h1>
          <p>
            Turn long, messy video transcripts into a single, beautifully structured infographic one-pager.
            Vid Visual extracts the core concepts, visual node maps, and key takeaway bullets so you can
            review an entire video in 30 seconds or share it directly with your team.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Generate Infographic Free</Link>
            <a href="#how" className="link small">See how it works &darr;</a>
          </div>
          <span className="muted small">Free: 3 infographics/week · No credit card required</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="infographic" theme="ocean" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Infographic Generator Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average infographic generation time</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">30 Sec</span>
          <span className="stat-pill-label">Review time for an entire 1-hour video</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">HD PNG &amp; PDF</span>
          <span className="stat-pill-label">Presentation-ready export formats</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">4.9 / 5.0</span>
          <span className="stat-pill-label">Rated by marketers &amp; visual learners</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you turn a YouTube video into an infographic?</h2>
        <p>
          To convert a YouTube video into an infographic, paste any video URL into <strong>Vid Visual</strong> and select the Infographic layout.
          The AI engine analyzes the video captions, isolates key takeaways, and renders a consolidated vector knowledge map with bulleted takeaways in about 20 seconds.
          Infographics simplify complex topics for slide presentations, executive summaries, and visual study.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates complete visual infographic in ~20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>📊 Layout</strong>
            <span>Consolidated knowledge map + Actionable takeaways</span>
          </div>
          <div className="answer-highlight">
            <strong>📤 Sharing</strong>
            <span>Export to PNG or PDF for Slack, Notion, and slides</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section">
        <h2 className="vv-hand">Why Teams &amp; Visual Learners Choose Infographics</h2>
        <p className="section-lead">Replace lengthy text summaries with one-page visual cards everyone loves to read.</p>
        <div className="card-grid">
          <div className="info-card accent-blue">
            <span className="card-emoji">📊</span>
            <h3>One-Page Executive Briefs</h3>
            <p>Share a 1-page visual summary with colleagues instead of asking them to sit through an hour-long recording.</p>
          </div>
          <div className="info-card accent-green">
            <span className="card-emoji">🎨</span>
            <h3>Custom Aesthetic Themes</h3>
            <p>Export your infographic in curated color themes (Ocean Blue, Forest Green, Sunset, and Dark Slate).</p>
          </div>
          <div className="info-card accent-violet">
            <span className="card-emoji">🚀</span>
            <h3>Slide-Deck Ready</h3>
            <p>Export high-res vector PDFs and HD PNGs that drop seamlessly into pitch decks and team presentations.</p>
          </div>
          <div className="info-card accent-amber">
            <span className="card-emoji">🧠</span>
            <h3>Instant 30-Second Scans</h3>
            <p>Refresh your memory on an entire video in 30 seconds before important meetings or exams.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section how">
        <h2 className="vv-hand">Generate an Infographic in 4 Simple Steps</h2>
        <div className="steps-detailed">
          <div className="step-detailed">
            <div className="step-num vv-hand">1</div>
            <div>
              <h3>Copy any YouTube link</h3>
              <p>Grab the URL of any video with captions on YouTube.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">2</div>
            <div>
              <h3>Paste into Vid Visual</h3>
              <p>Paste the link into the generator box and select Infographic format.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">3</div>
            <div>
              <h3>AI builds your infographic</h3>
              <p>Gemini 2.5 Flash distills main points and renders a clean visual map in 20 seconds.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">4</div>
            <div>
              <h3>Download and share</h3>
              <p>Export as high-res PNG or PDF to share with colleagues or save to your library.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_INFOGRAPHIC.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Turn videos into beautiful infographics today</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Generate Free Infographic</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-podcast-summarizer">Podcasts</Link>
          <Link href="/youtube-lecture-summarizer">Lectures</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}
