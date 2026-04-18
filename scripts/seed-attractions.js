// Seed missing NY attractions into Supabase.
// After insert, run places-backfill.js to enrich with Google data.

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env','utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const DEST = 'new-york'
const apply = process.argv.includes('--apply')

const NEW_ATTRACTIONS = [
  {
    slug: 'summit-one-vanderbilt', name_he: 'סאמיט וואן ונדרבילט', name_en: 'Summit One Vanderbilt',
    category: 'observation', area: 'Midtown',
    excerpt: 'תצפית חדשה ומפוצצת חושים על ניו יורק — חדרי מראות, רצפות זכוכית ואלבסקונדור בגובה 300 מטר.',
    description: 'Summit One Vanderbilt היא חוויית תצפית immersive שמשלבת אמנות, ראייה מ-91 קומות ואפקטים חזותיים. פתוחה מ-2021 ליד גרנד סנטרל.',
    is_free: false, price_range: '$$$', featured: true,
  },
  {
    slug: 'edge-observation', name_he: 'אדג׳ — תצפית הדסון יארדס', name_en: 'Edge at Hudson Yards',
    category: 'observation', area: 'Hudson Yards',
    excerpt: 'המרפסת התצפית הגבוהה ביותר בחצי הכדור המערבי — 345 מטר מעל הרחוב, רצפת זכוכית ו-view של 360°.',
    description: 'Edge היא מרפסת תצפית משולשת בהדסון יארדס, עם רצפת זכוכית וגג פתוח. מציעה View יחודי של מנהטן מהמערב.',
    is_free: false, price_range: '$$$', featured: true,
  },
  {
    slug: 'guggenheim-museum', name_he: 'מוזיאון הגוגנהיים', name_en: 'Solomon R. Guggenheim Museum',
    category: 'museum', area: 'Upper East Side',
    excerpt: 'מוזיאון אייקוני בתכנון פרנק לויד רייט, עם ספיראלה מהפנטת ואוספים של אמנות מודרנית.',
    description: 'הגוגנהיים ידוע בארכיטקטורה שלו כמעט כמו באוסף — ספיראלה פנימית של 6 רמות. ממוקם על שדרה חמישית.',
    is_free: false, price_range: '$$',
  },
  {
    slug: 'whitney-museum', name_he: 'מוזיאון וויטני', name_en: 'Whitney Museum of American Art',
    category: 'museum', area: 'Meatpacking District',
    excerpt: 'מוזיאון האמנות האמריקאית הגדול בעולם — במבנה עכשווי של Renzo Piano בקצה הדרומי של ה-High Line.',
    description: 'הוויטני מתמקד אך ורק באמנות אמריקאית בת זמננו. המרפסות הפתוחות שלו מספקות מבט נהדר על מנהטן.',
    is_free: false, price_range: '$$',
  },
  {
    slug: 'little-island', name_he: 'ליטל איילנד', name_en: 'Little Island',
    category: 'park', area: 'Hudson River Park',
    excerpt: 'פארק צף מעל המים על "עציצים" בטון מרחפים — פתוח לציבור וחינמי, עם נופים של מנהטן והנהר.',
    description: 'ליטל איילנד נפתח ב-2021. פארק בגודל 2.4 דונם נישא על 132 עמודים מעל נהר ההדסון. יש בו אמפיתאטרון, גבעות ומבטים.',
    is_free: true, price_range: 'חינם',
  },
  {
    slug: 'the-vessel', name_he: 'ה-Vessel', name_en: 'The Vessel',
    category: 'landmark', area: 'Hudson Yards',
    excerpt: 'מבנה אמנות מרהיב של Thomas Heatherwick — 154 מדרגות פיתולות וחדר תצפית במרכז Hudson Yards.',
    description: 'The Vessel הוא מיצב כורוניקה מסטאלי בגובה 50 מטר. פתוח ברמת קומה ראשונה לצפייה (העליות סגורות כרגע).',
    is_free: true, price_range: 'חינם',
  },
  {
    slug: 'madison-square-garden', name_he: 'מדיסון סקוור גארדן', name_en: 'Madison Square Garden',
    category: 'entertainment', area: 'Midtown',
    excerpt: 'האולם הכי מפורסם באמריקה — הביתי של הניקס והריינג׳רס, מארח קונצרטים ואירועי ספורט גדולים.',
    description: 'MSG, "The World\'s Most Famous Arena", ממוקם מעל Penn Station. 20,000 מקומות ישיבה. טורים מודרכים יומיים.',
    is_free: false, price_range: '$$$',
  },
  {
    slug: 'tenement-museum', name_he: 'מוזיאון הטנמנט', name_en: 'Tenement Museum',
    category: 'museum', area: 'Lower East Side',
    excerpt: 'מוזיאון ייחודי בבניין מגורים היסטורי — סיפורי מהגרים שהגיעו לניו יורק מ-1863 ועד היום.',
    description: 'סיור מודרך בלבד. דירות משוחזרות של משפחות אמיתיות — ליטאים, איטלקים, יהודים. חובה להזמין מראש.',
    is_free: false, price_range: '$$',
  },
  {
    slug: 'ellis-island', name_he: 'אליס איילנד', name_en: 'Ellis Island',
    category: 'museum', area: 'New York Harbor',
    excerpt: 'האי שדרכו עברו 12 מיליון מהגרים לאמריקה — מוזיאון מרגש, חלק מכרטיס פסל החירות.',
    description: 'המוזיאון מספר את סיפור ההגירה לאמריקה בין 1892-1954. מגיעים באותה מעבורת של Statue of Liberty.',
    is_free: false, price_range: '$$',
  },
  {
    slug: 'new-york-public-library', name_he: 'הספרייה הציבורית של ניו יורק', name_en: 'New York Public Library (Stephen A. Schwarzman Building)',
    category: 'landmark', area: 'Midtown',
    excerpt: 'הבניין הראשי של הספרייה על 5th Avenue — אולם הקריאה Rose המרשים, האריות בכניסה, וכניסה חינמית.',
    description: 'אייקון ב-42nd Street — אולם הקריאה Rose באורך 90 מטר מקושט בתקרות ציוריות. מוזיאון עם תערוכות מתחלפות. חינם.',
    is_free: true, price_range: 'חינם',
  },
  {
    slug: 'brooklyn-bridge-park', name_he: 'פארק גשר ברוקלין', name_en: 'Brooklyn Bridge Park',
    category: 'park', area: 'DUMBO',
    excerpt: 'פארק באורך 2 ק"מ לאורך גדת ברוקלין — נופים של מנהטן, סקייטפארק, גלגל ג׳יין ומסעדות.',
    description: 'משלב פיאז\'ות ורק-קליקים. Pier 1-6 עם פעילויות שונות. Jane\'s Carousel ב-DUMBO. נקודת צילום מדהימה.',
    is_free: true, price_range: 'חינם',
  },
  {
    slug: 'prospect-park', name_he: 'פרוספקט פארק', name_en: 'Prospect Park',
    category: 'park', area: 'Park Slope',
    excerpt: 'פארק גדול של 2,130 דונם בברוקלין — תוכנן באותם מעצבים של סנטרל פארק, פחות צפוף, יותר אותנטי.',
    description: 'Frederick Law Olmsted עיצב גם כאן. אגם, יער, גן חיות, קרוסלה. הלב הירוק של ברוקלין.',
    is_free: true, price_range: 'חינם',
  },
  {
    slug: 'brooklyn-museum', name_he: 'מוזיאון ברוקלין', name_en: 'Brooklyn Museum',
    category: 'museum', area: 'Prospect Heights',
    excerpt: 'מוזיאון האמנות השני בגודלו בניו יורק — אוסף מצרי מפורסם, אמנות אמריקאית, "First Saturdays" חינם.',
    description: 'ממוקם מול פרוספקט פארק. אוסף של 1.5 מיליון פריטים. בכל שבת ראשונה של חודש — כניסה וקונצרטים חינם.',
    is_free: false, price_range: '$$',
  },
  {
    slug: 'the-cloisters', name_he: 'הקלויסטרס', name_en: 'The Met Cloisters',
    category: 'museum', area: 'Fort Tryon Park',
    excerpt: 'סניף אמנות ימי הביניים של המטרופוליטן — מנזר צרפתי עתיק ששוחזר בקצה הצפוני של מנהטן.',
    description: 'מבנה שנבנה מאבני מנזרים אירופיים. האוסף הגדול ביותר בעולם של אמנות ימי-ביניים. שקט להפליא.',
    is_free: false, price_range: '$$',
  },
  {
    slug: 'lincoln-center', name_he: 'לינקולן סנטר', name_en: 'Lincoln Center for the Performing Arts',
    category: 'entertainment', area: 'Upper West Side',
    excerpt: 'מתחם התרבות הגדול בניו יורק — מטרופוליטן אופרה, הפילהרמונית, NYC Ballet. 30 מופעים בלילה.',
    description: 'מתחם 16 דונם שכולל 12 אולמות. סיורי backstage זמינים. המזרקה המפורסמת בכניסה.',
    is_free: true, price_range: 'חינם לסיור',
  },
  {
    slug: 'wall-street-charging-bull', name_he: 'וואל סטריט ושור הזעם', name_en: 'Wall Street & Charging Bull',
    category: 'landmark', area: 'Financial District',
    excerpt: 'לב הפיננסים — הבורסה (NYSE), שור הזעם של Arturo Di Modica, ו-Fearless Girl מולה.',
    description: 'Charging Bull הוצב ב-1989 כסמל חוסן אחרי המפולת. Fearless Girl מולו מאז 2017. NYSE סגור לציבור.',
    is_free: true, price_range: 'חינם',
  },
  {
    slug: 'battery-park', name_he: 'בטרי פארק', name_en: 'Battery Park',
    category: 'park', area: 'Financial District',
    excerpt: 'הפארק בקצה דרום מנהטן — נקודת היציאה למעבורות פסל החירות ואליס איילנד, ו-SeaGlass Carousel.',
    description: 'רציף היוצא של Statue Cruises. Sphere Memorial לנפגעי 9/11. SeaGlass Carousel — קרוסלת דגים ייחודית.',
    is_free: true, price_range: 'חינם',
  },
  {
    slug: 'central-park-zoo', name_he: 'גן החיות של סנטרל פארק', name_en: 'Central Park Zoo',
    category: 'park', area: 'Central Park',
    excerpt: 'גן חיות קטן ומקסים בתוך סנטרל פארק — פינגווינים, דבי שלג, אריות ים, פרפרים טרופיים.',
    description: 'מעולה לילדים. הגן שנותן השראה ל-Madagascar. בית-חום טרופי פתוח כל השנה.',
    is_free: false, price_range: '$$', family_friendly: true,
  },
  {
    slug: 'citi-field', name_he: 'סיטי פילד', name_en: 'Citi Field',
    category: 'sports', area: 'Flushing',
    excerpt: 'אצטדיון הבייסבול של ניו יורק מטס — חוויה אמריקאית קלאסית עם hot dogs ו-cracker jack.',
    description: 'האצטדיון נפתח ב-2009. 41,922 מושבים. טורים מודרכים זמינים כשהקבוצה לא משחקת. Shea Stadium לשעבר.',
    is_free: false, price_range: '$$$',
  },
  {
    slug: 'barclays-center', name_he: 'ברקליז סנטר', name_en: 'Barclays Center',
    category: 'sports', area: 'Prospect Heights',
    excerpt: 'הבית של ברוקלין נטס (NBA) ו-New York Liberty (WNBA) — גם אולם אירועים וקונצרטים.',
    description: 'נפתח ב-2012. 19,000 מקומות. ממוקם מעל תחנת Atlantic Avenue-Barclays Center (9 קווי מטרו).',
    is_free: false, price_range: '$$$',
  },
]

