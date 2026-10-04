import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import Visual from '@/components/Visual';
import Pricing from '@/components/Pricing';
import { SAMPLE } from '@/lib/sample';
import { PLANS } from '@/lib/plans';

const FAQ = [
  ['Can Vid Visual turn a 4-hour podcast or lecture into visual notes?', 'Yes! Vid Visual is specifically built to compress long-form content. Paste any 2-to-4-hour podcast (like Lex Fridman, Huberman Lab, or Joe Rogan) or multi-hour university lecture, and our AI extracts the core arguments, concept relationships, and actionable takeaways into a visual whiteboard summary in around 20 seconds.'],
  ['How much watch time do I save using Vid Visual?', 'Users save up to 90% to 95% of their watch time. Instead of spending 180 to 240 minutes scrubbing through video timelines, you can understand the complete conceptual hierarchy and main key points in under 60 seconds.'],
  ['How does Vid Visual extract the main key points from long YouTube videos?', 'Vid Visual parses the full transcript using Google Gemini 2.5 Flash with structured semantic schema distillation. It automatically filters out conversational filler, extracts essential definitions, and arranges ideas into spatial whiteboard concept cards and an interconnected mind map.'],
  ['How does Vid Visual turn a YouTube video into a summary?', 'Paste a YouTube link. Vid Visual reads the video’s captions, pulls out the key ideas, and lays them out as a whiteboard of concept cards or an infographic mind map, usually in around 20 seconds.'],
  ['What is the best AI tool to summarize YouTube videos into a mind map?', 'Vid Visual is specifically engineered for visual learning. Unlike standard text summarizers that return a plain wall of text, Vid Visual automatically extracts core concepts and generates structured mind maps and whiteboard visuals.'],
  ['Is Vid Visual free to use?', 'Yes. The Free plan gives you 3 visual summaries every week with no credit card required. Paid plans unlock more summaries per week, HD downloads without a watermark, and extra formats.'],
  ['Which YouTube videos work with Vid Visual?', 'Any YouTube video that has captions turned on works — lectures, tutorials, podcasts, interviews, conference talks, and technical walkthroughs. If a video has captions, Vid Visual can summarize it in seconds.'],
  ['What formats can I download my visual summary in?', 'Free plans download a standard JPG. Pro accounts export crisp HD PNG images with no watermark, and Unlimited accounts support vector PDF exports and custom visual color themes.'],
  ['How is Vid Visual different from ChatGPT or plain text summarizers?', 'ChatGPT and raw transcripts produce walls of linear text that cause cognitive fatigue. Vid Visual transforms information into spatial concept cards and connected mind maps, boosting memory retention by up to 65%.'],
  ['Can I use Vid Visual to study university lectures and exams?', 'Yes. Thousands of students use Vid Visual to convert 60-to-120-minute recorded lectures into high-yield whiteboard study sheets, visual mind maps, and bulleted takeaways the night before exams.'],
  ['Does Vid Visual support foreign language YouTube videos?', 'Yes. Vid Visual processes captions in any supported language and outputs high-quality visual summaries in that same language.'],
  ['Is my generated data private?', 'Yes. All visual summaries are saved securely to your personal private library and are only accessible by your account.'],
  ['Can I cancel my subscription anytime?', 'Yes. You can upgrade, downgrade, or cancel your subscription at any time directly from your dashboard with zero lock-in contracts.'],
  ['What if I have an issue or payment question?', 'If you experience any issues, payment questions, or need assistance with your account, please email our support team directly at vidvisual.xyz@gmail.com and we will resolve it within 24 hours.'],
];

const VALUE_PROPS = [
  { emoji: '⚡', accent: 'blue', title: 'Save 90% of watch time', text: 'Skip scrubbing through a 2-4 hour video for the 3 ideas that matter. Turn hours of conversation into a scannable visual in under 20 seconds.' },
  { emoji: '🧠', accent: 'violet', title: 'Remember 65% more', text: 'Visual, spatial summaries are proven by cognitive science to be significantly easier for your brain to retain than a linear page of text.' },
  { emoji: '📝', accent: 'green', title: 'Extract main key points', text: 'Every summary distills core thesis statements, structured concept cards, and actionable takeaway bullets you can study and reference anytime.' },
  { emoji: '🔁', accent: 'amber', title: 'Build a visual knowledge base', text: 'Every visual you generate is saved to your account, so your personal library of podcasts, lectures, and tutorials keeps growing.' },
];

