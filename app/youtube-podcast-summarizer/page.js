import Link from 'next/link';
import Visual from '@/components/Visual';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'YouTube Podcast Summarizer (AI) — Turn Long Podcasts into Visual Notes | Vid Visual',
  description:
    'Turn long YouTube podcasts and multi-hour conversations into scannable whiteboard notes and visual mind maps in 20 seconds. Save 90% of listening time. Free AI podcast summarizer for Huberman Lab, Lex Fridman, Joe Rogan, and All-In.',
  keywords: [
    'youtube podcast summarizer',
    'summarize youtube podcast',
    'podcast to mind map',
    'summarize long podcast',
    'huberman lab podcast notes',
    'lex fridman podcast summary',
    'ai podcast summarizer',
    'turn podcast into visual notes',
    'podcast key points extractor',
    'free podcast summarizer ai',
    'youtube video to podcast notes',
  ],
  alternates: {
    canonical: `${SITE_URL}/youtube-podcast-summarizer`,
  },
  openGraph: {
    title: 'YouTube Podcast Summarizer (AI) — Turn Long Podcasts into Visual Notes',
    description:
      'Turn long YouTube podcasts into scannable whiteboard notes and visual mind maps in 20 seconds. Save 90% of listening time.',
    url: `${SITE_URL}/youtube-podcast-summarizer`,
    siteName: 'Vid Visual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Vid Visual — AI YouTube Podcast Summarizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Podcast Summarizer (AI) — Turn Long Podcasts into Visual Notes',
    description:
      'Turn long YouTube podcasts into scannable whiteboard notes and visual mind maps in 20 seconds. Save 90% of listening time.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const FAQ_PODCAST = [
  [
    'How does Vid Visual summarize a 3-hour or 4-hour YouTube podcast?',
    'Paste the link of any captioned YouTube podcast. Vid Visual’s AI reads the entire transcript, filters out conversational banter and ad reads, and extracts the core hypotheses, debate points, protocols, and takeaways into a spatial whiteboard note with an interconnected mind map in about 20 seconds.',
  ],
  [
    'Does it work with popular podcasts like Huberman Lab, Lex Fridman, or Joe Rogan?',
    'Yes! Vid Visual is battle-tested on long, dense podcast episodes ranging from 60 minutes to over 4 hours. It identifies the scientific mechanisms, guest arguments, and actionable protocols without requiring you to scrub through audio timestamps.',
  ],
  [
    'How much listening time do I actually save?',
    'You save between 90% and 95% of total watch time. Instead of spending 180 to 240 minutes listening at normal speed (or struggling to comprehend 2.5x sped-up audio), you can visually absorb the entire structure and main key points in 1 to 2 minutes.',
  ],
  [
    'Is the YouTube podcast summarizer free to use?',
    'Yes, Vid Visual offers a completely free tier giving you 3 visual summaries every week forever, with no credit card required. Upgrade anytime for higher limits and watermark-free exports.',
  ],
  [
    'Can I download or share the podcast visual notes?',
    'Yes. You can export your visual podcast notes as high-resolution JPGs, HD PNGs, or vector PDFs to share with your team, save to your second brain in Notion or Obsidian, or review on your phone.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_PODCAST.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Podcast Summarizer', item: `${SITE_URL}/youtube-podcast-summarizer` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Turn a 4-Hour YouTube Podcast into Visual Notes in 20 Seconds',
  description: 'Convert long-form YouTube podcasts into structured whiteboard concept cards and visual mind maps with AI.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Podcast Link',
      text: 'Copy the URL of any YouTube podcast episode that has captions or subtitles turned on.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste into Vid Visual',
      text: 'Paste the link into Vid Visual and select the Whiteboard or Infographic visual layout.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Compresses Long-Form Audio',
      text: 'Our AI filters out conversational filler and extracts key points, concept cards, and an interactive mind map in 20 seconds.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Download & Retain',
      text: 'Save the podcast summary to your private library or download it as high-res PNG or PDF.',
    },
  ],
};

