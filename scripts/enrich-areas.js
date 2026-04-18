// Enrich 7 existing NY areas with expanded full_content + deeper FAQ.
// Uses existing metadata (must_see, best_food, best_bars, history, subway_lines, getting_there).
// All H2 headings include "<area name> בניו יורק" for keyword density (per CLAUDE.md rule).

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env','utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const DEST = 'new-york'
const apply = process.argv.includes('--apply')

function renderMustSee(items, areaHe) {
  if (!items?.length) return ''
  const lines = items.map(m => `- **${m.name}** — ${m.description}`).join('\n')
  return `\n## מה לראות ב${areaHe} בניו יורק\n\n${lines}\n`
}

function renderBestFood(items, areaHe) {
  if (!items?.length) return ''
  const lines = items.map(m => `- **${m.name}** (${m.type}${m.price_range ? ', ' + m.price_range : ''}) — ${m.description}`).join('\n')
  return `\n## איפה לאכול ב${areaHe} בניו יורק\n\n${lines}\n`
}

function renderBestBars(items, areaHe) {
  if (!items?.length) return ''
  const lines = items.map(m => `- **${m.name}** (${m.type}, ${m.vibe}) — ${m.description}`).join('\n')
  return `\n## בארים וחיי לילה ב${areaHe} בניו יורק\n\n${lines}\n`
}

