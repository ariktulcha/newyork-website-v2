// Attractions Batch 3 (10 landmarks): Battery Park, Brooklyn Bridge Park, Brooklyn Museum, Central Park Zoo, Citi Field, Edge, Ellis Island, Guggenheim, Lincoln Center, Little Island
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const env = Object.fromEntries(readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n').filter(Boolean).map(l=>l.split('=').map(s=>s.trim()).filter(Boolean)).filter(p=>p.length===2))
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

const updates = {
  'battery-park': `## Battery Park בקצה דרום מנהטן ניו יורק — שער ל-Statue of Liberty

Battery Park בקצה הדרומי של מנהטן הוא פארק היסטורי של 25 דונם, שמסמן את התפר בין מנהטן לים. בקצה הדרום של ה-park נמצא **Battery**, שריד מצוקי המאה ה-19 שהיה חלק ממערכת ההגנה של ניו יורק. ב-1845 הוא הומר ל-Castle Garden — תיאטרון, ואחר כך תחנת הגירה לפני שאליס איילנד נפתחה ב-1892. היום הוא חלק מהפארק.

הפארק הוא נקודת הכניסה ל-**Statue of Liberty** ול-**Ellis Island**. מעבורות **Statue Cruises** עוזבות מהמזח מדי 25 דקות. פסל החירות נצפה מהפארק עצמו, ללא צורך לנסוע לאי.

## מה לעשות ב-Battery Park ניו יורק

- **Statue of Liberty Ferry**: מעבורת ל-Liberty Island ול-Ellis Island. כרטיסים $24-30 (הזמנה מראש חיונית, statuecityquise.com)
- **SeaGlass Carousel**: קרוסלת דגים יצירתית, $5 לסיבוב, פתוח 11:00-19:00
- **Sphere Memorial לנפגעי 9/11**: כדור הברזל שעמד פעם בין הטוורים והוצל מההריסות
- **Castle Clinton**: מבנה היסטורי שמאחסן את התחנה למעבורות
- **Pier A**: ברים ומסעדות עם נוף לים

## איך מגיעים ל-Battery Park

- מטרו 1 ל-South Ferry, 1 דקה הליכה
- מטרו R/W ל-Whitehall Street, 2 דקות הליכה
- מטרו 4/5 ל-Bowling Green, 4 דקות הליכה
- אובר ממידטאון: $15-25, 15-25 דקות

## שאלות נפוצות על Battery Park

**גיל מומלץ ל-Battery Park?** לכל גיל. מצוין למשפחות.
**Battery Park חינם?** הכניסה לפארק חינם. הפעילויות (carousel, ferry) בתשלום.
**זמן צפוי לבילוי?** 1-2 שעות לפארק, 3-5 שעות עם Statue + Ellis.
**שווה לקנות כרטיס Statue Cruises מראש?** בהחלט. בקופה: 1-2 שעות תור.`,

  'brooklyn-bridge-park': `## Brooklyn Bridge Park ב-DUMBO ברוקלין ניו יורק — 2 ק"מ של נופים

Brooklyn Bridge Park נמתח 2 ק"מ לאורך גדת ברוקלין מתחת ל-Brooklyn Bridge ל-Manhattan Bridge. הוא נפתח ב-2010 בפרויקט שיקום של 25 שנה — האזור היה לשעבר נמל תעשייתי של New York Dock. היום: 85 דונם של פארק עם 6 piers, כל אחד בעל פעילות שונה.

הפארק הוא אחד הספוטים הכי אינסטגרמיים של ניו יורק. נוף ישיר ל-Manhattan Bridge, ל-Brooklyn Bridge, ולסקיילין של מנהטן. בלילה — אורות הסקיילין משתקפים במים.

## מה לעשות ב-Brooklyn Bridge Park

**Pier 1**: דשא ענק, אזור פיקניק, נקודות צילום ל-Manhattan Bridge.
**Pier 2**: מגרשי כדורסל, גן משחקי ילדים, גלגל **Jane's Carousel** (1922) — קרוסלת עץ עתיקה במבנה זכוכית. $5 לסיבוב.
**Pier 3-5**: שטחי דשא לבילוי, מגרשי כדורגל ובייסבול.
**Pier 6**: גן משחקי המים לילדים (קיץ), קונצרטים בקיץ.
**DUMBO**: השכונה צמודה לפארק. קוקטיילים, מסעדות, חנויות.

## איך מגיעים ל-Brooklyn Bridge Park

- מטרו A/C ל-High Street/Brooklyn Bridge, 5 דקות הליכה צפונה
- מטרו F ל-York Street, 4 דקות הליכה
- מטרו 2/3 ל-Clark Street, 8 דקות הליכה
- East River Ferry ל-DUMBO, 5 דקות הליכה ל-park
- אובר ממנהטן: $15-22

## שאלות נפוצות על Brooklyn Bridge Park

**גיל מומלץ?** לכל גיל. מושלם למשפחות.
**Brooklyn Bridge Park חינם?** כן, חינם.
**זמן צפוי?** 2-4 שעות לכל הפארק.
**מתי הכי טוב לבקר?** סוף אחה"צ עד שקיעה. אורות מנהטן נדלקים, אווירה קסומה.
**שווה לחצות את Brooklyn Bridge?** בהחלט. 30-40 דקות הליכה ממנהטן ל-DUMBO.`,

  'brooklyn-museum': `## Brooklyn Museum ב-Crown Heights ברוקלין ניו יורק — מוזיאון האמנות השני בעיר

Brooklyn Museum ב-200 Eastern Parkway ב-Crown Heights, מול Prospect Park, נפתח ב-1897 כפרויקט יחד עם Metropolitan Museum (Met). הוא המוזיאון השני בגודלו בניו יורק (אחרי ה-Met) — 1.5 מיליון פריטים, 560,000 רגל מרובע של תצוגה. הקהל פחות תיירותי מ-Met, מה שאומר שיש פחות הצפה.

## מה יש ב-Brooklyn Museum

**אוספים מרכזיים**:
- **Egyptian Collection**: אחד מהאוספים המצרים הטופ-בעולם. מומיות, ארונות מתים, פסלי פרעונים. רבים מ-1800-700 BCE
- **American Art**: ציורים אמריקאיים מ-1800 ועד היום. כולל את "Washington Crossing the Delaware" של Emanuel Leutze
- **African Art**: 6,000+ פריטים מ-Sub-Saharan Africa
- **Decorative Arts**: רהיטים, בגדים, תכשיטים אמריקאיים
- **Brooklyn Long Island Historical Society**: היסטוריה של ברוקלין

**תערוכות זמניות**: 6-8 בשנה, לפעמים מקבלות ביקורות עולמיות.

## מחירי כניסה ל-Brooklyn Museum

- **כרטיס מבוגר**: $20
- **סטודנטים**: $14
- **מתחת ל-19**: חינם
- **First Saturdays**: כל שבת ראשונה של חודש — חינם, פלוס קונצרטים ופעילויות עד 23:00. אטרקציה גדולה למקומיים

## איך מגיעים ל-Brooklyn Museum

- מטרו 2/3 ל-Eastern Parkway-Brooklyn Museum, 1 דקה הליכה (ה-stop נמצא מתחת למוזיאון)
- מטרו B/Q ל-Atlantic-Barclays, ואז 5 דקות באוטובוס
- אובר ממנהטן: $20-28

## שאלות נפוצות על Brooklyn Museum

**שעות פתיחה?** רביעי-ראשון 11:00-18:00. שני-שלישי סגור.
**זמן צפוי?** 2-4 שעות.
**שווה לבוא ב-First Saturday?** אם אתם פנויים בשבת ערב: בהחלט. אווירה מטורפת.
**מה ההבדל בין Brooklyn Museum ל-Met?** Brooklyn: יותר אינטימי, פחות תיירותי, אוסף מצרי טופ. Met: ענק, מקיף יותר, יותר תיירותי.`,

  'central-park-zoo': `## Central Park Zoo בסנטרל פארק ניו יורק — גן חיות אינטימי בלב מנהטן

Central Park Zoo בקצה דרום-מזרח של Central Park (5th Avenue ו-64th Street) הוא גן חיות קטן (6.5 דונם) שנפתח ב-1864, ושופץ ב-1988 על ידי Wildlife Conservation Society. הוא לא כמו ה-Bronx Zoo (הענק), אלא מקום אינטימי שמושלם למשפחות עם ילדים קטנים — ביקור של 1.5-2 שעות.

הגן יצא לתודעה הציבורית כשהפך להשראה לסרט המצויר "Madagascar" של DreamWorks (2005). 4 הדמויות הראשיות (Alex האריה, Marty הזברה, Gloria הצפלפול, Melman הג'ירפה) בשלהן הסרט.

## מה לראות ב-Central Park Zoo

**אטרקציות מרכזיות**:
- **Penguin House**: 30+ פנגווינים. החדר קר (3°C), זה נפלא בקיץ
- **Sea Lion Pool**: בריכה מרכזית עם 4 אריות ים. הצגות-אכלה כל יום ב-11:30, 14:00, 16:30
- **Snow Leopards**: 2 דבי שלג מאוקסטריה. מרשימים
- **Tropic Zone**: בית-חום עם ציפורים, קופים, ופרפרים. חמים כל השנה
- **Children's Zoo** (כניסה כלולה): קוזות, חזירים, ועזים. מצוין לילדים פעוטים

## מחירי כרטיסים ל-Central Park Zoo

- **כרטיס מבוגר**: $19.95
- **ילד 3-12**: $14.95
- **מתחת ל-3**: חינם
- **Total Experience Ticket** ($28): כולל גן + 4D Theater + Children's Zoo

## איך מגיעים ל-Central Park Zoo

- מטרו N/R/W ל-Fifth Avenue/59th Street, 5 דקות הליכה
- מטרו F ל-57th Street, 8 דקות הליכה
- מטרו 4/5/6 ל-59th Street/Lexington, 8 דקות הליכה

## שאלות נפוצות על Central Park Zoo

**גיל מומלץ?** מושלם ל-2-10. מבוגרים לבד יכולים גם, אבל קצר יחסית.
**זמן צפוי?** 1.5-2 שעות.
**שעות פתיחה?** כל יום 10:00-17:00 (יותר מאוחר בקיץ).
**Central Park Zoo חינם?** לא, $19.95.
**מה ההבדל בין Central Park ל-Bronx Zoo?** Central Park: קטן, אינטימי, מנהטן. Bronx Zoo: ענק (265 דונם), 4,000 חיות.`,

  'citi-field': `## Citi Field ב-Flushing קווינס ניו יורק — בית ה-New York Mets

Citi Field ב-41 Seaver Way ב-Flushing קווינס נפתח ב-2009, מחליף את Shea Stadium הוותיק (1964-2008). זהו אצטדיון הביטל של New York Mets (קבוצת MLB), עם 41,922 מקומות. העיצוב מבוסס על Ebbets Field — אצטדיון קלאסי של Brooklyn Dodgers (לפני שעברו ל-LA ב-1958), כדי לכבד את ההיסטוריה הברוקלינית של בייסבול בעיר.

מעבר למשחקי ה-Mets (אפריל-אוקטובר), Citi Field מארח גם קונצרטים גדולים בחורף (Beyoncé, Paul McCartney, Billy Joel), אירועי NCAA, וגם כעת ניתן לקחת stadium tour.

## מה לעשות ב-Citi Field

**משחקי בייסבול ה-Mets**:
- **עונה**: אפריל-אוקטובר. 81 משחקי בית
- **כרטיסים**: $25-300 לפי מיקום ומשחק
- **המשחקים הכי מבוקשים**: NY Mets vs Yankees (Subway Series), כל משחק עם Boston Red Sox, פתיחת העונה
- **חוויה אמריקאית קלאסית**: hot dogs ($8), Cracker Jacks ($7), בירה ($14), 7th Inning Stretch של "Take Me Out to the Ball Game"

**אוכל מיוחד ב-Citi Field**:
- **Shake Shack**: בקומה 102 ו-302 ($8-12)
- **Box Frites** (פרנץ פרייז של Williamsburg)
- **Pat LaFrieda Steak Sandwich** ($16) — סנדוויץ' סטיק יוקרתי

**Stadium Tours**: סיורים מאחורי-הקלעים בימים שאין משחק. $30 למבוגר.

## איך מגיעים ל-Citi Field

- מטרו 7 ל-Mets-Willets Point, 5 דקות הליכה (ה-stop נמצא צמוד)
- LIRR ל-Mets-Willets Point Station, 35 דקות מ-Penn Station
- אובר ממנהטן: $40-65, 30-50 דקות

## שאלות נפוצות על Citi Field

**גיל מומלץ?** מושלם למשפחות.
**מה התקציב למשחק?** $50-150 לאדם עם כרטיס + אוכל.
**Citi Field כשר?** יש סטנד אחד עם kosher dogs, באזור 100.
**מתי הכי טוב לבקר?** משחק יום (13:10) של חודשי קיץ. אווירה מצוינת.
**שווה Subway Series?** משחקים נגד Yankees הכי מבוקשים. שגעון. כרטיסים $80-500.`,

  'edge-observation': `## Edge ב-Hudson Yards ניו יורק — תצפית 345 מטר עם רצפת זכוכית

Edge ב-30 Hudson Yards נפתח ב-2020 כחלק מפרויקט Hudson Yards, ה-development החדש של מערב מנהטן. הוא מרפסת תצפית בקומה ה-100 של בניין 30 Hudson Yards — הגבוהה ביותר בחצי הכדור המערבי, 345 מטר מעל הרחוב. הקטע הוויראלי: רצפת זכוכית בקצה המרפסת — אתם עומדים על זכוכית עם 100 קומות מתחתיכם. גם גג פתוח (לא מקורה, מזג אוויר תלוי), ומדרגות זכוכית שמובילות מעל קצה הבניין.

## מה לראות ב-Edge

**View 360°**: ניו יורק כולה. ל-מערב: New Jersey ו-Hudson River. ל-מזרח: Empire State, Chrysler, ו-Midtown. ל-דרום: Lower Manhattan, World Trade Center, פסל החירות. ל-צפון: Central Park ו-Upper Manhattan.

**חוויות מיוחדות**:
- **Glass Floor** — קטן (6 רגל × 6 רגל), אבל מספיק להלם
- **Skyline Steps** — מדרגות זכוכית למרפסת חיצונית
- **Champagne Bar** — כוס שמפנייה $25
- **City Climb** — חוויה נפרדת ($175): טיפוס על מעקה הבניין החיצוני, עם harness. לא לחלשי לב

## מחירי כרטיסים ל-Edge

- **General Admission**: $43 (online), $48 (door)
- **Sunset / Twilight Premium**: $66 (אורות שקיעה)
- **City Climb** (נפרד): $175

קנייה: edgenyc.com.

## איך מגיעים ל-Edge

- מטרו 7 ל-34th Street/Hudson Yards, 1 דקה הליכה
- מטרו A/C/E ל-34th Street/Penn Station, 12 דקות הליכה
- אובר ממידטאון: $10-15

## שאלות נפוצות על Edge ניו יורק

**גיל מומלץ?** 4+.
**Edge בטוח?** לחלוטין. בודק בכניסה. אבל גובהים — אם אתם פוחדים מאוד, השאירו את Glass Floor.
**מה ההבדל בין Edge, Summit ו-Empire State?** Edge: 345m, רצפת זכוכית, מערב מנהטן. Summit: One Vanderbilt, אינסטלציות אומנות. Empire State: היסטורי, 102 קומות.
**שווה $43?** לתצפית עם פיצ'ר זכוכית: כן. אם אתם מחפשים העיר הטופ — Summit One Vanderbilt יותר מוצלח.`,

  'ellis-island': `## Ellis Island ניו יורק — האי שדרכו עברו 12 מיליון מהגרים

Ellis Island באמצע New York Harbor שימש בין 1892 ל-1954 כתחנת ההגירה הראשית של ארצות הברית. 12 מיליון מהגרים עברו דרכו — 40% מ-American population של היום הוא צאצא של מהגר Ellis Island. אם יש לכם משפחה אמריקאית מ-1900-1950, יש סיכוי 2-מתוך-5 שאחד מסבא-סבתא שלכם עבר פה. ב-1990 הוא נפתח כ-**Ellis Island National Museum of Immigration**.

## מה יש במוזיאון Ellis Island

המוזיאון תופס את **Main Building** הקלאסי שהיה תחנת הקבלה הראשית. 3 קומות, 30+ אולמות תצוגה:

**Floor 1 (Baggage Room)**: התצוגה מתחילה בדיוק כמו שמהגר היה מתחיל את היום. תיקים שהמהגרים הביאו, חלקם הושארו ולא נלקחו (בעלים נמתו לפני שעזבו את האי).

**Floor 2 (Registry Room)**: האולם הכי מפורסם. הכי גדול. שם המהגרים ענו על שאלון של 29 שאלות, ועברו בדיקה רפואית.

**Floor 3 (Treasures From Home)**: חפצים אישיים שמהגרים הביאו — תכשיטים, תמונות, בגדים מסורתיים, ספרים.

**The American Family Immigration History Center**: מאגר של כל ה-records של 12 המיליונים. אם אתם יודעים את שם הסבא והשנה, אפשר למצוא את ה-record שלו.

## איך להגיע ל-Ellis Island

חשוב: רק דרך מעבורת **Statue Cruises** מ-Battery Park (מנהטן) או Liberty State Park (NJ). אין דרך אחרת.

- **כרטיס Statue Cruises**: $24-30 (כולל גם Statue of Liberty)
- **הזמנה מראש חיונית**: statuecityquise.com — בקיץ נמכר שבועיים מראש
- **מעבורת**: כל 25 דקות מ-08:30 עד 16:00

## איך מגיעים ל-Battery Park

- מטרו 1 ל-South Ferry, 1 דקה הליכה
- מטרו R/W ל-Whitehall Street, 2 דקות הליכה

## שאלות נפוצות על Ellis Island

**זמן צפוי לבילוי?** Statue + Ellis = 4-6 שעות (כולל מעבורות).
**שעות פתיחה?** המוזיאון כל יום 09:30-17:00.
**Ellis Island כשר?** אין אוכל כשר. בקפטריה אופציות צמחוניות.
**שווה את הביקור?** לחובבי היסטוריה אמריקאית: בהחלט. למי שלא מתעניין — Statue of Liberty לבד מספיק.`,

  'guggenheim-museum': `## Guggenheim Museum ב-Upper East Side ניו יורק — האדריכלות של Frank Lloyd Wright

Solomon R. Guggenheim Museum ב-1071 Fifth Avenue ב-Upper East Side, על קצה Central Park, נפתח ב-1959. הוא נחשב לאחד מהמבנים האדריכליים החשובים ביותר של המאה ה-20. **Frank Lloyd Wright** עיצב אותו כ-spiral inverted ziggurat — חלזונית הפוכה של 6 קומות. הביקור: עולים במעלית לקומה 6, ואז יורדים בהדרגה לאורך החלזונית, וצופים באוסף.

ה-DNA: אוסף של אמנות מודרנית ועכשווית — Picasso, Kandinsky, Chagall, Pollock, Rothko, Cézanne, Renoir, Manet. תערוכות זמניות 4-6 בשנה, לפעמים מבריקות, לפעמים מאתגרות.

## מה לראות ב-Guggenheim

**אוספים קבועים**:
- **Thannhauser Collection**: ציורים מקצועיים-איכותיים של Cézanne, Degas, Manet, Picasso, Pissarro, Renoir, van Gogh
- **20th Century Modernism**: Kandinsky (האוסף הגדול בעולם), Mondrian, Klee
- **Abstract Expressionism**: Pollock, Rothko, de Kooning

**תערוכות זמניות**: בודקים לפני הביקור ב-guggenheim.org/exhibitions.

## מחירי כניסה ל-Guggenheim

- **כרטיס מבוגר**: $30
- **סטודנטים/65+**: $19
- **מתחת ל-12**: חינם
- **Pay What You Wish** (יום שני 16:00-18:00): שלמו כמה שאתם רוצים. תור 30-60 דקות

## איך מגיעים ל-Guggenheim

- מטרו 4/5/6 ל-86th Street, 7 דקות הליכה מערבה
- מטרו Q ל-86th Street/2nd Avenue, 8 דקות הליכה
- אובר ממידטאון: $15-22

## שאלות נפוצות על Guggenheim

**זמן צפוי?** 1.5-3 שעות.
**שעות פתיחה?** רביעי-ראשון 11:00-18:00. שלישי 11:00-20:00. שני סגור.
**Guggenheim שווה ההייפ?** האדריכלות לבד שווה את הכניסה. האוסף מצוין אבל מצומצם.
**מה ההבדל בין Guggenheim ל-MoMA?** MoMA: אוסף עצום של אמנות מודרנית. Guggenheim: יותר אינטימי, ביינה אדריכלית הקלאסיקה.`,

  'lincoln-center': `## Lincoln Center ב-Upper West Side ניו יורק — מרכז התרבות הגדול

Lincoln Center for the Performing Arts ב-Lincoln Center Plaza ב-Upper West Side הוא מתחם תרבות של 16.3 דונם, נפתח ב-1962. הוא מאחה את 12 ארגוני התרבות הגדולים בארה"ב במקום אחד. כולל: **Metropolitan Opera** (אופרה, 3,800 מקומות), **New York Philharmonic** (תזמורת קלאסית), **New York City Ballet** (באלט), **Juilliard School** (בית ספר למוזיקה), **Jazz at Lincoln Center**, **Chamber Music Society**, **NYC Opera**, **Film at Lincoln Center**, ועוד.

המתחם הוא יעד ספציפי של חובבי תרבות: בכל ערב יש 30+ הופעות במגוון הז'אנרים. במזרקה המפורסמת בכניסה (שהופיעה ב-Sex and the City) מתאספים זוגות לפני ההצגה.

## מה לעשות ב-Lincoln Center

**קונצרטים והצגות**:
- **Metropolitan Opera**: אופרה. כרטיסים $30-500. עונה ספטמבר-מאי
- **New York Philharmonic** (David Geffen Hall): תזמורת קלאסית. $35-250
- **New York City Ballet** (David H. Koch Theater): באלט. $35-300. עונה הקלאסית: Nutcracker בדצמבר
- **Jazz at Lincoln Center**: $35-150. ערב ג'אז קלאסי

**סיורים**:
- **Public Tour**: $30, 75 דקות, מאחורי-הקלעים של 3 חללים. כל יום ב-11:30 ו-14:30
- **Met Opera Tour**: $45, 90 דקות, רק פעם בשבוע

**אירועים חינמיים**:
- **Lincoln Center at Home** (קיץ): קונצרטים חיצוניים בחצר, חינם
- **Late Night at Lincoln Center**: ערבי קומדיה ומוזיקה

## איך מגיעים ל-Lincoln Center

- מטרו 1 ל-66th Street/Lincoln Center, 1 דקה הליכה (ה-stop צמוד)
- מטרו A/B/C/D ל-59th Street/Columbus Circle, 8 דקות הליכה צפונה
- אובר ממידטאון: $10-15

## שאלות נפוצות על Lincoln Center

**מה ההבדל בין Met Opera ל-NYC Opera?** Met: גדול, יוקרתי, $80+ ל-decent seat. NYC Opera: קטן יותר, $30-100, יותר ניסיוני.
**הסיורים שווים?** לחובבי תרבות: בהחלט.
**זמן צפוי?** 30 דקות לסיבוב המתחם, 2-4 שעות להצגה.
**שווה לראות באלט?** Nutcracker בדצמבר חוויה ניו יורקית קלאסית.`,

  'little-island': `## Little Island ב-Hudson River Park ניו יורק — פארק צף על "עציצים" בטון

Little Island ב-Pier 55 ב-Hudson River Park (כניסה ב-13th Street ו-Hudson Park) נפתח ב-2021 בפרויקט של Diller Scofidio + Renfro (אדריכלים) ושל Heatherwick Studio. הקונספט ייחודי לחלוטין: פארק צף על 132 עמודי בטון בצורת "עציצים" (tulip-shaped pots) שמרחפים מעל נהר ההדסון. הפארק עצמו: 2.4 דונם של גבעות, שבילים, פרחים, ועצים.

המקום ממומן על ידי הזוג Barry Diller ו-Diane von Furstenberg כפרויקט פילנתרופי. עלות הבנייה: $260 מיליון. הביקור: חינם. אבל יש מגבלה — בקיץ יש קוטות זמן וצריך הזמנה מראש (גם חינם).

## מה לראות ב-Little Island

הפארק הוא חוויה אדריכלית-טבעית:
- **גבעות מלאכותיות**: שבילים שמתפתלים בין 4 גבעות עד גובה של 18 מטר
- **Amphitheater**: אמפיתאטרון פתוח של 700 מקומות לקונצרטים בקיץ
- **The Glade**: כיכר קטנה לאירועי קומדיה ומוזיקה
- **Lookout Points**: 3 נקודות תצפית עם נופים של מנהטן, NJ, ופסל החירות
- **Plants**: 350+ מינים של עצים, שיחים, ופרחים

## אירועים ב-Little Island

בקיץ (יוני-ספטמבר) יש לוח מלא:
- **קונצרטים**: ג'אז, אופרה, פופ. לרוב חינם, חלקם בתשלום
- **קומדיה**: open mic
- **שיעורי יוגה**: בוקרי שבת חינם

לוח: littleisland.org/events.

## איך מגיעים ל-Little Island

- מטרו A/C/E ל-14th Street/8th Avenue, 12 דקות הליכה מערבה
- מטרו 1/2/3 ל-14th Street, 14 דקות הליכה מערבה
- אובר ממידטאון: $15-22
- High Line: 5 דקות הליכה מהקצה הצפוני של ה-High Line

## שאלות נפוצות על Little Island

**Little Island חינם?** הפארק חינם. אירועים מסוימים בתשלום ($25-75).
**צריך להזמין?** לפי העונה. בקיץ (יוני-ספטמבר) יש timed entry ב-12:00-17:00. הזמנה ב-littleisland.org.
**זמן צפוי?** 1-2 שעות.
**גיל מומלץ?** לכל גיל. הילדים אוהבים את הגבעות.
**שווה הביקור?** לחווייה אדריכלית-טבעית ייחודית: בהחלט.`,
}

let ok=0,fail=0
for(const[slug,full_content]of Object.entries(updates)){
  const{error}=await sb.from('attractions').update({full_content}).eq('slug',slug).eq('destination_id',env.DESTINATION_ID)
  if(error){console.log('FAIL',slug,error.message);fail++}else{console.log('OK  ',slug,'— full:',full_content.length);ok++}
}
console.log(`\nDone: ${ok} updated, ${fail} failed`)
