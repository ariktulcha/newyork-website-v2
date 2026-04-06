/**
 * Site configuration — THE ONE FILE to change per destination.
 *
 * When cloning for a new destination:
 * 1. Copy this file
 * 2. Change all values below
 * 3. Done — Layout, Head, WhatsApp, footer, all read from here
 */

export const site = {
  brand: 'Yalla Bali',
  brandHe: 'יאללה באלי',
  brandAccent: 'באלי',           // The colored part of the logo
  brandPrefix: 'יאללה',          // The white part of the logo
  tagline: 'YOUR BALI GUIDE',
  taglineHe: 'המדריך הישראלי לבאלי',
  domain: 'yalla-bali.co.il',
  destinationName: 'באלי',       // Used in "מלונות ב{destinationName}"
  destinationNameEn: 'Bali',

  whatsapp: {
    phone: '972528211665',
    defaultMessage: 'היי, אנחנו מתכננים טיול לבאלי 🌴',
  },

  socials: {
    instagram: 'https://instagram.com/yallabaliil',
    facebook: 'https://facebook.com/yallabaliil',
    tiktok: 'https://tiktok.com/@yallabaliil',
  },

  hasTours: false,

  // Desktop nav links
  nav: [
    { label: 'ויזה לבאלי', href: '/visa' },
    { label: 'אטרקציות', href: '/attractions' },
    { label: 'אזורים', href: '/areas' },
    { label: 'מלונות', href: '/hotels' },
    { label: 'מסעדות', href: '/restaurants' },
    { label: 'מדריכים', href: '/guides' },
    { label: 'תכנון טיול', href: '/plan' },
  ],

  // Mobile menu sections
  mobileMenu: [
    {
      title: 'ויזה ותכנון',
      links: [
        { label: 'ויזה לבאלי', href: '/visa' },
        { label: 'תכנון טיול', href: '/plan' },
        { label: 'מדריכים', href: '/guides' },
        { label: 'אזורים', href: '/areas' },
      ],
    },
    {
      title: 'גלו',
      links: [
        { label: 'אטרקציות', href: '/attractions' },
        { label: 'מלונות', href: '/hotels' },
        { label: 'מסעדות', href: '/restaurants' },
        { label: 'חיי לילה', href: '/nightlife' },
      ],
    },
  ],

  // Footer columns
  footer: {
    description: 'המדריך המלא שלכם לבאלי — מסעדות, מלונות, אטרקציות וחוויות בלתי נשכחות.',
    ctaTitle: 'צריכים עזרה בתכנון הטיול?',
    ctaSubtitle: 'דברו איתנו בוואטסאפ — מענה מהיר ואישי',
    columns: [
      {
        title: 'ויזה וטיולים',
        links: [
          { label: 'ויזה לבאלי', href: '/visa' },
          { label: 'מלונות בבאלי', href: '/hotels' },
          { label: 'מסעדות בבאלי', href: '/restaurants' },
          { label: 'תכנון טיול', href: '/plan' },
          { label: 'מדריכים', href: '/guides' },
          { label: 'אזורים בבאלי', href: '/areas' },
        ],
      },
      {
        title: 'גלו',
        links: [
          { label: 'אטרקציות', href: '/attractions' },
          { label: 'חופים', href: '/beaches' },
          { label: 'מלונות', href: '/hotels' },
          { label: 'מסעדות', href: '/restaurants' },
          { label: 'חיי לילה', href: '/nightlife' },
          { label: 'שופינג ושווקים', href: '/shopping' },
        ],
      },
      {
        title: 'מידע',
        links: [
          { label: 'מזג אוויר בבאלי', href: '/weather' },
          { label: 'שאלות נפוצות', href: '/faq' },
          { label: 'אודות', href: '/about' },
          { label: 'צור קשר', href: '/contact' },
        ],
      },
    ],
  },

  // Default OG image path (relative to public/)
  defaultOgImage: '/images/heroes/hero-bali.webp',

  // Page title suffixes per entity type
  titleSuffix: {
    restaurant: 'מסעדות',
    hotel: 'מלונות',
    attraction: 'אטרקציות',
    nightlife: 'חיי לילה',
    tour: 'טיולים',
    guide: 'מדריכים',
    area: 'אזורים',
  },
} as const

// Helper: build WhatsApp URL
export function waUrl(message?: string): string {
  const msg = message || site.whatsapp.defaultMessage
  return `https://wa.me/${site.whatsapp.phone}?text=${encodeURIComponent(msg)}`
}

// Helper: build page title with brand suffix
export function pageTitle(prefix: string, entityType?: keyof typeof site.titleSuffix): string {
  const suffix = entityType ? `${site.titleSuffix[entityType]} ב${site.destinationName}` : ''
  return `${prefix}${suffix ? ` | ${suffix}` : ''} | ${site.brand}`
}
