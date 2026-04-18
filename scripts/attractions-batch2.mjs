// Attractions Batch 2 (8): rest of broadway + barclays-center
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const env = Object.fromEntries(readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n').filter(Boolean).map(l=>l.split('=').map(s=>s.trim()).filter(Boolean)).filter(p=>p.length===2))
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

const updates = {
  'operation-mincemeat': `## Operation Mincemeat בברודווי ניו יורק — קומדיה מוזיקלית בריטית מסתורית

Operation Mincemeat נפתח בברודווי ב-2025 ב-John Golden Theatre (252 West 45th Street). הוא הגיע מ-West End בלונדון, איפה הפך לאחד הסיפורי ההצלחה של 2023 וזכה ב-Olivier Award לבסט מיוזיקל. המחזה מבוסס על מבצע ריגול אמיתי של הבריטים במלחמת העולם השנייה: הם השאירו גופה של חייל מזויפת על חוף ספרד עם מסמכים מסולפים שיגרמו לגרמנים להאמין שהפלישה תהיה ב-יוון, לא ב-Sicily.

ה-DNA: 5 שחקנים בלבד מגלמים 85+ דמויות. השחלפת תלבושות מטורפת. הומור בריטי שחור. שירים שמערבבים pop, swing, ו-vaudeville.

## מה לצפות מ-Operation Mincemeat

- **משך**: 2 שעות 15 דקות עם הפסקה
- **טון**: קומדיה כהה. הומור בריטי דק
- **שירים**: סטנדרטים של מלחמת העולם פגושים מודרני
- **חזותית**: שינויי בגדים מהירים. סצנת המלון בספרד מטורפת

## מחירי כרטיסים ל-Operation Mincemeat

- **Mezzanine** $69-119
- **Orchestra** $99-179
- **Premium** $229+

קנייה: OperationMincemeatBroadway.com.

## איך מגיעים ל-John Golden Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 4 דקות הליכה

## שאלות נפוצות על Operation Mincemeat ניו יורק

**גיל מומלץ?** 12+. הומור עדין על מלחמה.
**אורך?** 2 שעות 15 דקות.
**צריך לדעת היסטוריה?** לא חובה. המחזה מסביר.`,

  'othello-denzel': `## Othello בברודווי ניו יורק — Denzel Washington וJake Gyllenhaal בשייקספיר

Othello של 2025 הוא revival של מחזה השייקספיר הקלאסי, רץ זמן מוגבל ב-Ethel Barrymore Theatre (243 West 47th Street). הקאסט: **Denzel Washington** בתפקיד Othello, **Jake Gyllenhaal** כ-Iago. Denzel הוא 70 שנה ב-2025, חוזר לברודווי אחרי 12 שנה (האחרון: A Raisin in the Sun ב-2014). Jake היה ב-Sea Wall/A Life ב-2019. הצמד הזה לבמה אחת — אחד הקאסטים הקריטיים של 2025.

המחזה: שייקספיר מ-1604, על גנרל ונציאני שחור (Othello) שמתחתן עם Desdemona הלבנה, ועל אדם הפחות-טוב שלו (Iago) שמשכנע אותו שהיא בוגדת. הסיום: דם.

## מה לצפות מ-Othello

- **משך**: 3 שעות עם הפסקה
- **טון**: דרמה שייקספירית קלאסית. אנגלית גבוהה
- **תוכן**: גזענות, קנאה, מניפולציה, רצח. למבוגרים
- **שווה את המחיר** רק לחובבי שייקספיר ו/או הקאסט

## מחירי כרטיסים ל-Othello

זה החלק. **השיא הגבוה ביותר בהיסטוריית ברודווי**:
- **Mezzanine** $179-379
- **Orchestra** $279-599
- **Premium / Front rows** $999+ (כן, 999)
- **Average ticket**: $310

קנייה: OthelloBroadway.com.

## איך מגיעים ל-Ethel Barrymore Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 5 דקות הליכה

## שאלות נפוצות על Othello ניו יורק

**גיל מומלץ?** 16+. תוכן בוגר.
**אורך?** 3 שעות עם הפסקה.
**שווה $599?** לחובבי הקאסט: בהחלט. אחרת — לא.
**שיא הזמן הזה?** Othello רץ זמן מוגבל, לרוב 12 שבועות בלבד.`,

  'our-town-revival': `## Our Town Revival בברודווי ניו יורק — Jim Parsons בקלאסיקה אמריקאית

Our Town Revival נפתח בברודווי ב-2024 ב-Ethel Barrymore Theatre (243 West 47th Street, אותו תיאטרון של Othello — שתי הצגות סובבות בלוח). הוא revival של מחזה שכתב Thornton Wilder ב-1938, זוכה ב-Pulitzer Prize. המחזה מתרחש בעיירה קטנה ב-New Hampshire של 1900, ומספר על משפחות, חיים יומיומיים, אהבה, נישואים, ומוות.

ה-Cast: **Jim Parsons** (Sheldon מ-Big Bang Theory) בתפקיד **Stage Manager** — הדמות שמספרת את הסיפור ופועלת כ-narrator. Zoey Deutch, Ephraim Sykes, Katie Holmes (כן Tom Cruise's), בתפקידים נוספים. הכיוון: Kenny Leon (פרסי Tony, A Soldier's Play).

## מה לצפות מ-Our Town

- **משך**: 2 שעות 30 דקות עם הפסקה
- **טון**: רגוע, רפלקטיבי, רגשי. לא דרמה אינטנסיבית
- **חזותית**: סטיינג מינימליסטי לחלוטין — אין חצרים, אין רהיטים. רק שחקנים על במה ריקה
- **תוכן**: חיי משפחה, אהבה, נישואים, מוות. אין רוע. רק חיים

## מחירי כרטיסים ל-Our Town

- **Mezzanine** $89-149
- **Orchestra** $129-249
- **Premium** $299+

## איך מגיעים ל-Ethel Barrymore Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 5 דקות הליכה

## שאלות נפוצות על Our Town ניו יורק

**גיל מומלץ?** 12+. ראוי למתבגרים, מבוגרים. ילדים קטנים יישעממו.
**אורך?** 2 שעות 30 דקות.
**שווה ההייפ?** לחובבי תאטרון אמריקאי קלאסי: בהחלט.`,

  'real-women-have-curves': `## Real Women Have Curves בברודווי ניו יורק — מחזמר על מהגרות מקסיקאיות

Real Women Have Curves נפתח בברודווי ב-2025 ב-James Earl Jones Theatre (138 West 48th Street). הוא מחזמר חדש המבוסס על הסרט של America Ferrera מ-2002 ועל המחזה המקורי של Josefina López מ-1990. הסיפור: Ana, נערה מקסיקנית-אמריקאית בת 18 ב-LA של 1987, סיימה תיכון. אמה רוצה שתעבוד ב-sweatshop של אחותה (יצרני שמלות). אנה רוצה ללכת לאוניברסיטה. דרמה בין דורות, גוף-חיוביות, וזהות לטינית.

הקאסט: שחקניות לטינו-אמריקאיות, ביצוע דו-לשוני (Spanglish), ומוזיקה במיקס של mariachi, pop, ו-show tunes.

## מה לצפות מ-Real Women Have Curves

- **משך**: 2 שעות 15 דקות עם הפסקה
- **טון**: עוצמה נשית-לטינית, הומור עם חום, רגעי דרמה אבל סוף אופטימי
- **שפות**: בעיקר אנגלית, חלקים בספרדית (יש subtitles באנגלית)
- **תוכן**: גוף-חיוביות, הגירה, יחסי אם-בת, חינוך

## מחירי כרטיסים ל-Real Women

- **Mezzanine** $59-119
- **Orchestra** $99-179
- **Premium** $229+

## איך מגיעים ל-James Earl Jones Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 5 דקות הליכה

## שאלות נפוצות על Real Women Have Curves ניו יורק

**גיל מומלץ?** 12+.
**צריך לדעת ספרדית?** לא, יש subtitles.
**שווה ההייפ?** למי שמחפש מחזמר עם נראטיב נשי וזהות לטינית: בהחלט.`,

  'stomp-off-broadway': `## STOMP ב-Off-Broadway ניו יורק — תופים מאשפה מ-1994

STOMP רץ ב-Orpheum Theatre ב-126 Second Avenue (East Village) מאז 1994 — 30+ שנה ללא הפסקה. זה לא מחזמר רגיל. אין דיאלוג, אין סיפור, אין פלוט. 8 שחקנים על במה משחקים בכלי תופים שהם אוסף של אובייקטים יום-יומיים: סלי אשפה, מטאטאים, מצתי גז, פחי בנזין, קופסאות גפרורים, ידיים, רגליים. הכל הופך לכלי-נגינה.

ה-DNA: ייעודי לכל גיל, לכל שפה, לכל תרבות. אין צורך לדעת אנגלית. רק תקצב ותופים.

## מה לצפות מ-STOMP

- **משך**: 1 שעה 35 דקות, אין הפסקה
- **טון**: אנרגטי, מטורף, מצחיק. הקצבים לפעמים מגוחכים, לפעמים אמיצים
- **תוכן**: אין סיפור. רק קצבים. ו-character moments בין השחקנים
- **חזותית**: 8 שחקנים, סטיינג מינימלי, אורות צבעוניים

## מחירי כרטיסים ל-STOMP

- **All seats** $59-99 (אין דרגות יוקרה דרסטיות)
- **Premium** $129

קנייה: StompOnline.com.

## איך מגיעים ל-Orpheum Theatre

- מטרו 6 ל-Astor Place, 4 דקות הליכה
- מטרו F ל-Second Avenue, 3 דקות הליכה
- מטרו L ל-First Avenue, 5 דקות הליכה

## שאלות נפוצות על STOMP ניו יורק

**גיל מומלץ ל-STOMP?** 6+. מתאים למשפחות. ילדים אוהבים.
**צריך לדעת אנגלית?** לא, אין דיאלוג.
**אורך?** 1 שעה 35 דקות.
**שווה ההייפ?** למשפחות עם ילדים: בהחלט. למבוגרים בלי ילדים: כן אם אתם אוהבים תופים.`,

  'stranger-things-first-shadow': `## Stranger Things: The First Shadow בברודווי ניו יורק — פריקוול חי לסדרת Netflix

Stranger Things: The First Shadow נפתח בברודווי ב-2025 ב-Marquis Theatre (210 West 46th Street). הוא הגיע מ-West End בלונדון (איפה רץ מ-2023), והוא פריקוול לסדרת Netflix של 2016. הסיפור מתרחש ב-Hawkins, Indiana ב-1959 — שני דורות לפני אירועי הסדרה. גיבור: Henry Creel הצעיר (שמה הסדרה הוא Vecna).

ההפקה: עיצוב טכני מרהיב מאוד. אפקטים מיוחדים שנראים כמו סרט. מוזיקת synth של Stephen Stein, סקרי-לבן ויזואלי, ולעיתים שחקנים שעפים על חוטים.

## מה לצפות מ-Stranger Things: First Shadow

- **משך**: 2 שעות 50 דקות עם הפסקה
- **טון**: מותח, רב-עומק, אווירת horror sci-fi. לא לילדים מתחת ל-12
- **חזותית**: אפקטים מהמדהימים בברודווי. שחקנים מתעופפים, אורות לייזר, סצנות "Upside Down"
- **תוכן**: סטוריה עומק לפני הסדרה. לא חובה לראות את הסדרה לפני, אבל עוזר

## מחירי כרטיסים ל-Stranger Things

- **Mezzanine** $129-229
- **Orchestra** $199-329
- **Premium** $399+

קנייה: StrangerThingsBroadway.com.

## איך מגיעים ל-Marquis Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 5 דקות הליכה

## שאלות נפוצות על Stranger Things ניו יורק

**גיל מומלץ ל-Stranger Things?** 12+. תוכן מותח, אפקטים שעלולים להפחיד צעירים יותר.
**אורך?** 2 שעות 50 דקות.
**צריך לראות את הסדרה לפני?** לא חובה, אבל עוזר. הסיפור נפרד לעצמו.
**שווה ההייפ?** לאוהדי הסדרה: בהחלט. גם למי שלא מכיר אבל אוהב horror/sci-fi.`,

  'sunset-blvd-revival': `## Sunset Blvd Revival 2024 בברודווי ניו יורק — Nicole Scherzinger כנורמה דזמונד

Sunset Blvd Revival נפתח בברודווי ב-2024 ב-St. James Theatre (246 West 44th Street). הוא revival מהפכני של מחזמר Andrew Lloyd Webber מ-1993, שנשא 7 פרסי Tony. הסיפור: Norma Desmond, כוכבת קולנוע אילם של 1920 שנשכחה אחרי כוכבי הקול, חיה בארמון מתפורר ב-Sunset Boulevard ושוכרת תסריטאי צעיר (Joe Gillis) לערוך לה את התסריט שיחזיר אותה לתפארת.

הביקורות של Revival 2024 מהללות בעיקר 2 דברים: **Nicole Scherzinger** (Pussycat Dolls) שמגלמת את Norma Desmond בביצוע "ביצוע חיים" — אחד הביצועים החזקים בברודווי של 2020s. ו**Jamie Lloyd** הכיוון — הוא הסיר את כל ה-set, השאיר את הבמה ריקה, והכניס מצלמות חיות שמשדרות פנים-פנים של השחקנים על מסך ענק. ויזואלית מהפכני.

## מה לצפות מ-Sunset Blvd

- **משך**: 2 שעות 30 דקות עם הפסקה
- **חזותית**: מינימליסטי, מצלמות חיות, הקרנות. לא דקור קלאסי
- **שירים**: With One Look, As If We Never Said Goodbye, Sunset Boulevard
- **טון**: דרמה אינטנסיבית, רגעי קומי שחור

## מחירי כרטיסים ל-Sunset Blvd

- **Mezzanine** $99-179
- **Orchestra** $149-249
- **Premium** $349+

קנייה: SunsetBoulevardBroadway.com.

## איך מגיעים ל-St. James Theatre

- מטרו N/Q/R/W/S/1/2/3/7 ל-Times Square-42nd Street, 4 דקות הליכה

## שאלות נפוצות על Sunset Blvd ניו יורק

**גיל מומלץ?** 14+. דרמה כבדה.
**אורך?** 2 שעות 30 דקות.
**שווה ההייפ של Nicole Scherzinger?** בהחלט, אחד מהביצועים הגדולים של ברודווי 2024.`,

  'barclays-center': `## Barclays Center ב-Atlantic Avenue ברוקלין ניו יורק — בית ה-Nets

Barclays Center ב-620 Atlantic Avenue על קו הגבול בין Fort Greene ו-Prospect Heights בברוקלין נפתח ב-2012 כפרויקט של Bruce Ratner. הוא בית של 2 קבוצות ספורט מקצועיות: **Brooklyn Nets** (NBA) ו-**New York Liberty** (WNBA). מקיף 19,000 מקומות לאירועים ספורטיביים ועד 18,500 לקונצרטים.

מעבר לספורט, Barclays Center הוא יעד אירועים: קונצרטים של Beyoncé, Drake, Bruno Mars, Bad Bunny, ו-Adele פעלו פה. גם UFC fights, היאבקות (WWE), קומדיה (Dave Chappelle, Kevin Hart), ואירועי dancing.

## מה לעשות ב-Barclays Center

**ספורט**:
- **Brooklyn Nets** (NBA): עונה אוקטובר-אפריל. כרטיסים $30-500
- **New York Liberty** (WNBA): עונה מאי-אוגוסט. כרטיסים $25-200 (היא הציבה שיא ב-2024 עם MVP)
- **NCAA Tournament**: לפעמים משחקים פה

**אירועים**:
- **קונצרטים**: 60+ ב-שנה. כרטיסים $50-500
- **קומדיה**: 5-10 בשנה. $50-200
- **WWE**: 4-6 ב-שנה. $40-300

לוח אירועים: barclayscenter.com.

## איך מגיעים ל-Barclays Center

המקום הכי נגיש בברוקלין:
- **9 קווי מטרו**: 2/3/4/5/B/D/N/Q/R כולם עוצרים ב-Atlantic Avenue-Barclays Center
- **LIRR**: Atlantic Terminal צמוד לעוצים
- **אובר ממנהטן**: $20-30, 20-30 דקות

## הסביבה ולפני/אחרי המשחק

Fort Greene הוא שכונה תוססת. אופציות לארוחת ערב לפני:
- **Habana Outpost**: קובני, $15-25
- **Madiba**: דרום אפריקאי, $30-45
- **The Greene Grape**: מעדנייה לקופץ
- **Olea**: ים תיכוני, $40-60

## שאלות נפוצות על Barclays Center ניו יורק

**מה הקבוצות שמשחקות ב-Barclays Center?** Brooklyn Nets (NBA), NY Liberty (WNBA).
**יש כשר ב-Barclays Center?** כן, סטנד אחד בקומה 200 (level 2) עם kosher dogs ו-pretzels.
**איך לקנות כרטיסים?** Ticketmaster או barclayscenter.com.
**מה הפרק חניה?** SP+ Parking ב-Marriott (333 Adams Street), $30-40.
**מה ההבדל בין Barclays ל-Madison Square Garden?** Barclays: ברוקלין, Nets/Liberty. MSG: מנהטן, Knicks/Rangers.`,
}

let ok=0,fail=0
for(const[slug,full_content]of Object.entries(updates)){
  const{error}=await sb.from('attractions').update({full_content}).eq('slug',slug).eq('destination_id',env.DESTINATION_ID)
  if(error){console.log('FAIL',slug,error.message);fail++}else{console.log('OK  ',slug,'— full:',full_content.length);ok++}
}
console.log(`\nDone: ${ok} updated, ${fail} failed`)
