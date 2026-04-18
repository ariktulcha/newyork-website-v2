// Restaurants Batch 5 (final 5): Ground Support, John Brown, Red Hook Tavern, Jake's, Fette Sau Tribeca
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
const env = Object.fromEntries(readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n').filter(Boolean).map(l=>l.split('=').map(s=>s.trim()).filter(Boolean)).filter(p=>p.length===2))
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

const updates = {
  'ground-support-cafe': {
    description: `Ground Support Cafe ב-399 West Broadway ב-SoHo הוא בית קפה שכונתי-תכל'סי שלא משחק את משחק האנדרגראונד. קפה איכותי בלי בלבולי מוח, מאפים טריים מבית מפיק מקומי, ואווירה לא מתיימרת. הקהל: אנשי SoHo שעובדים באזור, אומנים, ויצירניים. ספסלים בחוץ — מהמקומות הטובים בסוהו לצפייה בעוברים-ושבים.`,
    full_content: `## Ground Support Cafe ב-SoHo ניו יורק — בית קפה שכונתי לקהל המקומי

Ground Support Cafe ב-399 West Broadway ב-SoHo נפתח ב-2009 על ידי שני יזמים מקומיים שרצו מקום פשוט: קפה טוב, מאפים טריים, ואווירה ידידותית. בעוד SoHo הסתבך ב-trends וב-pop-ups, Ground Support נשאר עקבי. 16 שנה אחרי הפתיחה, אותו תפריט, אותו צוות, ואותו קהל קבוע.

## מה להזמין ב-Ground Support

קפה ספיישלטי קלאסי:
- **Drip Coffee** ($3.50)
- **Espresso** ($4)
- **Cortado** ($5)
- **Cappuccino** ($5)
- **Latte** ($5.50)
- **Cold Brew** (קיץ) $5

מאפים טריים מ-Balthazar Bakery הסמוך:
- **Croissant** ($4)
- **Pain au Chocolate** ($5)
- **Almond Croissant** ($6)
- **Avocado Toast** ($14, בעונה)
- **Egg Sandwich** ($10)

ארוחה: $7-18 לאדם.

## הוויב ב-Ground Support

מקום קטן (20 איש קיבול), שולחנות עץ, ספסלים בחוץ. אווירה רגועה, מוזיקת ג'אז ברקע. הקהל: עובדי SoHo (בעיקר אופנה ו-PR), אומנים, סטודנטים, ותיירים שמכירים את האזור.

## שעות פתיחה ב-Ground Support

שני-שישי 07:00-19:00, שבת-ראשון 08:00-19:00. הכי לוהט: 09:00-11:00 ו-13:00-15:00.

## איך מגיעים ל-Ground Support

- מטרו A/C/E ל-Spring Street, 5 דקות הליכה
- מטרו 1 ל-Houston Street, 6 דקות הליכה

## שאלות נפוצות על Ground Support Cafe

**Ground Support כשר?** לא תחת השגחה, אבל אין בשר.
**יש WiFi?** כן, חינם.
**מה ההבדל בין Ground Support ל-Gasoline Alley/La Cabra?** Ground Support: יותר שכונתי-מקצועי, פחות "trendy".
**מה התקציב?** $7-18 לאדם.`,
  },

  'john-brown-smokehouse': {
    description: `John Brown Smokehouse ב-Long Island City קווינס היא ברביקיו בסגנון Kansas City — בקר וחזיר שמעושנים 12+ שעות, רוטב מתוק-פיקנטי קלאסי, ו-Burnt Ends מפורסמים. אווירה קלילה, לא מתיימרת, ופחות תיירותית מ-Hometown או Fette Sau. אופציה מצוינת לחובבי ברביקיו שלא רוצים לחכות.`,
    full_content: `## John Brown Smokehouse ב-Long Island City קווינס ניו יורק — ברביקיו Kansas City-style

John Brown Smokehouse ב-10-43 44th Drive ב-Long Island City נפתחה ב-2010 על ידי Josh Bowen, שעבד 5 שנים בBarbeque restaurants ב-Kansas City. כשחזר לניו יורק רצה להביא את ה-Kansas City-style האותנטי — שונה מ-Texas (שעוסק בבריסקט), שונה מ-Memphis (שעוסק בצלעות), KC-style מתמקד ב-Burnt Ends, רוטב מתוק-פיקנטי, ובשר חזיר.

המקום פחות תיירותי מ-Hometown או Fette Sau, אבל המאכלים ברמה זהה. הקהל בעיקר מקומי-קווינסי, מה שאומר אווירה אמיתית ופחות תור.

## מה להזמין ב-John Brown

**הקלאסיקות**:
- **Burnt Ends** ($16/half pound) — קצוות בריסקט מתוקים-מעושנים. החתימה
- **Pulled Pork** ($14/sandwich) — חזיר מעושן 14 שעות
- **Brisket Sandwich** ($16)
- **St. Louis Ribs** ($24/half rack)
- **Beef Ribs** ($28)
- **KC Combo** ($35) — Burnt Ends + Pulled Pork + Brisket

**מנות צד**:
- **Mac and Cheese** ($7)
- **Coleslaw** ($5)
- **KC Beans** ($7)
- **Cornbread** ($4)

ארוחה: $30-50 לאדם.

## הוויב ב-John Brown

מקום קטן (60 איש קיבול), אווירה קלאסית-קז'ואלית. הקהל: קווינסים, עובדי תעשייה ב-LIC, ותיירים שמכירים את הסצנה.

## שעות פתיחה ב-John Brown

שני: סגור. שלישי-שבת 12:00-22:00, ראשון 12:00-21:00.

## איך מגיעים ל-John Brown LIC

- מטרו 7 ל-Vernon Boulevard/Jackson Avenue, 4 דקות הליכה
- מטרו E/M ל-23rd Street/Ely Avenue, 6 דקות הליכה
- אובר ממנהטן: $15-22

## שאלות נפוצות על John Brown Smokehouse

**John Brown כשר?** לא, חזיר.
**מה ההבדל בין John Brown ל-Hometown?** John Brown: KC-style, פחות תור. Hometown: Texas-style, יותר תיירותי.
**מה התקציב?** $30-50 לאדם.
**צריך להזמין?** לא, walk-in.`,
  },

  'red-hook-tavern': {
    description: `Red Hook Tavern ב-Red Hook ברוקלין היא טברנה אמריקאית מודרנית של Billy Durney (גם בעלי Hometown Bar-B-Que). המנה החתימה: ה-Red Hook Burger, אחד מההמבורגרים הטובים בעיר. dry-aged בקר, צ'דר, רוטב סוד. אווירה ברוקלינית-נוסטלגית, אורות נמוכים, מוזיקת קלאסיקה.`,
    full_content: `## Red Hook Tavern ב-Red Hook ברוקלין ניו יורק — טברנה ושל ההמבורגר של Billy Durney

Red Hook Tavern ב-329 Van Brunt Street ב-Red Hook נפתחה ב-2018 על ידי Billy Durney (גם בעלי Hometown Bar-B-Que הסמוך, 100 מטר משם). הוא רצה להוסיף עוד מקום ב-Red Hook עם DNA אחר: לא ברביקיו, אלא טברנה אמריקאית מודרנית. עיצוב פנים: עץ כהה, אורות נמוכים, ספסלי velvet. אווירה: 1950s American tavern עם שדרוג של 2018.

ה-DNA: תפריט קצר אבל מוקפד, פוקוס על בשרים מקומיים, ולא יותר מדי "instagrammable". המנה החתימה — **Red Hook Burger** — נחשב לאחד מההמבורגרים הטובים בעיר.

## מה להזמין ב-Red Hook Tavern

**The Famous**:
- **Red Hook Burger** ($24) — dry-aged בקר, צ'דר, חסה, רוטב סוד, על pretzel bun. החתימה.
- **Aged Steak Frites** ($45) — סטיק dry-aged עם פרנץ פרייז
- **Lamb Ragu Pasta** ($28)
- **Crispy Brussels Sprouts** ($14)
- **Roasted Half Chicken** ($28)

**משקאות**:
- **Beer** ($7-12) — בעיקר מקומיים
- **Bourbon** ($10-25)
- **Cocktails** ($14-18)

ארוחה: $50-90 לאדם.

## הוויב ב-Red Hook Tavern

מקום בינוני (75 איש קיבול), אווירה אינטימית, מוזיקת ג'אז ובלוז ברקע. הקהל: ברוקלינאים, יזיזרי תעשייה (בעיקר משפחת קולינארית), ולעיתים תיירים שיודעים לבקר ב-Red Hook.

## שעות פתיחה ב-Red Hook Tavern

שני: סגור. שלישי-שבת 17:00-23:00, ראשון 12:00-22:00 (גם ברנץ).

## איך מגיעים ל-Red Hook Tavern

- אובר ממנהטן: $25-40, 25-40 דקות
- מטרו F ל-Smith-9th Streets, ואז 25 דקות הליכה (לא מומלץ)
- IKEA Shuttle בקיץ

## שאלות נפוצות על Red Hook Tavern

**Red Hook Tavern כשר?** לא.
**שווה לנסוע ל-Red Hook?** כן לחובבי המבורגר.
**מה ההבדל בין Red Hook Tavern ל-Hometown?** Hometown: ברביקיו. Red Hook Tavern: טברנה.
**מה התקציב?** $50-90 לאדם.`,
  },

  'jakes-steakhouse': {
    description: `Jake's Steakhouse ב-6401 Broadway בברונקס היא סטייקהאוס שכונתי-קלאסי-אמריקאי. נפתח ב-1996, מקום בלי יומרות, "אולד-סקול" של ניו יורק האמיתית. סטייקים טובים במחירים הוגנים יותר ממנהטן, אווירה אינטימית-משפחתית. אופציה מצוינת אם אתם בקרבת אצטדיון Yankees ורוצים סטייק.`,
    full_content: `## Jake's Steakhouse בברונקס ניו יורק — סטייקהאוס שכונתי-קלאסי

Jake's Steakhouse ב-6401 Broadway ב-Riverdale (Bronx northwest) נפתחה ב-1996 על ידי משפחת Jake. במשך 30 שנה היא סטייקהאוס שכונתי שמשרת את הקהילה היהודית-איטלקית של Riverdale. לא ידוע ב-Manhattan, אבל מי שמכיר את האזור יודע שזה אחד מהסטייקהאוסים הטובים בברונקס במחירים הוגנים.

ה-DNA: סטייקים USDA Prime, dry-aged 21-28 ימים, מוגשים בסגנון אמריקאי-קלאסי. אין יומרות. אין הדפסות תפריט מאוד. פשוט סטייקים טובים במקום נחמד.

## מה להזמין ב-Jake's

**הסטייקים**:
- **Porterhouse for Two** ($95) — קלאסי, dry-aged
- **Ribeye** ($55-65)
- **Filet Mignon** ($45-55)
- **NY Strip** ($55)
- **T-Bone** ($60)

**מנות צד**:
- **Creamed Spinach** ($12)
- **Hash Browns** ($10)
- **Lobster Mac and Cheese** ($24)
- **Asparagus** ($14)

**שתייה**:
- **Wine** $10-18 לכוס, בקבוקים $50-200
- **Cocktails** $14-16

ארוחה: $80-130 לאדם — יותר זול מ-Wolfgang's או Peter Luger.

## הוויב ב-Jake's

מסעדה אינטימית (80 איש קיבול), אווירה משפחתית-יוקרתית. הקהל: ברונקסים מ-Riverdale, יהודים מקומיים, אנשי עסקים, ולעיתים תיירים שאוכלים אחרי משחק Yankees.

## שעות פתיחה ב-Jake's

שני: סגור. שלישי-שבת 17:00-22:30, ראשון 13:00-21:00.

## איך מגיעים ל-Jake's Steakhouse

- מטרו 1 ל-238th Street, 4 דקות הליכה
- אובר ממנהטן: $25-40, 25-40 דקות
- אובר מYankee Stadium: $15-22

## שאלות נפוצות על Jake's Steakhouse

**Jake's כשר?** לא תחת השגחה.
**שווה לנסוע מ-Manhattan?** לחובבי סטייק שמחפשים מחיר הוגן: כן.
**מה ההבדל בין Jake's ל-Wolfgang's?** Wolfgang's: יותר תיירותי, יותר יקר. Jake's: שכונתי, $30-50 פחות לאדם.
**מה התקציב?** $80-130 לאדם.`,
  },

  'fette-sau-tribeca': {
    description: `Fette Sau Tribeca ב-329 Broadway היא הסניף השני של רשת Fette Sau (הראשונה בויליאמסבורג). נפתחה ב-2014, היא ברביקיו ובר בירה במנהטן. אותו DNA: בשרים מעושנים נמכרים לפי משקל, 50+ בירות, אווירה תעשייתית-יוקרתית. נוח לתיירים שלא רוצים לנסוע לברוקלין.`,
    full_content: `## Fette Sau Tribeca ב-Tribeca ניו יורק — ברביקיו במנהטן

Fette Sau Tribeca ב-329 Broadway ב-Tribeca נפתחה ב-2014 על ידי Joe Carroll, אותו בעלים של Fette Sau Williamsburg (שנפתחה ב-2007). הוא רצה להביא את ה-DNA הברוקליני למנהטן: ברביקיו רציני בעיצוב תעשייתי, סלקציית בירות מקומיות גדולה, ואווירה רועשת-קלילה.

הסניף הטריבקאי דומה לוויליאמסבורג ב-95% — אותם בשרים, אותו צוות-מטבח, אותם חוקים — אבל בעיצוב יותר מדויק לקהל מנהטני: יותר אורות, פחות אוטנטיות מכוונת, יותר נגישות.

## מה להזמין ב-Fette Sau Tribeca

**הבשרים** (לפי משקל):
- **Brisket** ($28/pound)
- **Pork Ribs** ($26/pound)
- **Pulled Pork** ($24/pound)
- **Beef Ribs** ($30/pound)
- **Sausage** ($14 each)
- **Burnt Ends** ($16/half pound)

**מנות צד**: Mac and Cheese ($8), Coleslaw ($5), Burnt End Beans ($8), Cornbread ($4).

**שתייה**:
- 50+ בירות מקומיות
- 100+ bourbons

ארוחה: $35-55 לאדם.

## הוויב ב-Fette Sau Tribeca

חלל גדול (180 איש קיבול), שולחנות עץ ארוכים, אווירה רועשת. הקהל: מנהטנים, אנשי עסקים, תיירים מ-Lower Manhattan, ופחות "ברוקליני" מהוויליאמסבורג.

## שעות פתיחה ב-Fette Sau Tribeca

שני: סגור. שלישי-שישי 17:00-23:00, שבת 12:00-23:00, ראשון 12:00-22:00.

## איך מגיעים ל-Fette Sau Tribeca

- מטרו 1/2/3 ל-Chambers Street, 4 דקות הליכה
- מטרו A/C/E ל-Canal Street, 6 דקות הליכה
- מטרו 4/5/6 ל-Brooklyn Bridge/City Hall, 8 דקות הליכה

## שאלות נפוצות על Fette Sau Tribeca

**Fette Sau כשר?** לא.
**מה ההבדל בין Tribeca ל-Williamsburg?** Tribeca: יותר נגיש לתיירי מנהטן, יותר אורות. Williamsburg: יותר אותנטי-ברוקליני, החצר בקיץ.
**שווה ההייפ?** כן, ברביקיו ברמה גבוהה.
**מה התקציב?** $35-55 לאדם.
**צריך להזמין?** מומלץ לסופ"ש.`,
  },
}

let ok=0,fail=0
for(const[slug,data]of Object.entries(updates)){
  const{error}=await sb.from('restaurants').update(data).eq('slug',slug).eq('destination_id',env.DESTINATION_ID)
  if(error){console.log('FAIL',slug,error.message);fail++}else{console.log('OK  ',slug,'— desc:',data.description.length,'full:',data.full_content.length);ok++}
}
console.log(`\nDone: ${ok} updated, ${fail} failed`)
