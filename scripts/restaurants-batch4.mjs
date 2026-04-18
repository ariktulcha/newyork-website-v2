// Restaurants Batch 4 (10): Joe's Pizza, Magnolia, Mile End, Milk Bar, Sarabeth's, Louie&Ernie, Ruddy&Dean, Corner Bistro, Emily, Fette Sau Williamsburg
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const env = Object.fromEntries(readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n').filter(Boolean).map(l=>l.split('=').map(s=>s.trim()).filter(Boolean)).filter(p=>p.length===2))
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

const updates = {
  'joes-pizza': {
    description: `Joe's Pizza ב-Greenwich Village היא אחת מפיצריות ה-slice המפורסמות בעיר מאז 1975. בעלים: Joe Pozzuoli, מהגר נאפוליטני שפתח slice joint שהפך לאיקון. הופיעה ב-Spider-Man 2 (Toby Maguire נושא pizzas). תור מהיר, slice קלאסי דק וטעים, פתוח עד 04:00.`,
    full_content: `## Joe's Pizza ב-Greenwich Village ניו יורק — Slice קלאסי מ-1975

Joe's Pizza ב-7 Carmine Street ב-Greenwich Village נפתחה ב-1975 על ידי Joe Pozzuoli, מהגר נאפוליטני. הוא רצה ל-slice joint פשוט: בצק, רוטב, מוצרלה. ללא תוספות מטופשות. ללא נוסחאות מורכבות. תוך 5 שנים: הסטייפל של ניו יורק קלאסי. ב-2004 הופיע ב-Spider-Man 2 (Toby Maguire נושא pizzas שעה בעיר). מאז: יותר תיירים, אבל ה-DNA נשאר.

## מה להזמין ב-Joe's Pizza

**רק 4 דברים בתפריט**:
- **Plain Slice** ($3.75) — הקלאסי. רוטב, מוצרלה, בזיליקום
- **Fresh Mozzarella Slice** ($4.50) — מוצרלה טרייה במקום החצי-קטסת
- **Sicilian Slice** ($4) — ריבועי, יותר עבה
- **Whole Pie** ($24-32) — Plain או Fresh Mozzarella

**משקאות**: סודה ($2-3), מים ($2). לא בר.

ארוחה: $5-15 לאדם.

## הוויב ב-Joe's

מקום קטן (15 איש קיבול), אווירה רועשת, צוות מהיר. רוב לוקחים takeaway ואוכלים בחוץ או בפארק וושינגטון סקוור (5 דקות הליכה). תור: 5-15 דקות לרוב, 30+ דקות אחרי 23:00 בליל סופ"ש (קהל אחרי בארים).

## שעות פתיחה ב-Joe's

יום שני-רביעי 10:00-04:00 (כן, 4:00 בבוקר), חמישי-שבת 10:00-05:00, ראשון 10:00-04:00.

## איך מגיעים ל-Joe's Pizza

- מטרו 1 ל-Christopher Street/Sheridan Square, 3 דקות הליכה
- מטרו A/B/C/D/E/F/M ל-West 4th Street, 6 דקות הליכה

## שאלות נפוצות על Joe's Pizza ניו יורק

**Joe's Pizza כשר?** לא.
**מה ההבדל בין Joe's לסניפי Lombardi's וDi Fara?** Joe's: slice קלאסי, מהיר, קז'ואל. Lombardi's: היסטורי. Di Fara: אמנות ידנית.
**שווה ההייפ?** לחווייה הניו יורקית הקלאסית: בהחלט.
**מה התקציב?** $5-15 לאדם.`,
  },

  'magnolia-bakery-west-village': {
    description: `Magnolia Bakery ב-West Village (הסניף המקורי מ-1996) הפכה לאייקון אמריקאי אחרי הופעה ב-Sex and the City. ה-Banana Pudding שלה (יש תור רק לזה) הוא ויראלי. גם cupcakes קלאסיים, magnolia cookies, ועוד. מקום של אינסטגרם, של זוגות בדייט, של תיירים שמחפשים את "Carrie's bakery".`,
    full_content: `## Magnolia Bakery ב-West Village ניו יורק — Banana Pudding אגדי

Magnolia Bakery נפתחה ב-1996 על ידי שתי נשים, Allysa Torey ו-Jennifer Appel, באזור West Village. ב-2000 היא הופיעה ב-Sex and the City (Carrie ו-Miranda אכלות cupcakes על המדרכה ב-401 Bleecker Street), והוויראליות הייתה מטורפת. תוך שנה: 4 שעות תור לcupcake. כיום, יש 25+ סניפים בעולם, אבל הסניף המקורי ב-401 Bleecker Street עדיין מקבל את הקהל הכי גדול.

ב-2008 השפית Bobbie Lloyd פיתחה את ה-**Banana Pudding** — הקינוח שהפך לסיגנייצ׳ר האמיתי של Magnolia. אוספים עד היום: 8 אונקיות של בננה, vanilla wafers, ושמנת מתוקה. ב-2024 נמכרים 3,000 כוסות ביום בסניף ה-West Village.

## מה להזמין ב-Magnolia

**הקלאסיקות**:
- **Classic Banana Pudding** ($7-12 תלוי בגודל) — חובה
- **Banana Pudding Cookie** ($4) — חידוש
- **Vanilla Cupcake with Vanilla Buttercream** ($5) — הקלאסיקה
- **Red Velvet Cupcake** ($5)
- **Magnolia Layer Cake** (slice $9, whole $65)
- **Cookies** ($3-4) — chocolate chip, oatmeal, sugar

ארוחה: $10-20 לאדם.

## הוויב ב-Magnolia

תור 15-45 דקות בכל שעה. הקהל: תיירים (60%), זוגות בדייט (20%), משפחות עם ילדים (20%). שולחנות מוגבלים — רוב לוקחים לדרך ואוכלים בפארק או על המדרכה.

## שעות פתיחה ב-Magnolia West Village

ראשון-רביעי 09:00-23:00, חמישי-שבת 09:00-00:00.

## איך מגיעים ל-Magnolia West Village

- מטרו 1 ל-Christopher Street, 4 דקות הליכה
- מטרו A/B/C/D/E/F/M ל-West 4th Street, 6 דקות הליכה

## שאלות נפוצות על Magnolia Bakery ניו יורק

**Magnolia כשר?** לא.
**שווה ההייפ ה-Banana Pudding?** כן באמת. אחד הקינוחים הטובים בעיר.
**מה ההבדל בין הסניפים?** המקורי ב-Bleecker יש אווירה של 1996 וsex and the City vibes.
**מה התקציב?** $10-20 לאדם.`,
  },

  'mile-end-deli': {
    description: `Mile End Deli ב-Boerum Hill ברוקלין היא דלי בסגנון מונטריאול-יהודי, נפתחה ב-2010 על ידי Noah Bernamoff. סמוקד-מיט (גרסה קנדית של פסטרמי), poutine, smoked meat sandwich, ומרק עוף יהודי. גרסה היפסטרית של dei קלאסי, אבל הטעמים אמיתיים. אווירה של ברוקלין החדשה.`,
    full_content: `## Mile End Deli ב-Boerum Hill ברוקלין ניו יורק — דלי מונטריאלי בברוקלין

Mile End Deli ב-97 Hoyt Street ב-Boerum Hill נפתחה ב-2010 על ידי Noah Bernamoff, יהודי-מונטריאלי שעבר לניו יורק ולא יכל למצוא דלי שמגיש את הסמוקד-מיט המונטריאלי שגדל איתו. הקטע: סמוקד-מיט הוא "פסטרמי הקנדי" — בקר שמתבשל 10 ימים בbrine, מעושן בעץ, ומבושל באדים. שונה מפסטרמי ניו יורקי בשפע התבלינים.

Mile End הוא גרסה היפסטרית-ברוקלינית של הדלי הקלאסי: עיצוב מודרני, צוות צעיר, אבל הטעמים אמיתיים והכבוד למסורת ברור.

## מה להזמין ב-Mile End

**הקלאסיקות המונטריאליות**:
- **Smoked Meat Sandwich** ($21) — סמוקד-מיט בקר על שיפון עם חרדל
- **Poutine** ($16) — צ'יפס עם צ'יז קודלים ורוטב חום (מנת רחוב קנדית קלאסית)
- **Smoked Meat Poutine** ($22) — שילוב
- **Smoked Meat Hash** ($18) — לארוחת בוקר

**ברנץ**:
- **Egg, Smoked Meat, and Cheese on Bagel** ($14)
- **Matzo Ball Soup** ($12)
- **Latkes with Sour Cream** ($14)

ארוחה: $30-50 לאדם.

## הוויב ב-Mile End

מקום בינוני (60 איש קיבול), אווירה היפסטרית-ברוקלינית, מוזיקה ברקע, צוות צעיר עם קעקועים. הקהל: ברוקלינאים, יהודים-קנדיים שמתגעגעים, וניו יורקים שמכירים את המקום.

## שעות פתיחה ב-Mile End

שני-שישי 11:00-22:00, שבת-ראשון 10:00-22:00 (ברנץ עד 15:00, ארוחה אחר-כך).

## איך מגיעים ל-Mile End ברוקלין

- מטרו A/C/G ל-Hoyt-Schermerhorn, 4 דקות הליכה
- מטרו B/Q/2/3/4/5 ל-Atlantic-Barclays, 8 דקות הליכה

## שאלות נפוצות על Mile End ניו יורק

**Mile End כשר?** לא.
**מה ההבדל בין סמוקד-מיט לפסטרמי?** סמוקד-מיט (קנדי): יותר תבלינים, יותר ספציפי. פסטרמי (NY): יותר בסיסי. שניהם בקר מעושן.
**Mile End שווה ההייפ?** כן, גרסה ברוקלינית מצוינת של dei.
**מה התקציב?** $30-50 לאדם.`,
  },

  'milk-bar': {
    description: `Milk Bar של Christina Tosi (פעם שותפה ב-Momofuku) ב-East Village ובסניפים נוספים, היא קונדיטוריה אמריקאית-נוסטלגית: Compost Cookie, Cereal Milk Soft Serve, Birthday Cake Truffles, Crack Pie. כל מנה היא רעיון של "ילדות באמריקה" — וניל, חלב, צ'יז קייק. אגדי, ויראלי, ומפורסם בכל העולם.`,
    full_content: `## Milk Bar ב-East Village ניו יורק — קונדיטוריה של Christina Tosi

Milk Bar נפתח ב-2008 על ידי Christina Tosi, שעבדה כקונדיטורית ב-Momofuku Ko. דייוויד צ'אנג עזר לה לפתוח, וב-2008 פתחה את הסניף הראשון ב-East Village. ה-DNA: קונדיטוריה אמריקאית-נוסטלגית. כל מנה היא הכלאה של רעיונות של "ילדות באמריקה": cereal, חלב, חמאת בוטנים, צ'יז קייק, וניל. לא בריאות. כן צחוק.

ב-2024 יש 7 סניפים בארה"ב, ספר מתכונים שמכר 1+ מיליון עותקים, ותוכנית Netflix משלה.

## מה להזמין ב-Milk Bar

**ה-Famous Items**:
- **Compost Cookie** ($4.50) — Cookie עם פרצל, צ'יפס תפוחי אדמה, שוקולד צ'יפס, ובוטנים. שמה מסבירה את עצמה
- **Cereal Milk Soft Serve** ($6) — אייסקרים בטעם שיורי-חלב-cornflakes (כן). חתימה
- **Birthday Cake Truffle** ($4 each) — כדור עוגת יום הולדת מולבש בחפיף
- **Crack Pie** (Now: Milk Bar Pie) ($8 לחתיכה, $48 לעוגה שלמה) — קלאסיקה
- **Confetti Cookies** ($4)

ארוחה: $10-25 לאדם.

## הוויב ב-Milk Bar

מקום קטן (12 איש קיבול), אווירה משעשעת, אורות בהירים. הקהל: ילדים עם הורים, סטודנטים, ותיירים שראו את התוכנית של Netflix.

## שעות פתיחה ב-Milk Bar East Village

כל יום 10:00-23:00 (יותר מאוחר בליל סופ"ש).

## איך מגיעים ל-Milk Bar

- מטרו N/Q/R/W ל-28th Street, 4 דקות הליכה
- מטרו 6 ל-28th Street, 5 דקות הליכה

## שאלות נפוצות על Milk Bar ניו יורק

**Milk Bar כשר?** לא תחת השגחה.
**שווה ההייפ?** כן לחווייה הויראלית.
**מה התקציב?** $10-25 לאדם.
**יש משלוחים ארציים?** כן דרך milkbarstore.com.`,
  },

  'sarabeth-central-park-south': {
    description: `Sarabeth's ב-Central Park South היא ברנץ קלאסי משפחתי של ניו יורק. נפתחה ב-1981 על ידי Sarabeth Levine, נחשבת לאחת ממסעדות הברנץ הקלאסיות. ה-Lemon Ricotta Pancakes הם החתימה. אווירה רגועה, שירות חם, ומיקום מצוין מול Central Park. מצוין למי שבא מטיול ב-park עם משפחה.`,
    full_content: `## Sarabeth's ב-Central Park South ניו יורק — ברנץ משפחתי קלאסי

Sarabeth's נפתחה ב-1981 על ידי Sarabeth Levine, אשת אומנות שאהבה לאפות. הסניף הראשון ב-Upper West Side התחיל כקונדיטוריה למאפים, אבל מהר התרחב לברנץ ולמסעדה. כיום יש 5 סניפים במנהטן, וה-Sarabeth's Central Park South ב-40 Central Park South הוא הסניף הכי גדול ויוקרתי, מול Central Park.

ה-DNA: ברנץ אמריקאי-קלאסי, פחות trendy מ-Sadelles או Clinton St. Baking. המנות אינן ויראליות, אבל הן ברמה גבוהה ועקבית. אווירה רגועה, מתאימה למשפחות עם ילדים, לחתונה אינטימית, או לארוחת ברנץ אחרי טיול ב-park.

## מה להזמין ב-Sarabeth's

**הקלאסיקות**:
- **Lemon Ricotta Pancakes** ($24) — החתימה. רכים, מתוקים-חמוצים
- **Sarabeth's Eggs Benedict** ($26) — קלאסי
- **Smoked Salmon Plate** ($28)
- **Scotch Eggs** ($18) — ביצה עטופה בסוסיג'
- **Goldie Lox** ($24) — ביצים מקושקשות עם סלמון מעושן
- **Brioche French Toast** ($22)

**משקאות**:
- **Sarabeth's Famous Hot Chocolate** ($8) — בעונה הקרה
- **Mimosa** ($14)

ארוחה: $50-80 לאדם.

## הוויב והאווירה ב-Sarabeth's Central Park South

מסעדה גדולה (200 איש קיבול), אווירה אלגנטית-משפחתית. הקהל: משפחות אורחי-מלון מ-Plaza ו-Ritz Carlton הסמוכים, זוגות, ותיירים שאוכלים אחרי טיול ב-Central Park.

## שעות פתיחה ב-Sarabeth's Central Park South

שני-שישי 08:00-22:30, שבת-ראשון 08:00-22:30 (ברנץ 09:00-15:00).

## איך מגיעים ל-Sarabeth's Central Park South

- מטרו N/R/W ל-Fifth Avenue/59th Street, 3 דקות הליכה
- מטרו F ל-57th Street, 5 דקות הליכה
- מטרו 4/5/6 ל-59th Street/Lexington, 6 דקות הליכה

## שאלות נפוצות על Sarabeth's ניו יורק

**Sarabeth's כשר?** לא.
**מה ההבדל בין הסניפים?** Central Park South הוא הכי גדול ויוקרתי. Tribeca יותר אינטימי. Upper East יותר מקומי.
**שווה ההייפ?** ל ברנץ קלאסי-משפחתי: כן.
**מה התקציב?** $50-80 לאדם.`,
  },

  'louie-and-ernies-pizza': {
    description: `Louie & Ernie's Pizza ב-1300 Crosby Avenue בברונקס היא פיצרייה אגדית "אולד-סקול" איטלקית מאז 1947. פיצה דקה ניו יורקית קלאסית, מקום שכונתי אמיתי, ומזומן בלבד. רחוקה מתיירות, אבל הפיצה היא מהטובים בעיר. אוטנטית 100%.`,
    full_content: `## Louie & Ernie's Pizza ב-Bronx ניו יורק — פיצרייה אגדית מ-1947

Louie & Ernie's Pizza ב-1300 Crosby Avenue ב-Throgs Neck (East Bronx) נפתחה ב-1947 על ידי שני אחים איטלקים. במשך 78 שנה היא נשארה במשפחה, באותו מיקום, באותו תפריט. אין כתבות NY Times, אין פוסטים ויראליים, אין סלבים. פשוט פיצרייה שכונתית של ברונקס שנמצאת על בכל "best pizza in NYC" של מבקרי פיצה רציניים.

## מה להזמין ב-Louie & Ernie's

**רק פיצה**. אין סלטים, אין מנות צד מורחבות.
- **Plain Cheese Pie** ($24-28) — קלאסי, slice $4
- **Pepperoni Pie** ($28) — slice $5
- **Sausage Pie** ($28)
- **Sicilian Square Pie** ($30)

**Cash only**.

## הוויב ב-Louie & Ernie's

מקום קטן (35 איש קיבול), שולחנות מסיביים מהשנים ה-50, וטלוויזיה עם משחקי כדורסל. הקהל: שכונתיים-איטלקים, אנשי כדורסל מ-Yankees Stadium (קרוב), ופחות תיירים. אווירה מקומית-בריקלינית.

## שעות פתיחה ב-Louie & Ernie's

שני: סגור. שלישי-ראשון 12:00-22:00.

## איך מגיעים ל-Louie & Ernie's

- אובר ממנהטן: $35-50, 30-45 דקות
- מטרו 6 ל-Westchester Square, 5 דקות הליכה (ה-6 הוא הקו של Bronx East)
- מטרו 4 ל-Yankee Stadium, ואז אובר 15 דקות

## שאלות נפוצות על Louie & Ernie's

**Louie & Ernie's כשר?** לא.
**שווה לנסוע מ-Manhattan לBronx ל-Louie & Ernie's?** לחובבי פיצה: בהחלט. אחרת לא.
**מה התקציב?** $20-35 לאדם.
**אפשר להזמין מקום?** לא, רק walk-in.`,
  },

  'ruddy-and-deans': {
    description: `Ruddy and Dean's North Shore Steakhouse ב-Staten Island היא סטייקהאוס משפחתי על המים בקצה הצפוני של האי, עם נוף לסקיילין של מנהטן. ארוחת ערב יוקרתית-קז'ואלית, פילה מעולה, lobster, ובר עם נוף. לא תיירותי, אבל מקום של ברירה ראשונה למקומיים בסטייטן איילנד.`,
    full_content: `## Ruddy and Dean's North Shore Steakhouse ב-Staten Island ניו יורק — סטייקהאוס על המים

Ruddy and Dean's ב-4 Richmond Valley Road ב-Staten Island נפתחה ב-2009 על ידי משפחת D'Amico, ילידי סטייטן איילנד. המיקום: על המים בקצה הצפוני של האי, עם נוף ישיר לסקיילין של Lower Manhattan. במשך 15 שנה הם בנו מוניטין כסטייקהאוס המקומי הטוב ביותר באי, עם הקפדה על דרי-איידינג, רובי בקר ניו יורק (USDA Prime), ושירות מקצועי-משפחתי.

## מה להזמין ב-Ruddy and Dean's

**הקלאסיקות**:
- **Porterhouse for Two** ($120) — דרי-איידינג 28+ ימים
- **Filet Mignon** ($55-75)
- **Ribeye** ($70-85)
- **Lobster Tail** ($75)
- **Surf and Turf** ($120) — סטיק וlobster
- **Veal Chop** ($65)

**מנות צד**:
- **Lobster Mac and Cheese** ($28)
- **Truffle Fries** ($12)
- **Creamed Spinach** ($14)

ארוחה: $120-180 לאדם.

## הוויב ב-Ruddy and Dean's

מסעדה אלגנטית-קז'ואלית, אווירה משפחתית-יוקרתית. הקהל: סטטן איילנדים מקומיים, אנשי עסקים מאזור Tottenville, ולעיתים תיירים מ-NJ או Manhattan שבאים בקיץ ל-deck החיצוני.

## שעות פתיחה ב-Ruddy and Dean's

שני: סגור. שלישי-שבת 17:00-22:00, ראשון 13:00-20:00 (גם ארוחת צהריים).

## איך מגיעים ל-Ruddy and Dean's

- אובר ממנהטן (דרך גשר ורזנו): $50-75, 45-60 דקות
- מהמעבורת מסטייטן איילנד: אובר $25-35, 25-35 דקות
- מכונית: חניה חופשית במקום

## שאלות נפוצות על Ruddy and Dean's

**Ruddy and Dean's כשר?** לא.
**שווה לנסוע מ-Manhattan?** רק אם אתם בסטייטן איילנד או מ-NJ. לא יעד יומי.
**מה התקציב?** $120-180 לאדם.
**צריך להזמין מקום?** מאוד מומלץ, בעיקר לסופ"ש.`,
  },

  'corner-bistro': {
    description: `Corner Bistro ב-331 West 4th Street ב-West Village היא ההמבורגר-בר האולטימטיבי של מנהטן. נפתחה ב-1961, אווירה חשוכה-קלאסית, רק 4 שולחנות, ההמבורגר Bistro Burger המפורסם. מזומן בלבד. תור 30-60 דקות, אבל ההמבורגר שווה. אחת המסעדות הקלאסיות של ניו יורק שלא השתנתה ב-65 שנה.`,
    full_content: `## Corner Bistro ב-West Village ניו יורק — ההמבורגר האגדי מ-1961

Corner Bistro ב-331 West 4th Street ב-West Village נפתחה ב-1961 על ידי Bill O'Donnell ושותפיו. במשך 64 שנה היא נשארה כמעט אותו דבר: בר חשוך עם 4 שולחנות, רצפה של אבן, מנורות תלויות, וטלוויזיה ישנה עם משחקי בייסבול. לא שינו את התפריט, לא שינו את המחירים בקצב נורמלי, לא קיבלו אשראי. 64 שנה של עקביות.

ה-Bistro Burger ($11) הוא המנה החתימה. הוא נמצא ב-30 רשימות "best burger in NYC" באופן עקבי, ובכל זאת המקום נשאר אנדרגראונד-מקומי.

## מה להזמין ב-Corner Bistro

**ההמבורגרים**:
- **Bistro Burger** ($11) — 8 oz של בקר עם בייקון, צ'דר, חסה, עגבנייה, בצל. מוגש על bun רגיל. פשוט מושלם
- **Cheeseburger** ($9.50) — בלי הבייקון
- **Hamburger** ($8.50) — נטו

**צד**:
- **French Fries** ($5)
- **Onion Rings** ($6)

**שתייה**:
- **Pints of Beer** ($4-5) — בירה מאוד זולה
- **Coca Cola** ($3)

**Cash only**. אין אשראי, לא אפלפיי, לא venmo.

## הוויב ב-Corner Bistro

חשוך, רועש, אווירה של 1961. שולחנות עץ ארוכים, צוות שמכיר את הלקוחות. הקהל: שכונתיים-של-וויסט-וילג', אנשי תעשייה, סטודנטים, ותיירים שמכירים את המקום מ-Anthony Bourdain.

## שעות פתיחה ב-Corner Bistro

שני-שבת 11:30-04:00 (כן, 04:00 בבוקר), ראשון 12:00-04:00.

## איך מגיעים ל-Corner Bistro

- מטרו A/C/E ל-14th Street, 6 דקות הליכה
- מטרו 1/2/3 ל-14th Street, 8 דקות הליכה
- מטרו L ל-Eighth Avenue, 5 דקות הליכה

## שאלות נפוצות על Corner Bistro

**Corner Bistro כשר?** לא.
**שווה לחכות 60 דקות?** להמבורגר אגדי במחיר $11: בהחלט.
**מה התקציב?** $15-25 לאדם.
**אפשר להזמין?** לא, רק walk-in.`,
  },

  'emily-pizza-loves-emily': {
    description: `Emily / Pizza Loves Emily ב-Fort Greene ברוקלין היא פיצרייה-המבורגרייה של Matthew Hyland. פיצות עבות בסגנון "Detroit-style" עם תוספות יצירתיות, וה-Emmy Burger המפורסם (המבורגר עטור פרסים עם dry-aged beef). אווירה ברוקלינית-חמה, מקום חובה לחובבי פיצה ושל המבורגרים בעלי-תארים.`,
    full_content: `## Emily ב-Fort Greene ברוקלין ניו יורק — פיצה ושל המבורגר עטור פרסים

Emily, או Pizza Loves Emily ב-919 Fulton Street ב-Fort Greene, נפתחה ב-2014 על ידי Matthew ו-Emily Hyland. הקונספט: פיצרייה ברוקלינית-יוצרת שמשלבת פיצות בסגנון Detroit (עבות, ריבועיות, גבינה במלוא הקצוות) עם פיצות נאפוליטניות עגולות. בשנה הראשונה הם הוסיפו את **Emmy Burger** — המבורגר של dry-aged beef, צ'דר, בצל מקורמל, ורוטב סוד. תוך שנתיים: "Best Burger in NYC" של GQ, NY Magazine, וגם Bourdain.

## מה להזמין ב-Emily

**הפיצות**:
- **Colony Pie** ($26, square) — פפרוני, דבש, צ'ילי flakes. ויראלי
- **Emmy Pie** ($28, square) — Emmy Burger בצורת פיצה
- **Margherita** ($22, round) — קלאסי
- **Stanton** ($26, round) — sausage, פלפל קלברז'י

**ההמבורגר**:
- **Emmy Burger** ($24) — dry-aged beef, צ'דר, בצל מקורמל, רוטב סוד, על pretzel bun. אגדי
- **Karasama Burger** ($22) — צמחוני, פטריות, מוצרלה

ארוחה: $50-80 לאדם עם פיצה משותפת והמבורגר.

## הוויב ב-Emily

מסעדה גדולה (120 איש קיבול), אווירה ברוקלינית-משפחתית, חצר בקיץ. הקהל: ברוקלינאים, חובבי פיצה, ותיירים שקראו על Emmy Burger.

## שעות פתיחה ב-Emily

שני-שישי 17:00-22:00 (ערב בלבד), שבת 12:00-22:30 (גם ברנץ), ראשון 12:00-21:30.

## איך מגיעים ל-Emily Brooklyn

- מטרו G ל-Clinton-Washington Avenues, 6 דקות הליכה
- מטרו C ל-Lafayette Avenue, 8 דקות הליכה
- מטרו B/D/N/Q/R ל-DeKalb Avenue, 12 דקות הליכה

## שאלות נפוצות על Emily ניו יורק

**Emily כשר?** לא.
**שווה ההייפ Emmy Burger?** כן, אחד מההמבורגרים הטובים בעיר.
**מה התקציב?** $50-80 לאדם.
**צריך להזמין מקום?** מאוד מומלץ. דרך Resy.

**Emily Manhattan ההבדל?**
יש סניף שני ב-West Village (Emmy Squared, יותר ממוקד בפיצה ריבועית). שני המקומות עם אותו DNA.`,
  },

  'fette-sau-williamsburg': {
    description: `Fette Sau ב-Williamsburg ברוקלין היא ברביקיו-בר היפסטרי בעיצוב תעשייתי של 2007. בשרים מעושנים מ-Hickory wood, סלקציה רחבה של בירות מקומיות ו-bourbon, וחצר ענקית בקיץ. השם בגרמנית: "fat pig". מקום שהשיק את ההיפ-טריפ של בשר ובירה בברוקלין.`,
    full_content: `## Fette Sau ב-Williamsburg ברוקלין ניו יורק — ברביקיו של 2007 שעדיין מוביל

Fette Sau ב-354 Metropolitan Avenue ב-Williamsburg נפתחה ב-2007 על ידי Joe Carroll, אחד מהפיתרונים שעיצבו את הברוקלין החדשה. הקונספט: ברביקיו רציני (לא barbeque-themed) ב-warehouse שמאז 1860 שימש בית מרזחת. בקר וחזיר שמעושנים 12-16 שעות ב-Hickory wood, מוגשים על נייר מתכת, נמכרים לפי משקל. בנוסף: 50+ בירות מקומיות, 100+ bourbons. ההצלחה הייתה מטורפת. תוך שנתיים: כתבת NY Times, פיתחה את הרשת לסניף שני (Tribeca, 2014).

## מה להזמין ב-Fette Sau

**הבשרים** (נמכרים לפי משקל):
- **Brisket** ($28/pound) — fatty או lean
- **Pork Ribs** ($26/pound) — Memphis-style
- **Pulled Pork** ($24/pound)
- **Beef Ribs** ($30/pound) — מנת ה-Insta
- **Sausage** ($14 each)
- **Burnt Ends** ($16/half pound) — קצוות בריסקט מתוקים

**מנות צד**:
- **Mac and Cheese** ($8)
- **Coleslaw** ($5)
- **Burnt End Beans** ($8)
- **Cornbread** ($4)

**שתייה**:
- 50+ בירות מקומיות (Brooklyn Brewery, Other Half, Threes)
- 100+ bourbons ($10-25 לכוס)

ארוחה: $35-55 לאדם.

## הוויב ב-Fette Sau

חלל ענק (200 איש קיבול), שולחנות עץ ארוכים, אווירה רועשת, קירות לבנים עם ניאון. בקיץ יש חצר ענקית. הקהל: ברוקלינאים, חובבי בשר ובירה, ותיירים.

## שעות פתיחה ב-Fette Sau

שני: סגור. שלישי-שישי 17:00-23:00, שבת 12:00-23:00, ראשון 12:00-22:00.

## איך מגיעים ל-Fette Sau Williamsburg

- מטרו L ל-Bedford Avenue, 8 דקות הליכה
- מטרו G ל-Metropolitan Avenue, 5 דקות הליכה
- אובר ממנהטן: $20-28

## שאלות נפוצות על Fette Sau ניו יורק

**Fette Sau כשר?** לא, כלום.
**מה ההבדל בין Fette Sau ל-Hometown?** Fette Sau: יותר ותיק, אווירה ברוקלינית-של-2007. Hometown: ב-Red Hook, יותר חדש ופחות תיירותי.
**שווה ההייפ?** כן, ברביקיו ברמה גבוהה.
**מה התקציב?** $35-55 לאדם.
**צריך להזמין מקום?** מומלץ לסופ"ש. דרך Resy.`,
  },
}

let ok=0,fail=0
for(const[slug,data]of Object.entries(updates)){
  const{error}=await sb.from('restaurants').update(data).eq('slug',slug).eq('destination_id',env.DESTINATION_ID)
  if(error){console.log('FAIL',slug,error.message);fail++}else{console.log('OK  ',slug,'— desc:',data.description.length,'full:',data.full_content.length);ok++}
}
console.log(`\nDone: ${ok} updated, ${fail} failed`)
