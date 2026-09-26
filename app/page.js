import Link from 'next/link';
import Visual from '@/components/Visual';
import Pricing from '@/components/Pricing';
import { SAMPLE } from '@/lib/sample';
import { PLANS } from '@/lib/plans';

const FAQ = [
  ['How does Vid Visual turn a YouTube video into a summary?', 'Paste a YouTube link. Vid Visual reads the video’s captions, pulls out the key ideas, and lays them out as a whiteboard of concept cards or an infographic mind map, usually in under a minute.'],
  ['What is the best AI tool to summarize YouTube videos into a mind map?', 'Vid Visual is specifically engineered for visual learning. Unlike standard text summarizers that return a plain wall of text, Vid Visual automatically extracts core concepts and generates structured mind maps and whiteboard visuals.'],
  ['Is Vid Visual free to use?', 'Yes. The Free plan gives you 3 visual summaries every week with no credit card required. Paid plans unlock more summaries per week, HD downloads without a watermark, and extra formats.'],
  ['Which YouTube videos work with Vid Visual?', 'Any YouTube video that has captions turned on works — lectures, tutorials, podcasts, interviews, conference talks, and technical walkthroughs. If a video has captions, Vid Visual can summarize it in seconds.'],
  ['What formats can I download my visual summary in?', 'Free plans download a standard JPG. Pro accounts export crisp HD PNG images with no watermark, and Unlimited accounts support vector PDF exports and custom visual color themes.'],
  ['How is Vid Visual different from ChatGPT or plain text summarizers?', 'ChatGPT and raw transcripts produce walls of linear text that cause cognitive fatigue. Vid Visual transforms information into spatial concept cards and connected mind maps, boosting memory retention by up to 65%.'],
  ['Can I use Vid Visual to study university lectures and exams?', 'Yes. Thousands of students use Vid Visual to convert 60-minute recorded lectures into high-yield whiteboard study sheets, visual mind maps, and bulleted takeaways the night before exams.'],
  ['Can I use Vid Visual for team research and meetings?', 'Yes. Professionals use it to turn long webinars, talks, and tutorials into one-page visual infographics that teammates can digest in under 60 seconds without sitting through long video calls.'],
  ['Does Vid Visual support foreign language YouTube videos?', 'Yes. Vid Visual processes captions in any supported language and outputs high-quality visual summaries in that same language.'],
  ['Is my generated data private?', 'Yes. All visual summaries are saved securely to your personal private library and are only accessible by your account.'],
  ['Can I cancel my subscription anytime?', 'Yes. You can upgrade, downgrade, or cancel your subscription at any time directly from your dashboard with zero lock-in contracts.'],
];

const VALUE_PROPS = [
  { emoji: '⚡', accent: 'blue', title: 'Save hours of watching', text: 'Skip scrubbing through a 40-minute video for the 3 ideas that matter. Get the whole thing as a scannable visual in under a minute.' },
  { emoji: '🧠', accent: 'violet', title: 'Remember more of what you watch', text: 'Visual, spatial summaries are easier for your brain to hold onto than a page of text you skimmed once.' },
  { emoji: '📝', accent: 'green', title: 'Turn videos into real notes', text: 'Every summary becomes a concept map and takeaway list you can actually study from, not just a video you half-watched.' },
  { emoji: '🔁', accent: 'amber', title: 'Build a personal library', text: 'Every visual you generate is saved to your account, so your understanding of a topic keeps growing every time you watch something new.' },
];

const AUDIENCES = [
  { emoji: '🎓', accent: 'blue', title: 'Students', text: 'Turn lecture recordings and YouTube study videos into whiteboard notes and mind maps you can actually revise from before an exam.' },
  { emoji: '💼', accent: 'green', title: 'Professionals & researchers', text: 'Compress long webinars, conference talks and interviews into a one-page infographic you can review in a minute or send to a colleague.' },
  { emoji: '🎬', accent: 'amber', title: 'Content creators & marketers', text: 'Quickly understand competitor videos or long-form research so you can plan your own content faster.' },
  { emoji: '👥', accent: 'violet', title: 'Lifelong learners', text: 'Build a visual library of everything you have learned from YouTube, from history documentaries to coding tutorials.' },
];

