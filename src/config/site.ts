/**
 * Site configuration — Yalla New York
 */

export const site = {
  brand: 'Yalla NY',
  brandHe: 'יאללה ניו יורק',
  brandAccent: 'ניו יורק',
  brandPrefix: 'יאללה',
  tagline: 'YOUR NEW YORK GUIDE',
  taglineHe: 'המדריך הישראלי לניו יורק',
  domain: 'yalla-ny.co.il',
  destinationName: 'ניו יורק',
  destinationNameEn: 'New York',

  whatsapp: {
    phone: '972528211665',
    defaultMessage: 'היי, אנחנו מתכננים טיול לניו יורק 🗽',
  },

  socials: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },

  hasTours: true,

  nav: [
    { label: 'סיורים', href: '/tours' },
    { label: 'אטרקציות', href: '/attractions' },
    { label: 'מלונות', href: '/hotels' },
    { label: 'מסעדות', href: '/restaurants' },
    { label: 'ברודווי', href: '/broadway' },
    { label: 'חיי לילה', href: '/nightlife' },
    { label: 'מדריכים', href: '/guides' },
  ],

  mobileMenu: [
    {
      title: 'סיורים ותכנון',
      links: [
        { label: 'סיורים בעברית', href: '/tours' },
        { label: 'תכנון טיול', href: '/plan' },
        { label: 'מדריכים', href: '/guides' },
        { label: 'שכונות', href: '/areas' },
      ],
    },
    {
      title: 'גלו',
      links: [
        { label: 'אטרקציות', href: '/attractions' },
        { label: 'מלונות', href: '/hotels' },
        { label: 'מסעדות', href: '/restaurants' },
        { label: 'ברודווי', href: '/broadway' },
        { label: 'חיי לילה', href: '/nightlife' },
      ],
    },
  ],

  footer: {
    description: 'המדריך המלא שלכם לניו יורק — סיורים בעברית, מלונות, מסעדות, ברודווי, אטרקציות וחוויות בלתי נשכחות.',
    ctaTitle: 'רוצים להזמין סיור בעברית בניו יורק?',
    ctaSubtitle: 'דברו איתנו בוואטסאפ — הזמנה מהירה ושירות אישי',
    columns: [
      {
        title: 'סיורים ותכנון',
        links: [
          { label: 'סיורים בעברית', href: '/tours' },
          { label: 'מלונות בניו יורק', href: '/hotels' },
          { label: 'מסעדות בניו יורק', href: '/restaurants' },
          { label: 'תכנון טיול', href: '/plan' },
          { label: 'מדריכים', href: '/guides' },
          { label: 'שכונות', href: '/areas' },
        ],
      },
      {
        title: 'גלו',
        links: [
          { label: 'אטרקציות', href: '/attractions' },
          { label: 'ברודווי', href: '/broadway' },
          { label: 'חיי לילה', href: '/nightlife' },
          { label: 'מפה קולינרית', href: '/culinary-map' },
          { label: 'שופינג', href: '/shopping' },
        ],
      },
      {
        title: 'מידע',
        links: [
          { label: 'שאלות נפוצות', href: '/faq' },
          { label: 'אודות', href: '/about' },
          { label: 'צור קשר', href: '/contact' },
          { label: 'בלוג', href: '/guides' },
        ],
      },
    ],
  },

  defaultOgImage: '/images/heroes/hero-newyork.webp',

  titleSuffix: {
    restaurant: 'מסעדות',
    hotel: 'מלונות',
    attraction: 'אטרקציות',
    nightlife: 'חיי לילה',
    tour: 'סיורים',
    guide: 'מדריכים',
    area: 'שכונות',
  },
} as const

export function waUrl(message?: string): string {
  const msg = message || site.whatsapp.defaultMessage
  return `https://wa.me/${site.whatsapp.phone}?text=${encodeURIComponent(msg)}`
}

export function pageTitle(prefix: string, entityType?: keyof typeof site.titleSuffix): string {
  const suffix = entityType ? `${site.titleSuffix[entityType]} ב${site.destinationName}` : ''
  return `${prefix}${suffix ? ` | ${suffix}` : ''} | ${site.brand}`
}
