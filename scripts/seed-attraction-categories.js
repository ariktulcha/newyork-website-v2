#!/usr/bin/env node
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const DESTINATION_ID = 'new-york'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const categories = [
  {
    slug: 'broadway-shows',
    title: 'הופעות ברודווי',
    subtitle: '55 מופעים על הבמות הגדולות של ניו יורק',
    description: 'ברודווי הוא הסצנה הגדולה בעולם — 41 תיאטראות, 55+ מופעים פעילים, ומיליוני צופים בשנה. מ-Hamilton ועד The Lion King.',
    source_category_field: 'category',
    source_category_value: 'broadway',
    sort_order: 1,
    meta_title: 'הופעות ברודווי בניו יורק — המדריך המלא | WeNewYorker',
    meta_description: 'מדריך ברודווי: 55 מופעים, מחירים, איך לקנות כרטיסים זולים (TKTS, lottery), מושבים מומלצים. Hamilton, Wicked, The Lion King ועוד.',
    intro_content: `ברודווי הוא הלב של תיאטרון העולם — 41 תיאטראות באזור Times Square, עם 55+ מופעים פעילים. כל שנה 15 מיליון צופים מבקרים בברודווי, ולישראלים זה חוויה של חובה בכל טיול לניו יורק.

## איך לבחור מופע ברודווי בניו יורק?

- **מוזיקלים קלאסיים** — The Lion King (מאז 1997), Wicked, Chicago — מתאימים למשפחות ולמתחילים
- **מוזיקלים חדשים** — Hamilton, Dear Evan Hansen, MJ The Musical — מגמתיים ומודרניים
- **מחזות (Plays)** — Death of a Salesman, To Kill a Mockingbird — לאוהבי דרמה אמיתית
- **קומדיות מוזיקליות** — The Book of Mormon, Beetlejuice — מצחיקות ולעתים גסות

## איך לחסוך על כרטיסי ברודווי בניו יורק

- **TKTS Booth** — טיימס סקוור, 20-50% הנחה ביום המופע, תורים של 30-60 דקות
- **Broadway Lottery** — כרטיסים ב-$30-40 דרך הגרלות יומיות (Hamilton, Wicked)
- **Rush Tickets** — $30-50, קופה ביום המופע, first-come-first-served
- **TodayTix App** — הנחות של 20-40% על מופעים פחות פופולריים`,
    faq: [
      { q: 'כמה עולים כרטיסי ברודווי בניו יורק?', a: 'מחירים: Orchestra (שורות 1-15) — $150-350. Mezzanine (קומה 2) — $80-200. Balcony — $50-120. Premium seats (שורה 1-3): $400-800. TKTS: 20-50% הנחה. Lottery: $30-40 (אם זוכים). Hamilton ו-Wicked הכי יקרים — $200-500 לכרטיס רגיל.' },
      { q: 'מה המופע הכי טוב בברודווי?', a: 'לישראלים: The Lion King (ויזואלי מדהים, מתאים לכולם), Wicked (מוזיקלי טוב לזוגות), Hamilton (אם אתם אוהבים היפ-הופ והיסטוריה). למשפחות: Aladdin, Frozen. לבוגרים: The Book of Mormon (מצחיק וגס), Chicago (קלאסי). כל אחד עם חוויה אחרת — אתם לא יכולים לטעות עם קלאסי.' },
      { q: 'איך לקנות כרטיסים זולים לברודווי?', a: 'ה-3 הכי טובים: (1) TKTS Booth בטיימס סקוור — 20-50% הנחה, תור של 30-60 דקות, יום המופע בלבד. (2) Broadway Lottery — הגרלה יומית ב-$30-40 לכרטיס (TodayTix app). (3) Rush Tickets — קופה, $30-50, first-come-first-served, הגיעו 2 שעות לפני. אל תקנו מסרסורים (scalpers) — מזויפים לעתים.' },
      { q: 'האם כדאי להביא ילדים לברודווי?', a: 'כן — אם הם מעל גיל 6 ויכולים לשבת 2.5 שעות. מומלצים למשפחות: The Lion King (מגיל 4+), Aladdin, Frozen, Wicked. הימנעו מ-The Book of Mormon (גס), Hamilton (ארוך) עם ילדים מתחת ל-10. קנו מושבים ב-Orchestra ולא Balcony — ילדים לא רואים טוב מלמעלה. כרטיסי ילדים באותו מחיר כמו מבוגרים.' },
      { q: 'מתי הזמן הכי טוב לצפות בברודווי?', a: 'ימי שלישי-חמישי בערב (19:00-20:00) — הכי שקטים ויש יותר מקומות. שבת אחר הצהריים (matinée) — פופולרי מאוד למשפחות. ימי ראשון בערב — שקט יותר. הימנעו: שבת בערב (הכי יקר) ו-Opening Night (צפוף). הגיעו 15-20 דקות לפני שמתחיל — אין כניסה אחרי תחילת המופע.' }
    ],
  },
  {
    slug: 'museums',
    title: 'מוזיאונים',
    subtitle: 'MET, MoMA, Guggenheim ועוד 8 מוזיאונים מובילים',
    description: '11 מוזיאונים מובילים בניו יורק — מ-Metropolitan Museum (הגדול בעולם) ועד MoMA (אמנות מודרנית) ו-Guggenheim (אדריכלות).',
    source_category_field: 'category',
    source_category_value: 'museum',
    sort_order: 2,
    meta_title: 'מוזיאונים בניו יורק — MET, MoMA, Guggenheim | WeNewYorker',
    meta_description: 'מדריך 11 מוזיאונים בניו יורק: Metropolitan, MoMA, Guggenheim, American Museum of Natural History. מחירים, שעות פתיחה, טיפים.',
    intro_content: `ניו יורק היא בירת המוזיאונים של אמריקה — Metropolitan Museum of Art (הגדול בחצי הכדור המערבי), MoMA (אמנות מודרנית), Guggenheim (אדריכלות של Frank Lloyd Wright), ו-American Museum of Natural History (דינוזאורים ויקום). כל מטייל צריך לפחות 2-3 מוזיאונים בטיול.

## המוזיאונים המובילים בניו יורק

- **Metropolitan Museum of Art (The Met)** — אמנות מכל העולם, 5000 שנות היסטוריה, 2+ מיליון יצירות
- **MoMA** — אמנות מודרנית ועכשווית, ואן גוך, פיקאסו, וורהול
- **Guggenheim** — אדריכלות ספירלית מפורסמת + אמנות מודרנית
- **American Museum of Natural History** — דינוזאורים, פלנטריום, מדע
- **Whitney Museum of American Art** — אמנות אמריקאית עכשווית, Meatpacking District

## טיפים לביקור במוזיאונים בניו יורק

הגיעו בבוקר (פתיחה ב-10:00) — בשעות הצהריים התורים ארוכים. The Met מציע "suggested donation" — תשלמו כמה שתרצו (לא חובה $30). MoMA פתוח ביום שישי עד 20:00 בחינם (נצלו!). הזמינו כרטיסים מראש באתר — חוסך 30-60 דקות תור.`,
    faq: [
      { q: 'כמה עולה כניסה למוזיאון בניו יורק?', a: 'The Met: "suggested donation" $30 (מותר לשלם פחות). MoMA: $30 (חינם יום שישי 17:00-21:00). Guggenheim: $30. Natural History: "suggested donation" $28. Whitney: $30 (חינם יום שישי 19:00-22:00). ילדים מתחת ל-12 חינם ברוב המוזיאונים. CityPASS ($146) כולל 5 מוזיאונים — משתלם.' },
      { q: 'מה המוזיאון הכי שווה בניו יורק?', a: 'תלוי בטעם: לאמנות — The Met (2 מיליון יצירות, לא תראו הכל ביום אחד). למודרני — MoMA (ואן גוך, פיקאסו, וורהול). למדע ודינוזאורים — Natural History (מעולה לילדים). לאדריכלות — Guggenheim (הבניין עצמו הוא יצירת אמנות). שריינו 3-4 שעות לכל אחד.' },
      { q: 'כמה זמן לוקח ביקור ב-Metropolitan Museum?', a: 'The Met ענקי — אפשר לבלות בו יום שלם. מינימום: 3-4 שעות לסיור בסיסי (מצרים עתיקה, יוון, ימי הביניים, רנסנס, אמריקאי). ביקור מלא: 6-8 שעות. טיפ: תכננו מראש מה לראות (מפה באפליקציה). אל תנסו לראות הכל — תתעייפו. Temple of Dendur הוא חובה.' },
      { q: 'האם יש מוזיאונים חינם בניו יורק?', a: 'כן: The Met ו-Natural History הם "suggested donation" (תשלמו כמה שתרצו). MoMA חינם יום שישי 17:00-21:00. Whitney חינם יום שישי 19:00-22:00. Brooklyn Museum: "suggested donation". 9/11 Memorial Museum: חינם יום שלישי 17:00-20:00. The Cloisters (Met): כלול בכרטיס Met.' },
      { q: 'מה מוזיאון טוב לילדים בניו יורק?', a: 'American Museum of Natural History (דינוזאורים, פלנטריום, חיות — מגיל 3+). Intrepid Sea, Air & Space Museum (נושאת מטוסים, צוללת, חללית — מגיל 4+). Children\'s Museum of Manhattan (מגיל 1-7). Brooklyn Children\'s Museum (מגיל 1-7). The Met: אמנות מצרית ושריון ימי הביניים מרתקים לילדים.' }
    ],
  },
  {
    slug: 'landmarks',
    title: 'אתרים היסטוריים',
    subtitle: 'פסל החירות, גשר ברוקלין, סנטרל פארק',
    description: '11 אתרי ציון דרך שמגדירים את ניו יורק — מפסל החירות ועד אמפייר סטייט בילדינג.',
    source_category_field: 'category',
    source_category_value: 'landmark',
    sort_order: 3,
    meta_title: 'אתרים היסטוריים בניו יורק — Landmarks | WeNewYorker',
    meta_description: 'אתרים היסטוריים בניו יורק: פסל החירות, גשר ברוקלין, אמפייר סטייט, סנטרל פארק. כרטיסים, שעות פתיחה, טיפים לביקור.',
    intro_content: `האתרים ההיסטוריים של ניו יורק הם הדברים שכל ישראלי מכיר מהסרטים — פסל החירות, גשר ברוקלין, אמפייר סטייט בילדינג, סנטרל פארק, ו-Grand Central Terminal. הם חובה בכל טיול ראשון לניו יורק.

## האתרים ההיסטוריים המובילים בניו יורק

- **פסל החירות ואיי אליס** — מעבורת מ-Battery Park, חצי יום, חובה להזמין מראש
- **גשר ברוקלין** — הליכה של 30 דקות ממנהטן לברוקלין, חינם
- **אמפייר סטייט בילדינג** — תצפית מקומה 86 ו-102, $44-80
- **סנטרל פארק** — 341 דונם ירוקים, חינם, כל עונה אחרת
- **Grand Central Terminal** — תחנת רכבת מ-1913, ארכיטקטורה מרהיבה, חינם

## טיפים לאתרים היסטוריים בניו יורק

הזמינו כרטיסים לפסל החירות 2-4 שבועות מראש (הכתר נגמר חודשים מראש). גשר ברוקלין — הלכו ממנהטן לברוקלין (לא להפך — הנוף טוב יותר). אמפייר סטייט — הגיעו ב-08:00 (פתיחה) או ב-23:00 (מאוחר, פחות תורים). סנטרל פארק — שכרו אופניים ($15-20/שעה) להספיק יותר.`,
    faq: [
      { q: 'מה חובה לראות בניו יורק?', a: 'לטיול ראשון: פסל החירות (חצי יום), גשר ברוקלין (שעה), סנטרל פארק (2-3 שעות), אמפייר סטייט בילדינג (שעה), Times Square (30 דקות). אם יש זמן: 9/11 Memorial, High Line, Grand Central, Rockefeller Center. שריינו 3-4 ימים לכסות את כל ה-landmarks הגדולים.' },
      { q: 'האם פסל החירות שווה ביקור?', a: 'כן — בלי ויכוח. אפילו אם לא עולים לכתר (צריך להזמין חודשים מראש), הפדסטל והמוזיאון באי אליס (Ellis Island) הם חוויה מרגשת. המעבורת עצמה נותנת נוף מנהטן מהמים. עלות: $24 למבוגר (כולל מעבורת + אליס איילנד). שריינו חצי יום.' },
      { q: 'מתי הכי טוב ללכת על גשר ברוקלין?', a: 'שקיעה (17:00-18:00 בחורף, 19:00-20:00 בקיץ) — הנוף הכי יפה ברגע שמנהטן מאיר. בוקר מוקדם (07:00-08:00) — שקט ולא צפוף. הימנעו מ-10:00-16:00 — צפוף עם תיירים. הליכה ממנהטן לברוקלין (30-40 דקות) נותנת את הנוף הטוב — מנהטן מאחוריכם.' },
      { q: 'כמה עולים כרטיסים לתצפיות בניו יורק?', a: 'Empire State Building: $44 (קומה 86), $80 (86+102). Top of the Rock: $43. Edge (Hudson Yards): $41. One World Observatory: $43. Summit One Vanderbilt: $42. הכי שווה: Top of the Rock (נוף לאמפייר סטייט + סנטרל פארק). הכי מפחיד: Edge (רצפת זכוכית, 345 מטר). CityPASS ($146) כולל כמה מהם.' },
      { q: 'מה לעשות בסנטרל פארק?', a: 'חובה: Bethesda Fountain (מפורסמת מסרטים), Bow Bridge (רומנטי), Belvedere Castle (תצפית), The Great Lawn (פיקניק). שכרו אופניים ($15-20/שעה) או סירת משוטים ($20/שעה). בקיץ: Shakespeare in the Park (חינם, תור של 4+ שעות). בחורף: החלקה על קרח ב-Wollman Rink ($20-30). שריינו 2-4 שעות.' }
    ],
  },
  {
    slug: 'parks',
    title: 'פארקים וגנים',
    subtitle: 'סנטרל פארק, High Line, Brooklyn Bridge Park',
    description: '7 פארקים וגנים ירוקים שנותנים מנוחה מהבטון — מסנטרל פארק (843 דונם) ועד High Line הרכבת הנטושה.',
    source_category_field: 'category',
    source_category_value: 'park',
    sort_order: 4,
    meta_title: 'פארקים בניו יורק — Central Park, High Line | WeNewYorker',
    meta_description: 'פארקים בניו יורק: Central Park, High Line, Brooklyn Bridge Park, Bryant Park. כניסה חינם, פעילויות, טיפים לביקור.',
    intro_content: `ניו יורק ידועה כעיר בטון — אבל יש בה יותר שטחים ירוקים ממה שחושבים. סנטרל פארק (843 דונם) הוא כמובן הכוכב, אבל High Line (פארק על גבי רכבת נטושה), Brooklyn Bridge Park (מול מנהטן), Bryant Park (ליד Times Square) ו-Prospect Park (ברוקלין) הם חוויות ירוקות שמומלץ לשלב בטיול.

## הפארקים המובילים בניו יורק

- **Central Park** — 843 דונם, אופניים, סירות, זו, בלוודר קאסל, Bethesda Fountain
- **High Line** — 2.3 ק"מ על מסילת רכבת נטושה, Chelsea/Meatpacking, עיצוב מדהים
- **Brooklyn Bridge Park** — 34 דונם מול מנהטן, Jane\'s Carousel, כדורסל על המים
- **Bryant Park** — ליד Times Square, רגיעה מהצפיפות, החלקה בחורף
- **Prospect Park** — ברוקלין, 237 דונם, Olmsted (אותו מעצב של Central Park)

## הזמנים הטובים לפארקים בניו יורק

אביב (אפריל-מאי) — פריחת דובדבנים בסנטרל פארק. קיץ (יוני-אוגוסט) — מופעים חינם, שקיעות מ-Brooklyn Bridge Park. סתיו (ספטמבר-נובמבר) — עלווה מרהיבה בכל הפארקים. חורף (דצמבר-פברואר) — החלקה על קרח ב-Bryant Park ו-Central Park, שלג.`,
    faq: [
      { q: 'כמה זמן לשהות בסנטרל פארק?', a: 'מינימום: 2-3 שעות ברגל (חלק דרומי — Bethesda, Bow Bridge, Central Park Zoo). ביקור מלא: 4-6 שעות עם אופניים ($15-20/שעה). יום שלם אם כוללים Zoo + Belvedere Castle + Great Lawn + Conservatory Garden. טיפ: הכנסו מ-72nd Street (West) — הנקודה הכי טובה להתחלה.' },
      { q: 'האם High Line שווה ביקור?', a: 'בהחלט — 2.3 ק"מ של הליכה על מסילת רכבת נטושה שהפכה לפארק עירוני. גנים, אמנות, נוף הדסון ומנהטן. חינם. שעה-שעתיים. הכנסו מ-Gansevoort Street (דרום) ולכו צפונה ל-Hudson Yards. בסופי שבוע צפוף — הגיעו בימי חול או בבוקר.' },
      { q: 'מה לעשות ב-Brooklyn Bridge Park?', a: 'פעילויות: Jane\'s Carousel ($2, מרהיב), מגרשי כדורסל על המים (Pier 2), גלידה ב-Brooklyn Ice Cream Factory, פיקניק על הדשא עם נוף מנהטן, קיאקינג חינם (קיץ בלבד). שקיעה מ-Pier 1 — הנוף הכי יפה בניו יורק. חינם, תמיד פתוח. שריינו 1-2 שעות.' },
      { q: 'האם יש פארקים חינם בניו יורק?', a: 'כל הפארקים בניו יורק חינם! Central Park, High Line, Brooklyn Bridge Park, Bryant Park, Prospect Park, Washington Square Park, Hudson River Park — הכל כניסה חופשית 24/7. רק פעילויות ספציפיות עולות כסף (גן חיות, השכרת אופניים, סירות). פיקניק חינם, ריצה חינם, שכיבה על הדשא חינם.' },
      { q: 'איזה פארק מתאים למשפחות עם ילדים בניו יורק?', a: 'Central Park (גן חיות, מגרשי משחקים, סירות, גלידה), Brooklyn Bridge Park (קרוסלה, מגרשי משחקים), Hudson River Park (מגרשי משחקים על שפת המים). Prospect Park בברוקלין יש גן חיות קטן ($10) ואגם משוטים. כל הפארקים בטוחים ביום למשפחות.' }
    ],
  },
  {
    slug: 'observation-decks',
    title: 'תצפיות',
    subtitle: 'Empire State, Top of the Rock, Edge, Summit',
    description: '5 תצפיות שמציעות נוף 360° של מנהטן — מ-Empire State הקלאסית ועד Edge עם רצפת זכוכית.',
    source_category_field: 'category',
    source_category_value: 'observation',
    sort_order: 5,
    meta_title: 'תצפיות בניו יורק — Empire State, Top of the Rock | WeNewYorker',
    meta_description: 'תצפיות בניו יורק: Empire State Building, Top of the Rock, Edge, Summit, One World. מחירים $41-80, נוף 360° של מנהטן.',
    intro_content: `ניו יורק מציעה 5 תצפיות עילאיות שכל אחת עם נוף ייחודי. Empire State Building (קלאסי, קומה 86 ו-102), Top of the Rock (נוף לאמפייר סטייט + סנטרל פארק), Edge (רצפת זכוכית ב-Hudson Yards), Summit One Vanderbilt (חדרי מראות אינטראקטיביים), ו-One World Observatory (הכי גבוה — קומה 100+).

## השוואה: 5 תצפיות בניו יורק

- **Empire State Building** — קלאסי, קומה 86 (320 מ'), $44-80, נוף 360°
- **Top of the Rock** — נוף לאמפייר סטייט + סנטרל פארק, $43, הכי צילומי
- **Edge** — Hudson Yards, רצפת זכוכית, 345 מ', $41, הכי מפחיד
- **Summit One Vanderbilt** — חדרי מראות + כדורים צפים, $42, הכי אינסטגרמי
- **One World Observatory** — WTC, קומה 100+, 541 מ', $43, הכי גבוה

## איזו תצפית לבחור בניו יורק?

אם אתם צריכים רק אחת: **Top of the Rock** — כי אתם רואים את אמפייר סטייט (ב-Empire State אתם לא רואים את עצמכם!). למשפחות: Empire State (קלאסי) או Summit (כיפי). לזוגות: Edge בשקיעה. לאינסטגרם: Summit. הזמינו כרטיסים מראש — חוסך 30-60 דקות תור.`,
    faq: [
      { q: 'איזו תצפית הכי טובה בניו יורק?', a: 'Top of the Rock — כי רואים את Empire State Building + Central Park באותו מסגרת. אם רוצים את החוויה הקלאסית — Empire State Building. אם רוצים אינסטגרם — Summit One Vanderbilt. אם רוצים אדרנלין — Edge (רצפת זכוכית). אם רוצים הכי גבוה — One World Observatory (541 מ\').' },
      { q: 'כמה עולה תצפית בניו יורק?', a: 'Empire State: $44 (קומה 86) או $80 (86+102). Top of the Rock: $43. Edge: $41 (+ $10 ל-"Climb the Edge"). Summit: $42. One World: $43. CityPASS ($146) כולל Empire State + Top of the Rock + 3 נוספים — משתלם אם אתם עושים 3+ תצפיות. ילדים 6-12: $37-38.' },
      { q: 'מתי הכי טוב לבקר בתצפית בניו יורק?', a: 'שקיעה — הנוף הכי יפה (העיר מואר). הגיעו 30-45 דקות לפני שקיעה. בוקר (פתיחה 08:00-10:00): הכי שקט, תורים קצרים. לילה (21:00-23:00): מנהטן מוארת, רומנטי. הימנעו: סופי שבוע 12:00-16:00 (תורים של 60+ דקות). הזמינו כרטיסים מראש.' },
      { q: 'האם צריך להזמין כרטיסים מראש לתצפיות?', a: 'מומלץ מאוד — חוסך 30-60 דקות תור. הזמינו באתר הרשמי של כל תצפית (לא דרך צד שלישי). בחרו שעה ספציפית (timed entry). אם לא הזמנתם — הגיעו ב-08:00 (פתיחה) או ב-21:00 (מאוחר). Summit ו-Edge כמעט חובה להזמין — מלאים במהירות.' },
      { q: 'האם תצפיות בניו יורק מתאימות לילדים?', a: 'כן — כולן. Empire State ו-Top of the Rock עם גדרות בטיחות גבוהות. Edge עם רצפת זכוכית — ילדים אוהבים אבל כמה מפחדים. Summit עם חדרי מראות — כיפי מאוד לילדים. One World עם מעלית שמראה את ההיסטוריה של מנהטן — חינוכי. ילדים 6-12: כרטיס מוזל.' }
    ],
  },
  {
    slug: 'free-attractions',
    title: 'אטרקציות חינם',
    subtitle: '23 דברים בחינם לעשות בניו יורק',
    description: 'ניו יורק מציעה עשרות חוויות בחינם — מגשר ברוקלין דרך סנטרל פארק ועד מעבורת סטייטן איילנד.',
    source_category_field: 'is_free',
    source_category_value: 'true',
    sort_order: 10,
    meta_title: 'אטרקציות חינם בניו יורק — 23 דברים בחינם | WeNewYorker',
    meta_description: 'אטרקציות חינם בניו יורק: גשר ברוקלין, סנטרל פארק, High Line, מעבורת סטייטן איילנד, מוזיאונים חינם. המדריך המלא.',
    intro_content: `ניו יורק יקרה — אבל יש בה עשרות דברים בחינם שהם מהחוויות הטובות ביותר בעיר. מגשר ברוקלין ועד סנטרל פארק, מ-High Line עד מעבורת סטייטן איילנד (נוף פסל החירות בחינם!) — אפשר לבלות יום שלם בניו יורק בלי להוציא שקל על אטרקציות.

## האטרקציות החינמיות הטובות בניו יורק

- **סנטרל פארק** — 843 דונם, אופניים, פיקניק, מזרקות, גשרים
- **גשר ברוקלין** — הליכה של 30 דקות עם נוף מדהים
- **High Line** — פארק על מסילת רכבת, Chelsea
- **מעבורת סטייטן איילנד** — חינם! נוף פסל החירות מהמים
- **Times Square** — חינם להסתובב, צילומים, אווירה
- **Washington Square Park** — מזרקה, מוזיקאי רחוב, NYU
- **DUMBO** — נוף גשר מנהטן מ-Washington Street (תמונה האיקונית)

## מוזיאונים חינם או "suggested donation" בניו יורק

- **The Met** — "suggested donation" $30 (מותר $1)
- **Natural History Museum** — "suggested donation" $28
- **MoMA** — חינם יום שישי 17:00-21:00
- **Whitney** — חינם יום שישי 19:00-22:00
- **Brooklyn Museum** — "suggested donation" תמיד`,
    faq: [
      { q: 'מה אפשר לעשות בחינם בניו יורק?', a: 'הרבה: סנטרל פארק, גשר ברוקלין, High Line, מעבורת סטייטן איילנד (נוף פסל החירות!), Times Square, DUMBO (נוף הכי מפורסם), Washington Square Park, Bryant Park, Hudson River Park. מוזיאונים ב-"suggested donation" (Met, Natural History). יום שישי: MoMA ו-Whitney חינם בערב.' },
      { q: 'האם מעבורת סטייטן איילנד באמת חינם?', a: 'כן — 100% חינם. 25 דקות מ-Battery Park (דרום מנהטן) ל-St. George (סטייטן איילנד), כל 30 דקות. אתם עוברים ליד פסל החירות ואליס איילנד — נוף מדהים. טיפ: עמדו בצד הימני של המעבורת (כשיוצאים) לנוף הכי טוב. חוזרים באותה מעבורת — לא חובה לרדת בסטייטן איילנד.' },
      { q: 'איך לחסוך כסף על אטרקציות בניו יורק?', a: 'CityPASS ($146 ל-5 אטרקציות) חוסך 40%. שלבו אטרקציות חינם עם כרטיס אחד. TKTS Booth (ברודווי ב-50% הנחה). Broadway Lottery ($30-40). מוזיאונים ב-"suggested donation". ארוחות: פיצה בדולר, בייגל ב-$5. אם יש לכם 5 ימים — שלבו 2-3 אטרקציות בתשלום עם 5-6 חינמיות.' },
      { q: 'מה הכי שווה בחינם לזוגות בניו יורק?', a: 'הליכה על גשר ברוקלין בשקיעה (חינם, רומנטי), סנטרל פארק (Bow Bridge), High Line (אווירה אורבנית יפה), DUMBO viewpoint (צילומים מדהימים), Washington Square Park (מוזיקאי רחוב), מעבורת סטייטן איילנד (נוף). כל אלה בחינם ומהחוויות הכי רומנטיות בעיר.' },
      { q: 'מה בחינם לילדים בניו יורק?', a: 'סנטרל פארק (מגרשי משחקים, דשא, ברווזים), Brooklyn Bridge Park (קרוסלה $2, מגרשי משחקים), High Line, מעבורת סטייטן איילנד (ילדים אוהבים ספינות), Washington Square Park (מזרקה — ילדים משחקים במים בקיץ). אם ירד גשם: ספריות ציבוריות (חינם, פעילויות לילדים). בכל פארק ירוק יש מתקנים.' }
    ],
  },
  {
    slug: 'kids-attractions',
    title: 'אטרקציות לילדים',
    subtitle: 'חוויות משפחתיות לכל הגילאים',
    description: '41 אטרקציות ידידותיות לילדים בניו יורק — מגן חיות סנטרל פארק ועד Intrepid, דינוזאורים ומגדלי תצפית.',
    source_category_field: 'family_friendly',
    source_category_value: 'true',
    sort_order: 11,
    meta_title: 'אטרקציות לילדים בניו יורק — משפחתי | WeNewYorker',
    meta_description: 'אטרקציות לילדים בניו יורק: Natural History Museum, Central Park Zoo, Intrepid, Madame Tussauds. 41 חוויות משפחתיות.',
    intro_content: `ניו יורק היא יעד מעולה למשפחות — ויש בה עשרות אטרקציות שמתאימות לילדים מכל גיל. מדינוזאורים במוזיאון להיסטוריה טבעית ועד צוללות ונושאות מטוסים ב-Intrepid, מגן חיות בסנטרל פארק ועד כרטיסי ברודווי למשפחות.

## האטרקציות הטובות לילדים בניו יורק לפי גיל

- **גילאי 2-5** — Central Park Zoo, Brooklyn Children\'s Museum, Jane\'s Carousel, מגרשי משחקים
- **גילאי 5-10** — Natural History Museum (דינוזאורים!), Intrepid Sea/Air Museum, The Lion King (ברודווי)
- **גילאי 10-14** — One World Observatory, Edge (רצפת זכוכית), Top of the Rock, NBA Store
- **כל הגילאים** — סנטרל פארק, גשר ברוקלין, Times Square, מעבורת סטייטן איילנד

## טיפים לטיול משפחתי בניו יורק

אל תנסו לעשות יותר מ-2 אטרקציות ביום עם ילדים — ניו יורק מתישה. שילבו אטרקציה + פארק + ארוחה + מנוחה. סנטרל פארק מעולה ל"שבירת" יום אטרקציות. הביאו עגלה לילדים מתחת ל-5 — הרבה הליכה. כל אטרקציה מציעה כרטיסי ילדים מוזלים (מתחת ל-12 או 6).`,
    faq: [
      { q: 'מה הכי שווה לילדים בניו יורק?', a: 'לפי גיל: מתחת ל-5 — Central Park Zoo ($13.95 ילד), Jane\'s Carousel ($2), מגרשי משחקים בסנטרל פארק. גילאי 5-10 — Natural History Museum (דינוזאורים!, $23 ילד), Intrepid ($24 ילד, צוללת+נושאת מטוסים+חללית). מעל 10 — Empire State/Top of the Rock, ברודווי (Lion King), NBA Store.' },
      { q: 'האם ניו יורק מתאימה לתינוקות וילדים קטנים?', a: 'כן — אם מתכננים נכון. הביאו עגלה (המטרו יש מעליות ברוב התחנות). שלבו אטרקציה קצרה + פארק + מנוחה. Central Park Zoo, Brooklyn Children\'s Museum, Jane\'s Carousel מושלמים לגילאי 1-4. מסעדות רבות "family friendly" (Jack\'s Wife Freda, Sarabeth\'s). הזמינו מלון עם crib חינם.' },
      { q: 'כמה ימים צריך לטיול משפחתי בניו יורק?', a: '5-7 ימים מושלם. דוגמה: יום 1 — Times Square + Top of the Rock. יום 2 — סנטרל פארק + Zoo. יום 3 — פסל החירות (חצי יום). יום 4 — Natural History Museum + High Line. יום 5 — ברודווי (Lion King) + DUMBO. יום 6 — קניות (FAO Schwarz, NBA Store) + Bryant Park. יום 7 — גשר ברוקלין + גלידה.' },
      { q: 'האם כדאי לקנות CityPASS למשפחות בניו יורק?', a: 'כן — CityPASS ($146 מבוגר, $124 ילד) כולל: Empire State OR Top of the Rock + Natural History + Met + One World OR Guggenheim + Statue of Liberty OR Circle Line. חוסך 40% לעומת כרטיסים נפרדים. למשפחה של 4 — חיסכון של $200-300 סך הכול. מומלץ אם עושים 3+ אטרקציות בתשלום.' },
      { q: 'אילו הופעות ברודווי מתאימות לילדים?', a: 'מומלצות למשפחות: The Lion King (מגיל 4+, ויזואלי מדהים), Aladdin (מגיל 4+, קסום), Wicked (מגיל 7+, מרגש), Frozen (מגיל 4+). הימנעו: The Book of Mormon (גס), Hamilton (ארוך ומורכב למתחת ל-10), Chicago (בוגרים). כרטיסי ילדים באותו מחיר כמו מבוגרים. קנו מושבי Orchestra — ילדים רואים טוב יותר.' }
    ],
  },
]

async function seed() {
  console.log(`\nSeeding ${categories.length} attraction category pages...\n`)
  for (const cat of categories) {
    const row = {
      destination_id: DESTINATION_ID,
      source_table: 'attractions',
      slug: cat.slug,
      title: cat.title,
      subtitle: cat.subtitle,
      description: cat.description,
      source_category_field: cat.source_category_field,
      source_category_value: cat.source_category_value,
      intro_content: cat.intro_content,
      faq: cat.faq,
      meta_title: cat.meta_title,
      meta_description: cat.meta_description,
      sort_order: cat.sort_order,
      published: true,
      show_filters: false,
      items_per_page: 100,
    }
    const { error } = await supabase.from('category_pages').upsert(row, { onConflict: 'destination_id,slug' })
    if (error) console.error(`✗ ${cat.slug}: ${error.message}`)
    else console.log(`✓ ${cat.slug} — ${cat.title}`)
  }
}
seed().catch(err => { console.error('Fatal:', err); process.exit(1) })
