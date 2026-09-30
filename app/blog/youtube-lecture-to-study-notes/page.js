import Link from 'next/link';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  title: 'How to Turn 2-Hour College Lectures into A+ Study Notes and PDFs | Vid Visual',
  description:
    'A study guide for students: convert recorded YouTube college lectures, STEM proofs, and exam reviews into visual whiteboard cheat sheets and printable PDF notes in 20 seconds.',
  keywords: [
    'youtube lecture to study notes',
    'how to study from youtube lectures',
    'college lecture summarizer',
    'exam study notes ai',
    'convert lecture to pdf notes',
    'mit opencourseware ai notes',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog/youtube-lecture-to-study-notes`,
  },
  openGraph: {
    title: 'How to Turn 2-Hour College Lectures into A+ Study Notes and PDFs',
    description:
      'The step-by-step framework to turn recorded university lectures into visual study cheat sheets in 20 seconds.',
    url: `${SITE_URL}/blog/youtube-lecture-to-study-notes`,
    siteName: 'Vid Visual',
    type: 'article',
    images: [`${SITE_URL}/og-image.jpg?v=2`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Turn 2-Hour College Lectures into A+ Study Notes',
    description: 'Transform recorded college lectures into visual study cheat sheets and PDFs.',
    images: [`${SITE_URL}/twitter-image.jpg?v=2`],
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Turn 2-Hour College Lectures into A+ Study Notes and PDFs',
  description:
    'A comprehensive study framework for university students using AI to distill long recorded lectures into visual whiteboard notes.',
  url: `${SITE_URL}/blog/youtube-lecture-to-study-notes`,
  datePublished: '2026-09-30',
  dateModified: '2026-09-30',
  author: {
    '@type': 'Organization',
    name: 'Vid Visual Academic Team',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Vid Visual',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
  },
};

export default function ArticleLectureStudyNotes() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <nav className="nav">
        <Link href="/" className="brand vv-hand">
          <img src="/logo.png" alt="Vid Visual" className="brand-icon" width="32" height="32" />
          <span>Vid Visual</span>
        </Link>
        <div className="nav-links">
          <Link href="/blog">Blog</Link>
          <Link href="/youtube-lecture-summarizer">Lecture Summarizer</Link>
          <Link href="/youtube-to-pdf">YouTube to PDF</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Try it Free</Link>
        </div>
      </nav>

      <div className="breadcrumb-nav">
        <Link href="/">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/blog">Blog</Link>
        <span>&rsaquo;</span>
        <span>Lecture Study Notes Guide</span>
      </div>

      <article className="section" style={{ maxWidth: '820px', margin: '0 auto', paddingBottom: '60px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span className="answer-badge" style={{ marginBottom: '12px' }}>Academic Study Hack</span>
          <h1 className="vv-hand" style={{ fontSize: '2.5rem', lineHeight: '1.2', marginTop: '10px', marginBottom: '14px' }}>
            How to Turn 2-Hour College Lectures into A+ Study Notes and PDFs
          </h1>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
            <span>By Vid Visual Academic Team</span>
            <span>·</span>
            <span>Published September 30, 2026</span>
            <span>·</span>
            <span>5 min read</span>
          </div>
        </div>

        <div style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--fg)' }}>
          <p>
            During midterm or finals week, the worst feeling is having 10 backlogged 90-minute university lectures
            to catch up on before an exam. Watching them at 2x speed still takes 7.5 uninterrupted hours, and by lecture three,
            your brain retains almost nothing.
          </p>

          <p>
            Top students don't re-watch lectures. They convert them into high-yield visual study sheets and spatial mind maps.
            Here is the exact study framework using <strong>Vid Visual</strong>.
          </p>

          <h2 style={{ fontSize: '1.6rem', marginTop: '36px', marginBottom: '14px' }}>1. Isolate the Core Academic Mechanisms</h2>
          <p>
            In any 90-minute lecture, a professor spends roughly 70 minutes on review, student questions, administrative announcements,
            and introductory slides. Only about 20 minutes contain the high-yield core theories, mathematical derivations, or historical events
            that appear on the exam.
          </p>
          <p>
            Vid Visual automatically filters out administrative chatter and groups the underlying academic concepts onto separate cards.
          </p>

          <h2 style={{ fontSize: '1.6rem', marginTop: '36px', marginBottom: '14px' }}>2. Use the Mind Map for Conceptual Hierarchy</h2>
          <p>
            Most exam mistakes come from confusing how two related formulas or doctrines relate to each other.
            Vid Visual’s vector mind map connects sub-arguments to the central theme, giving you a top-down mental model
            you can review in 30 seconds before walking into the examination hall.
          </p>

          <h2 style={{ fontSize: '1.6rem', marginTop: '36px', marginBottom: '14px' }}>3. Export to Vector PDF for Tablet Annotation</h2>
          <p>
            Once Vid Visual generates your notes in ~20 seconds, export the summary as a vector PDF.
            You can drop it directly into <strong>GoodNotes</strong>, <strong>Notability</strong>, or <strong>Apple Notes</strong>,
            highlight key points with an Apple Pencil or stylus, and add your professor's specific exam hints alongside the AI-extracted definitions.
          </p>

          <div style={{ margin: '40px 0', padding: '24px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '1.2rem' }}>Pass your exams with visual notes</h3>
            <p style={{ marginBottom: '16px', fontSize: '0.95rem' }}>
              Free forever for students: 3 lecture summaries every week, zero card needed.
            </p>
            <Link href="/youtube-lecture-summarizer" className="btn btn-primary btn-sm">Try Lecture Summarizer Free &rarr;</Link>
          </div>
        </div>
      </article>

      <footer className="site-foot">
        <span className="vv-hand brand-inline">
          <img src="/logo.png" alt="" className="brand-icon-sm" width="22" height="22" /> Vid Visual
        </span>
        <div className="foot-links">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/youtube-lecture-summarizer">Lecture Summaries</Link>
          <Link href="/youtube-to-pdf">YouTube to PDF</Link>
          <Link href="/youtube-to-mind-map">Mind Maps</Link>
        </div>
        <span className="muted small">© {new Date().getFullYear()} Vid Visual</span>
      </footer>
    </>
  );
}