// Per-area extra sections (vibe, best_for, practical tips)
const AREA_INTROS = {
  chinatown: {
    lead: `צ'יינה טאון היא השכונה הסינית הגדולה והוותיקה ביותר בארצות הברית — עולם שלם של טעמים, ריחות וצבעים בתוך לב מנהטן. השכונה פרושה על פני 50 רחובות ברובע התחתון, מ-Canal Street עד East Broadway, ומאוכלסת ביותר מ-100,000 תושבים סיניים. למבקרים בניו יורק, צ'יינה טאון היא חוויה חושית בלתי-נשכחת: דוכני פרות אקזוטיים, מקדשים בודהיסטים, דים-סאם מסורתי, חנויות תה וצמחי מרפא, וסמטאות שנראות כאילו נלקחו ישירות מהונג-קונג. זו אחת השכונות האותנטיות ביותר בניו יורק, והיא גם אחת הזולות — ארוחה ראויה לציון אפשרית כאן ב-10-15$ בלבד.`,
    why_visit: `הסיבה המרכזית לבקר בצ'יינה טאון בניו יורק היא האוכל. רשתות הדים-סאם הוותיקות, כיסוני המרק של Joe's Shanghai והנודלס המושכים ביד של Xi'an — כל אלה מגדירים את התרבות הקולינרית של השכונה. אבל צ'יינה טאון היא הרבה מעבר לאוכל: מקדש Mahayana עם פסל בודהה מוזהב בגובה 5 מטרים, Columbus Park שבו מקומיים משחקים מאג'ונג, וסמטת Doyers הזיגזגית שהייתה פעם מכונה "זווית הדמים" בגלל המלחמות בין Tongs (אגודות סודיות סיניות) בתחילת המאה ה-20.`,
    practical: `צ'יינה טאון בניו יורק נגישה ב-7 קווי מטרו (6, J, Z, N, Q, R, W) — ברדיוס של 5 דקות הליכה מכל תחנה ברחוב Canal. השעות הפופולריות הן סוף שבוע בין 10:00-14:00 לדים-סאם, וערב ליום הארוכים ב-Joe's Shanghai. ההמלצה שלנו: הקדישו 3-4 שעות, התחילו בבוקר בדים-סאם, המשיכו לסיור בסמטאות, וסיימו עם קוקטייל ב-Apotheke (בית מרקחת לשעבר שהפך לקוקטייל בר).`,
  },
  dumbo: {
    lead: `DUMBO (Down Under the Manhattan Bridge Overpass) היא אחת השכונות היפות ביותר בניו יורק — מחסנים תעשייתיים מאבן שהפכו ללופטים, גלריות אמנות ובוטיקים יוקרתיים. ממוקמת בצפון-מערב ברוקלין, בין Manhattan Bridge ל-Brooklyn Bridge, DUMBO מציעה את אחד הצילומים האייקוניים ביותר בעיר: המבט על גשר Manhattan מרחוב Washington, עם Empire State Building בדיוק במסגרת הגשר. השכונה הפכה לאטרקציה חובה לכל מבקר בניו יורק — גם בזכות הנופים, גם בזכות האוכל המצוין, וגם בזכות האווירה האמנותית-יצירתית שבה. זו השכונה בה ממוקמים משרדי Etsy, Adobe וחברות סטארטאפ רבות.`,
    why_visit: `הסיבה העיקרית לבקר ב-DUMBO בניו יורק היא הצילום. Washington Street וWater Street מציעים את הזוויות הכי אינסטגרמיות של Manhattan Bridge, ו-Brooklyn Bridge Park הסמוך הוא אחד הפארקים היפים בברוקלין. Jane's Carousel — קרוסלה היסטורית מ-1922 בתוך קופסת זכוכית על גדת הנהר — היא אטרקציה ייחודית למשפחות. אבל DUMBO היא הרבה יותר: Time Out Market ב-Empire Stores מציע עשרות שפים ברגל אחת, Brooklyn Ice Cream Factory מול הנהר מגיש גלידה קלאסית מאז 1922, ו-Almondine Bakery הצרפתית מהמעולות בברוקלין.`,
    practical: `מגיעים ל-DUMBO בניו יורק ב-F או A/C לתחנת York Street (5 דקות הליכה). אופציה שנייה ויפה יותר: חוצים את Brooklyn Bridge ברגל מ-Manhattan (25 דקות) — הולכים מעל הגשר וצונחים היישר לתוך השכונה. ה-NYC Ferry מפיר 1 ל-DUMBO/Fulton Ferry (15 דקות משייט, $4) הוא אחת הטיולים הזולים והיפים בעיר. השעות הכי טובות לצילום: שעת הזהב (שעה לפני שקיעה) או הבוקר המוקדם לפני הקהל.`,
  },
  'greenwich-village': {
    lead: `גריניץ' וילג' היא הלב הבוהמייני של ניו יורק — שכונת-בתים קומתיים נמוכים עם רחובות עקומים (נדיר במנהטן!), בתי בראונסטון היסטוריים, ג'אז קלאבים אגדיים ותחושה של ניו יורק של פעם. ממוקמת בין Houston Street, 14th Street, 6th Avenue ונהר Hudson, היא השכונה שבה חיו בוב דילן, ארנסט המינגוויי, ג'ק קרואק ואלן גינסברג. גריניץ' וילג' הולידה את תנועת הביט, את הפמיניזם השני ואת ה-Stonewall — אירועי 1969 שהצית את תנועת זכויות ה-LGBTQ. למבקר בניו יורק היא ההזדמנות להרגיש את ה-Village Soul — שילוב של היסטוריה, מוזיקה ותרבות קפה.`,
    why_visit: `גריניץ' וילג' בניו יורק היא המקום לבלות ערב מוזיקלי אמיתי. Blue Note הוא הקלאב ג'אז המפורסם בעולם, Village Vanguard פתוח מאז 1935 והוא המקדש של bebop, Comedy Cellar חיזק שמות כמו Jerry Seinfeld ו-Dave Chappelle. Washington Square Park הוא לב השכונה — שער הניצחון של 1892, מוזיקאי רחוב, שחקני שחמט, וסטודנטים של NYU. Bleecker Street מציעה חנויות מוזיקה, בתי קפה ומסעדות איטלקיות-אמריקאיות ותיקות. The Stonewall Inn — מקום מקודש ב-LGBTQ history — עדיין פעיל ברחוב Christopher.`,
    practical: `מגיעים לגריניץ' וילג' בניו יורק ב-A/B/C/D/E/F/M לתחנת West 4th Street — הלב של השכונה. הזמן האידיאלי לבקר הוא בשעות הערב (19:00 ואילך), כשהבארים והקלאבים נפתחים. סיור הליכה טוב מתחיל ב-Washington Square Park, ממשיך ל-MacDougal Street (מסעדות ובארים ותיקים), עובר ל-Bleecker Street, וסיים ב-Blue Note או Village Vanguard לערב ג'אז.`,
  },
  harlem: {
    lead: `הארלם היא שכונת-הלב של התרבות האפרו-אמריקאית בארצות הברית — נשמה, ג'אז, סול פוד, וכנסיות גוספל עוצמתיות. ממוקמת בקצה הצפוני של מנהטן (110th Street ומעלה), הארלם הייתה מרכז ה-Harlem Renaissance בשנות ה-1920 — תקופת פריחה ספרותית ואמנותית שהולידה את ראלף אליסון, לאנגסטון יוז ודוק אלינגטון. היום, הארלם היא שכונה מתפתחת — שילוב של היסטוריה עמוקה עם גיל תוססת של בתי קפה חדשים, מסעדות אפרו-אמריקאיות מסורתיות, ו-Apollo Theater האגדי שבו הופיעו לראשונה מייקל ג'קסון, אלה פיצג'רלד וג'יימס בראון.`,
    why_visit: `הסיבה המרכזית לבקר בהארלם בניו יורק היא המוזיקה. ערב ב-Apollo Theater — במיוחד "Amateur Night" בימי רביעי — הוא חוויה בלתי-נשכחת. ימי א' בבוקר בכנסיית Abyssinian Baptist (מהגדולות באמריקה) מציעות חוויית גוספל אותנטית שהיא אחת הטובות בעיר. המוזיאון Studio Museum in Harlem מציג אמנות של אמנים אפרו-אמריקאיים. בתחום האוכל — Sylvia's Restaurant הוא הסול-פוד המסורתי (פתוח מאז 1962), Red Rooster של Marcus Samuelsson מציג מטבח אפרו-אמריקאי מודרני, ו-Melba's הוא המקום לווופלס ועוף.`,
    practical: `מגיעים להארלם בניו יורק ב-2/3 לתחנת 125th Street (מזרח הארלם), או A/B/C/D ל-125th Street (Central Harlem). חוצים מ-Midtown ב-15-20 דקות. האזורים העיקריים: Central Harlem סביב 125th St, Spanish Harlem (East Harlem) לאוכל לטיני, ו-Strivers' Row על 138th-139th Streets לרחובות הברונסטון היפים ביותר. הזמן הטוב ביותר לבקר: יום א' בבוקר לגוספל, או ערב רביעי ל-Apollo Amateur Night.`,
  },
  'lower-east-side': {
    lead: `Lower East Side (LES) היא שכונת-ההיסטוריה של ההגירה היהודית לאמריקה. בין 1880 ל-1920, יותר מ-2 מיליון יהודים הגיעו דרך אליס איילנד והתיישבו כאן, בבתי Tenement צפופים. היום, LES היא שילוב ייחודי של היסטוריה יהודית עשירה (Katz's, Russ & Daughters, Tenement Museum), חיי לילה תוססים (Orchard Street, Ludlow Street) ותרבות אמנותית-היפסטרית. השכונה מתפשטת בין Delancey St בצפון, East Houston, Allen Street ו-FDR Drive. למבקר בניו יורק, LES מציעה שילוב נדיר: ארוחת צהריים ב-Katz's שנראה כאילו לא השתנה ב-130 שנה, בציר ברחוב Ludlow בערב, וסיור ב-Tenement Museum על ההיסטוריה של ההגירה.`,
    why_visit: `Katz's Delicatessen (מ-1888) הוא החוויה שאי-אפשר לפספס ב-Lower East Side בניו יורק — הפסטרמי הכי מפורסם בעולם, וכן, זה המקום שבו צולם "When Harry Met Sally". Russ & Daughters היא המעדנייה היהודית של LES מאז 1914 — לוקס, בייגל וקוויאר. Tenement Museum ברחוב Orchard מציע סיורים מודרכים בדירות משוחזרות של משפחות ליטאיות, איטלקיות ויהודיות אמיתיות. בערב, LES מתעוררת — Orchard St מלאה בבארים (Attaboy ל-cocktails, The Back Room לאווירת prohibition), PDT של speakeasy דרך תא טלפון ב-Crif Dogs, ו-Bowery Ballroom לקונצרטים.`,
    practical: `מגיעים ל-Lower East Side בניו יורק ב-F לתחנת Delancey Street או B/D ל-Grand Street. מקום הליכה מרכזי: Orchard Street (בין Houston ל-Delancey) — חנויות בוטיק, גלריות, מסעדות. אתר האוכל מופיע בבוקר (Katz's ו-Russ & Daughters פתוחים מ-08:00), החיים התרבותיים אחה"צ (Tenement Museum), והלילה מתחיל אחרי 19:00 בבארים.`,
  },
  soho: {
    lead: `סוהו (South of Houston Street) היא שכונת-האופנה של ניו יורק — רחובות מרוצפים באבני-מרצפת מהמאה ה-19, בניינים מפורסמים עם חזיתות ברזל יצוק (cast iron), ובוטיקים של המותגים הכי מגניבים בעולם. בשנות ה-60-70 סוהו הייתה שכונת-אמנים — אנדי וורהול, ז'אן מישל בסקיאט וינוקו אונו חיו פה בלופטים זולים. היום זו השכונה היקרה ביותר במנהטן — לופטים של $20,000 לחודש, חנויות Chanel ו-Gucci, ו-Dominique Ansel Bakery שהמציאה את ה-Cronut. למבקר בניו יורק, סוהו היא חובה: שילוב של אדריכלות היסטורית (יש פה יותר בניינים של cast iron מכל מקום אחר בעולם), אופנה ואוכל ברמה הכי גבוהה.`,
    why_visit: `סוהו בניו יורק היא השכונה לשופינג. Broadway (בין Houston ל-Canal) הוא הרחוב העמוס ביותר — Zara, Uniqlo, Muji. Spring Street מציע בוטיקים יותר יוקרתיים — Balthazar Bakery, Saint Laurent, Marni. Greene Street ו-Mercer Street — הרחובות המרוצפים הכי יפים, עם חנויות בוטיק קטנות. בתחום האוכל — Balthazar הוא הברנץ' הצרפתי-אייקוני של השכונה, Carbone (בגבול Village) הוא האיטלקי-אמריקאי הכי פופולרי, Sadelle's מציע tower של לוקס ובייגל, ו-Lombardi's Pizza (הפיצריה הראשונה באמריקה) נמצאת בגבול NoLita.`,
    practical: `מגיעים לסוהו בניו יורק ב-N/R/W לתחנת Prince Street, או 6 ל-Spring Street. הזמן הכי טוב לבקר הוא שבת או יום א' בבוקר (10:00-12:00) — הרחובות הכי יפים לפני הקהל. הליכה טיפוסית: מתחילים ב-Washington Square Park, יורדים דרום לרחוב Spring, ממשיכים ל-Broome ו-Grand, ומסיימים ב-Little Italy או Chinatown. סוהו היא שכונה של הליכה — ללא תחבורה פנימית.`,
  },
  williamsburg: {
    lead: `וויליאמסבורג היא השכונה ההיפסטרית של ברוקלין — בארים על גגות, מסעדות מגניבות, חנויות וינטג', נופים על הסקייליין של מנהטן, וקהילה יהודית-חסידית גדולה בצד הדרומי. ממוקמת בצפון-מערב ברוקלין, ממול מנהטן דרך East River, וויליאמסבורג הפכה מ-2000 ל-2015 לסמל של הגנטריפיקציה בניו יורק. היום זו שכונה של סטארטאפים, גלריות, brewery ו-rooftop bars — אבל גם שומרת על יהדות חסידית חיה ותוססת. למבקר בניו יורק, וויליאמסבורג מציעה חוויה מרעננת: אחרי ימים במנהטן הצפופה, השכונה הזו מספקת קצב איטי יותר, בניינים נמוכים, אוכל יצירתי ונוף מהמם על Manhattan Bridge ו-Empire State.`,
    why_visit: `הסיבה לבקר בוויליאמסבורג בניו יורק היא האוכל והבארים. Peter Luger — הסטייקהאוס המפורסם בעולם, פעיל מאז 1887 — הוא חובה (הזמנה חודש מראש, Porterhouse for Two הקלאסי). Roberta's ב-Bushwick הסמוך הוא הפיצריה ההיפסטרית המקורית. Smorgasburg — שוק האוכל של וויליאמסבורג בשבתות בקיץ — מכיל 100 דוכנים של שפים ברוקלינים מהמיטב. בתחום חיי הלילה — Westlight על גג William Vale Hotel מציע את הנוף הכי טוב על Manhattan, Maison Premiere ל-cocktails, ו-Brooklyn Bowl משלב באולינג עם קונצרטים.`,
    practical: `מגיעים לוויליאמסבורג בניו יורק ב-L לתחנת Bedford Avenue (הלב של השכונה) — 10 דקות מ-Union Square במנהטן. אופציה חלופית יפה: NYC Ferry מ-Wall Street או Midtown ($4, 20 דקות). ב-Bedford Ave עובר עיקר התיירות — חנויות וינטג', מסעדות, קפה. Grand Street ו-North 6th לבארים. בצד הדרומי, רחוב Lee Avenue — לב הקהילה החסידית. שימו לב: בשבת הצד החסידי סגור, אבל צפון וויליאמסבורג פועל כרגיל.`,
  },
}

