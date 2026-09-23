import Link from 'next/link';
import Visual from '@/components/Visual';
import Pricing from '@/components/Pricing';
import { SAMPLE } from '@/lib/sample';
import { PLANS } from '@/lib/plans';

const FAQ = [
  ['How does Vid Visual turn a YouTube video into a summary?', 'Paste a YouTube link. Vid Visual reads the video\u2019s captions, pulls out the key ideas, and lays them out as a whiteboard of concept cards or an infographic mind map, usually in under a minute.'],
  ['Is Vid Visual free to use?', 'Yes. The Free plan gives you 3 visual summaries every week with no credit card required. Paid plans unlock more summaries per week, HD downloads without a watermark, and extra formats.'],
  ['Which YouTube videos work with Vid Visual?', 'Any YouTube video that has captions turned on works \u2014 lectures, tutorials, podcasts, interviews, conference talks and more. If a video has no captions, Vid Visual lets you know it cannot read it.'],
  ['What formats can I download my summary in?', 'Free plans download a JPG. Pro and above get a sharp HD PNG with no watermark, and Unlimited adds PDF export plus custom visual themes.'],
  ['How is this different from just reading a transcript?', 'A raw transcript is a wall of text. Vid Visual turns that same content into a structured whiteboard of concept cards and a visual mind map, so you can scan the key ideas in seconds instead of reading every sentence.'],
  ['Can I use Vid Visual to study for exams?', 'Yes. Many students use it to turn lecture videos into a whiteboard summary the night before a test, then use the takeaways list as a quick review before walking into the exam.'],
  ['Can I use Vid Visual for work or research?', 'Yes. Professionals use it to turn long talks, webinars and interviews into a shareable one-page infographic, so a 45-minute video becomes something a teammate can review in under a minute.'],
  ['Does Vid Visual support videos in languages other than English?', 'Vid Visual reads whatever caption language the video provides and writes the summary in that same language, so non-English videos with captions are supported too.'],
  ['Is my data private?', 'Your summaries are saved to your own private library and are only visible to your account. Nobody else can see what you have generated.'],
  ['Can I cancel my subscription anytime?', 'Yes, you can upgrade, downgrade or cancel your plan at any time from your dashboard, with no long-term contract.'],
];

const VALUE_PROPS = [
  { emoji: '\u26a1', accent: 'blue', title: 'Save hours of watching', text: 'Skip scrubbing through a 40-minute video for the 3 ideas that matter. Get the whole thing as a scannable visual in under a minute.' },
  { emoji: '\ud83e\udde0', accent: 'violet', title: 'Remember more of what you watch', text: 'Visual, spatial summaries are easier for your brain to hold onto than a page of text you skimmed once.' },
  { emoji: '\ud83d\udcdd', accent: 'green', title: 'Turn videos into real notes', text: 'Every summary becomes a concept map and takeaway list you can actually study from, not just a video you half-watched.' },
  { emoji: '\ud83d\udd01', accent: 'amber', title: 'Build a personal library', text: 'Every visual you generate is saved to your account, so your understanding of a topic keeps growing every time you watch something new.' },
];

const AUDIENCES = [
  { emoji: '\ud83c\udf93', accent: 'blue', title: 'Students', text: 'Turn lecture recordings and YouTube study videos into whiteboard notes and mind maps you can actually revise from before an exam.' },
  { emoji: '\ud83d\udcbc', accent: 'green', title: 'Professionals & researchers', text: 'Compress long webinars, conference talks and interviews into a one-page infographic you can review in a minute or send to a colleague.' },
  { emoji: '\ud83c\udfac', accent: 'amber', title: 'Content creators & marketers', text: 'Quickly understand competitor videos or long-form research so you can plan your own content faster.' },
  { emoji: '\ud83d\udc65', accent: 'violet', title: 'Lifelong learners', text: 'Build a visual library of everything you have learned from YouTube, from history documentaries to coding tutorials.' },
];

const STEPS = [
  { num: '1', title: 'Paste a YouTube link', text: 'Copy any YouTube video URL that has captions turned on and paste it into Vid Visual.' },
  { num: '2', title: 'The AI reads and understands it', text: 'Vid Visual reads the full transcript, identifies the key concepts, and works out how they connect to each other.' },
  { num: '3', title: 'Choose your visual style', text: 'Pick Whiteboard for a deep set of concept cards and a mind map, or Infographic for a single quick-scan summary.' },
  { num: '4', title: 'Save, download and revisit', text: 'Your visual is saved to your personal library. Download it as an image or PDF, or come back to it anytime.' },
];

const USES = [
  { emoji: '\ud83d\udcda', accent: 'blue', title: 'Study smarter', text: 'Turn a lecture into revision notes you will actually re-read before an exam.' },
  { emoji: '\ud83e\udd1d', accent: 'green', title: 'Share with your team', text: 'Send a one-page infographic instead of asking a colleague to sit through a 40-minute recording.' },
  { emoji: '\ud83d\uddc2\ufe0f', accent: 'amber', title: 'Build a research library', text: 'Collect visual summaries of every video you have researched on a topic, all in one place.' },
  { emoji: '\u23f1\ufe0f', accent: 'violet', title: 'Quick refresher before a meeting', text: 'Skim your saved visual summary in 30 seconds instead of rewatching the whole video.' },
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

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vid Visual',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  description:
    'Vid Visual turns YouTube videos into visual summaries \u2014 a whiteboard of concept cards or an infographic mind map \u2014 generated by AI in under a minute.',
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