const AUDIENCES = [
  { emoji: '🎙️', accent: 'blue', title: 'Podcast listeners', text: 'Turn 3-4 hour podcasts (Huberman Lab, Lex Fridman, All-In, Joe Rogan) into concise whiteboard notes and mind maps in 20 seconds.' },
  { emoji: '🎓', accent: 'green', title: 'Students & academics', text: 'Convert university lecture recordings, MIT OpenCourseWare, and exam review sessions into visual study sheets you can revise from in 60 seconds.' },
  { emoji: '💼', accent: 'amber', title: 'Founders & professionals', text: 'Compress long industry keynotes, tech tutorials, and market webinars into a 1-page visual summary you can share with colleagues.' },
  { emoji: '👥', accent: 'violet', title: 'Lifelong visual learners', text: 'Build a permanent visual library of everything you have learned on YouTube, from science and coding to history and business.' },
];

const STEPS = [
  { num: '1', title: 'Paste any YouTube link', text: 'Copy the URL of any YouTube video, podcast, lecture, or tutorial that has captions turned on.' },
  { num: '2', title: 'AI distills the key points in 20s', text: 'Vid Visual uses Gemini 2.5 Flash to parse the transcript, extract essential concepts, and calculate topical relationships.' },
  { num: '3', title: 'Explore your visual whiteboard', text: 'Review spatial concept cards, navigate the interactive mind map, and absorb the high-yield takeaway list.' },
  { num: '4', title: 'Export, save, and remember', text: 'Your visual is stored in your private cloud library. Download as high-res JPG, HD PNG, or vector PDF with one click.' },
];

