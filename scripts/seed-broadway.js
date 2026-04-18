// Seed 15 additional Broadway shows (2025-2026 season + classics missing from Supabase).
// Run backfill + ranking after insertion.

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env','utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const DEST = 'new-york'
const apply = process.argv.includes('--apply')

// Running/recent notable Broadway shows not yet in DB
const NEW_SHOWS = [
  {
    slug: 'and-juliet', name_he: 'אנד ג׳ולייט', name_en: '& Juliet',
    excerpt: 'גרסה פרפראזית ומהנה לסיפור של רומאו ויוליה — עם שירי Max Martin (Britney, Backstreet Boys, Katy Perry).',
    description: '& Juliet שואלת מה היה קורה אם יוליה לא הייתה מתה. מחזמר ג\'וקבוקס מלא באנרגיה, במקור מלונדון.',
    theater: 'Stephen Sondheim Theatre',
  },
  {
    slug: 'operation-mincemeat', name_he: 'מבצע מינסמיט', name_en: 'Operation Mincemeat',
    excerpt: 'קומדיה מוזיקלית בריטית על מבצע ריגול אמיתי ממלחמת העולם השנייה — זוכת פרס אוליבייה.',
    description: 'חמישה שחקנים משחקים 85 דמויות. הצגה חדשה בברודווי שהגיעה ממערב לונדון ב-2025.',
    theater: 'John Golden Theatre',
  },
  {
    slug: 'buena-vista-social-club', name_he: 'בואנה ויסטה סושיאל קלאב', name_en: 'Buena Vista Social Club',
    excerpt: 'מחזמר כרגע בברודווי על אגדות המוזיקה הקובאנית — מוזיקה חיה, ריקודים ונופים של הוואנה.',
    description: 'מבוסס על הדיסק האגדי מ-1997. מחזמר חדש ב-2025, Tony nominee. אנסמבל חי על הבמה.',
    theater: 'Gerald Schoenfeld Theatre',
  },
  {
    slug: 'boop-musical', name_he: 'בופ! המחזמר', name_en: 'BOOP! The Musical',
    excerpt: 'בטי בופ מגיעה לברודווי — מחזמר צבעוני ומרהיב על דמות הקומיקס האייקונית מ-1930.',
    description: 'ההפקה החדשה של Jerry Mitchell (Kinky Boots, Legally Blonde). ויזואלי מטורף וכוריאוגרפיה נוצצת.',
    theater: 'Broadhurst Theatre',
  },
  {
    slug: 'gypsy-revival', name_he: 'ג׳יפסי — revival 2025', name_en: 'Gypsy',
    excerpt: 'הרווייוול של אחד המחזמרים הקלאסיים בהיסטוריה — עם Audra McDonald בתפקיד הראשי.',
    description: 'Gypsy של Jule Styne וStephen Sondheim חוזר ב-2024-25. ביקורות מהללות את הביצוע של Audra McDonald.',
    theater: 'Majestic Theatre',
  },
  {
    slug: 'stranger-things-first-shadow', name_he: 'סטריינג׳ר ת׳ינגס: הצל הראשון', name_en: 'Stranger Things: The First Shadow',
    excerpt: 'פריקוול לסדרה של Netflix — חוויה אורקולית מרהיבה שמתרחשת בהוקינס של שנות ה-50.',
    description: 'מהפקת West End שהגיעה לברודווי ב-2025. אפקטים מיוחדים מטורפים. חובה לאוהדי הסדרה.',
    theater: 'Marquis Theatre',
  },
  {
    slug: 'othello-denzel', name_he: 'אותלו', name_en: 'Othello',
    excerpt: 'שייקספיר עם Denzel Washington ו-Jake Gyllenhaal — הצגה קלאסית עם הופעות ענק (2025).',
    description: 'רצה תקופה מוגבלת ב-2025. מחיר כרטיסים גבוה (שיא שבירת שיאים) אבל הופעה בלתי-נשכחת.',
    theater: 'Ethel Barrymore Theatre',
  },
  {
    slug: 'glengarry-glen-ross-revival', name_he: 'גלנגרי גלן רוס (revival)', name_en: 'Glengarry Glen Ross',
    excerpt: 'המחזה של David Mamet עם Bob Odenkirk, Kieran Culkin ו-Bill Burr — revival של 2025.',
    description: 'המחזה הקלאסי על סוכני נדל"ן נואשים. הקאסט של 2025 מביא כוכבים מ-Better Call Saul ו-Succession.',
    theater: 'Palace Theatre',
  },
  {
    slug: 'cult-of-love', name_he: 'כת האהבה', name_en: 'Cult of Love',
    excerpt: 'דרמה משפחתית של Leslye Headland (Russian Doll) — ערב חג חד ומצחיק עם Zachary Quinto.',
    description: 'פרמירה בברודווי ב-2024. ליל חג מתפרק סביב השולחן המשפחתי. קומדיה שחורה קלאסית.',
    theater: 'Hayes Theater',
  },
  {
    slug: 'all-in-comedy-about-love', name_he: 'All In: קומדיה על אהבה', name_en: 'All In: Comedy About Love',
    excerpt: 'סיפורי אהבה קצרים של Simon Rich — מופע עם 4 שחקני-כוכבים מתחלפים.',
    description: 'קומדיה עם fresh casting rotation. Richard Kind, Fred Armisen, John Mulaney השתתפו. חוויה ייחודית.',
    theater: 'Hudson Theatre',
  },
  {
    slug: 'our-town-revival', name_he: 'העיירה שלנו (revival)', name_en: 'Our Town',
    excerpt: 'Revival של המחזה הקלאסי של Thornton Wilder עם Jim Parsons (Big Bang Theory) כ-Stage Manager.',
    description: 'פרס Pulitzer 1938. ב-2024 קיבל revival חדש ומצונן של Kenny Leon. חובה על מחברות תיאטרון.',
    theater: 'Barrymore Theatre',
  },
  {
    slug: 'sunset-blvd-revival', name_he: 'שדרת סאנסט (revival 2024)', name_en: 'Sunset Boulevard',
    excerpt: 'Nicole Scherzinger חוזרת להופעת חייה כנורמה דזמונד ב-revival של Jamie Lloyd — ויזואלית מהפכנית.',
    description: 'Andrew Lloyd Webber קלאסי עם גישה מודרנית — מצלמות על הבמה, שידור חי, חשיפה רגשית.',
    theater: 'St. James Theatre',
  },
  {
    slug: 'elf-the-musical', name_he: 'אלף המחזמר (חג מולד)', name_en: 'Elf The Musical',
    excerpt: 'מחזמר עונתי משפחתי לחג המולד — על בסיס הסרט הקלאסי עם Will Ferrell. רץ נובמבר-ינואר.',
    description: 'מחזמר חג משפחתי וחביב. מגיע לברודווי לעונת החגים בדרך כלל. מושלם לילדים.',
    theater: 'Marquis Theatre',
  },
  {
    slug: 'real-women-have-curves', name_he: 'לנשים אמיתיות יש עקומות', name_en: 'Real Women Have Curves: The Musical',
    excerpt: 'מחזמר על מהגרות מקסיקאיות ב-LA — סיפור העצמה נשי חם, חדש בברודווי 2025.',
    description: 'מבוסס על הסרט של 2002. מוזיקה ב-Spanglish. דוחף נראטיב של גוף חיובי והגשמה עצמית.',
    theater: 'James Earl Jones Theatre',
  },
  {
    slug: 'stomp-off-broadway', name_he: 'Stomp (Off-Broadway)', name_en: 'Stomp',
    excerpt: 'תופים משלטי אשפה וקרטונים — מופע perkusיה אייקוני שרץ ב-Off-Broadway מאז 1994.',
    description: 'אין דיאלוג, רק מקצבים מחפצים יום-יומיים. מעולה לכל גיל ולא-דוברי אנגלית. משחק בתיאטרון Orpheum.',
    theater: 'Orpheum Theatre',
  },
]

async function run() {
  const { data: existing } = await sb.from('attractions').select('slug').eq('destination_id', DEST).eq('category','broadway')
  const existingSlugs = new Set((existing || []).map(r => r.slug))
  const toInsert = NEW_SHOWS.filter(r => !existingSlugs.has(r.slug))
  const skipped = NEW_SHOWS.filter(r => existingSlugs.has(r.slug)).map(r => r.slug)
  if (skipped.length) console.log('SKIPPED (already exist):', skipped.join(', '))

  console.log(`Inserting ${toInsert.length} broadway shows (apply=${apply})`)
  for (const s of toInsert) {
    const { theater, ...rest } = s
    const payload = {
      ...rest,
      category: 'broadway',
      area: 'Broadway, Manhattan',
      destination_id: DEST,
      published: true,
      sort_order: 500,
      metadata: { theater },
    }
    console.log(`  + ${s.slug}`)
    if (apply) {
      const { error } = await sb.from('attractions').insert(payload)
      if (error) console.log('    FAIL:', error.message)
    }
  }
  console.log('\nDone.')
}

run()
