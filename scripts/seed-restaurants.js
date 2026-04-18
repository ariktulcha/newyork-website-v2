// Seed 30 iconic NYC restaurants.
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env','utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const DEST = 'new-york'
const apply = process.argv.includes('--apply')

const RESTAURANTS = [
  { slug:`russ-and-daughters-cafe`, name_he:`ראס את בנותיו קאפה`, name_en:`Russ & Daughters Cafe`, area:`Lower East Side`, cuisine_category:`jewish-deli`, vibe:`אייקון יהודי-ניו יורקי עם לוקס ובייגל`, is_kosher:false, excerpt:`המעדנייה האגדית של Russ & Daughters בגרסת Sit-down — לוקס, בייגל, קוויאר ובורשט. אייקון Jewish של ה-Lower East Side מאז 1914.` },
  { slug:`katzs-delicatessen`, name_he:`מעדניית קץ`, name_en:`Katzs Delicatessen`, area:`Lower East Side`, cuisine_category:`jewish-deli`, vibe:`הפסטרמי הכי מפורסם בעולם`, is_kosher:false, excerpt:`Katzs מאז 1888 — הסנדוויץ פסטרמי שהופיע ב-When Harry Met Sally. התור ארוך אבל המילוי אגדי. לא כשר אבל איקוני.` },
  { slug:`2nd-ave-deli`, name_he:`2nd Avenue Deli`, name_en:`2nd Avenue Deli`, area:`Murray Hill`, cuisine_category:`jewish-deli`, vibe:`דלי יהודי גלאט-כשר`, is_kosher:true, excerpt:`דלי כשר קלאסי — פסטרמי, קורנביף, מרק קניידלך. פתוח מ-1954. שני סניפים (Murray Hill ו-Upper East).` },
  { slug:`mile-end-deli`, name_he:`Mile End Deli`, name_en:`Mile End Delicatessen`, area:`Boerum Hill`, cuisine_category:`jewish-deli`, vibe:`Jewish deli היפסטרי של Brooklyn`, is_kosher:false, excerpt:`Deli בסגנון מונטריאול בברוקלין — סמוקד-מיט sandwiches ו-poutine. כ-upgrade מודרני של Jewish comfort food.` },
  { slug:`sadelles`, name_he:`סדלס`, name_en:`Sadelles`, area:`SoHo`, cuisine_category:`brunch`, vibe:`ברנץ יוקרתי של Major Food Group`, is_kosher:false, excerpt:`Sadelles הוא ברנץ אייקוני של SoHo — Tower של לוקס ובייגל, שמפניה ואווירה של Major Food Group. תמיד תור, תמיד Instagram-worthy.` },
  { slug:`pastrami-queen`, name_he:`מלכת הפסטרמי`, name_en:`Pastrami Queen`, area:`Upper East Side`, cuisine_category:`jewish-deli`, vibe:`דלי כשר Upper East`, is_kosher:true, excerpt:`דלי כשר על Lexington Ave — פסטרמי, בריסקט, מרק בצל. גלאט-כשר. קלאסיקה פחות תיירותית אבל מעולה.` },

  { slug:`lombardis-pizza`, name_he:`לומברדיס פיצה`, name_en:`Lombardis Pizza`, area:`NoLita`, cuisine_category:`pizza`, vibe:`הפיצריה הראשונה באמריקה (1905)`, is_kosher:false, excerpt:`Lombardis — הפיצריה הראשונה באמריקה. פותחה ב-1905 עם תנור פחמים. פיצות קוקיות ולוהטות, מקום היסטורי.` },
  { slug:`joes-pizza`, name_he:`פיצה של גו`, name_en:`Joes Pizza`, area:`Greenwich Village`, cuisine_category:`pizza`, vibe:`פיצת-רחוב אייקונית, slice על הרגל`, is_kosher:false, excerpt:`Joes Pizza בGreenwich Village — slice קלאסי ניו-יורקי על Bleecker Street מאז 1975. הופיע ב-Spider-Man 2. תור אבל מהיר.` },
  { slug:`lucali`, name_he:`לוקאלי`, name_en:`Lucali`, area:`Carroll Gardens`, cuisine_category:`pizza`, vibe:`בית-פיצה של שף אמן`, is_kosher:false, excerpt:`Lucali בברוקלין — Mark Iacono מכין כל פיצה בעצמו. BYOB. התור מתחיל ב-17:00. בחירת הסלבס של Jay-Z וBeyonce.` },
  { slug:`di-fara-pizza`, name_he:`די פארא פיצה`, name_en:`Di Fara Pizza`, area:`Midwood`, cuisine_category:`pizza`, vibe:`פיצת מדרגה של דומיניק דימרקו`, is_kosher:false, excerpt:`Di Fara ב-Midwood, ברוקלין — Dom DeMarco הכין פיצות בעצמו במשך 60 שנה. כל פיצה לוקחת 20 דקות. legendary.` },
  { slug:`prince-street-pizza`, name_he:`פרינס סטריט פיצה`, name_en:`Prince Street Pizza`, area:`NoLita`, cuisine_category:`pizza`, vibe:`Square slice ויראלית`, is_kosher:false, excerpt:`Prince Street — הפיצה הריבועית הכי ויראלית ברשתות. Pepperoni spicy קראנצי. תור ארוך על Prince Street.` },
  { slug:`robertas-pizza`, name_he:`רוברטהס`, name_en:`Robertas`, area:`Bushwick`, cuisine_category:`pizza`, vibe:`פיצת-אבן ב-Bushwick היפסטרית`, is_kosher:false, excerpt:`Robertas היפסטרי ב-Bushwick — פיצות במירון wood-fired, אווירה של warehouse, דיסקים על הקיר. חלוץ ברוקלין המודרנית.` },

  { slug:`ess-a-bagel`, name_he:`אס-א-בייגל`, name_en:`Ess-a-Bagel`, area:`Midtown East`, cuisine_category:`bagels`, vibe:`הבייגל הטוב ביותר בניו יורק`, is_kosher:false, excerpt:`Ess-a-Bagel — בייגל ענק, רך בפנים, קראנצי בחוץ. ב-51st Street. הגודל מאתגר, הטעם אגדי.` },
  { slug:`h-and-h-midtown-bagels`, name_he:`H&H בייגלס`, name_en:`H&H Midtown Bagels East`, area:`Upper East Side`, cuisine_category:`bagels`, vibe:`בייגל אייקוני של Upper East`, is_kosher:false, excerpt:`H&H — אחד הבייגלים המפורסמים של NY מאז 1972. אפייה לאורך כל היום. Plain bagel טהור.` },
  { slug:`absolute-bagels`, name_he:`Absolute Bagels`, name_en:`Absolute Bagels`, area:`Upper West Side`, cuisine_category:`bagels`, vibe:`בייגל משפחתי Upper West`, is_kosher:false, excerpt:`Absolute Bagels ליד אוניברסיטת קולומביה — בייגל טרי כל היום, שמנת סקלארית, תור ארוך אבל מהיר.` },

  { slug:`wolfgangs-steakhouse`, name_he:`וולפגנגס סטייקהאוס`, name_en:`Wolfgangs Steakhouse`, area:`Midtown`, cuisine_category:`steakhouse`, vibe:`Porterhouse קלאסי של NY`, is_kosher:false, excerpt:`Wolfgangs — Peter Luger alumnus פתח מסעדה משלו. Porterhouse for Two הקלאסי. קנה מוניטין משלו בכמה עיירות.` },

  { slug:`carbone`, name_he:`קרבונה`, name_en:`Carbone`, area:`Greenwich Village`, cuisine_category:`italian`, vibe:`איטלקי-אמריקאי יוקרתי`, is_kosher:false, excerpt:`Carbone של Major Food Group — Italian-American over-the-top. Spicy Rigatoni Vodka וירלי. הזמנה חודש מראש.` },
  { slug:`raos`, name_he:`ראוס`, name_en:`Raos`, area:`East Harlem`, cuisine_category:`italian`, vibe:`10 שולחנות, impossible reservations`, is_kosher:false, excerpt:`Raos — 10 שולחנות בלבד, רשימת הזמנות סגורה. Meatballs שנמכרים ב-supermarket. הכי בלעדי בניו יורק.` },
  { slug:`balthazar`, name_he:`בלתזר`, name_en:`Balthazar`, area:`SoHo`, cuisine_category:`brunch`, vibe:`ברנץ צרפתי-ניו-יורקי של SoHo`, is_kosher:false, excerpt:`Balthazar של Keith McNally — ברסרי צרפתי ב-SoHo. ברנץ הכי מפורסם בNY. Steak Frites, sole meuniere.` },
  { slug:`clinton-street-baking`, name_he:`Clinton St. Baking`, name_en:`Clinton St. Baking Company`, area:`Lower East Side`, cuisine_category:`brunch`, vibe:`Pancakes אגדיים, LES`, is_kosher:false, excerpt:`Clinton St. — Blueberry Pancakes ששברו את האינטרנט. ברנץ LES, תמיד תור. זוג אוכל: פעם אחת בחיים.` },
  { slug:`sarabeth-central-park-south`, name_he:`Sarabeths`, name_en:`Sarabeths Central Park South`, area:`Midtown`, cuisine_category:`brunch`, vibe:`ברנץ משפחתי וקלאסי`, is_kosher:false, excerpt:`Sarabeths — ברנץ קלאסי של NY. Lemon Ricotta Pancakes, Scotch eggs. Central Park South למיקום מושלם.` },

  { slug:`magnolia-bakery-west-village`, name_he:`מגנוליה בייקרי`, name_en:`Magnolia Bakery`, area:`West Village`, cuisine_category:`bakery`, vibe:`Banana Pudding מפורסם`, is_kosher:false, excerpt:`Magnolia Bakery של Sex and the City — Banana Pudding שהפך לאייקון. Cupcakes קלאסיים. West Village original location.` },
  { slug:`levain-bakery`, name_he:`לוויין בייקרי`, name_en:`Levain Bakery`, area:`Upper West Side`, cuisine_category:`bakery`, vibe:`Cookies 170g חצי-לא-אפויות`, is_kosher:false, excerpt:`Levain — cookies של 170 גרם כל אחד. Chocolate Chip Walnut מלכותי. סניף Upper West Side המקורי.` },
  { slug:`dominique-ansel-bakery`, name_he:`Dominique Ansel`, name_en:`Dominique Ansel Bakery`, area:`SoHo`, cuisine_category:`bakery`, vibe:`ממציא ה-Cronut`, is_kosher:false, excerpt:`Dominique Ansel — שף המפורסם שהמציא את ה-Cronut ב-2013. טעמים מתחלפים כל חודש. תור מ-07:00.` },
  { slug:`milk-bar`, name_he:`Milk Bar`, name_en:`Milk Bar`, area:`East Village`, cuisine_category:`bakery`, vibe:`קינוחים אמריקאיים של Christina Tosi`, is_kosher:false, excerpt:`Milk Bar של Christina Tosi — Compost Cookie, Cereal Milk Soft Serve, Birthday Cake Truffles. ילדיות-נוסטלגית.` },

  { slug:`miznon-nyc`, name_he:`מזנון`, name_en:`Miznon`, area:`Chelsea`, cuisine_category:`israeli`, vibe:`פיתות של אייל שני ב-NY`, is_kosher:false, excerpt:`Miznon של אייל שני ב-Chelsea — פיתות ממולאות, כרובית שלמה, קציצות. האווירה הישראלית המוכרת הגיעה לניו יורק.` },
  { slug:`shuka-nyc`, name_he:`שוקה`, name_en:`Shuka`, area:`SoHo`, cuisine_category:`israeli`, vibe:`מזרח תיכון מודרני`, is_kosher:false, excerpt:`Shuka ב-SoHo של Ayesha Nurdjaja — מזרח-תיכוני יצירתי, דגים, lamb kebab, pita. חי וקולני.` },
  { slug:`timna`, name_he:`תימנה`, name_en:`Timna`, area:`East Village`, cuisine_category:`israeli`, vibe:`ישראלי מהלב של Nir Mesika`, is_kosher:false, excerpt:`Timna של Nir Mesika — מזרח-תיכוני חם, kubaneh, shakshuka, חומוס מעושן. מהישראלים האותנטיים בNY.` },

  { slug:`please-dont-tell`, name_he:`פליז דונט טל (PDT)`, name_en:`Please Dont Tell (PDT)`, area:`East Village`, cuisine_category:`cocktail-bar`, vibe:`Speakeasy בתוך תא-טלפון`, is_kosher:false, excerpt:`PDT — speakeasy שמגיעים אליו דרך תא טלפון בתוך Crif Dogs. הזמנה חיונית. קוקטיילים ברמה עולמית.` },
  { slug:`attaboy-nyc`, name_he:`אטאבוי`, name_en:`Attaboy`, area:`Lower East Side`, cuisine_category:`cocktail-bar`, vibe:`קוקטייל בר without menu`, is_kosher:false, excerpt:`Attaboy — אין תפריט, אתה מספר ל-bartender מה אתה אוהב והוא יכין. מהטובים בעולם. ב-Eldridge Street.` },
]

async function run() {
  const { data: existing } = await sb.from('restaurants').select('slug').eq('destination_id', DEST)
  const existingSlugs = new Set((existing || []).map(r => r.slug))
  const toInsert = RESTAURANTS.filter(r => !existingSlugs.has(r.slug))
  const skipped = RESTAURANTS.filter(r => existingSlugs.has(r.slug)).map(r => r.slug)
  if (skipped.length) console.log('SKIPPED:', skipped.join(', '))

  console.log(`Inserting ${toInsert.length} restaurants (apply=${apply})`)
  for (const r of toInsert) {
    const payload = {
      ...r,
      destination_id: DEST,
      published: true,
      sort_order: 500,
      cuisine_types: [r.cuisine_category],
      metadata: {},
    }
    console.log(`  + ${r.slug}`)
    if (apply) {
      const { error } = await sb.from('restaurants').insert(payload)
      if (error) console.log('    FAIL:', error.message)
    }
  }
  console.log('\nDone.')
}

run()
