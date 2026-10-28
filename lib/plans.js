export const PLANS = {
  free: {
    id: 'free', name: 'Free', price: 0, weekly: 3,
    watermark: true, hdPng: false, pdf: false, themes: false, priority: false, library: true,
    features: ['3 summaries / week', 'Whiteboard + mind map', 'JPG download (watermarked)'],
  },
  starter: {
    id: 'starter', name: '30-Summary Pack', price: 1.99, credits: 30, isOneTime: true,
    watermark: false, hdPng: true, pdf: true, themes: false, priority: true, library: true,
    badge: '⚡ 30 Summaries • $1.99',
    features: ['30 summaries included (counts down as used)', 'One-time payment (no subscription)', 'HD watermark-free PNG & PDF', 'Priority AI generation', 'Instant activation'],
  },
  pro: {
    id: 'pro', name: 'Pro', price: 9, weekly: 50, popular: true,
    watermark: false, hdPng: true, pdf: true, themes: false, priority: true, library: true,
    badge: '⭐ Most Popular',
    features: ['50 summaries / week', 'HD watermark-free PNG & PDF', 'Full personal library', 'Priority AI engine', 'Cancel anytime with 1 click'],
  },
  unlimited: {
    id: 'unlimited', name: 'Unlimited', price: 19, weekly: 200,
    watermark: false, hdPng: true, pdf: true, themes: true, priority: true, library: true,
    features: ['200 summaries / week', 'Everything in Pro', 'Custom visual themes', 'Early access to features', 'Priority VIP support'],
  },
  team: {
    id: 'team', name: 'Team', price: 49, weekly: 200,
    watermark: false, hdPng: true, pdf: true, themes: true, priority: true, library: true,
    features: ['Everything in Unlimited', '5 team members', 'Shared workspace', 'Admin dashboard', 'Priority everything'],
  },
};
export const PLAN_ORDER = ['free', 'starter', 'pro', 'unlimited'];
export const getPlan = (id) => PLANS[id] || PLANS.free;
