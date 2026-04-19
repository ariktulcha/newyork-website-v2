#!/usr/bin/env node
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const DESTINATION_ID = 'new-york'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const categories = [
  {
    slug: 'clubs',
    title: 'מועדוני לילה',
    subtitle: '20 מועדונים מובילים בניו יורק',
    description: 'סצנת המועדונים של ניו יורק — ממועדוני hip-hop ו-EDM ועד underground techno. Marquee, 1 OAK, Output, Brooklyn Mirage.',
    source_category_field: 'venue_type',
    source_category_value: 'club',
    sort_order: 1,
    meta_title: 'מועדוני לילה בניו יורק — 20 המועדונים המובילים | WeNewYorker',
    meta_description: 'מועדוני לילה בניו יורק: Marquee, 1 OAK, Brooklyn Mirage, Avant Gardner. Hip-hop, EDM, techno. כניסה $30-80, דרס קוד, שעות.',
    intro_content: `סצנת המועדונים בניו יורק היא מהגדולות בעולם — ממועדוני hip-hop יוקרתיים במנהטן (Marquee, 1 OAK) ועד מועדוני techno ענקיים בברוקלין (Brooklyn Mirage, Avant Gardner). כל לילה בניו יורק אפשר למצוא DJs עולמיים, מסיבות נושאיות, ומפלגות של כל סגנון.

## סגנונות מועדונים בניו יורק

- **Hip-Hop / R&B** — Marquee, 1 OAK, Up&Down, Tao Downtown
- **EDM / House** — Avant Gardner, Brooklyn Mirage, Output
- **Techno / Underground** — Basement, Good Room, Bossa Nova Civic Club
- **Latin / Reggaeton** — Copacabana, Salsa Con Fuego
- **VIP / Bottle Service** — Marquee, 1 OAK, Lavo

## טיפים למועדוני לילה בניו יורק

דרס קוד חמור ברוב המועדונים במנהטן (לא כולם בברוקלין). גברים: נעליים נקיות, ג׳ינס כהה, חולצה עם כפתורים. נשים: שמלה/עקבים. כניסה: $30-80 + שתייה $15-25 לכוס. מועדונים פתוחים 22:00-04:00 (לעתים 06:00). הגיעו אחרי 23:30 — לפני זה ריק. תורים: 30-60 דקות בסופי שבוע. Guest list חוסך — הירשמו באתר המועדון.`,
    faq: [
      { q: 'מה המועדון הכי טוב בניו יורק?', a: 'תלוי בסגנון: ל-hip-hop/celeb — Marquee או 1 OAK. ל-EDM/House — Avant Gardner (הכי גדול, ברוקלין). ל-techno underground — Basement או Good Room. ל-VIP ובקבוקים — Tao Downtown. למוזיקה לטינית — Copacabana. ברוקלין בד"כ יותר מעניינת מוזיקלית מאשר מנהטן.' },
      { q: 'כמה עולה כניסה למועדון בניו יורק?', a: 'כניסה: $30-60 (Guest list — חינם עד 00:00 לבנות, $20-30 לבנים). VIP/bottle service: $500-2000 לשולחן (4-6 אנשים, כולל בקבוק). שתייה: $15-25 לכוס, $18-30 לקוקטייל. תקציב לילה לזוג: $100-200 (ללא VIP). Guest list: הירשמו באתר המועדון — חוסך כניסה.' },
      { q: 'מה דרס קוד במועדונים בניו יורק?', a: 'מועדוני מנהטן (Marquee, 1 OAK): גברים — חולצה עם כפתורים, נעליים נקיות, ג׳ינס כהה; נשים — שמלה/עקבים. מועדוני ברוקלין (Good Room, Bossa Nova): יותר קז׳ואל — אבל לא נעלי ספורט/שורטס. כלל אצבע: אם זה Meatpacking/Chelsea — הגיעו "dressed up". אם זה Williamsburg/Bushwick — sneakers OK.' },
      { q: 'מתי הכי טוב ללכת למועדון בניו יורק?', a: 'המסיבות הטובות: שישי ושבת בלילה, 23:30-04:00. חמישי בלילה טוב גם (פחות צפוף, אווירה טובה). מועדוני ברוקלין פעילים גם בימי ראשון (daytime parties). הגיעו אחרי 23:30 — לפני זה ריק. לעתים יש after-party מהשעה 02:00 ועד 08:00.' },
      { q: 'האם מועדוני ניו יורק בטוחים?', a: 'כן — מועדוני המיינסטרים (Marquee, 1 OAK, Avant Gardner) בטוחים עם אבטחה רצינית. מועדוני underground בברוקלין גם בטוחים — אבל שמרו על החפצים שלכם. הימנעו: מועדונים ב-Times Square (תיירותיים ולא איכותיים), אזורים לא מוכרים בלילה. חזרו באובר/ליפט — לא ברגל בשעות 03:00-06:00.' }
    ],
  },
  {
    slug: 'bars-lounges',
    title: 'בארים ולאונג׳ים',
    subtitle: 'קוקטיילים, speakeasy ובירה מיוחדת',
    description: '11 בארים מובילים — ממותגי speakeasy סודיים (PDT, Please Don\'t Tell) ועד cocktail bars מפורסמים ופאבים אמריקאיים.',
    source_category_field: 'venue_type',
    source_category_value: 'bar',
    sort_order: 2,
    meta_title: 'בארים בניו יורק — קוקטיילים, Speakeasy | WeNewYorker',
    meta_description: 'בארים בניו יורק: PDT, Attaboy, Dead Rabbit, The Campbell. Speakeasy, cocktail bars, rooftop bars, craft beer. $15-25 לשתייה.',
    intro_content: `סצנת הבארים של ניו יורק היא מהטובות בעולם — מ-speakeasy סודיים (PDT, Attaboy) ועד craft cocktail bars (Dead Rabbit, The Campbell), מ-rooftop bars עם נוף (Westlight, 230 Fifth) ועד פאבים אירים אמיתיים (McSorley\'s, מאז 1854). כל שכונה בניו יורק עם הסגנון משלה.

## סוגי בארים בניו יורק

- **Speakeasy** — בארים "סודיים" מאחורי דלת נסתרת (PDT, Attaboy, Employees Only)
- **Craft Cocktail** — קוקטיילים של ברמנים מפורסמים (Dead Rabbit, The Campbell)
- **Rooftop Bars** — נוף מנהטן עם שתייה (Westlight, 230 Fifth, Pod 39 Rooftop)
- **Craft Beer** — בירה מקומית (Brooklyn Brewery, Other Half, Circa Brewing)
- **Wine Bars** — יין טבעי ובוטיק (Ten Bells, Compagnie des Vins)
- **Dive Bars** — פאבים פשוטים וזולים (McSorley\'s, Holiday Cocktail Lounge)

## טיפים לבארים בניו יורק

Happy hour (16:00-19:00) חוסך 30-50% על שתייה ואוכל. Speakeasy דורשים הזמנה מראש (PDT: התקשרו מתא הטלפון הסודי ב-Crif Dogs). הטיפ על שתייה: $1-2 לבירה, $2-3 לקוקטייל (בר). מחירים: קוקטייל $16-25, בירה $8-15, יין $14-22. גיל מינימום: 21 (עם ID — הביאו דרכון!).`,
    faq: [
      { q: 'מה הבר הכי טוב בניו יורק?', a: 'Dead Rabbit (Financial District) — זכה ב"הבר הטוב בעולם". Attaboy (Lower East Side) — speakeasy בלי תפריט (הברמן מכין מה שמתאים לכם). PDT (East Village) — כניסה דרך תא טלפון ב-Crif Dogs. The Campbell (Grand Central) — אווירה של שנות ה-20. Employees Only (West Village) — קלאסי ניו יורקי.' },
      { q: 'כמה עולה שתייה בבר בניו יורק?', a: 'מחירים ממוצעים: קוקטייל $16-25, בירה draft $8-15, בירה בבקבוק $7-12, יין כוס $14-22, שוט $10-15. Happy hour (16:00-19:00): 30-50% הנחה. Speakeasy bars יקרים יותר: $20-30 לקוקטייל. Dive bars: $5-8 לבירה. תמיד תנו טיפ: $1-2 לבירה, $2-3 לקוקטייל.' },
      { q: 'מה זה speakeasy bar ואיך מוצאים אחד?', a: 'Speakeasy הוא בר "סודי" — בלי שלט בחוץ, כניסה מוסתרת (דרך מקרר, תא טלפון, דלת נסתרת). PDT: היכנסו ל-Crif Dogs (hot dog place) והרימו את הטלפון בתא האדום. Attaboy: דלת ללא סימן ב-Eldridge Street. Please Don\'t Tell: אותו concept כמו PDT. הם לא באמת "סודיים" — כולם יודעים, אבל האווירה מיוחדת.' },
      { q: 'האם צריך להיות בן 21 לשתות בבר בניו יורק?', a: 'כן — גיל מינימום לשתייה בניו יורק (ובכל ארה"ב) הוא 21. הביאו דרכון (ID ישראלי לא תמיד מקובל). בארים מסוימים לא מאפשרים כניסה מתחת ל-21 גם אם לא שותים. אם אתם מתחת ל-21 — מסעדות מגישות אוכל גם ללא שתייה, אבל בארים לרוב לא.' },
      { q: 'איפה הבארים הכי טובים בניו יורק לפי שכונה?', a: 'Lower East Side: Attaboy, The Back Room. East Village: PDT, Death & Co, McSorley\'s. West Village: Employees Only, Little Branch. Williamsburg (Brooklyn): Westlight, Brooklyn Brewery. Chelsea/Meatpacking: Tao, 1 OAK. Financial District: Dead Rabbit. הימנעו מ-Times Square — בארים תיירותיים ויקרים.' }
    ],
  },
  {
    slug: 'wine-bars',
    title: 'בארי יין',
    subtitle: 'יין טבעי, אורנג׳ ובוטיק',
    description: 'סצנת היין של ניו יורק — בארי יין טבעי (natural wine), אורנג׳ וויינים מקומיים. 8 בארי יין מובילים.',
    source_category_field: 'venue_type',
    source_category_value: 'wine-bar',
    sort_order: 3,
    meta_title: 'בארי יין בניו יורק — Natural Wine, Orange Wine | WeNewYorker',
    meta_description: 'בארי יין בניו יורק: Ten Bells, Compagnie des Vins, Wildair. יין טבעי, אורנג׳, תפריטי טעימות. $14-25 לכוס.',
    intro_content: `סצנת היין בניו יורק התפוצצה בעשור האחרון — בעיקר בזכות תנועת ה-natural wine (יין טבעי). בארי יין כמו Ten Bells, Wildair ו-Compagnie des Vins Surnaturels מציעים יינות שלא תמצאו בשום מקום אחר, אווירה אינטימית, ומנות קטנות שמתאימות לכל יין.

## סוגי בארי יין בניו יורק

- **Natural Wine** — יין טבעי בלי תוספות, לעתים "funky" ומפתיע (Ten Bells, Wildair)
- **Wine Bar קלאסי** — מבחר רחב של יינות צרפתיים/איטלקיים (Compagnie des Vins, Corkbuzz)
- **Orange Wine** — יינות כתומים מענבים לבנים ששהו בקליפה (Ten Bells)
- **Wine + Tapas** — יין עם מנות קטנות (Bar Boulud, Pasquale Jones)

## טיפים לבארי יין בניו יורק

כוס יין: $14-25. Flight (טעימה של 3-4 יינות): $25-45. אם אתם חדשים ליין טבעי — בקשו מהסומלייה המלצה "intro" (לא "funky"). לאווירה הכי טובה: ערב חול (רביעי/חמישי) — שקט ואינטימי. סופי שבוע צפופים.`,
    faq: [
      { q: 'מה בר היין הכי טוב בניו יורק?', a: 'Ten Bells (Lower East Side) — בר היין הטבעי האיקוני של ניו יורק, אווירה כמו בפריז. Wildair (LES) — יין טבעי + אוכל מעולה. Compagnie des Vins Surnaturels (SoHo) — יין צרפתי קלאסי. Corkbuzz (Union Square) — שיעורי יין + טעימות. Bar Boulud (Upper West) — Daniel Boulud, יין + טפאס.' },
      { q: 'כמה עולה יין בבר בניו יורק?', a: 'כוס: $14-22 (house wine), $18-30 (premium). בקבוק: $45-120 (לעומת $25-60 בחנות). Flight (טעימה): $25-45. Happy hour (16:00-19:00): חצי מחיר על כוס נבחרת. טיפ: $1-2 לכוס, $5 לבקבוק.' },
      { q: 'מה זה natural wine?', a: 'יין טבעי = יין שנעשה עם מינימום התערבות — ענבים אורגניים, בלי תוספות כימיות (גופרית, סוכר, שמרים מסחריים), בלי סינון. התוצאה: יין "חי" עם טעמים שונים מיין קונבנציונלי — לעתים "funky", חומצי, או פירותי מאוד. אם אתם רגילים לקברנה סוביניון — תתפלאו. תנו לזה סיכוי.' },
      { q: 'האם יש בארי יין כשרים בניו יורק?', a: 'בארי יין כשרים ספציפיים — מעטים מאוד. אם אתם מחפשים יין כשר באווירת בר: כמה מסעדות כשרות מציעות תפריט יין (Mike\'s Bistro, Reserve Cut). לחלופין, חפשו יינות כשרים בחנויות (Skyview Wines, Wine Library) ותשתו בדירה. Bartenura Moscato נמצא כמעט בכל בר — אבל זה לא natural wine.' },
      { q: 'איפה בארי יין טובים לדייט בניו יורק?', a: 'Ten Bells (LES, אינטימי ומואר בנרות), Bar Boulud (Upper West, יוקרתי), Compagnie des Vins (SoHo, פריזאי), Corkbuzz (Union Square, שיעורי יין — דייט יצירתי), Wildair (LES, אוכל + יין). כל אלה אינטימיים וקטנים (20-40 מושבים). הזמינו 1-2 שבועות מראש לסופי שבוע.' }
    ],
  },
  {
    slug: 'rooftop-bars',
    title: 'גגות וrooftop bars',
    subtitle: 'שתייה עם נוף מנהטן',
    description: 'ניו יורק מפורסמת בrooftop bars — שתייה עם נוף 360° של מנהטן. 230 Fifth, Westlight, The Press Lounge.',
    source_category_field: 'venue_type',
    source_category_value: 'rooftop',
    sort_order: 4,
    meta_title: 'Rooftop Bars בניו יורק — שתייה עם נוף | WeNewYorker',
    meta_description: 'Rooftop bars בניו יורק: 230 Fifth, Westlight, The Press Lounge. שתייה עם נוף מנהטן, מחירים $15-30 לשתייה, דרס קוד.',
    intro_content: `Rooftop bars הם חלק מתרבות ניו יורק — שתייה על גג בניין עם נוף 360° של הסקייליין. מועדפים על תיירים וישראלים כי הם משלבים חוויה ויזואלית (נוף מנהטן) + שתייה + אווירה. יש עשרות rooftop bars בניו יורק, מזולים ופשוטים ועד יוקרתיים וVIP.

## Rooftop bars מובילים בניו יורק

- **230 Fifth** — הגדול והנגיש ביותר, נוף אמפייר סטייט, $20-30 לכניסה כולל שתייה
- **Westlight** — William Vale Hotel, ויליאמסבורג, נוף מנהטן מברוקלין, $0 כניסה
- **The Press Lounge** — Ink48 Hotel, Hell\'s Kitchen, נוף הדסון, שקט ויוקרתי
- **Pod 39 Rooftop** — Midtown, נוף 360°, מחירים סבירים
- **Bar SixtyFive** — Rockefeller Center, 65 קומות, נוף מדהים

## טיפים ל-rooftop bars בניו יורק

הגיעו 30-60 דקות לפני שקיעה — הנוף הכי יפה. בקיץ: תור של 30-60 דקות בסופי שבוע. בחורף: פחות צפוף + חלקם סגורים או מחוממים. דרס קוד: רוב ה-rooftops דורשים חולצה עם כפתורים (גברים), לא נעלי ספורט. הזמנות: Westlight ו-Bar SixtyFive דורשים הזמנה מראש.`,
    faq: [
      { q: 'מה הrooftop bar הכי טוב בניו יורק?', a: '230 Fifth (Flatiron) — הכי נגיש ופופולרי, נוף אמפייר סטייט. Westlight (Williamsburg, Brooklyn) — נוף מנהטן הכי יפה (מברוקלין). The Press Lounge — שקט ויוקרתי. Bar SixtyFive — ברוקפלר, 65 קומות, נוף מטורף. Pod 39 — מחירים סבירים, אווירה צעירה.' },
      { q: 'כמה עולה שתייה ב-rooftop bar בניו יורק?', a: 'קוקטייל: $18-30. בירה: $10-16. יין: $16-25. כמה rooftops (230 Fifth) גובים $20-30 כניסה שכוללת שתייה אחת. VIP tables: $200-500+. תקציב לילה לזוג: $80-150. Happy hour (16:00-19:00): 30-50% הנחה. טיפ: $2-3 לשתייה.' },
      { q: 'מתי הכי טוב ללכת ל-rooftop bar?', a: 'שקיעה (17:00-18:30 חורף, 19:00-20:30 קיץ) — הנוף הכי יפה ברגע שמנהטן מאירה. הגיעו 30-60 דקות לפני. ימי חול (שלישי-חמישי) — פחות צפוף. סופי שבוע: תור של 30-60 דקות. בחורף: חלק סגורים, חלק מחוממים (230 Fifth יש שמיכות!).' },
      { q: 'האם rooftop bars פתוחים בחורף?', a: 'חלקם כן: 230 Fifth (עם חממה ושמיכות), Westlight (חממה מחוממת), Bar SixtyFive (סגור בחורף, פתוח באביב). Pod 39 Rooftop (פתוח עם חימום). כשהטמפרטורה יורדת מתחת ל-0°C — רוב ה-rooftops עוברים ל-indoor-only. הנוף עדיין מדהים בחורף — מנהטן בשלג מרהיבה.' },
      { q: 'האם צריך הזמנה ל-rooftop bar?', a: 'תלוי: Westlight — מומלץ מאוד להזמין מראש (Resy). Bar SixtyFive — חובה. 230 Fifth — אין הזמנה, first-come (תור בסופי שבוע). Pod 39 — אין צורך. The Press Lounge — מומלץ. כלל: בימי חול אין צורך; בסופי שבוע חובה להזמין או להגיע מוקדם (לפני 17:00).' }
    ],
  },
  {
    slug: 'nightlife-manhattan',
    title: 'חיי לילה במנהטן',
    subtitle: 'מועדונים, בארים ולאונג׳ים של מנהטן',
    description: 'סצנת חיי הלילה של מנהטן — Meatpacking District, Lower East Side, Chelsea, East Village. בארים ומועדונים.',
    source_category_field: 'area',
    source_category_value: 'מנהטן',
    sort_order: 10,
    meta_title: 'חיי לילה במנהטן — מועדונים ובארים | WeNewYorker',
    meta_description: 'חיי לילה במנהטן: Meatpacking District, LES, Chelsea, East Village. 15 מועדונים ובארים מובילים. דרס קוד, כניסה, שעות.',
    intro_content: `מנהטן היא המרכז של חיי הלילה בניו יורק — בעיקר Meatpacking District (מועדונים יוקרתיים), Lower East Side (בארים אלטרנטיביים), Chelsea (מועדוני ריקודים) ו-East Village (dive bars ו-speakeasy). כל לילה בניו יורק מציע עשרות אירועים, DJs, ומסיבות.

## השכונות הטובות לחיי לילה במנהטן

- **Meatpacking District** — מועדונים יוקרתיים (Marquee, Tao, 1 OAK), דרס קוד חמור
- **Lower East Side** — בארים אלטרנטיביים, speakeasy (Attaboy, PDT), מחירים סבירים
- **East Village** — dive bars, מוזיקה חיה, McSorley\'s (מאז 1854)
- **Chelsea / Hell\'s Kitchen** — מועדונים גדולים, קהילת LGBTQ+ חזקה
- **West Village** — בארים אינטימיים, Employees Only

## טיפים לחיי לילה במנהטן

המחירים יקרים — תקציב $100-200 ללילה לזוג (כניסה + 3-4 שתיות). Happy hour (16:00-19:00) חוסך 50%. דרס קוד ב-Meatpacking ו-Chelsea: חולצה עם כפתורים, נעליים נקיות. LES ו-East Village: קז׳ואל. חזרו באובר — הרבה מונים בניו יורק אחרי 23:00.`,
    faq: [
      { q: 'מה האזור הכי טוב לחיי לילה במנהטן?', a: 'תלוי בסגנון: VIP ויוקרה — Meatpacking District (Marquee, 1 OAK). אלטרנטיבי ומגניב — Lower East Side (Attaboy, The Back Room). קלאסי אמריקאי — East Village (McSorley\'s, PDT). גאי/LGBTQ+ — Chelsea/Hell\'s Kitchen. לחוויה "ניו יורקית" קלאסית — LES הכי טוב.' },
      { q: 'באיזו שעה מתחילים חיי הלילה במנהטן?', a: 'Happy hour: 16:00-19:00 (חצי מחיר שתייה). ארוחת ערב + בר: 20:00-22:00. מועדונים: פתוחים מ-22:00, מתחילים לפעול ב-23:30. After-party: 02:00-06:00. לבארים — הגיעו ב-21:00-22:00. למועדונים — הגיעו ב-23:30-00:30. לפני זה ריק.' },
      { q: 'האם צריך guest list למועדוני מנהטן?', a: 'מומלץ מאוד — Guest list חוסך $30-50 כניסה ותור של 30-60 דקות. הירשמו באתר המועדון (Marquee, 1 OAK, Lavo — כולם מציעים guest list). בנות: כניסה חינם עד 00:00. בנים: $20-30 עד 00:00 (במקום $50-80 בדלת). בלי guest list — הגיעו מוקדם (22:00-22:30).' },
      { q: 'כמה עולה לילה של חיי לילה במנהטן?', a: 'תקציב מינימלי לזוג: $80-120 (2-3 שתיות כל אחד + אובר חזרה). תקציב בינוני: $150-250 (כניסה + 4 שתיות + אובר). VIP: $500-2000 (שולחן + בקבוק). בארים זולים (dive bars): $30-50 לזוג. Happy hour: חוסך 30-50%.' },
      { q: 'האם חיי לילה בטוחים במנהטן?', a: 'כן — מנהטן בטוחה מאוד בלילה, במיוחד Meatpacking, LES, East Village, Chelsea. השכונות האלו מלאות בילויים כל הלילה. טיפים: חזרו באובר/ליפט (לא ברגל בשעות 03:00+). שמרו על ארנק וטלפון. אל תשתו יותר מדי. אם משהו מרגיש לא בסדר — לכו משם. שימו לב לתיק.' }
    ],
  },
  {
    slug: 'nightlife-brooklyn',
    title: 'חיי לילה בברוקלין',
    subtitle: 'סצנת המוזיקה והמסיבות של ברוקלין',
    description: 'ברוקלין היא בירת ה-underground של ניו יורק — מועדוני techno ענקיים, בארי יין טבעי, ופאבים שכונתיים.',
    source_category_field: 'area',
    source_category_value: 'ברוקלין',
    sort_order: 11,
    meta_title: 'חיי לילה בברוקלין — Underground ומוזיקה | WeNewYorker',
    meta_description: 'חיי לילה בברוקלין: Brooklyn Mirage, Avant Gardner, Good Room, Westlight. Techno, house, indie. מוזיקה חיה, בארים, מועדונים.',
    intro_content: `ברוקלין הפכה לבירת חיי הלילה של ניו יורק — במיוחד אם אתם אוהבים מוזיקה אלקטרונית, techno, indie, ואווירה underground. מועדונים כמו Brooklyn Mirage (3000 אנשים, חוץ) ו-Avant Gardner הפכו ליעדים עולמיים. בווילאמסבורג ובושוויק יש עשרות בארים קטנים ומעניינים שמנהטן לא מציעה.

## השכונות הטובות לחיי לילה בברוקלין

- **Williamsburg** — בארים טרנדיים, Westlight rooftop, Brooklyn Brewery
- **Bushwick** — underground, Avant Gardner/Brooklyn Mirage, Good Room, house parties
- **DUMBO** — בארים רומנטיים עם נוף מנהטן, שקטים יותר
- **Park Slope** — פאבים שכונתיים, אווירה רגועה, בירה craft
- **Greenpoint** — בארי יין, קוקטייל בארים, Tørst (בירה)

## למה חיי לילה בברוקלין טובים יותר?

ברוקלין פחות פורמלית — אין דרס קוד, כניסה זולה יותר ($10-30 לעומת $30-60 במנהטן), ההוזיקה יותר מעניינת (DJs עולמיים ב-Avant Gardner), והאווירה פחות "ולרי" ויותר "בוא נרקוד". אם אתם מעדיפים EDM מסחרי — מנהטן. אם אתם מעדיפים techno/house אמיתי — ברוקלין.`,
    faq: [
      { q: 'מה הבר/מועדון הכי טוב בברוקלין?', a: 'למוזיקה אלקטרונית — Brooklyn Mirage / Avant Gardner (הגדול ביותר, DJs עולמיים). ל-house/techno — Good Room. לבר rooftop — Westlight (William Vale, נוף מנהטן). לבירה — Brooklyn Brewery (ווילאמסבורג), Other Half (Carroll Gardens). ל-dive bar — Union Pool (ווילאמסבורג, אגדי).' },
      { q: 'כמה עולה כניסה למועדון בברוקלין?', a: 'Avant Gardner / Brooklyn Mirage: $30-60 (בהתאם ל-DJ). Good Room: $10-25. Elsewhere: $15-30. בארים: $0 (כניסה חינם). שתייה: קוקטייל $14-20, בירה $7-12. זול ב-30-40% ממועדוני מנהטן. אם יש guest list — כניסה חינם או $10-15.' },
      { q: 'האם חיי לילה בטוחים בברוקלין?', a: 'כן — שכונות התיירות (Williamsburg, DUMBO, Greenpoint) בטוחות בלילה. Bushwick גם בטוח (הרבה מועדונים ואנשים ברחובות בלילה). חזרו באובר/ליפט — בברוקלין אין הרבה מוניות צהובות בלילה. הימנעו מלעבור דרך שכונות לא מוכרות ברגל בשעות 02:00+.' },
      { q: 'מה ההבדל בין חיי לילה בברוקלין למנהטן?', a: 'ברוקלין: יותר underground, מוזיקה אלקטרונית, כניסה זולה, אווירה קז׳ואלית (sneakers OK), DJs עולמיים. מנהטן: יותר VIP, hip-hop, דרס קוד חמור, מחירים גבוהים, bottle service. לחוויה "אמריקאית קלאסית" — מנהטן. לחוויה "ברלינאית/underground" — ברוקלין.' },
      { q: 'איך מגיעים ממנהטן לחיי לילה בברוקלין?', a: 'אובר/ליפט: $20-35, 20-30 דקות (הכי נוח). מטרו: קו L לוויליאמסבורג (15 דקות מ-Union Square), קו M לבושוויק. חזרה — אובר (המטרו דליל אחרי 00:00). טיפ: Brooklyn Mirage/Avant Gardner באזור East Williamsburg — אובר ישיר הכי נוח.' }
    ],
  },
]

async function seed() {
  console.log(`\nSeeding ${categories.length} nightlife category pages...\n`)
  for (const cat of categories) {
    const row = {
      destination_id: DESTINATION_ID,
      source_table: 'nightlife',
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
      items_per_page: 50,
    }
    const { error } = await supabase.from('category_pages').upsert(row, { onConflict: 'destination_id,slug' })
    if (error) console.error(`✗ ${cat.slug}: ${error.message}`)
    else console.log(`✓ ${cat.slug} — ${cat.title}`)
  }
}
seed().catch(err => { console.error('Fatal:', err); process.exit(1) })
