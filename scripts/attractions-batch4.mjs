// Attractions Batch 4 (final 9): MSG, NY Public Library, Prospect Park, Summit, Tenement, Cloisters, Vessel, Wall St Bull, Whitney
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const env = Object.fromEntries(readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n').filter(Boolean).map(l=>l.split('=').map(s=>s.trim()).filter(Boolean)).filter(p=>p.length===2))
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

const updates = {
  'madison-square-garden': `## Madison Square Garden ב-Midtown ניו יורק — "The World's Most Famous Arena"

Madison Square Garden ב-4 Pennsylvania Plaza במידטאון מערב הוא האולם הספורט-הופעות הכי מפורסם בעולם. הסניף הנוכחי הוא הרביעי במספר (קודמיו היו ב-Madison Square, ולכן השם), נפתח ב-1968. המקום: מעל Penn Station — תחנת הרכבת הכי עמוסה במנהטן. 20,000 מקומות לבסיסי קונצרטים, 19,500 ל-NBA Knicks, 18,200 ל-NHL Rangers.

ה-DNA: מדיסון סקוור גארדן הוא ה-iconic American venue. Frank Sinatra, Elvis, Beatles (1965, 1966), Springsteen, Madonna, Beyoncé, Adele, Jay-Z — כולם הופיעו פה. כדורסל מ-1968 (Knicks), הוקי מ-1968 (Rangers).

## מה לעשות ב-Madison Square Garden

**ספורט**:
- **NY Knicks** (NBA): עונה אוקטובר-אפריל. כרטיסים $80-1000+ (תלוי במשחק)
- **NY Rangers** (NHL): עונה אוקטובר-אפריל. כרטיסים $60-500
- **Boxing/UFC**: 4-6 ב-שנה
- **NCAA Tournament**: לפעמים מארח

**קונצרטים**: 100+ ב-שנה. כרטיסים $80-500.

**Stadium Tour** ($35): סיור 75 דקות מאחורי-הקלעים. כל יום שאין אירוע.

## איך מגיעים ל-Madison Square Garden

המקום הכי נגיש במנהטן:
- מטרו 1/2/3/A/C/E ל-34th Street/Penn Station (ה-stop צמוד למגדל)
- LIRR/NJ Transit ל-Penn Station (תחנה במבנה)
- Amtrak ל-Penn Station

## שאלות נפוצות על Madison Square Garden

**מה הקבוצות?** Knicks (NBA), Rangers (NHL).
**MSG כשר?** יש סטנד אחד עם kosher dogs, באזור 200.
**איך לקנות כרטיסים?** Ticketmaster, MSG.com.
**שווה הסיור?** לחובבי MSG וקונצרטים: בהחלט.
**מה ההבדל בין MSG ל-Barclays?** MSG: מנהטן, Knicks/Rangers, יותר היסטורי. Barclays: ברוקלין, Nets/Liberty, יותר חדש.`,

  'new-york-public-library': `## New York Public Library ב-Midtown ניו יורק — אולם הקריאה Rose וה-Lions

New York Public Library, המבנה הראשי ב-476 Fifth Avenue (פינת 42nd Street), נפתח ב-1911. הוא אחד מהמבנים הניאו-קלאסיים החשובים בעיר. השמירים בכניסה: שני אריות אבן בשם **Patience** (סבלנות) ו-**Fortitude** (אומץ) — סמלים של ניו יורק ותיקיות לפסל החירות. הוא חינם לציבור, פתוח כל יום, ויש בו 51 מיליון פריטים (ספרים, כתבי-יד, מפות, תמונות).

ה-Highlight של הביקור: **The Rose Main Reading Room** — חדר הקריאה הראשי, 90 מטר אורך, 24 מטר רוחב, 16 מטר גובה. תקרה מצויירת באבלות שמיים וענני וניל. שולחנות עץ ארוכים, מנורות ירוקות-פליז קלאסיות. הרגיש כמו ב-Harry Potter (בטעות).

## מה לראות ב-NY Public Library

**Free Tours** (מודרכים):
- **Architecture Tour** (חינם): כל יום ב-11:00 ו-14:00. 60 דקות
- **Self-guided**: לבד, כל הזמן

**אזורים מומלצים**:
- **Rose Main Reading Room** (300, חינם): האייקון
- **Map Division** (117): מפות עתיקות
- **Manuscripts and Archives Division** (319): כתבי-יד היסטוריים — מכתבי Washington, Lincoln, Mark Twain
- **Stephen A. Schwarzman Building**: השם הרשמי של המבנה הראשי
- **Bryant Park**: פארק קטן צמוד לספרייה. מקסים. מצוין לקפה ולסנדוויץ' אחרי

**תערוכות זמניות**: 4-6 בשנה, חינם. בדקו ב-nypl.org/exhibitions.

## איך מגיעים ל-NY Public Library

- מטרו B/D/F/M ל-42nd Street/Bryant Park, 2 דקות הליכה
- מטרו 7 ל-5th Avenue, 1 דקה הליכה
- מטרו 4/5/6/S/N/Q/R/W/1/2/3 ל-Times Square/42nd Street, 8 דקות הליכה

## שאלות נפוצות על NY Public Library

**NY Public Library חינם?** כן, חינם לחלוטין.
**זמן צפוי?** 30 דקות-2 שעות.
**שעות פתיחה?** שני-שבת 10:00-18:00 (חמישי עד 20:00), ראשון 13:00-17:00.
**שווה הביקור?** לחובבי אדריכלות וספרים: בהחלט.
**אפשר לקרוא ספרים?** כן, אבל צריך כרטיס ספרייה (יוחד למקומיים).`,

  'prospect-park': `## Prospect Park בברוקלין ניו יורק — הלב הירוק של ברוקלין

Prospect Park ב-Brooklyn הוא פארק ענק של 2,130 דונם (526 acres), שני בגודלו לסנטרל פארק. הוא תוכנן ב-1867 על ידי **Frederick Law Olmsted** ו-**Calvert Vaux** — אותם אדריכלים שעיצבו את סנטרל פארק. למעשה, Olmsted אהב את Prospect Park יותר. הוא היה בעל יותר חופש פה — שטח גדול, פחות הגבלות, ותכנון יותר מסודר.

ה-DNA: פחות תיירותי מסנטרל פארק (לא משפיע על הקליפ של תיירים, כי הם בעיקר מתמקדים במנהטן), יותר אמיתי-מקומי. אנשים מ-Park Slope, Crown Heights, Prospect Heights, Windsor Terrace ו-Lefferts Gardens משתמשים בו כל יום.

## מה לעשות ב-Prospect Park

**אטרקציות מרכזיות**:
- **Long Meadow**: דשא של 90 דונם — אחד המשטחים הירוקים הגדולים בערים אמריקאיות
- **The Lake**: אגם של 24 דונם. סירות שכירות בקיץ ($25/שעה)
- **The Ravine**: יער עתיק עם שבילי הליכה
- **Prospect Park Zoo**: גן חיות קטן (כלול בכרטיס Bronx Zoo). $10
- **Prospect Park Carousel**: קרוסלת עץ עתיקה. $4
- **Brooklyn Botanic Garden**: צמוד לפארק (כניסה נפרדת, $18)
- **Brooklyn Public Library** (Central Branch): צמוד, מבנה Art Deco יפהפה

**אירועים**:
- **Celebrate Brooklyn!** (קיץ): קונצרטים חיצוניים, חינם
- **Brooklyn Half Marathon**: מאי

## איך מגיעים ל-Prospect Park

- מטרו B/Q/S ל-Prospect Park, 1 דקה הליכה
- מטרו 2/3 ל-Grand Army Plaza, 2 דקות הליכה (כניסה צפונית)
- מטרו F/G ל-15th Street/Prospect Park, 1 דקה הליכה
- אובר ממנהטן: $20-30

## שאלות נפוצות על Prospect Park

**Prospect Park חינם?** כן, חינם לכל הפעילויות חוץ מה-zoo, carousel, ומסעדות.
**זמן צפוי?** 1-3 שעות לסיבוב, יום שלם עם zoo + botanic garden.
**מה ההבדל בין Prospect ל-Central Park?** Prospect: פחות תיירותי, יותר טבעי. Central Park: יותר אטרקציות, יותר תיירותי.
**שווה הביקור אם אתם בעיקר במנהטן?** אם יש לכם זמן — בהחלט. שונה לחלוטין מהטיולים שלכם.`,

  'summit-one-vanderbilt': `## Summit One Vanderbilt ב-Midtown ניו יורק — חוויית תצפית מטורפת

Summit One Vanderbilt ב-45 East 42nd Street ליד Grand Central נפתחה ב-2021 כחוויית תצפית בקומות 91-93 של מגדל One Vanderbilt (גובה 427 מטר). אבל זה לא רק "תצפית" — זה חוויה immersive שמשלבת ראייה, אומנות, ואפקטים חזותיים. עיצוב: SnøhettaSnøhetta + Kenzo Digital.

החלל: 4 רמות נפרדות. כל אחת חוויה אחרת:

## מה יש ב-Summit One Vanderbilt

**Air** (קומה 91): חדרי מראות בזכוכית. הקירות, התקרה, והרצפה — הכל זכוכית מראות. אתם נראים מ-360° אינסוף פעמים. אינסטגרם dream.

**Levitation** (קומה 91, מחוץ למבנה): מרפסת זכוכית בולטת מהמבנה. אתם עומדים על זכוכית עם 91 קומות מתחתיכם. ב-100 מטר מ-Edge Hudson Yards אבל בגובה דומה.

**Affinity** (קומה 91): התקנה אומנותית של Yayoi Kusama-style — בלונים מלא של זהב שמרחפים בחלל. אסתטיקה מטורפת.

**Apex** (קומה 93): המרפסת העליונה. יש שם מעלית-זכוכית מוקפת מסך LED שמדמה הליכה בחלל בזמן שאתם עולים.

**The Eye** (קומה 91): רצפת זכוכית במרכז מבט פנימה למטה.

**מסעדה ובר**: **Après** במגדל הראשי — ארוחת ערב יוקרתית עם נוף.

## מחירי כרטיסים ל-Summit One Vanderbilt

- **Standard**: $43 (online), $48 (door)
- **Sunset/Twilight**: $59 (אורות שקיעה)
- **Premium**: $79 (זמן מועדף + skip line)
- **VIP**: $189 (כל החוויות + Apex elevator + champagne)

## איך מגיעים ל-Summit One Vanderbilt

- מטרו 4/5/6/7/S ל-Grand Central-42nd Street, 1 דקה הליכה (ה-stop במגדל)

## שאלות נפוצות על Summit One Vanderbilt

**גיל מומלץ?** 6+. ילדים אוהבים את החדרי מראות.
**Summit בטוח?** בהחלט. בודק בכניסה.
**מה ההבדל בין Summit ל-Edge?** Summit: יותר experiential (אומנות + נוף), 91 קומות, ב-Grand Central. Edge: רצפת זכוכית, 100 קומות, ב-Hudson Yards.
**שווה $43?** לחוויה ייחודית: בהחלט. אחת מהאטרקציות הטופ של 2024-2025.
**זמן צפוי?** 90-120 דקות.`,

  'tenement-museum': `## Tenement Museum ב-Lower East Side ניו יורק — סיפור המהגרים

Tenement Museum ב-103 Orchard Street ב-Lower East Side הוא מוזיאון ייחודי. הוא בנוי בתוך 2 בנייני tenement (בנייני מגורים זולים) היסטוריים: 97 Orchard Street (נבנה 1863, היה בית של 7,000 מהגרים בין 1863-1935) ו-103 Orchard Street (1888, ביית 16,000 מהגרים). המוזיאון משחזר דירות אמיתיות של משפחות אמיתיות שגרו בהן — איטלקים, יהודים, ליטאים, איריים, סינים, פוארטו ריקנים.

הדיוק: 97 Orchard נסגר ב-1935 (לא היה עומד בקוד הבניין), עמד ריק 50 שנה, נפתח כמוזיאון ב-1988. הדירות לא הוחזרו לרמה הסטרילית של מוזיאון רגיל — הן נשארו כמו ב-1935, עם רהיטים מקוריים ומוצרים אישיים שמשפחות הותירו.

## איך הביקור עובד ב-Tenement Museum

זה החלק הייחודי. **אין כניסה עצמאית.** כל ביקור הוא **מודרך** — מדריך מקצועי לוקח קבוצה של 10-15 אנשים בסיור של 60-90 דקות. כל סיור מתמקד בסיפור של משפחה אחת:

**Tours פופולריים**:
- **"Hard Times" Tour**: סיפור משפחת Gumpertz (יהודים מגרמניה, 1870s) ומשפחת Baldizzi (איטלקים, 1930s)
- **"Sweatshop Workers" Tour**: סיפור משפחת Levine (יהודים מליטא, 1900s) שהפעילו workshop של חייטות בדירה
- **"Shop Life" Tour**: 97 Orchard בקומת קרקע — חנות בירה גרמנית, חנות בגדים יהודית
- **"Outside the Home" Tour** (סיור הליכה ברחוב): סיור בשכונה
- **"Under One Roof" Tour**: סיפורים מ-1960-1990 — פוארטו ריקנים, סינים, ויהודי-אורתודוקסים

## מחירי כרטיסים ל-Tenement Museum

- **כל סיור**: $30 (מבוגר), $25 (סטודנט), $20 (ילד 5-18)
- **2 סיורים מפותחים** (Tour Combo): $50

קנייה: tenement.org. **חיוני להזמין מראש** — סיורים מבוקשים נמכרים שבועות לפני.

## איך מגיעים ל-Tenement Museum

- מטרו F ל-Delancey Street/Essex Street, 4 דקות הליכה
- מטרו J/M/Z ל-Bowery, 6 דקות הליכה

## שאלות נפוצות על Tenement Museum

**גיל מומלץ?** 8+. לילדים קטנים יישעמם.
**זמן צפוי?** 60-90 דקות לסיור, 2-3 שעות לכל הביקור.
**שווה ההייפ?** לחובבי היסטוריה אמריקאית: בהחלט.
**מה ההבדל בין Tenement ל-Ellis Island?** Ellis: היסטוריה רחבה של ההגירה. Tenement: סיפורים אישיים של משפחות ספציפיות.`,

  'the-cloisters': `## The Cloisters ב-Fort Tryon Park ניו יורק — אמנות ימי הביניים בקצה צפון מנהטן

The Cloisters ב-99 Margaret Corbin Drive ב-Fort Tryon Park (קצה צפון מנהטן) הוא סניף של Metropolitan Museum (Met) שמוקדש לחלוטין לאמנות ימי הביניים האירופאית. הוא נפתח ב-1938. המבנה עצמו ייחודי: הוא נבנה מאבני 5 מנזרים אירופאים שפורקו, נשלחו לניו יורק, והורכבו מחדש. רוב המבנה הוא רומאנסקי וגותי מ-12-15 מאות.

המיקום: Fort Tryon Park, גובה של 70 מטר מעל Hudson River. מהמרפסת הצפונית של המוזיאון יש נוף לסקיילין של New Jersey (Palisades Cliffs) — ככל שאתם עולים יותר צפונה במנהטן, יותר ירוק. בהשראה: זה לא מרגיש כמו ניו יורק.

## מה לראות ב-Cloisters

**אוסף עיקרי**:
- **The Unicorn Tapestries** (1495-1505): שטיחים פלמיים מסיביים שמתארים ציד אגדה של חד-קרן. אחד מהשבחים המסביבים החשובים בעולם
- **Belles Heures of Jean de Berry** (1405-1409): כתב יד מואר שנעשה עבור הדוכס מ-Berry. אחד הספרים היפים בעולם
- **Mérode Triptych** (1427): ציור של Robert Campin (Master of Flémalle) — סצנת התבשרות יפהפייה
- **Reliquaries** (פעמוני קודש): עשרות מ-Bone, זהב, ופיני-ים יקרים

**Gardens** (גנים):
- 3 גנים פעילים — Bonnefont (תבלינים מסורתיים), Trie (שרידי מנזר), Cuxa (cloister classico)
- בכל אחד צמחים שגדלו ב-Europe of 1300 — תבלינים, פרחים, אירועים אזרחיים

## מחירי כניסה ל-Cloisters

- **כניסה משולבת ל-Cloisters + Met + Met Breuer** (כל אחד): $30 (מבוגר), $22 (סטודנט)
- **תושבי NYC**: pay-what-you-wish

## איך מגיעים ל-The Cloisters

זה הצד הקשה. הוא **רחוק** ממנהטן התיירותי:
- מטרו A ל-190th Street, 5 דקות הליכה דרך הפארק (חובה לחצות את Fort Tryon Park, מרשים)
- אובר ממידטאון: $35-50, 25-40 דקות

**טיפ**: שלבו עם ביקור ב-Met (Fifth Avenue) באותו יום — אותו כרטיס.

## שאלות נפוצות על The Cloisters

**זמן צפוי?** 2-3 שעות.
**שעות פתיחה?** ראשון-חמישי 10:00-17:00, סגור שבת.
**Cloisters שווה הנסיעה?** בהחלט. החוויה אינה דומה לאף מוזיאון אחר בעיר.
**גיל מומלץ?** 12+. לילדים קטנים יישעמם.`,

  'the-vessel': `## The Vessel ב-Hudson Yards ניו יורק — מבנה אומנות של Heatherwick

The Vessel ב-20 Hudson Yards (Public Square) הוא מבנה אומנות מטאלי בגובה 50 מטר שנפתח ב-2019 כחלק מפרויקט Hudson Yards. עוצב על ידי **Thomas Heatherwick** (סטודיו בריטי, ידוע גם בעיצוב מתחם 2012 Olympics ב-לונדון). הוא מורכב מ-154 גרמי-מדרגות, 80 פלטפורמות תצפית, ו-2,500 מדרגות בודדות. המבנה נראה כמו צפצוף של דבורה גלובלי.

הקטע: הוא תוכנן להיות "אינסטלציה אינטראקטיבית" — אנשים יעלו ויחקרו אותו. לעלות ולצפות בעיר ובגג Hudson Yards. אבל מאז 2019 התרחשו 4 התאבדויות מהמבנה. ב-2021 הוא נסגר לעלייה. עדיין סגור ב-2025. הסיבה: עיצוב המעקות לא מחזיק בני אדם שמנסים לקפוץ.

## מה אפשר לעשות ב-Vessel היום

מאחר שהעלייה סגורה, ה-Vessel הוא בעיקר אובייקט צילום:
- **Photo Op מבחוץ**: זווית הצילום הטובה ביותר היא מהצפון-מערב (פינת 33rd Street ו-Hudson Yards Way)
- **תצוגה פנימית בקומה 1**: אפשר להיכנס לחלל הראשון מתחת ל-Vessel ולהסתכל למעלה
- **High Line**: ה-High Line מסתיים ליד ה-Vessel, אז הוא מופיע בכל סיור High Line

## איך מגיעים ל-The Vessel

- מטרו 7 ל-34th Street/Hudson Yards, 1 דקה הליכה (ה-stop במתחם)
- מטרו A/C/E ל-34th Street/Penn Station, 12 דקות הליכה מערבה
- High Line: סיום המסלול הצפוני

## אטרקציות נוספות ב-Hudson Yards

לפני או אחרי ה-Vessel:
- **Edge Observation** (30 Hudson Yards): המרפסת הגבוהה. $43
- **The Shed**: מרכז תרבות לתיאטרון, אופרה, אומנות
- **The Shops at Hudson Yards**: 100+ חנויות, 15+ מסעדות

## שאלות נפוצות על The Vessel

**The Vessel סגור?** העלייה כן, מאז 2021. ההתבוננות מבחוץ פתוחה.
**The Vessel חינם?** כן.
**זמן צפוי?** 15-30 דקות לצילום.
**שווה הביקור?** רק כחלק מסיבוב כללי ב-Hudson Yards (Edge, High Line). לא יעד עצמאי.`,

  'wall-street-charging-bull': `## Wall Street ו-Charging Bull ב-Lower Manhattan ניו יורק — לב הפיננסים

Wall Street ב-Lower Manhattan הוא לא רק רחוב — זה סמל. שמו בא מ-defensive wall שהולנדים בנו ב-1653 על קצה צפון של New Amsterdam (אז שם ההתיישבות), כדי להתגונן מהאנגלים והאינדיאנים. ב-1685 הקיר נהרס, אבל השם נשאר.

המרכז של Wall Street: **New York Stock Exchange (NYSE)** ב-11 Wall Street. הוא הבורסה הגדולה בעולם, מיועד כ-$25 טריליון של מניות. החזית הניאו-קלאסית עם 6 העמודים הקורינתיים שופצה ב-1903. **חשוב**: הבורסה **סגורה לציבור** מאז 9/11 בשנת 2001. אפשר לצלם רק מבחוץ.

## אטרקציות סביב Wall Street

**Charging Bull** (Bowling Green): הפסל הברונזי הענקי של Arturo Di Modica. הוצב באופן לא חוקי ב-1989 בלילה כפעולת אומנות גרילה אחרי המפולת של 1987 — סמל החוסן של Wall Street. העירייה רצתה להוריד אותו, אבל הצליח. עלות: $360,000 (Di Modica שילם מכיסו). היום אחד הפסלים הכי מצטלמים בעולם.

**Fearless Girl** (במקור מול ה-Bull, מאז 2018 נמצאת מול NYSE): פסל ילדה של Kristen Visbal, הוצב ב-2017 ליום האישה הבינלאומי כסמל לנשים בפיננסים.

**Federal Hall National Memorial** (26 Wall Street): המבנה שבו George Washington נשבע כנשיא הראשון ב-1789. חינם, פתוח לציבור, יש מוזיאון קטן.

**Trinity Church** (75 Broadway): הכנסייה הקלאסית הסמוכה. הקבר של Alexander Hamilton פה.

**9/11 Memorial & Museum**: 8 דקות הליכה צפונה. אטרקציה משלימה חיונית.

## איך מגיעים ל-Wall Street

- מטרו 2/3 ל-Wall Street, 1 דקה הליכה (ה-stop צמוד ל-NYSE)
- מטרו 4/5 ל-Bowling Green, 3 דקות הליכה (קרוב יותר ל-Charging Bull)
- מטרו J/Z ל-Broad Street, 1 דקה הליכה

## שאלות נפוצות על Wall Street

**אפשר להיכנס ל-NYSE?** לא, סגורה לציבור מ-2001.
**Charging Bull חינם?** כן.
**זמן צפוי?** 30-60 דקות לסיבוב.
**שווה הביקור?** לחווייה הסמלית של Wall Street: כן. גם כדי לראות את Charging Bull ו-Fearless Girl.
**טיפים לצילום?** ה-bull עמוס. בואו לפני 09:00 בבוקר או אחרי 19:00 לצילום בלי תיירים.`,

  'whitney-museum': `## Whitney Museum of American Art ב-Meatpacking District ניו יורק — אמנות אמריקאית עכשווית

Whitney Museum of American Art ב-99 Gansevoort Street ב-Meatpacking District (קצה דרום של ה-High Line) הוא המוזיאון האמריקאי המוקדש אך ורק לאמנות אמריקאית בת זמננו. הוא נוסד ב-1930 על ידי **Gertrude Vanderbilt Whitney** (פסלת ממשפחת Vanderbilt העשירה), שאספה אמנות אמריקאית כי ה-Met רק עניינים את אמנות אירופאית באותו זמן.

המבנה הנוכחי נפתח ב-2015 — עיצוב של **Renzo Piano** (האדריכל של Centre Pompidou בפריז). 200,000 רגל מרובע, 8 קומות, מרפסות פתוחות בכל הצדדים עם נופים של מנהטן וה-High Line. המבנה עצמו הוא יצירת אמנות.

## מה לראות ב-Whitney

**אוסף קבוע**:
- **Edward Hopper** (יותר מ-3,000 פריטים — האוסף הגדול בעולם של Hopper)
- **Georgia O'Keeffe**: פרחים גדולים, נוף ניו מקסיקו
- **Andy Warhol**: פופ ארט, soup cans
- **Jasper Johns**: דגל אמריקה
- **Mark Rothko**: צבעים-בעיקר
- **Cindy Sherman**: צילום עצמי-קונצפטואלי

**Whitney Biennial**: כל 2 שנים — תערוכה של 75-100 אמנים אמריקאים בני זמננו. אירוע הביקורת המרכזי של עולם האמנות האמריקאי.

**מרפסות חיצוניות** (לא דורש כניסה במחירת שומר): 4 מרפסות פתוחות עם נופים — אחד מהמקומות הטופ למפסיק בעיר.

## מחירי כניסה ל-Whitney

- **כרטיס מבוגר**: $30
- **65+/סטודנטים**: $24
- **מתחת ל-18**: חינם
- **Friday 19:00-22:00**: pay-what-you-wish (תור 30-60 דקות)

## איך מגיעים ל-Whitney

- מטרו A/C/E/L ל-14th Street/8th Avenue, 8 דקות הליכה
- מטרו 1/2/3 ל-14th Street, 12 דקות הליכה
- High Line: 1 דקה הליכה (קצה דרום של ה-High Line)

## שאלות נפוצות על Whitney Museum

**זמן צפוי?** 2-3 שעות.
**שעות פתיחה?** רביעי-שני 10:30-18:00 (חמישי-שישי עד 22:00). שלישי סגור.
**Whitney שווה ההייפ?** לחובבי אמנות אמריקאית עכשווית: בהחלט. גם רק לאדריכלות והנוף מהמרפסות.
**מה ההבדל בין Whitney ל-MoMA?** MoMA: גלובלי, ענק. Whitney: רק אמריקאי, יותר אינטימי, נוף יותר טוב.
**שווה לשלב עם High Line?** כן, ה-High Line מתחיל ממש מ-Whitney. סיור של 2-3 שעות שלב את שניהם.`,
}

let ok=0,fail=0
for(const[slug,full_content]of Object.entries(updates)){
  const{error}=await sb.from('attractions').update({full_content}).eq('slug',slug).eq('destination_id',env.DESTINATION_ID)
  if(error){console.log('FAIL',slug,error.message);fail++}else{console.log('OK  ',slug,'— full:',full_content.length);ok++}
}
console.log(`\nDone: ${ok} updated, ${fail} failed`)
