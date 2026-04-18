// Generate basic FAQ for attractions that lack one, derived from metadata.
// Usage: node scripts/generate-basic-faqs.mjs [--apply]
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n').filter(Boolean)
    .map((l) => l.split('=').map((s) => s.trim()).filter(Boolean))
    .filter((p) => p.length === 2)
)
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
const DESTINATION_ID = env.DESTINATION_ID
const apply = process.argv.includes('--apply')

function buildFaq(r) {
  const name = r.name_he
  const area = r.area || 'מנהטן'
  const category = r.category || ''

  const isBroadway = category === 'broadway'
  const isMuseum = category === 'museum' || (name && name.includes('מוזיאון'))
  const isPark = category === 'park' || (name && (name.includes('פארק') || name.includes('גן')))
  const isShopping = category === 'shopping'

  const faq = []

  // Q1: what is it / where
  if (isBroadway) {
    faq.push({
      q: `איפה מוצג ${name} בניו יורק?`,
      a: `${name} מוצג בברודווי, בתיאטרון על ${r.address || 'רחוב המחזות'}. המיקום נגיש במטרו ל-Times Square ומהווה חלק מרצועת המחזמרים המפורסמת של מנהטן.`
    })
  } else {
    faq.push({
      q: `איפה נמצא ${name}?`,
      a: `${name} נמצא ב${area}, ניו יורק${r.address ? `. הכתובת המדויקת: ${r.address}` : ''}. אפשר להגיע בתחבורה ציבורית.`
    })
  }

  // Q2: entry / tickets
  if (r.is_free) {
    faq.push({
      q: `האם הכניסה ל${name} חינם?`,
      a: `כן, הכניסה ל${name} חינם לחלוטין. אין צורך בכרטיס או הזמנה מראש.`
    })
  } else if (isBroadway) {
    faq.push({
      q: `כמה עולים כרטיסים ל${name}?`,
      a: `כרטיסים נעים בין $59 ל-$249 לפי המיקום באולם ויום השבוע. הדרך הטובה לחסוך: TKTS או rush tickets. הזמנה מראש מומלצת במיוחד לסופי שבוע.`
    })
  } else if (r.price_range) {
    faq.push({
      q: `כמה עולה כניסה ל${name}?`,
      a: `טווח המחירים ל${name} הוא ${r.price_range}. בדקו באתר הרשמי לעדכון מחירים ל-${new Date().getFullYear()}.`
    })
  } else {
    faq.push({
      q: `כמה עולה כניסה ל${name}?`,
      a: `מחירי הכניסה ל${name} משתנים לפי סוג הכרטיס וגיל המבקר. מומלץ לבדוק באתר הרשמי לפני הביקור לקבלת מחירים מעודכנים.`
    })
  }

  // Q3: time / duration
  if (isBroadway) {
    faq.push({
      q: `כמה זמן נמשך ${name}?`,
      a: `${name} נמשך כ-2 עד 2.5 שעות כולל הפסקה. מומלץ להגיע 15-30 דקות לפני תחילת ההצגה.`
    })
  } else if (isMuseum) {
    faq.push({
      q: `כמה זמן לתכנן לביקור ב${name}?`,
      a: `ביקור ממוצע ב${name} נמשך 2-3 שעות. חובבי אמנות עשויים להקדיש יום שלם. שבת ראשון יש לעתים כניסה חינם או מוזלת.`
    })
  } else if (isPark) {
    faq.push({
      q: `כמה זמן לתכנן ל${name}?`,
      a: `ביקור ב${name} יכול להימשך בין שעה למחצית היום, תלוי בפעילויות שתבחרו. מומלץ להגיע בבוקר בקיץ ובצהריים בחורף.`
    })
  } else {
    faq.push({
      q: `כמה זמן לתכנן לביקור ב${name}?`,
      a: `ביקור ב${name} נמשך בממוצע 1-3 שעות. הכי טוב לשלב אותו עם אטרקציות אחרות באזור ${area}.`
    })
  }

  // Q4: accessibility / kids / transport
  if (r.family_friendly) {
    faq.push({
      q: `${name} מתאים לילדים?`,
      a: `כן, ${name} ידידותי למשפחות עם ילדים. קיימים שירותים, מקומות ישיבה ושילוט ברור. מומלץ להביא חטיפים ומים.`
    })
  } else {
    faq.push({
      q: `איך מגיעים ל${name} בתחבורה ציבורית?`,
      a: `הדרך הנוחה ביותר להגיע ל${name} היא במטרו. מהתחנה הקרובה ביותר יש הליכה של 5-10 דקות. אובר ממידטאון עולה בערך $15-25.`
    })
  }

  // Q5: what to expect / tips
  if (isBroadway) {
    faq.push({
      q: `מה לדעת לפני הביקור ב${name}?`,
      a: `כניסה החל מגיל 5 (לפעמים 8+ תלוי בהצגה). לבוש קז׳ואל מקובל. יש מזנון בכניסה. צילום אסור במהלך ההצגה.`
    })
  } else {
    faq.push({
      q: `מה החוקים המיוחדים ב${name}?`,
      a: `מומלץ להגיע עם ID. צילום מותר ברוב האזורים. אסור להביא אוכל חיצוני לרוב האטרקציות. בדקו את האתר הרשמי לפרטים מלאים.`
    })
  }

  return faq
}

const { data: rows } = await sb.from('attractions')
  .select('id, slug, name_he, area, category, address, is_free, price_range, family_friendly, faq')
  .eq('destination_id', DESTINATION_ID)
  .eq('published', true)

let touched = 0, skipped = 0
for (const r of rows) {
  const existingFaq = Array.isArray(r.faq) ? r.faq : []
  if (existingFaq.length >= 3 && existingFaq[0].q && existingFaq[0].a) {
    skipped++
    continue
  }
  const newFaq = buildFaq(r)
  touched++
  if (apply) {
    const { error } = await sb.from('attractions').update({ faq: newFaq }).eq('id', r.id)
    if (error) console.error(`  ✗ ${r.slug}: ${error.message}`)
  }
}

console.log(`attractions: touched=${touched} kept_existing=${skipped} total=${rows.length}`)
if (!apply) console.log('(dry-run — run with --apply)')