const STEPS = [
  { num: '1', title: 'Paste a YouTube link', text: 'Copy any YouTube video URL that has captions turned on and paste it into Vid Visual.' },
  { num: '2', title: 'The AI reads and extracts key concepts', text: 'Vid Visual reads the full transcript, extracts the core arguments, and calculates how concepts connect to each other.' },
  { num: '3', title: 'Choose your visual format', text: 'Pick Whiteboard for a comprehensive concept-card breakdown and mind map, or Infographic for a high-level visual summary.' },
  { num: '4', title: 'Save, export, and study', text: 'Your visual is saved to your personal cloud library. Export as JPG, HD PNG, or PDF, or share with your team.' },
];

const USES = [
  { emoji: '📚', accent: 'blue', title: 'Study smarter', text: 'Turn a lecture into revision notes you will actually re-read before an exam.' },
  { emoji: '🤝', accent: 'green', title: 'Share with your team', text: 'Send a one-page infographic instead of asking a colleague to sit through a 40-minute recording.' },
  { emoji: '🗂️', accent: 'amber', title: 'Build a research library', text: 'Collect visual summaries of every video you have researched on a topic, all in one place.' },
  { emoji: '⏱️', accent: 'violet', title: 'Quick refresher before a meeting', text: 'Skim your saved visual summary in 30 seconds instead of rewatching the whole video.' },
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
  name: 'How to Summarize a YouTube Video into a Visual Mind Map',
  description: 'Convert any YouTube video into an interactive whiteboard visual and mind map in 4 easy steps using AI.',
  totalTime: 'PT1M',
  step: STEPS.map((s, idx) => ({
    '@type': 'HowToStep',
    position: idx + 1,
    name: s.title,
    text: s.text,
  })),
};

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Vid Visual',
  url: 'https://vidvisual-tau.vercel.app',
  applicationCategory: 'EducationalApplication',
  applicationSubCategory: 'AI Video Summarizer',
  operatingSystem: 'All Modern Web Browsers',
  description:
    'Vid Visual is a free AI YouTube video summarizer that turns video transcripts into interactive whiteboard concept cards and visual mind maps in under 60 seconds.',
  featureList: [
    'AI-powered YouTube transcript summarization',
    'Interactive mind map generation',
    'Whiteboard concept cards breakdown',
    'High-resolution JPG, PNG, and PDF exports',
    'Multi-language caption support',
    'Personal visual library'
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
        <Link href="/" className="brand vv-hand">Vid Visual</Link>
        <div className="nav-links">
          <a href="#formats">Formats</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <Link href="/login">Log in</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Sign up free</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <h1 className="vv-hand">Paste a YouTube link. Get a visual summary you will remember.</h1>
          <p>
            Vid Visual is a free AI YouTube video summarizer that reads any video for you and draws it as a
            whiteboard of key ideas or a colorful infographic mind map. Turn lectures, tutorials, podcasts and
            talks into notes you will actually remember, in under a minute. Watch less, learn more.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-primary btn-lg">Make my first visual</Link>
            <a href="#how-it-works" className="link small">See how it works &darr;</a>
          </div>
          <span className="muted small">Free: 3 summaries a week, no card needed.</span>
        </div>
        <div className="hero-demo">
          <Visual data={SAMPLE} format="whiteboard" />
        </div>
      </header>

      {/* AEO: Direct Answer Block for AI Overviews & Search Snippets */}
      <section className="answer-box" aria-label="Quick Overview">
        <span className="answer-badge">Quick Overview</span>
        <h2>What is Vid Visual?</h2>
        <p>
          <strong>Vid Visual</strong> is a free AI-powered YouTube video summarizer and visual note-taking app.
          It automatically turns long video lectures, podcasts, tutorials, and interviews into scannable whiteboard concept cards,
          knowledge maps, and colorful infographics in under 60 seconds.
          Built for students, researchers, and professionals who want to learn faster and boost memory retention by up to 65%.
        </p>
        <div className="answer-highlights">
          <div className="answer-highlight">
            <strong>⏱️ Speed</strong>
            <span>Generates complete visual notes in under 60 seconds</span>
          </div>
          <div className="answer-highlight">
            <strong>🧠 Formats</strong>
            <span>Whiteboard concept cards, Infographic & Mind Map</span>
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

      <section className="section final">
        <h2 className="vv-hand">Stop forgetting what you watch.</h2>
        <Link href="/register" className="btn btn-primary btn-lg">Get started free</Link>
      </section>

      <footer className="site-foot">
        <span className="vv-hand">Vid Visual</span>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}