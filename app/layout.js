import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import { Analytics } from '@vercel/analytics/next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vidvisual.xyz';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vid Visual — AI YouTube Video Summarizer & Whiteboard Mind Map Generator',
    template: '%s · Vid Visual',
  },
  description:
    'Turn any YouTube video into an interactive whiteboard visual summary, infographic, or mind map in seconds. Free AI YouTube video summarizer for students, researchers, and professionals. Learn faster, watch less.',
  keywords: [
    'youtube video summarizer',
    'ai youtube summarizer',
    'youtube to mind map',
    'video to whiteboard summary',
    'turn youtube video into notes',
    'ai visual note taking',
    'free youtube summary generator',
    'youtube lecture summarizer',
    'youtube transcript to mind map',
    'visual study notes from youtube',
    'infographic video summary',
    'best ai summarizer for youtube',
    'convert youtube to summary',
    'learn from youtube faster',
    'youtube mind map maker',
    'ai video notes',
  ],
  applicationName: 'Vid Visual',
  authors: [{ name: 'Vid Visual Team' }],
  creator: 'Vid Visual',
  publisher: 'Vid Visual',
  category: 'Education & Productivity Tools',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: 'Vid Visual — AI YouTube Video Summarizer & Whiteboard Mind Map Generator',
    description:
      'Turn long YouTube videos, lectures, and podcasts into scannable whiteboard visuals, concept cards, and mind maps in under 60 seconds.',
    url: SITE_URL,
    siteName: 'Vid Visual',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Vid Visual — Turn YouTube Videos into Whiteboard Mind Maps',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vidvisual',
    creator: '@Ali_Mlk092',
    title: 'Vid Visual — AI YouTube Video Summarizer & Whiteboard Mind Map Generator',
    description:
      'Turn long YouTube videos, lectures, and podcasts into scannable whiteboard visuals, concept cards, and mind maps in under 60 seconds.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vid Visual',
  url: SITE_URL,
  description: 'AI-powered YouTube video summarizer and visual note-taking platform.',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vid Visual',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?url={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vid Visual" />
        <meta property="og:title" content="Vid Visual — AI YouTube Video Summarizer & Whiteboard Mind Maps" />
        <meta property="og:description" content="Turn long YouTube videos, lectures, and podcasts into scannable whiteboard visuals, concept cards, and mind maps in under 60 seconds." />
        <meta property="og:url" content="https://vidvisual.xyz" />
        <meta property="og:image" content="https://vidvisual.xyz/og-image.png" />
        <meta property="og:image:secure_url" content="https://vidvisual.xyz/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Vid Visual — Turn YouTube Videos into Whiteboard Mind Maps" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vidvisual" />
        <meta name="twitter:creator" content="@Ali_Mlk092" />
        <meta name="twitter:title" content="Vid Visual — AI YouTube Video Summarizer & Whiteboard Mind Maps" />
        <meta name="twitter:description" content="Turn long YouTube videos, lectures, and podcasts into scannable whiteboard visuals, concept cards, and mind maps in under 60 seconds." />
        <meta name="twitter:image" content="https://vidvisual.xyz/og-image.png" />
        <meta name="twitter:image:alt" content="Vid Visual — Turn YouTube Videos into Whiteboard Mind Maps" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Figtree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <div className="top-bar">
          <ThemeToggle />
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}