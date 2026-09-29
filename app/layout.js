import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import { Analytics } from '@vercel/analytics/next';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vid Visual — AI YouTube Video Summarizer & Whiteboard Mind Map Generator',
    template: '%s · Vid Visual',
  },
  description:
    'Turn long YouTube videos, lectures, and podcasts into scannable whiteboard visuals, concept cards, and mind maps in under 60 seconds. Free AI YouTube video summarizer for students, researchers, and professionals. Learn faster, watch less.',
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
    canonical: 'https://www.vidvisual.xyz',
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
    title: 'Vid Visual — AI YouTube Video Summarizer & Whiteboard Mind Maps',
    description:
      'Turn long YouTube videos, lectures, and podcasts into scannable whiteboard visuals, concept cards, and mind maps in under 60 seconds.',
    url: 'https://www.vidvisual.xyz',
    siteName: 'Vid Visual',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.vidvisual.xyz/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vid Visual — Turn YouTube Videos into Whiteboard Mind Maps',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vidvisual',
    creator: '@Ali_Mlk092',
    title: 'Vid Visual — AI YouTube Video Summarizer & Whiteboard Mind Maps',
    description:
      'Turn long YouTube videos, lectures, and podcasts into scannable whiteboard visuals, concept cards, and mind maps in under 60 seconds.',
    images: ['https://www.vidvisual.xyz/og-image.jpg'],
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
  url: 'https://www.vidvisual.xyz',
  logo: 'https://www.vidvisual.xyz/logo.png',
  description: 'AI-powered YouTube video summarizer and visual note-taking platform.',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vid Visual',
  url: 'https://www.vidvisual.xyz',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.vidvisual.xyz/?url={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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