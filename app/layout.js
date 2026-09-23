import './globals.css';

const SITE_URL = 'https://vidvisual-tau.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vid Visual — Turn YouTube Videos into Visual Summaries & Mind Maps',
    template: '%s · Vid Visual',
  },
  description:
    'Turn any YouTube video into a visual summary in seconds. Vid Visual reads the video for you and draws a whiteboard of key ideas or an infographic mind map, so you learn faster and remember more. Free to start, no card needed.',
  keywords: [
    'youtube video summary',
    'youtube summarizer',
    'video to mind map',
    'youtube to notes',
    'ai video summary tool',
    'convert youtube video to summary',
    'visual learning tool',
    'study from youtube videos',
  ],
  applicationName: 'Vid Visual',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Vid Visual — Turn YouTube Videos into Visual Summaries & Mind Maps',
    description:
      'Paste a YouTube link and get a whiteboard visual or infographic mind map in under a minute. Free to start.',
    url: '/',
    siteName: 'Vid Visual',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vid Visual — Turn YouTube Videos into Visual Summaries',
    description: 'Paste a YouTube link. Get a visual summary you will remember.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat+Brush&family=Figtree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}