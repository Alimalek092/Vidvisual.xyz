const SITE_URL = 'https://www.vidvisual.xyz';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard', '/summary/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'Google-Extended',
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'OAI-SearchBot',
          'Twitterbot',
          'facebookexternalhit',
          'LinkedInBot',
          'WhatsApp',
          'TelegramBot',
          'Discordbot',
        ],
        allow: '/',
        disallow: ['/api/', '/dashboard', '/summary/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
