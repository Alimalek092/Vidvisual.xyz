import Link from 'next/link';
import Visual from '@/components/Visual';
import HomeHeroGenerator from '@/components/HomeHeroGenerator';
import { SAMPLE } from '@/lib/sample';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'Multilingual YouTube Summarizer (AI) — Translate Videos into Visual Notes',
  description:
    'Free multilingual AI YouTube video summarizer. Translate and convert videos in Spanish, Hindi, French, German, Japanese, and 16+ languages into visual whiteboard notes and mind maps in 20s.',
  keywords: [
    'multilingual youtube summarizer',
    'translate youtube video into notes',
    'summarize foreign youtube video',
    'youtube summarizer spanish',
    'youtube summarizer hindi',
    'youtube summarizer french',
    'youtube summarizer german',
    'translate youtube transcript to visual notes',
    'ai video translation notes',
    'free multilingual video summarizer',
  ],
  alternates: {
    canonical: `${SITE_URL}/multilingual-youtube-summarizer`,
  },
  openGraph: {
    title: 'Multilingual YouTube Summarizer (AI) — Translate Videos into Visual Notes',
    description:
      'Translate and convert YouTube videos in Spanish, Hindi, French, German, Japanese, and 16+ languages into visual whiteboard notes and mind maps in under 20s.',
    url: `${SITE_URL}/multilingual-youtube-summarizer`,
    siteName: 'vidvisual',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg?v=3`,
        width: 1200,
        height: 630,
        alt: 'vidvisual — Multilingual YouTube Summarizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multilingual YouTube Summarizer (AI) — Translate Videos into Visual Notes',
    description:
      'Translate and convert YouTube videos in Spanish, Hindi, French, German, Japanese, and 16+ languages into visual whiteboard notes in 20s.',
    images: [`${SITE_URL}/og-image.jpg?v=3`],
  },
};

const FAQ_MULTILINGUAL = [
  [
    'How do I summarize a foreign language YouTube video in my native language?',
    'Paste the link of any YouTube video that has subtitles into vidvisual, select your desired target language from the language dropdown (such as English, Spanish, Hindi, French, German, Japanese, etc.), and click generate. Our AI reads the source transcript, translates the core semantics, and renders visual concept cards in your chosen language in under 20 seconds.',
  ],
  [
    'Which languages are supported by vidvisual?',
    'vidvisual supports 16+ major global languages including English, Spanish (Español), French (Français), German (Deutsch), Hindi (हिन्दी), Japanese (日本語), Korean (한국어), Chinese (中文), Portuguese (Português), Arabic (العربية), Italian (Italiano), and Russian (Русский). You can also select "Auto" to summarize in the video’s original language.',
  ],
  [
    'Does vidvisual work if the video only has auto-generated YouTube captions?',
    'Yes! vidvisual connects directly with YouTube’s native caption stream, meaning it works seamlessly with both professional creator-uploaded subtitles and automated speech-recognition captions in any supported language.',
  ],
  [
    'Can I translate an English podcast into Spanish or Hindi study notes?',
    'Absolutely. Simply paste the English podcast URL (such as Huberman Lab or Lex Fridman), select Spanish or Hindi in the language selector, and vidvisual will translate the insights into structured whiteboard concept cards and an interconnected mind map.',
  ],
  [
    'Is the multilingual summarizer free to use?',
    'Yes. You get 3 complete visual summaries every week completely free with no credit card or account registration required. Paid plans unlock higher limits up to 200 summaries per week and watermark-free vector PDF exports.',
  ],
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_MULTILINGUAL.map(([q, a]) => ({
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
    { '@type': 'ListItem', position: 2, name: 'Multilingual YouTube Summarizer', item: `${SITE_URL}/multilingual-youtube-summarizer` },
  ],
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Summarize and Translate Any YouTube Video in 20 Seconds',
  description: 'Convert and translate foreign YouTube videos into visual whiteboard concept cards and mind maps.',
  totalTime: 'PT20S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy Video Link',
      text: 'Copy the URL of any captioned YouTube video or podcast in any language.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select Language & Format',
      text: 'Paste the link into vidvisual, choose your desired summary language (English, Spanish, Hindi, French, German, etc.), and choose Whiteboard or Infographic.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'AI Translation & Synthesis',
      text: 'High-speed visual AI parses the transcript, removes conversational filler, and translates core concepts into structured visual cards.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Export Visual Notes',
      text: 'Review the translated concept cards and download high-resolution PNG or PDF study notes for your second brain.',
    },
  ],
};

const SUPPORTED_LANGS = [
  { flag: '🇺🇸', name: 'English', native: 'English' },
  { flag: '🇪🇸', name: 'Spanish', native: 'Español' },
  { flag: '🇮🇳', name: 'Hindi', native: 'हिन्दी' },
  { flag: '🇫🇷', name: 'French', native: 'Français' },
  { flag: '🇩🇪', name: 'German', native: 'Deutsch' },
  { flag: '🇯🇵', name: 'Japanese', native: '日本語' },
  { flag: '🇰🇷', name: 'Korean', native: '한국어' },
  { flag: '🇨🇳', name: 'Chinese', native: '中文' },
  { flag: '🇵🇹', name: 'Portuguese', native: 'Português' },
  { flag: '🇸🇦', name: 'Arabic', native: 'العربية' },
  { flag: '🇮🇹', name: 'Italian', native: 'Italiano' },
  { flag: '🇷🇺', name: 'Russian', native: 'Русский' },
];

export default function MultilingualYouTubeSummarizerPage() {
  return (
    <>
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
          <Link href="/youtube-to-notes">Study Notes</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <span>Multilingual YouTube Summarizer</span>
      </div>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>🌐 16+ Global Languages</span>
            <span>·</span>
            <span>Instant Video Translation</span>
          </div>
          <h1 className="vv-hand">Summarize &amp; Translate Any YouTube Video into Visual Notes in 20s</h1>
          <p>
            Learn from international creators without language barriers.
            <strong> vidvisual</strong> translates and distills YouTube videos in Spanish, Hindi, French, German, Japanese, and 16+ languages into scannable whiteboard concept cards and visual mind maps.
          </p>
          <HomeHeroGenerator />
          <div style={{ marginTop: '12px' }}>
            <a href="#supported-languages" className="link small">Explore supported languages &darr;</a>
          </div>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Stats Strip */}
      <section className="stats-strip" aria-label="Multilingual Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">16+ Languages</span>
          <span className="stat-pill-label">Native translation &amp; visual synthesis</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average translation &amp; card generation speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">Zero Login</span>
          <span className="stat-pill-label">Summarize right away with no friction</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 visual summaries every week</span>
        </div>
      </section>

      {/* AEO: Direct Answer Block */}
      <section className="answer-box" aria-label="AI Answer Overview">
        <span className="answer-badge">AI Answer Overview</span>
        <h2>How do you summarize a foreign YouTube video in another language?</h2>
        <p>
          To summarize a foreign language YouTube video, copy the video link and paste it into <strong>vidvisual</strong>.
          Select your target language (e.g., English, Spanish, Hindi, French, or Japanese) from the language selector.
          The AI engine analyzes the video captions, performs semantic cross-lingual translation, and organizes the central thesis,
          key arguments, and actionable takeaways into structured whiteboard cards and a relational mind map in under 20 seconds.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>🌐 Cross-Lingual</strong>
            <span>Summarize Spanish or Japanese videos directly into English notes</span>
          </div>
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Complete translation and visual cards generated in under 20s</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Spatial Memory</strong>
            <span>Visual node maps increase information recall by 65%</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Exports</strong>
            <span>Save notes as HD PNG or vector PDF for Notion, GoodNotes &amp; Obsidian</span>
          </div>
        </div>
      </section>

      {/* Supported Languages Grid */}
      <section className="section" id="supported-languages" aria-label="Supported Languages">
        <h2 className="vv-hand">Supported Global Languages</h2>
        <p className="section-sub">
          Summarize any video into your native tongue, or maintain the creator&apos;s original language.
        </p>
        <div className="grid-3" style={{ marginTop: '24px' }}>
          {SUPPORTED_LANGS.map((lang) => (
            <div key={lang.name} className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px' }}>
              <span style={{ fontSize: '2rem' }}>{lang.flag}</span>
              <div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--ink)' }}>{lang.name}</strong>
                <span className="muted small">{lang.native}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step How It Works */}
      <section className="section" id="how-it-works" aria-label="Step-by-Step Guide">
        <h2 className="vv-hand">How to Translate &amp; Summarize in 3 Steps</h2>
        <div className="grid-3">
          <div className="card">
            <span className="step-num">01</span>
            <h3>Paste Video Link</h3>
            <p>
              Copy any public YouTube video link that has subtitles or captions in any language.
            </p>
          </div>
          <div className="card">
            <span className="step-num">02</span>
            <h3>Pick Output Language</h3>
            <p>
              Select your preferred language (English, Spanish, Hindi, German, etc.) and layout format.
            </p>
          </div>
          <div className="card">
            <span className="step-num">03</span>
            <h3>Learn Visually</h3>
            <p>
              Scan your translated concept cards, navigate the mind map, and export study notes in 20 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <h2 className="vv-hand">Frequently Asked Questions</h2>
        {FAQ_MULTILINGUAL.map(([q, a]) => (
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
          <Link href="/multilingual-youtube-summarizer">Multilingual</Link>
          <Link href="/youtube-to-notes">Study Notes</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
          <Link href="/video-to-infographic">Infographics</Link>
          <a href="mailto:vidvisual.xyz@gmail.com">Support</a>
        </div>
        <span className="muted small">&copy; {new Date().getFullYear()} vidvisual</span>
      </footer>
    </>
  );
}
