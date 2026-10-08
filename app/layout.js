import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import { Analytics } from '@vercel/analytics/next';

const SITE_URL = 'https://www.vidvisual.xyz';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Free AI YouTube Video Summarizer in Any Language (16+) · vidvisual',
    template: '%s · vidvisual',
  },
  description:
    'Free AI YouTube video summarizer. Turn long YouTube videos, podcasts, and university lectures into whiteboard concept cards and visual mind maps — in 16+ languages in 20 seconds. Save 90% of watch time.',
  keywords: [
    'vidvisual',
    'vid visual',
    'vidvisual.xyz',
    'vidvisual ai',
    'multi-language youtube summarizer',
    'translate youtube video to summary',
    'youtube video summarizer in spanish',
    'youtube video summarizer in hindi',
    'youtube video summarizer in french',
    'youtube video summarizer',
    'ai youtube summarizer',
    'youtube podcast summarizer',
    'summarize long podcast',
    'podcast to mind map',
    'huberman lab podcast notes',
    'lex fridman podcast summary',
    'youtube to mind map',
    'video to whiteboard summary',
    'turn youtube video into notes',
    'youtube lecture summarizer',
    'video to infographic',
    'convert youtube video to infographic',
    'ai visual note taking',
    'free youtube summary generator',
    'youtube transcript to mind map',
    'visual study notes from youtube',
    'infographic video summary',
    'best ai summarizer for youtube',
    'learn from youtube faster',
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
      { url: '/favicon.ico?v=2' },
      { url: '/icon.png?v=2', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: 'Vid Visual — Turn Long YouTube Videos into Beautiful Whiteboard Summaries in 20 Seconds',
    description:
      'Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard visuals, concept cards, and mind maps in under 20 seconds. Save 90% of watch time.',
    url: 'https://www.vidvisual.xyz',
    siteName: 'Vid Visual',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.vidvisual.xyz/og-image.jpg?v=2',
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
    title: 'Vid Visual — Turn Long YouTube Videos into Beautiful Whiteboard Summaries in 20 Seconds',
    description:
      'Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard visuals, concept cards, and mind maps in under 20 seconds. Save 90% of watch time.',
    images: ['https://www.vidvisual.xyz/twitter-image.jpg?v=2'],
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
  alternateName: ['vidvisual', 'vidvisual.xyz', 'Vidvisual', 'VidVisual', 'Vid Visual AI'],
  url: 'https://www.vidvisual.xyz',
  logo: 'https://www.vidvisual.xyz/logo.png',
  sameAs: [
    'https://x.com/vidvisual',
    'https://x.com/Ali_Mlk092',
    'https://github.com/Alimalek092/Vidvisual.xyz',
  ],
  description:
    'AI-powered YouTube video summarizer that turns long YouTube videos, podcasts, and lectures into whiteboard concept cards and visual mind maps.',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Vid Visual',
  alternateName: ['vidvisual', 'vidvisual.xyz', 'Vidvisual', 'VidVisual'],
  url: 'https://www.vidvisual.xyz',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.vidvisual.xyz/?url={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Vid Visual',
  url: 'https://www.vidvisual.xyz',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All Modern Web Browsers',
  description:
    'Turn long boring YouTube videos, multi-hour podcasts, and university lectures into scannable whiteboard notes and visual mind maps in under 20 seconds. Save 90% of watch time.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier with 3 visual summaries every week forever',
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
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/icon.png?v=2" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180" />
        <meta property="og:image" content="https://www.vidvisual.xyz/og-image.jpg?v=2" />
        <meta property="og:image:secure_url" content="https://www.vidvisual.xyz/og-image.jpg?v=2" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Vid Visual — Turn YouTube Videos into Whiteboard Mind Maps" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vidvisual" />
        <meta name="twitter:creator" content="@Ali_Mlk092" />
        <meta name="twitter:title" content="Vid Visual — Turn Long YouTube Videos into Beautiful Whiteboard Summaries in 20 Seconds" />
        <meta name="twitter:description" content="Turn long, boring YouTube videos, podcasts, and lectures into scannable whiteboard visuals, concept cards, and mind maps in under 20 seconds." />
        <meta name="twitter:image" content="https://www.vidvisual.xyz/twitter-image.jpg?v=2" />
        <meta name="twitter:image:src" content="https://www.vidvisual.xyz/twitter-image.jpg?v=2" />
        <meta name="twitter:image:alt" content="Vid Visual — AI YouTube Video Summarizer &amp; Mind Maps" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
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