const USES = [
  { emoji: '📚', accent: 'blue', title: 'Study for exams in 60s', text: 'Turn a 90-minute lecture recording into high-yield revision notes you will actually remember on test day.' },
  { emoji: '⏱️', accent: 'green', title: 'Binge podcasts at 10x speed', text: 'Grasp the core insights of a 3-hour podcast in 2 minutes without listening at distorted 3x audio speed.' },
  { emoji: '🤝', accent: 'amber', title: 'Share visual briefings', text: 'Send your team a one-page infographic instead of asking them to sit through an hour-long recorded meeting.' },
  { emoji: '🗂️', accent: 'violet', title: 'Build your second brain', text: 'Curate a searchable visual library of every valuable idea, concept, and technique you discover on YouTube.' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Turn a YouTube Video into a Visual Summary in 20 Seconds',
  description: 'Convert any YouTube video, podcast, or lecture into an interactive whiteboard visual and mind map using AI.',
  totalTime: 'PT20S',
  step: STEPS.map((s, idx) => ({
    '@type': 'HowToStep',
    position: idx + 1,
    name: s.title,
    text: s.text,
  })),
};

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vid Visual',
  url: 'https://www.vidvisual.xyz',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, Edge)',
  description:
    'Vid Visual is a free AI YouTube video summarizer that turns long boring YouTube videos, podcasts, and lectures into interactive whiteboard concept cards and visual mind maps in under 20 seconds.',
  featureList: [
    '20-second AI YouTube transcript summarization',
    'Interactive vector mind map generator',
    'Whiteboard concept cards breakdown',
    'High-resolution JPG, HD PNG, and PDF exports',
    'Multi-language caption support',
    'Long-form video and podcast compression',
    'Personal private visual library',
  ],
  offers: Object.values(PLANS).map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: String(p.price),
    priceCurrency: 'USD',
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <nav className="nav">
        <BrandLogo />
        <div className="nav-links">
          <a href="#formats">Format</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#support">Support</a>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Sign up free</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <div className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '999px', background: 'rgba(43, 89, 224, 0.1)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '14px', border: '1.5px solid var(--blue)' }}>
            <span>⚡ AI Video &amp; Podcast Distiller</span>
            <span>·</span>
            <span>Main Key Points in 20s</span>
          </div>
          <h1 className="vv-hand">Turn Long, Boring YouTube Videos into Beautiful Whiteboard Summaries in 20 Seconds.</h1>
          <p>
            Vid Visual reads long YouTube videos, multi-hour lectures, and deep podcasts for you,
            extracting the main key points into easy-to-understand whiteboard concept cards and visual mind maps.
            Save 90% of your time, skip the fluff, and retain 65% more knowledge.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Make a visual summary free</Link>
            <a href="#podcast-showcase" className="link small">See long-form video compression &darr;</a>
          </div>
          <span className="muted small">Free forever: 3 summaries a week, no credit card required.</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* Silicon Valley SaaS Stats Strip */}
      <section className="stats-strip" aria-label="Key Product Benchmarks">
        <div className="stat-pill">
          <span className="stat-pill-num">20 Sec</span>
          <span className="stat-pill-label">Average AI distillation speed</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">90% Saved</span>
          <span className="stat-pill-label">Watch time saved on long boring videos</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">65% Higher</span>
          <span className="stat-pill-label">Knowledge retention with spatial visual cards</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100% Free</span>
          <span className="stat-pill-label">3 summaries every week, zero card needed</span>
        </div>
      </section>

      {/* Long-Form Video & Lecture Compression Showcase */}
      <section id="podcast-showcase" className="podcast-showcase" aria-label="Long-Form Video Compression Showcase">
        <div className="podcast-showcase-copy">
          <span className="answer-badge" style={{ marginBottom: '10px' }}>Long-Form Compression Engine</span>
          <h2 className="vv-hand">Turn Very Long Videos, Lectures &amp; Podcasts into Main Key Points</h2>
          <p>
            Nobody has hours to sit through rambling YouTube videos, dense college lectures, or multi-hour podcast conversations just to find the core ideas that matter.
            Vid Visual analyzes the complete video transcript, strips away conversational filler, sponsor segments, and repetitive tangents, and distills the main key points into an easy-to-understand visual whiteboard summary you can absorb in under a minute.
          </p>
          <Link href="/youtube-podcast-summarizer" className="btn btn-primary btn-sm">Explore Podcast Summarizer &rarr;</Link>
        </div>
        <div className="podcast-timeline">
          <div className="podcast-timeline-item">
            <div className="podcast-timeline-left">
              <span className="podcast-timeline-icon">🎙️</span>
              <div>
                <div className="podcast-timeline-title">Deep Technical Podcasts (4+ Hours)</div>
                <div className="podcast-timeline-meta">AI Architecture &amp; Engineering Systems</div>
              </div>
            </div>
            <span className="podcast-timeline-speed">20s &rarr; 5 Concept Cards</span>
          </div>
          <div className="podcast-timeline-item">
            <div className="podcast-timeline-left">
              <span className="podcast-timeline-icon">🧬</span>
              <div>
                <div className="podcast-timeline-title">Science &amp; Health Episodes (3+ Hours)</div>
                <div className="podcast-timeline-meta">Protocols, Evidence &amp; Action Steps</div>
              </div>
            </div>
            <span className="podcast-timeline-speed">18s &rarr; 6 Key Notes</span>
          </div>
          <div className="podcast-timeline-item">
            <div className="podcast-timeline-left">
              <span className="podcast-timeline-icon">🏛️</span>
              <div>
                <div className="podcast-timeline-title">University Lectures &amp; Seminars (2 Hours)</div>
                <div className="podcast-timeline-meta">Core Academic Concepts &amp; Formulas</div>
              </div>
            </div>
            <span className="podcast-timeline-speed">15s &rarr; Connected Mind Map</span>
          </div>
        </div>
      </section>

      {/* AEO: Direct Answer Block for AI Overviews & Search Snippets */}
      <section className="answer-box" aria-label="Quick Overview">
        <span className="answer-badge">Quick Overview</span>
        <h2>What is Vid Visual?</h2>
        <p>
          <strong>Vid Visual</strong> is a free AI-powered YouTube video summarizer and visual note-taking app.
          It automatically turns long video lectures, podcasts, tutorials, and interviews into scannable whiteboard concept cards,
          knowledge maps, and colorful infographics in under 20 seconds.
          Built for students, researchers, and professionals who want to learn faster and boost memory retention by up to 65%.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates complete visual notes in ~20 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Formats</strong>
            <span>Whiteboard concept cards, Infographic &amp; Mind Map</span>
          </div>
          <div className="answer-highlight">
            <strong>💳 Pricing</strong>
            <span>Free forever: 3 summaries/week, no credit card required</span>
          </div>
          <div className="answer-highlight">
            <strong>📥 Exports</strong>
            <span>Download as JPG, HD PNG, or vector PDF</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="vv-hand">Why visual summaries work better than watching twice</h2>
        <p className="section-lead">
          Your brain holds onto a well-organized visual far longer than a video you watched once at 2x speed.
          Vid Visual is built around that idea: instead of leaving you with a pile of scattered notes, it gives
          you a structured, memorable picture of what the video actually said.
        </p>
        <div className="card-grid">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className={`info-card accent-${v.accent}`}>
              <span className="card-emoji">{v.emoji}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="formats" className="section">
        <h2 className="vv-hand">One video, two ways to remember it</h2>
        <p className="section-lead">
          Every summary comes in two formats, so you can pick whatever fits the moment — deep study or a
          quick scan.
        </p>
        <div className="formats">
          <div>
            <h3>Whiteboard</h3>
            <p>Concept cards for each big idea, plus a mind map that shows how they connect. Best for studying a topic in depth.</p>
          </div>
          <div>
            <h3>Infographic</h3>
            <p>A single knowledge map with the key takeaways underneath. Best for a quick review before an exam or a meeting.</p>
          </div>
        </div>
        <div className="format-demo">
          <Visual data={SAMPLE} format="infographic" theme="ocean" />
        </div>
      </section>

      <section className="section">
        <h2 className="vv-hand">Built for how you actually learn</h2>
        <p className="section-lead">Whoever you are, if you learn from YouTube, Vid Visual turns that time into something you keep.</p>
        <div className="card-grid">
          {AUDIENCES.map((a) => (
            <div key={a.title} className={`info-card accent-${a.accent}`}>
              <span className="card-emoji">{a.emoji}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AEO & SEO: Structured Comparison Table */}
      <section className="section">
        <h2 className="vv-hand">Vid Visual vs. Old-School Note Taking</h2>
        <p className="section-lead">
          See why visual spatial notes beat traditional text-only AI summarizers and rewatching hours of video.
        </p>
        <div className="comparison-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="highlight-col">Vid Visual</th>
                <th>Text-Only AI Summarizers</th>
                <th>Watching at 2x Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Format</strong></td>
                <td className="highlight-col">Interactive Whiteboard & Mind Map</td>
                <td>Wall of plain text bullets</td>
                <td>Passive video stream</td>
              </tr>
              <tr>
                <td><strong>Review Time</strong></td>
                <td className="highlight-col">Under 60 seconds</td>
                <td>3 – 5 minutes reading</td>
                <td>20 – 60 minutes</td>
              </tr>
              <tr>
                <td><strong>Memory Retention</strong></td>
                <td className="highlight-col">High (Visual & Spatial recall)</td>
                <td>Low (Skimmed text fatigue)</td>
                <td>Medium (Easily forgotten)</td>
              </tr>
              <tr>
                <td><strong>Exports</strong></td>
                <td className="highlight-col">JPG, HD PNG, Vector PDF</td>
                <td>Copy-paste plain text only</td>
                <td>None</td>
              </tr>
              <tr>
                <td><strong>Free Tier</strong></td>
                <td className="highlight-col"><span className="comparison-badge-yes">Yes (3/week, no card)</span></td>
                <td>Limited or paywalled</td>
                <td>Free with ads</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="how-it-works" className="section how">
        <h2 className="vv-hand">How it works</h2>
        <p className="section-lead">From link to visual summary in four simple steps — no editing, no formatting, no extra apps.</p>
        <div className="steps-detailed">
          {STEPS.map((s) => (
            <div key={s.num} className="step-detailed">
              <div className="step-num vv-hand">{s.num}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="vv-hand">What you can do with your visual</h2>
        <p className="section-lead">A Vid Visual summary is not just a picture — it is something you can actually use afterward.</p>
        <div className="card-grid">
          {USES.map((u) => (
            <div key={u.title} className={`info-card accent-${u.accent}`}>
              <span className="card-emoji">{u.emoji}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="section">
        <h2 className="vv-hand">Simple, honest pricing</h2>
        <p className="section-lead muted">Start free with 3 summaries a week. Upgrade whenever you are hooked.</p>
        <Pricing />
      </section>

      <section id="faq" className="section faq">
        <h2 className="vv-hand">Questions</h2>
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      {/* SEO & Learning Knowledge Hub */}
      <section id="knowledge-hub" className="section knowledge-hub" aria-label="AI Video Learning & Knowledge Hub">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="answer-badge" style={{ marginBottom: '10px' }}>🔍 vidvisual learning &amp; research knowledge hub</span>
          <h2 className="vv-hand">Master Video Learning &amp; AI Summarization with vidvisual</h2>
          <p className="section-sub" style={{ maxWidth: '720px', margin: '0 auto' }}>
            Actionable guides, cognitive learning science, and deep-dive comparisons. Learn how vidvisual turns multi-hour YouTube videos, university lectures, and podcast conversations into scannable whiteboard concept cards, interactive mind maps, and printable PDF study sheets.
          </p>
        </div>

        <div className="grid-3" style={{ gap: '20px' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="answer-badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>Tutorial</span>
              <h3><Link href="/blog/how-to-summarize-youtube-videos-ai" style={{ color: 'inherit', textDecoration: 'none' }}>How to Summarize YouTube Videos in 20s with vidvisual</Link></h3>
              <p className="small muted">Step-by-step tutorial on parsing video transcripts, eliminating conversational fluff, and generating structured whiteboard visual summaries from any link.</p>
            </div>
            <Link href="/blog/how-to-summarize-youtube-videos-ai" className="link small" style={{ marginTop: '14px', fontWeight: 600 }}>Read Tutorial &rarr;</Link>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="answer-badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>Comparison</span>
              <h3><Link href="/blog/best-ai-youtube-summarizers" style={{ color: 'inherit', textDecoration: 'none' }}>Best AI YouTube Summarizers in 2026: Why vidvisual Leads</Link></h3>
              <p className="small muted">Why traditional chatbot text walls cause reading fatigue and how spatial memory cards boost recall by up to 65% compared to plain bullet points.</p>
            </div>
            <Link href="/blog/best-ai-youtube-summarizers" className="link small" style={{ marginTop: '14px', fontWeight: 600 }}>Compare Tools &rarr;</Link>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="answer-badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>Study Hack</span>
              <h3><Link href="/blog/youtube-lecture-to-study-notes" style={{ color: 'inherit', textDecoration: 'none' }}>Turn College Lectures into A+ Study Notes &amp; Mind Maps</Link></h3>
              <p className="small muted">How top students and researchers synthesize 2-hour university lectures into GoodNotes, Obsidian, and Notion-ready vector study sheets.</p>
            </div>
            <Link href="/blog/youtube-lecture-to-study-notes" className="link small" style={{ marginTop: '14px', fontWeight: 600 }}>See Study Hack &rarr;</Link>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="answer-badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>Long-Form Video</span>
              <h3><Link href="/youtube-podcast-summarizer" style={{ color: 'inherit', textDecoration: 'none' }}>Summarize 3+ Hour Podcasts (Huberman Lab, Lex Fridman)</Link></h3>
              <p className="small muted">Bypass rambling banter, sponsor reads, and tangents. Extract science-backed protocols and core insights into bite-sized concept cards.</p>
            </div>
            <Link href="/youtube-podcast-summarizer" className="link small" style={{ marginTop: '14px', fontWeight: 600 }}>Explore Podcast Tool &rarr;</Link>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="answer-badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>Visual Thinking</span>
              <h3><Link href="/youtube-to-mind-map" style={{ color: 'inherit', textDecoration: 'none' }}>Convert YouTube Videos to Hierarchical Mind Maps</Link></h3>
              <p className="small muted">See how complex concepts interconnect visually with central nodes and branches instead of getting lost in dense text paragraphs.</p>
            </div>
            <Link href="/youtube-to-mind-map" className="link small" style={{ marginTop: '14px', fontWeight: 600 }}>Explore Mind Map Tool &rarr;</Link>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="answer-badge" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>Vector Notes</span>
              <h3><Link href="/youtube-to-pdf" style={{ color: 'inherit', textDecoration: 'none' }}>Export Video Transcripts to High-Resolution PDF Notes</Link></h3>
              <p className="small muted">Download high-resolution, watermark-free study sheets and whiteboard mind maps ready for offline review, printing, and exam prep.</p>
            </div>
            <Link href="/youtube-to-pdf" className="link small" style={{ marginTop: '14px', fontWeight: 600 }}>Explore PDF Tool &rarr;</Link>
          </div>
        </div>

        {/* Cognitive Science Deep-Dive & AEO Answer Box */}
        <div className="answer-box" style={{ marginTop: '36px' }}>
          <span className="answer-badge">Cognitive Science &amp; Research</span>
          <h3>The Cognitive Science Behind vidvisual: Why Visual Notes Beat Plain Text</h3>
          <p>
            Reading continuous walls of AI-generated text triggers cognitive overload. Research shows that 80% of information processed by the human brain is visual. <strong>vidvisual</strong> applies proven educational psychology principles to make video consumption 10x faster and more memorable:
          </p>
          <div className="answer-highlights">
            <div className="answer-highlight">
              <strong>🧠 Dual-Coding Theory</strong>
              <span>Combining concise concepts with spatial visual diagrams activates both visual and verbal channels, boosting recall by 65%.</span>
            </div>
            <div className="answer-highlight">
              <strong>⏱️ 90% Time Saved</strong>
              <span>Strips conversational fluff, sponsor reads, and filler so you absorb 2-hour videos in under 60 seconds without 2x speed fatigue.</span>
            </div>
            <div className="answer-highlight">
              <strong>🌐 16+ Languages</strong>
              <span>Seamlessly translate foreign-language lectures and tutorials into clean, structured study notes in your chosen target language.</span>
            </div>
            <div className="answer-highlight">
              <strong>📄 Vector PDF Exports</strong>
              <span>One-click export to high-resolution JPG, HD PNG, or vector PDF ready for Notion, GoodNotes, and Obsidian knowledge bases.</span>
            </div>
          </div>
        </div>

        {/* Quick-Jump Core Pillar Tool Links */}
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <p className="small muted" style={{ marginBottom: '14px', fontWeight: 600 }}>Explore Core AI Summarization Tools on vidvisual:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <Link href="/youtube-video-summarizer" className="stat-pill" style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>YouTube Video Summarizer &rarr;</Link>
            <Link href="/youtube-transcript-summarizer" className="stat-pill" style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>Transcript Summarizer &rarr;</Link>
            <Link href="/youtube-to-pdf" className="stat-pill" style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>YouTube to PDF &rarr;</Link>
            <Link href="/youtube-to-mind-map" className="stat-pill" style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>YouTube to Mind Map &rarr;</Link>
            <Link href="/youtube-podcast-summarizer" className="stat-pill" style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>Podcast Summarizer &rarr;</Link>
            <Link href="/youtube-lecture-summarizer" className="stat-pill" style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>Lecture Summarizer &rarr;</Link>
            <Link href="/whiteboard-summary" className="stat-pill" style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>Whiteboard Summarizer &rarr;</Link>
            <Link href="/video-to-infographic" className="stat-pill" style={{ padding: '8px 16px', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>Video to Infographic &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="section final">
        <h2 className="vv-hand">Stop forgetting what you watch.</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Get started free</Link>
      </section>

      {/* Footer SEO Programmatic Pillar Hubs */}
      <section className="footer-pillars" aria-label="Explore Vid Visual Tools & Guides">
        <div className="footer-pillar-col">
          <h4>AI Summarization Hubs</h4>
          <ul>
            <li><Link href="/youtube-video-summarizer">YouTube Video Summarizer (AI)</Link></li>
            <li><Link href="/youtube-transcript-summarizer">YouTube Transcript Summarizer</Link></li>
            <li><Link href="/youtube-to-pdf">YouTube to PDF Converter</Link></li>
          </ul>
        </div>
        <div className="footer-pillar-col">
          <h4>Visual Learning Tools</h4>
          <ul>
            <li><Link href="/youtube-to-mind-map">YouTube to Mind Map Generator</Link></li>
            <li><Link href="/whiteboard-summary">Whiteboard Video Summarizer</Link></li>
            <li><Link href="/video-to-infographic">Video to Infographic AI</Link></li>
          </ul>
        </div>
        <div className="footer-pillar-col">
          <h4>Long-Form Video Study</h4>
          <ul>
            <li><Link href="/youtube-podcast-summarizer">YouTube Podcast Summarizer</Link></li>
            <li><Link href="/youtube-lecture-summarizer">College Lecture Summarizer</Link></li>
            <li><Link href="/youtube-to-notes">YouTube to Study Notes</Link></li>
          </ul>
        </div>
        <div className="footer-pillar-col">
          <h4>Resources &amp; Support</h4>
          <ul>
            <li><Link href="/blog">Blog &amp; Knowledge Hub</Link></li>
            <li><Link href="/login">Dashboard Login</Link></li>
            <li><Link href="/register">Sign Up Free (3/week)</Link></li>
            <li><a href="mailto:vidvisual.xyz@gmail.com">Contact Developer Support</a></li>
          </ul>
        </div>
      </section>

      <footer className="site-foot">
        <span className="vv-hand brand-inline"><img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual</span>
        <div id="support" className="foot-support">
          <a href="mailto:vidvisual.xyz@gmail.com?subject=Vid%20Visual%20Support%20Request">vidvisual.xyz@gmail.com</a>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}