async function run() {
  console.log(`Will add ${NEW_ATTRACTIONS.length} attractions (apply=${apply})`)

  // Check which slugs already exist
  const { data: existing } = await sb.from('attractions').select('slug').eq('destination_id', DEST)
  const existingSlugs = new Set((existing || []).map(r => r.slug))
  const toInsert = NEW_ATTRACTIONS.filter(r => !existingSlugs.has(r.slug))
  const skipped = NEW_ATTRACTIONS.filter(r => existingSlugs.has(r.slug)).map(r => r.slug)
  if (skipped.length) console.log('SKIPPED (already exist):', skipped.join(', '))

  console.log(`Inserting ${toInsert.length} new attractions`)
  for (const row of toInsert) {
    const { price_range, ...rest } = row
    const payload = { ...rest, destination_id: DEST, published: true, sort_order: 500, metadata: price_range ? { price_display: price_range } : {} }
    console.log(`  + ${row.slug}`)
    if (apply) {
      const { error } = await sb.from('attractions').insert(payload)
      if (error) console.log('    FAIL:', error.message)
    }
  }
  console.log('\nDone.')
  if (apply) console.log('Next: run `node scripts/places-backfill.js attractions --skip-broadway --apply` to enrich with Google data, then `node scripts/rank-popularity.js attractions --apply` to re-rank.')
}

run()
