// Attractions Batch 1 (8 broadway): All In, &Juliet, Boop, Buena Vista, Cult of Love, Elf, Glengarry, Gypsy
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const env = Object.fromEntries(readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n').filter(Boolean).map(l=>l.split('=').map(s=>s.trim()).filter(Boolean)).filter(p=>p.length===2))
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

const updates = {
  'all-in-comedy-about-love': `## All In: Comedy About Love בברודווי ניו יורק — סיפורי אהבה של Simon Rich

All In: Comedy About Love הוא מחזה ברודווי שנפתח ב-2024 ב-Hudson Theatre (141 West 44th Street). הוא מבוסס על סיפורים קצרים של Simon Rich (כותב ל-Saturday Night Live, פרסם 5 ספרי סיפורים קצרים), שעובדו לבמה. הקטע: ה-cast מתחלף מדי שבועות. עברו ב-Cast: John Mulaney, Fred Armisen, Richard Kind, Hank Azaria, Lily Tomlin, ועוד. אם תבואו פעמיים תקבלו תיאטרון אחר.

## מה לצפות מ-All In ניו יורק

המופע: 90 דקות, אין הפסקה, 4 שחקנים על הבמה כל ערב. הם עוברים בין סיפורים קצרים שונים — קטעים על דייטים, על נישואים, על אהבה משפחתית, על אהבה ראשונה. כל סיפור 5-15 דקות. סגנון: stand-up פגוש תיאטרון.

## מחירי כרטיסים ל-All In

- **Standing Room** $39 — אחורי-אולם, אבל קרוב
- **Mezzanine** $79-129
- **Orchestra** $129-189
- **Premium / Front rows** $200+

קנייה: AllInBroadway.com או TodayTix.

## איך מגיעים ל-Hudson Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 4 דקות הליכה
- מטרו B/D/F/M ל-42nd Street/Bryant Park, 5 דקות הליכה

## שאלות נפוצות על All In ניו יורק

**מה אורך המופע All In?** 90 דקות, אין הפסקה.
**מי בקאסט הערב הזה?** משתנה. בדקו ב-AllInBroadway.com.
**גיל מומלץ ל-All In?** 14+. תוכן בוגר על מערכות יחסים.
**אפשר להזמין למספר שונה של אנשים?** כן, רוב הערבים יש זמינות.
**שווה ההייפ?** לחובבי קומדיה וsketches: בהחלט.`,

  'and-juliet': `## & Juliet בברודווי ניו יורק — מחזמר "מה היה אם יוליה לא הייתה מתה"

& Juliet הוא מחזמר פופ שנפתח בלונדון ב-2019, ועבר לברודווי ב-2022 ב-Stephen Sondheim Theatre (124 West 43rd Street). הקונספט הגאוני: המחזה מתחיל בדיוק במקום שרומאו ויוליה של שייקספיר נגמר — אבל הפעם, יוליה מסרבת לסיים את עצמה. במקום זה, היא יוצאת ל-roadtrip עם החברים, רוקדת בקלאבים בפריז, ומגלה שיש לה חיים לפני שהיא מאהבת. ה-soundtrack: כל השירים של Max Martin (Britney Spears, Backstreet Boys, Katy Perry, P!nk, Justin Timberlake).

## מה לצפות מ-& Juliet

- **משך**: 2 שעות 30 דקות עם הפסקה
- **שירים שתשמעו**: Hit Me Baby One More Time, I Want It That Way, Roar, Since U Been Gone, Larger Than Life
- **הקאסט**: מתחלף, אבל יוליה הראשונה הייתה Lorna Courtney (כרגע אחרים)
- **טון**: כיף, פופ, אנרגיה גבוהה. לא דרמה רצינית

## מחירי כרטיסים ל-& Juliet

- **Mezzanine** $89-149
- **Orchestra** $149-249
- **Premium** $279+

קנייה: AndJulietBroadway.com.

## איך מגיעים ל-Stephen Sondheim Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 3 דקות הליכה
- מטרו B/D/F/M ל-42nd Street/Bryant Park, 5 דקות הליכה

## שאלות נפוצות על & Juliet ניו יורק

**גיל מומלץ ל-& Juliet?** 10+. מתאים למשפחות.
**מה השירים?** קלאסיקות פופ של Max Martin משנות ה-90 וה-2000.
**אורך?** 2 שעות 30 דקות עם הפסקה.
**שווה ההייפ?** לחובבי jukebox musicals: כן. אנרגטי מאוד.`,

  'boop-musical': `## BOOP! The Musical בברודווי ניו יורק — בטי בופ מ-1930 בעצב 2025

BOOP! The Musical נפתח בברודווי ב-2025 ב-Broadhurst Theatre (235 West 44th Street). הוא מספר על Betty Boop, דמות הקומיקס האייקונית של Max Fleischer מ-1930, שעוברת ל-modern New York ופוגשת את העולם של 2024. ההפקה: Jerry Mitchell (כוריאוגרף ומפיק של Kinky Boots, Legally Blonde, Hairspray), עם מוזיקה של David Foster (15 פרסי גראמי) ושירי Susan Birkenhead.

## מה לצפות מ-BOOP

- **משך**: 2 שעות 25 דקות עם הפסקה
- **חזותית**: מטורף. שילוב של אנימציה (החלקים מ-1930 בשחור-לבן) עם בימה צבעונית
- **כוכבת**: Jasmine Amy Rogers בתפקיד Betty Boop. ביקורות מהללות
- **טון**: משפחתי, כיף, מוזיקה pop קליטה

## מחירי כרטיסים ל-BOOP

- **Mezzanine** $79-139
- **Orchestra** $129-219
- **Premium** $249+

קנייה: BoopMusical.com.

## איך מגיעים ל-Broadhurst Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 3 דקות הליכה צפונה
- מטרו B/D/F/M ל-42nd Street/Bryant Park, 5 דקות הליכה

## שאלות נפוצות על BOOP ניו יורק

**גיל מומלץ ל-BOOP?** 6+. מתאים למשפחות.
**מי כתב את המוזיקה?** David Foster, מקצועי ב-Whitney Houston, Celine Dion, Josh Groban.
**אורך?** 2 שעות 25 דקות.
**שווה ההייפ?** למשפחות עם ילדים: בהחלט.`,

  'buena-vista-social-club': `## Buena Vista Social Club בברודווי ניו יורק — מוזיקה קובאנית חיה

Buena Vista Social Club המחזמר נפתח בברודווי ב-2024 ב-Schoenfeld Theatre (236 West 45th Street). הוא מבוסס על האלבום האגדי מ-1997 של Ry Cooder ואלמני המוזיקה הקובנית — הקלטות עם זקני הסון, הסלסה, וגם הבולרו של הוואנה לפני מהפכת קסטרו. המחזה מתחקה אחרי איך Ry Cooder אסף את הזקנים, איך החזיר אותם לבמה אחרי 50 שנה, ואיך נוצר אלבום אחד מהאלבומים הנמכרים ביותר של המוזיקה העולמית.

## מה לצפות מ-Buena Vista Social Club

- **משך**: 2 שעות 30 דקות עם הפסקה
- **מוזיקה חיה**: 13 כלים על הבמה — טרומבון, טרומפט, פסנתר, גיטרה, באס, מתופפים. כולם נגנים מקצועיים מקובה ופוארטו ריקו
- **שירים**: Chan Chan, Dos Gardenias, El Cuarto de Tula, El Carretero
- **טון**: רגוע, חם, מלא רגש. סוף ההצגה: כולם רוקדים

## מחירי כרטיסים ל-Buena Vista

- **Mezzanine** $79-149
- **Orchestra** $129-229
- **Premium** $269+

קנייה: BuenaVistaSocialClubBway.com.

## איך מגיעים ל-Schoenfeld Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 4 דקות הליכה צפונה

## שאלות נפוצות על Buena Vista Social Club ניו יורק

**גיל מומלץ?** 12+. אין תוכן לא הולם, אבל זה ארוך לילדים קטנים.
**אורך?** 2 שעות 30 דקות.
**שווה ההייפ?** לחובבי מוזיקה לטינית-קובאנית: בהחלט.
**צריך לדעת ספרדית?** לא. יש subtitles, ורוב הסיפור באנגלית.`,

  'cult-of-love': `## Cult of Love בברודווי ניו יורק — דרמה משפחתית של Leslye Headland

Cult of Love נפתחה בברודווי ב-2024 ב-Helen Hayes Theatre (240 West 44th Street). היא נכתבה על ידי Leslye Headland (יוצרת Russian Doll, Bachelorette, A Cult of Personality). המחזה מתרחש בליל חג קיץ אחד — משפחת Dahl נפגשת לארוחת חג המולד, וכל הסודות של 30 שנה מתפרצים על השולחן.

ה-Cast: Zachary Quinto (Star Trek, Heroes), Shailene Woodley (Big Little Lies), David Hyde Pierce (Frasier), Mare Winningham. דרמה שחורה-קומית.

## מה לצפות מ-Cult of Love

- **משך**: 1 שעה 50 דקות, אין הפסקה
- **טון**: דרמה עם הומור שחור. תחשבו August: Osage County או Tracy Letts
- **תוכן**: התמכרויות, סודות משפחתיים, מתחים סקסואליים, שורשים יהודיים-נוצריים
- **קצב**: מהיר, אינטנסיבי

## מחירי כרטיסים ל-Cult of Love

- **Mezzanine** $79-129
- **Orchestra** $109-189
- **Premium** $239+

קנייה: CultOfLoveOnBroadway.com.

## איך מגיעים ל-Helen Hayes Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 4 דקות הליכה

## שאלות נפוצות על Cult of Love ניו יורק

**גיל מומלץ ל-Cult of Love?** 16+. תוכן למבוגרים — אלכוהול, סקס, רגש כבד.
**אורך?** 1 שעה 50 דקות, אין הפסקה.
**שווה?** לחובבי דרמה-משפחתית עם הומור שחור: כן.`,

  'elf-the-musical': `## Elf The Musical בברודווי ניו יורק — מחזמר חג המולד למשפחות

Elf The Musical רץ בברודווי בעונת החגים (בדרך כלל נובמבר עד ינואר) ב-Marquis Theatre (210 West 46th Street). המחזמר מבוסס על הסרט הקלאסי של Will Ferrell מ-2003. הסיפור: Buddy, אדם שגדל בחברת השדונים בקוטב הצפוני, מגלה שהוא בעצם בן אדם, ונוסע לניו יורק לפגוש את אביו הביולוגי שעובד ב-Empire State Building.

## מה לצפות מ-Elf

- **משך**: 2 שעות 5 דקות עם הפסקה
- **טון**: משפחתי, כיף, חג המולד. מתאים לילדים מ-6+
- **שירים**: סטנדרטים של חג המולד פגושים פופ
- **חזותית**: שלג, ספגטי עם סירופ, נמלי קוטב, מסיבה ב-Empire State Building

## מחירי כרטיסים ל-Elf

- **Mezzanine** $59-119 (ילדים $39 בערבי-משבוע)
- **Orchestra** $99-179
- **Premium** $199+

עונת ההצגות: בדרך כלל פתיחה אמצע נובמבר, סגירה אמצע ינואר. תאריכים מתחלפים לפי שנה.

## איך מגיעים ל-Marquis Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 5 דקות הליכה צפונה

## שאלות נפוצות על Elf ניו יורק

**גיל מומלץ ל-Elf?** 6+. מושלם למשפחות עם ילדים.
**אורך?** 2 שעות 5 דקות.
**מתי Elf פעיל?** עונת חג המולד, נובמבר-ינואר. בדקו ב-ElfBroadway.com.
**שווה ההייפ?** לחווית חג המולד הניו יורקית הקלאסית: בהחלט.`,

  'glengarry-glen-ross-revival': `## Glengarry Glen Ross Revival בברודווי ניו יורק — דרמה אגדית של David Mamet עם Odenkirk

Glengarry Glen Ross Revival נפתח בברודווי ב-2025 ב-Palace Theatre (160 West 47th Street). הוא revival של המחזה הקלאסי של David Mamet מ-1984, שזכה ב-Pulitzer Prize. הסיפור: 4 סוכני נדל"ן בשיקגו של 1980, שמנסים לסגור עסקאות בלחצים בלתי-אפשריים. אם הם לא יסגרו השבוע — מפוטרים. הדיאלוג מהיר, פוגעני, ולעיתים פואטי.

ה-Cast של 2025 הוא חלום של חובבי טלוויזיה: Bob Odenkirk (Better Call Saul), Kieran Culkin (Succession), Bill Burr (קומיק stand-up), Michael McKean (Better Call Saul). כל אחד מהם בתפקיד אגדי בעולם הקולנוע, וזה ה-revival שכולם מחכים לו.

## מה לצפות מ-Glengarry Glen Ross

- **משך**: 90 דקות, אין הפסקה
- **טון**: דרמה אינטנסיבית, שפה גסה (F-bomb כל 30 שניות), הומור שחור
- **תוכן**: גברים בלחץ קצה הקריירה. פגיעה, בגידה, יאוש
- **שווה את החוויה לחובבי Mamet, Sorkin, או דרמה תאטרלית רצינית**

## מחירי כרטיסים ל-Glengarry

- **Mezzanine** $129-229
- **Orchestra** $189-329
- **Premium / Front rows** $399+ (יקר!)

קנייה: GlengarryRevival.com.

## איך מגיעים ל-Palace Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 5 דקות הליכה צפונה

## שאלות נפוצות על Glengarry Glen Ross ניו יורק

**גיל מומלץ ל-Glengarry?** 16+. שפה גסה, תוכן קשה.
**אורך?** 90 דקות, אין הפסקה.
**שווה את המחיר הגבוה?** לחובבי Mamet והקאסט הזה: בהחלט.
**צריך לדעת אנגלית מצוינת?** כן. הדיאלוג מהיר, אין subtitles.`,

  'gypsy-revival': `## Gypsy Revival 2025 בברודווי ניו יורק — המחזמר הקלאסי עם Audra McDonald

Gypsy Revival נפתח בברודווי ב-2024 ב-Majestic Theatre (245 West 44th Street). הוא revival של אחד מהמחזמרים הכי גדולים בהיסטוריה: Gypsy של Jule Styne (מוזיקה), Stephen Sondheim (מילים), ו-Arthur Laurents (book). המחזה מספר על Mama Rose, אם stage door אגרסיבית-מאיימת שמנסה להפוך את שתי בנותיה (June ו-Louise) לכוכבות vaudeville בארה"ב של 1920-1930.

הכוכבת בתפקיד Mama Rose: **Audra McDonald** — שיא של 6 פרסי Tony, יותר מכל שחקן/ית בהיסטוריה. הביצוע שלה ל-"Rose's Turn" (השיר הסופי, סולו של 11 דקות) זוכה לביקורות שחושבות אותו לאחד מהביצועים הגדולים בתאטרון הברודווי.

## מה לצפות מ-Gypsy

- **משך**: 2 שעות 50 דקות עם הפסקה
- **שירים**: Everything's Coming Up Roses, Some People, Rose's Turn, Let Me Entertain You
- **טון**: מחזמר קלאסי, אבל עם עומק רגשי גדול. מצד אחד glamourous, מצד שני טראגי
- **הקאסט מסביב**: Joy Woods (Louise), Danny Burstein (Herbie), Jordan Tyson (June)

## מחירי כרטיסים ל-Gypsy

- **Mezzanine** $99-179
- **Orchestra** $149-279
- **Premium** $399+ (Audra Effect)

קנייה: GypsyOnBroadway.com.

## איך מגיעים ל-Majestic Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 4 דקות הליכה

## שאלות נפוצות על Gypsy ניו יורק

**גיל מומלץ ל-Gypsy?** 12+. תוכן בוגר אבל לא מיני-ספציפי.
**אורך?** 2 שעות 50 דקות.
**שווה ההייפ של Audra McDonald?** בהחלט. ביצוע אגדי.
**מה זה Rose's Turn?** הסולו הסופי של Mama Rose — 11 דקות של בקיעה רגשית. לא לפספס.`,
}

let ok=0,fail=0
for(const[slug,full_content]of Object.entries(updates)){
  const{error}=await sb.from('attractions').update({full_content}).eq('slug',slug).eq('destination_id',env.DESTINATION_ID)
  if(error){console.log('FAIL',slug,error.message);fail++}else{console.log('OK  ',slug,'— full:',full_content.length);ok++}
}
console.log(`\nDone: ${ok} updated, ${fail} failed`)
