export const PLANS = {
  free: {
    id: 'free', name: 'Free', price: 0, weekly: 3,
    watermark: true, hdPng: false, pdf: false, themes: false, priority: false, library: true,
    features: ['3 summaries / week', 'Whiteboard + mind map', 'JPG download'],
  },
  pro: {
    id: 'pro', name: 'Pro', price: 9, weekly: 50, popular: true,
    watermark: false, hdPng: true, pdf: false, themes: false, priority: true, library: true,
    features: ['50 summaries / week', 'Everything in Free', 'HD watermark-free PNG', 'Full personal library', 'Priority AI + support'],
  },
  unlimited: {
    id: 'unlimited', name: 'Unlimited', price: 19, weekly: 200,
    watermark: false, hdPng: true, pdf: true, themes: true, priority: true, library: true,
    features: ['200 summaries / week', 'Everything in Pro', 'PDF export', 'Custom visual themes', 'Early access to features'],
  },
  team: {
    id: 'team', name: 'Team', price: 49, weekly: 200,
    watermark: false, hdPng: true, pdf: true, themes: true, priority: true, library: true,
    features: ['Everything in Unlimited', '5 team members', 'Shared workspace', 'Admin dashboard', 'Priority everything'],
  },
};
export const PLAN_ORDER = ['free', 'pro', 'unlimited', 'team'];
export const getPlan = (id) => PLANS[id] || PLANS.free;
