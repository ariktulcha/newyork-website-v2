/**
 * Site configuration — WeNewYorker
 */

export const site = {
  brand: 'WeNewYorker',
  brandHe: 'WeNewYorker',
  brandAccent: 'NewYorker',
  brandPrefix: 'We',
  tagline: 'YOUR NEW YORK GUIDE',
  taglineHe: 'המדריך הישראלי לניו יורק',
  domain: 'wenewyorker.com',
  destinationName: 'ניו יורק',
  destinationNameEn: 'New York',

  whatsapp: {
    phone: '972528211665',
    defaultMessage: 'היי, אנחנו מתכננים טיול לניו יורק 🗽',
  },

  socials: {
    instagram: 'https://www.instagram.com/we.newyorker/',
    facebook: 'https://www.facebook.com/inewyorkheb/',
    tiktok: 'https://www.tiktok.com/@wenewyorker',
  },

  hasTours: true,

  nav: [
    { label: 'סיורים', href: '/tours' },
    { label: 'תכנון טיול', href: '/trip-planner' },
    { label: 'שכונות', href: '/areas' },
    { label: 'אטרקציות', href: '/attractions' },
    { label: 'מסעדות', href: '/restaurants' },
    { label: 'מלונות', href: '/hotels' },
    { label: 'חיי לילה', href: '/nightlife' },
    { label: 'ברודווי', href: '/broadway' },
    { label: 'בלוג', href: '/blog' },
  ],

  mobileMenu: [
    {
      title: 'הסיורים שלנו',
      links: [
        { label: 'מנהטן כמו מקומי', href: '/tours/manhattan-classic' },
        { label: 'גרפיטי בברוקלין', href: '/tours/brooklyn-graffiti' },
        { label: 'סיור אוכל NYC', href: '/tours/food-tour-nyc' },
        { label: 'כל הסיורים', href: '/tours' },
      ],
    },
    {
      title: 'תכנון הטיול',
      links: [
        { label: 'תכנון טיול', href: '/trip-planner' },
        { label: 'בלוג', href: '/blog' },
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
          { label: 'תכנון טיול', href: '/trip-planner' },
          { label: 'בלוג', href: '/blog' },
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
          { label: 'בלוג', href: '/blog' },
        ],
      },
      {
        title: 'מידע משפטי',
        links: [
          { label: 'מדיניות פרטיות', href: '/privacy' },
          { label: 'תנאי שימוש', href: '/terms' },
          { label: 'הצהרת נגישות', href: '/accessibility' },
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