function buildFullContent(area) {
  const intro = AREA_INTROS[area.slug]
  const areaHe = area.name_he.replace(/^ה/, '').trim() // for natural usage
  const nameHe = area.name_he
  const meta = area.metadata || {}

  const historyBlock = meta.history
    ? `\n## ההיסטוריה של ${nameHe} בניו יורק\n\n${meta.history}\n`
    : ''

  const bestTimeBlock = meta.best_time_to_visit
    ? `\n## מתי הזמן הטוב ביותר לבקר ב${nameHe} בניו יורק\n\n${meta.best_time_to_visit}\n\nהשכונה פעילה לאורך היום ובערב. בכל יום יש אופי שונה — ימי חול רגועים יותר, סופי שבוע עמוסים יותר בתיירים ומקומיים.\n`
    : ''

  const gettingThereBlock = meta.getting_there
    ? `\n## איך להגיע ל${nameHe} בניו יורק\n\n${meta.getting_there}\n${meta.subway_lines?.length ? `\n**קווי מטרו:** ${meta.subway_lines.join(', ')}\n` : ''}${meta.walking_time ? `\n**זמן סיור מומלץ:** ${meta.walking_time}\n` : ''}`
    : ''

  return [
    intro?.lead || area.description || area.excerpt,
    intro?.why_visit ? `\n## למה שווה לבקר ב${nameHe} בניו יורק\n\n${intro.why_visit}` : '',
    historyBlock,
    renderMustSee(meta.must_see, nameHe),
    renderBestFood(meta.best_food, nameHe),
    renderBestBars(meta.best_bars, nameHe),
    gettingThereBlock,
    bestTimeBlock,
    intro?.practical ? `\n## טיפים לטיול ב${nameHe} בניו יורק\n\n${intro.practical}` : '',
  ].filter(Boolean).join('\n').trim()
}