export default function YouTubePodcastSummarizerPage() {
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
        <span>YouTube Podcast Summarizer</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>🎙️ Long-Form Podcast Engine</span>
            <span>·</span>
            <span>20s Compression</span>
          </div>
          <h1 className="vv-hand">Turn Long Podcasts into Beautiful Visual Notes in 20 Seconds</h1>
          <p>
            Stop wasting entire afternoons scrubbing through 3-hour podcasts. Vid Visual reads the transcript,
            cuts through the conversational noise, and extracts the core hypotheses, actionable advice, and
            conceptual connections into an understandable whiteboard visual you will actually remember.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Summarize a podcast free</Link>
            <a href="#comparison" className="link small">See time savings &darr;</a>
          </div>
          <span className="muted small">Free: 3 podcast summaries every week · No credit card required</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Podcast Summarizer Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">~20 Sec</span>
          <span className="stat-pill-label">Average generation speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">90% Saved</span>
          <span className="stat-pill-label">Listening time saved per 3-hour episode</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Recall with spatial concept cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries/week with zero card needed</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you summarize long YouTube podcasts with AI?</h2>
        <p>
          To summarize long YouTube podcasts, paste the video link into <strong>Vid Visual</strong>.
          The AI engine analyzes the video captions, isolates the central discussion topics, filters out host chit-chat and sponsor ads,
          and renders spatial concept cards alongside an interactive node-link mind map in about 20 seconds.
          Visual spatial summaries enhance long-term memory retention by up to 65% compared to linear audio listening.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates in ~20 seconds for 1-4 hour episodes</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Output</strong>
            <span>Interactive whiteboard cards + visual mind map</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Exports</strong>
            <span>High-res JPG, HD PNG, and vector PDF</span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="section">
        <h2 className="vv-hand">Vid Visual vs. Traditional Podcast Listening</h2>
        <p className="section-lead">
          Why busy professionals, researchers, and students use visual summaries instead of listening to 4-hour audio at 2x speed.
        </p>
        <div className="comparison-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Method</th>
                <th className="highlight-col">Vid Visual AI</th>
                <th>Listening at 2x Speed</th>
                <th>Reading Full Transcript</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Time Investment</strong></td>
                <td className="highlight-col">Under 60 seconds</td>
                <td>90 – 120 minutes</td>
                <td>30 – 45 minutes</td>
              </tr>
              <tr>
                <td><strong>Format</strong></td>
                <td className="highlight-col">Whiteboard concept cards + Mind map</td>
                <td>Continuous audio stream</td>
                <td>Linear wall of raw text</td>
              </tr>
              <tr>
                <td><strong>Actionable Recall</strong></td>
                <td className="highlight-col">High (Instant visual reference)</td>
                <td>Low (Passive audio fade)</td>
                <td>Medium (Mental exhaustion)</td>
              </tr>
              <tr>
                <td><strong>Ad &amp; Banter Filtering</strong></td>
                <td className="highlight-col">100% automated distillation</td>
                <td>Manual scrubbing required</td>
                <td>Must skim past pages</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section">
        <h2 className="vv-hand">Popular Podcasts People Summarize on Vid Visual</h2>
        <p className="section-lead">Compress the most influential long-form thinkers and experts into scannable notes in seconds.</p>
        <div className="card-grid">
          <div className="info-card accent-blue">
            <span className="card-emoji">🧬</span>
            <h3>Huberman Lab Protocols</h3>
            <p>Extract specific sleep protocols, supplement dosages, and dopamine optimization habits without 3 hours of clinical preamble.</p>
          </div>
          <div className="info-card accent-green">
            <span className="card-emoji">🤖</span>
            <h3>Lex Fridman AI &amp; Tech</h3>
            <p>Understand complex discussions on transformer architectures, robotics, and physics with clear concept branches.</p>
          </div>
          <div className="info-card accent-amber">
            <span className="card-emoji">📈</span>
            <h3>All-In &amp; Business Strategy</h3>
            <p>Get the macro market theses, venture capital breakdowns, and geopolitical points in a single 1-minute visual briefing.</p>
          </div>
          <div className="info-card accent-violet">
            <span className="card-emoji">📚</span>
            <h3>Tim Ferriss &amp; High Performance</h3>
            <p>Distill high-performer routines, book recommendations, and decision frameworks into your personal digital library.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section how">
        <h2 className="vv-hand">How to Summarize Any Podcast in 4 Steps</h2>
        <div className="steps-detailed">
          <div className="step-detailed">
            <div className="step-num vv-hand">1</div>
            <div>
              <h3>Copy any YouTube podcast URL</h3>
              <p>Find any long-form podcast or interview on YouTube and copy its link.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">2</div>
            <div>
              <h3>Paste into Vid Visual</h3>
              <p>Paste the URL into our generator box and pick Whiteboard or Infographic format.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">3</div>
            <div>
              <h3>AI maps the key insights in 20s</h3>
              <p>Our AI reads the captions, discards small talk, and maps key concepts into spatial visual cards.</p>
            </div>
          </div>
          <div className="step-detailed">
            <div className="step-num vv-hand">4</div>
            <div>
              <h3>Study, export, and retain</h3>
              <p>Save to your private library, or export as JPG, HD PNG, or vector PDF with one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_PODCAST.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* CTA */}
      <section className="section final">
        <h2 className="vv-hand">Ready to turn long podcasts into 20-second visual notes?</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Start Summarizing Free</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <Link href="/youtube-lecture-summarizer">Lecture Summaries</Link>
          <Link href="/video-to-infographic">Infographics</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}