function buildFAQ(area) {
  const nameHe = area.name_he
  const borough = area.metadata?.borough || 'ניו יורק'
  // Keep existing FAQ entries, add more with keyword density
  const existing = Array.isArray(area.faq) ? area.faq : []
  const common = [
    {
      question: `מהם השכונות הסמוכות ל${nameHe} בניו יורק?`,
      answer: area.slug === 'chinatown' ? `${nameHe} גובלת ב-Little Italy בצפון, ב-Lower East Side במזרח, וב-SoHo במערב. כל אחת מהשכונות האלה במרחק הליכה של 5-10 דקות.`
        : area.slug === 'dumbo' ? `${nameHe} גובלת ב-Brooklyn Heights בדרום, ב-Vinegar Hill במזרח, ומתחברת ישירות ל-Manhattan דרך Brooklyn Bridge ו-Manhattan Bridge.`
        : area.slug === 'greenwich-village' ? `${nameHe} גובלת ב-West Village במערב, ב-East Village במזרח, ב-NoHo בצפון, וב-SoHo בדרום. כולן שכונות חובה בניו יורק.`
        : area.slug === 'harlem' ? `${nameHe} גובלת ב-Morningside Heights (Columbia University) בדרום, ב-Washington Heights בצפון, וב-East Harlem (Spanish Harlem) במזרח.`
        : area.slug === 'lower-east-side' ? `${nameHe} גובלת ב-East Village בצפון, ב-Chinatown בדרום, וב-NoLita במערב. כולן שכונות היסטוריות של ההגירה לניו יורק.`
        : area.slug === 'soho' ? `${nameHe} גובלת ב-Greenwich Village בצפון, ב-Little Italy ו-Chinatown בדרום, ב-NoLita ו-Bowery במזרח, וב-Tribeca בדרום-מערב.`
        : area.slug === 'williamsburg' ? `${nameHe} גובלת ב-Greenpoint בצפון, ב-Bedford-Stuyvesant בדרום-מזרח, וב-Bushwick במזרח — כולן שכונות הברוקלין המתפתחות.`
        : `${nameHe} ממוקמת ב${borough} ומחוברת למוקדי תיירות עיקריים בניו יורק.`,
    },
    {
      question: `כמה זמן כדאי להקדיש לסיור ב${nameHe} בניו יורק?`,
      answer: `המינימום המומלץ ל${nameHe} הוא ${area.metadata?.walking_time || '2-3 שעות'}. אם רוצים להעמיק — ארוחת צהריים, סיור ברגל, וביקור באתרי מפתח — הקדישו חצי יום (4-5 שעות).`,
    },
    {
      question: `האם ${nameHe} בניו יורק בטוחה?`,
      answer: `כן — ${nameHe} בטוחה לחלוטין לתיירים במשך היום ובערב. כמו בכל עיר גדולה, שמרו על תשומת-לב לרחבת הרחוב, חפצים אישיים, ו-מה קורה סביבכם. לא מומלץ לסייר באפילה בסמטאות שקטות לאחר חצות.`,
    },
    {
      question: `האם צריך להזמין מסעדות מראש ב${nameHe} בניו יורק?`,
      answer: `המסעדות המפורסמות דורשות הזמנה חודש מראש (למשל Peter Luger בוויליאמסבורג, Carbone ב-Greenwich Village). מקומות נוספים מקבלים walk-in אבל התור יכול להיות 30-60 דקות. אפליקציית Resy היא הכלי להזמנות ב${nameHe}.`,
    },
    {
      question: `האם ${nameHe} בניו יורק מתאימה למשפחות עם ילדים?`,
      answer: `${nameHe} מתאימה למשפחות — יש בה פארקים, אטרקציות לילדים ומסעדות ידידותיות. הימנעו מבארים מאוחר בערב. ${area.slug === 'dumbo' ? 'Brooklyn Bridge Park ו-Jane\'s Carousel מושלמים לילדים.' : area.slug === 'harlem' ? 'מוזיאון Studio Museum מציע תוכניות לילדים.' : ''}`,
    },
  ]
  const merged = [...existing]
  for (const f of common) {
    if (!merged.find(e => e.question === f.question)) merged.push(f)
  }
  return merged.slice(0, 10)
}

async function run() {
  const { data: areas } = await sb.from('areas').select('*').eq('destination_id', DEST).eq('published', true).order('slug')
  console.log(`Processing ${areas.length} areas (apply=${apply})`)

  for (const area of areas) {
    const fullContent = buildFullContent(area)
    const faq = buildFAQ(area)
    console.log(`\n[${area.slug}] existing full_content: ${area.full_content?.length || 0}ch -> new: ${fullContent.length}ch, FAQ: ${(area.faq?.length || 0)} -> ${faq.length}`)
    if (apply) {
      const { error } = await sb.from('areas').update({ full_content: fullContent, faq }).eq('id', area.id)
      if (error) console.log('  FAIL:', error.message)
      else console.log('  UPDATED')
    }
  }
  console.log('\nDone.')
}

run()
