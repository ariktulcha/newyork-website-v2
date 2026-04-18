import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env', 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map((s, i) => i === 0 ? s.trim() : s.trim()))
    .map(([k, ...v]) => [k, v.join('=')])
)

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
const GOOGLE_KEY = env.GOOGLE_MAPS_API_KEY

// Curated list of 8 top NYC wine bars (Eater, Infatuation, VinePair, Resy 2026)
const wineBars = [
  {
    slug: 'the-four-horsemen',
    name_he: 'The Four Horsemen',
    name_en: 'The Four Horsemen',
    area: 'ברוקלין',
    area_en: 'Williamsburg, Brooklyn',
    google_query: 'The Four Horsemen wine bar 295 Grand Street Brooklyn',
    excerpt: 'בר יין נטורל אגדי בוויליאמסבורג שבבעלות ג׳יימס מרפי (LCD Soundsystem). זוכה כוכב מישלן עם רשימת 250+ יינות נטורליים, ביו-דינמיים ובהתערבות מינימלית. **טיפ:** הזמינו מראש דרך Resy שבועות לפני — המקום קטן ותמיד מלא.',
    description: 'בר יין נטורל אגדי בוויליאמסבורג שבבעלות ג׳יימס מרפי (LCD Soundsystem). זוכה כוכב מישלן עם רשימת 250+ יינות נטורליים, ביו-דינמיים ובהתערבות מינימלית. **טיפ:** הזמינו מראש דרך Resy שבועות לפני — המקום קטן ותמיד מלא.',
    opening_hours: 'שלישי-ראשון: 17:30 - 23:00 (סגור ביום שני)',
    type_emoji: '🍷',
    instagram_url: 'https://www.instagram.com/fourhorsemenbk/',
    faq: [
      { q: 'מה זה The Four Horsemen?', a: 'בר יין נטורל בוויליאמסבורג, שבבעלות **ג׳יימס מרפי** מ-LCD Soundsystem. זוכה **כוכב מישלן** ומציע 250+ יינות נטורליים, ביו-דינמיים ובהתערבות מינימלית.' },
      { q: 'האם צריך להזמין מקום ב-The Four Horsemen?', a: 'כן, חובה. הזמינו דרך **Resy** לפחות 2-3 שבועות מראש. המקום קטן ותמיד מלא — בלי הזמנה כמעט בלתי אפשרי להיכנס.' },
      { q: 'איפה ממוקם The Four Horsemen?', a: 'ב-295 Grand Street, **Williamsburg, Brooklyn**. הדרך הנוחה היא סאבוויי (קו L לתחנת Bedford Av).' },
      { q: 'מה האוכל ב-The Four Horsemen?', a: 'תפריט קצר אך מצוין של small plates שמתלווים ליין: גבינות, צלחות דגים, פסטות. השף **ניקולס מורטון** קיבל הכרה רחבה.' },
    ],
  },
  {
    slug: 'ruffian',
    name_he: 'Ruffian',
    name_en: 'Ruffian',
    area: 'מנהטן',
    area_en: 'East Village, Manhattan',
    google_query: 'Ruffian wine bar 125 East 7th Street East Village Manhattan',
    excerpt: 'בר יין נטורל מהמובילים בעיר, מאז 2016 באיסט וילג׳. רשימת 250 יינות עם דגש על מזרח אירופה (גרמניה, אוסטריה, גאורגיה, יוון). **טיפ:** השב על הבר — הסומליירים יודעים בדיוק איזה יין להמליץ לטעם שלכם.',
    description: 'בר יין נטורל מהמובילים בעיר, מאז 2016 באיסט וילג׳. רשימת 250 יינות עם דגש על מזרח אירופה (גרמניה, אוסטריה, גאורגיה, יוון). **טיפ:** השב על הבר — הסומליירים יודעים בדיוק איזה יין להמליץ לטעם שלכם.',
    opening_hours: 'כל יום: 17:00 - 24:00',
    type_emoji: '🍷',
    instagram_url: 'https://www.instagram.com/ruffiannyc/',
    faq: [
      { q: 'מה זה Ruffian?', a: 'בר יין נטורל באיסט וילג׳ מאז 2016 — אחד מאבות הסצנה. רשימת **250 יינות** מינימל-אינטרוונשן עם דגש על מזרח אירופה ויינות עתיקים מגאורגיה ויוון.' },
      { q: 'מה מומלץ להזמין ב-Ruffian?', a: 'ה-flight של 3 יינות (~$28) נותן טעימה של הסגנון. ה-tinned fish boards מצוינים — כל מה שמתלווה ליין. שאלו את הסומליר להמלצה לפי טעם.' },
      { q: 'כמה עולה ב-Ruffian?', a: 'כוס יין $12-22, בקבוק $50-150. flight של 3 יינות ~$28-35. צלחות אוכל $14-28. סך הכל ערב ל-2 ~$120-180.' },
      { q: 'איפה ממוקם Ruffian?', a: 'ב-125 East 7th Street, **East Village, Manhattan**. הקרוב ביותר זה תחנת סאבוויי **Astor Place** (קו 6) או **2nd Avenue** (קו F).' },
    ],
  },
  {
    slug: 'june-wine-bar',
    name_he: 'June',
    name_en: 'June',
    area: 'ברוקלין',
    area_en: 'Carroll Gardens, Brooklyn',
    google_query: 'June wine bar 231 Court Street Carroll Gardens Brooklyn',
    excerpt: 'בר יין שכונתי וחמים בקרול גרדנס, ברוקלין — סטייפל של סצנת היין הנטורל. השף החדש דייגו מויה הביא את האוכל לרמה חדשה. **טיפ:** מקום מושלם לדייט — אווירה רומנטית עם תאורה רכה ויינות נדירים.',
    description: 'בר יין שכונתי וחמים בקרול גרדנס, ברוקלין — סטייפל של סצנת היין הנטורל. השף החדש דייגו מויה הביא את האוכל לרמה חדשה. **טיפ:** מקום מושלם לדייט — אווירה רומנטית עם תאורה רכה ויינות נדירים.',
    opening_hours: 'רביעי-ראשון: 17:00 - 23:00 (סגור שני-שלישי)',
    type_emoji: '🍷',
    instagram_url: 'https://www.instagram.com/junebk/',
    faq: [
      { q: 'מה זה June?', a: 'בר יין נטורל בקרול גרדנס, ברוקלין — סטייפל של הסצנה. השף **דייגו מויה** הביא את האוכל לרמה גבוהה. אווירה אינטימית ושכונתית.' },
      { q: 'האם June טוב לדייט?', a: 'כן, **מהבחירות הטובות לדייט בברוקלין**. אווירה רומנטית, תאורה רכה, יינות מעניינים ואוכל מצוין. הזמינו שולחן בחלק האחורי.' },
      { q: 'איפה ממוקם June?', a: 'ב-231 Court Street, **Carroll Gardens, Brooklyn**. הקרוב ביותר זה תחנת **Bergen Street** (קו F/G) או **Carroll Street** (קו F/G).' },
      { q: 'האם צריך הזמנה ב-June?', a: 'מומלץ מאוד, במיוחד בסופי שבוע. הזמינו דרך **Resy** שבוע מראש. אפשר גם לתפוס מקום בבר ללא הזמנה אם מגיעים מוקדם.' },
    ],
  },
  {
    slug: 'la-compagnie-des-vins-surnaturels',
    name_he: 'La Compagnie des Vins Surnaturels',
    name_en: 'La Compagnie des Vins Surnaturels',
    area: 'מנהטן',
    area_en: 'SoHo, Manhattan',
    google_query: 'La Compagnie des Vins Surnaturels 249 Centre Street SoHo NYC',
    excerpt: 'בר יין צרפתי מפואר בסוהו עם 1,000+ יינות בקבוק ו-30+ יינות בכוס. אחד מהוותיקים והאיכותיים בעיר. **טיפ:** השב על הבר הארוך — הסומליירים הצרפתים יבחרו לכם את היין המושלם מהמרתף.',
    description: 'בר יין צרפתי מפואר בסוהו עם 1,000+ יינות בקבוק ו-30+ יינות בכוס. אחד מהוותיקים והאיכותיים בעיר. **טיפ:** השב על הבר הארוך — הסומליירים הצרפתים יבחרו לכם את היין המושלם מהמרתף.',
    opening_hours: 'כל יום: 17:00 - 24:00',
    type_emoji: '🍷',
    instagram_url: 'https://www.instagram.com/lacompagnienyc/',
    faq: [
      { q: 'מה זה La Compagnie des Vins Surnaturels?', a: 'בר יין צרפתי בסוהו עם **רשימה של 1,000+ יינות** ו-30+ יינות בכוס. ענף ניו יורקי של בר היין הפריזאי המפורסם. אחד מהמוסדות של סצנת היין בעיר.' },
      { q: 'מה הסגנון של היין ב-La Compagnie?', a: 'מבחר ענק של יינות צרפתיים קלאסיים ויינות נטורליים. **בורגונדי, בורדו, יינות מכל אזורי צרפת** + מבחר עולמי. מהמרתפים העמוקים בעיר.' },
      { q: 'איפה ממוקם La Compagnie?', a: 'ב-249 Centre Street, **SoHo, Manhattan** (גבול עם Chinatown ו-Nolita). הקרוב ביותר זה תחנת **Canal Street** (קווים 6, J, N, Q, R, W).' },
      { q: 'כמה עולה ב-La Compagnie?', a: 'כוס יין $14-25, בקבוקים $60-300+. **flight של 3 יינות $30-40**. אוכל בסגנון ביסטרו צרפתי, $16-32 לצלחת. ערב ל-2 ~$150-250.' },
    ],
  },
  {
    slug: 'wildair-wine-bar',
    name_he: 'Wildair',
    name_en: 'Wildair',
    area: 'מנהטן',
    area_en: 'Lower East Side, Manhattan',
    google_query: 'Wildair restaurant 142 Orchard Street Lower East Side',
    excerpt: 'בר יין נטורל מהאחים של Contra בלואר איסט סייד — מיוחד יחסית, חם ותמיד הומה. רשימת יינות מינימל-אינטרוונשן מצוינת ואוכל קל ברמה גבוהה. **טיפ:** מלא תמיד — לא לוקחים הזמנות, הגיעו מוקדם (17:00) או חכו 30+ דק׳.',
    description: 'בר יין נטורל מהאחים של Contra בלואר איסט סייד — מיוחד יחסית, חם ותמיד הומה. רשימת יינות מינימל-אינטרוונשן מצוינת ואוכל קל ברמה גבוהה. **טיפ:** מלא תמיד — לא לוקחים הזמנות, הגיעו מוקדם (17:00) או חכו 30+ דק׳.',
    opening_hours: 'רביעי-ראשון: 17:00 - 24:00 (סגור שני-שלישי)',
    type_emoji: '🍷',
    instagram_url: 'https://www.instagram.com/wildair/',
    faq: [
      { q: 'מה זה Wildair?', a: 'בר יין נטורל בלואר איסט סייד מאז 2015, **מהבעלים של Contra** (כוכב מישלן). אווירה תוססת, רשימת יינות מינימל-אינטרוונשן מהטובות בעיר ואוכל קל ברמה גבוהה.' },
      { q: 'איך נכנסים ל-Wildair?', a: '**אין הזמנות** — first come, first served. הגיעו ב-17:00 (פתיחה) או חכו 30+ דק׳ בערב. אפשר לרשום שם ולחכות בבר ליד או לטייל ברובע.' },
      { q: 'איפה ממוקם Wildair?', a: 'ב-142 Orchard Street, **Lower East Side, Manhattan**. הקרוב ביותר זה תחנת **Delancey Street / Essex Street** (קווים F, J, M, Z).' },
      { q: 'מה האוכל ב-Wildair?', a: 'תפריט small plates עכשווי: **קרודו, ירקות עונתיים, מנות בשר קטנות**. ה-bread service מצוין. הכל מתחבר עם היין הנטורל. ערב ל-2 ~$120-180.' },
    ],
  },
  {
    slug: 'aldo-sohm-wine-bar',
    name_he: 'Aldo Sohm Wine Bar',
    name_en: 'Aldo Sohm Wine Bar',
    area: 'מנהטן',
    area_en: 'Midtown, Manhattan',
    google_query: 'Aldo Sohm Wine Bar 151 West 51st Street Midtown NYC',
    excerpt: 'בר יין יוקרתי במידטאון מהסומליר של Le Bernardin (3 כוכבי מישלן). חלל אומנותי גדול עם הסערה של מידטאון מבחוץ ושקט פנימי עם כוס יין מהמרתפים הטובים בעיר. **טיפ:** מבצע השעה השמחה (16:30-18:30) נותן יינות נדירים במחיר נגיש יחסית.',
    description: 'בר יין יוקרתי במידטאון מהסומליר של Le Bernardin (3 כוכבי מישלן). חלל אומנותי גדול עם הסערה של מידטאון מבחוץ ושקט פנימי עם כוס יין מהמרתפים הטובים בעיר. **טיפ:** מבצע השעה השמחה (16:30-18:30) נותן יינות נדירים במחיר נגיש יחסית.',
    opening_hours: 'שני-שבת: 16:30 - 23:00 (סגור ראשון)',
    type_emoji: '🍷',
    instagram_url: 'https://www.instagram.com/aldosohmwinebar/',
    faq: [
      { q: 'מה זה Aldo Sohm Wine Bar?', a: 'בר יין במידטאון מ-**Aldo Sohm**, סומליר של השנה (2008) ומנהל היינות של **Le Bernardin** (3 כוכבי מישלן). חלל גדול, אומנותי, יוקרתי אך ידידותי.' },
      { q: 'מה מומלץ להזמין ב-Aldo Sohm?', a: 'יין באוסטרי **Weissburgunder/Grüner Veltliner** (ההתמחות של Sohm), בקבוק **Barolo** איטלקי, או flight טעימה. צלחות **גבינות וקרודו** מצוינות.' },
      { q: 'איפה ממוקם Aldo Sohm Wine Bar?', a: 'ב-151 West 51st Street, **Midtown Manhattan** (ליד Rockefeller Center). הקרוב ביותר זה תחנת **49th Street** (קו N/R/W) או **47-50 Sts Rockefeller Center** (קו B/D/F/M).' },
      { q: 'כמה עולה ב-Aldo Sohm?', a: 'כוס יין $14-30, בקבוקים $50-500+. **שעה שמחה 16:30-18:30** עם יינות מבצע ב-$10-14 לכוס. ערב ל-2 ~$150-250 עם אוכל.' },
    ],
  },
  {
    slug: 'rhodora-wine-bar',
    name_he: 'Rhodora',
    name_en: 'Rhodora',
    area: 'ברוקלין',
    area_en: 'Fort Greene, Brooklyn',
    google_query: 'Rhodora wine bar Fort Greene Brooklyn 197 Adelphi Street',
    excerpt: 'בר יין נטורל קטן וחמים בפורט גרין, ברוקלין — אחד מהטובים בברוקלין. מתמקד ביינות בקנה מידה קטן וטבעי מגרמניה, אוסטריה ודרום צרפת. **טיפ:** המקום zero waste — מודל ייחודי וערכי שווה לתמוך בו.',
    description: 'בר יין נטורל קטן וחמים בפורט גרין, ברוקלין — אחד מהטובים בברוקלין. מתמקד ביינות בקנה מידה קטן וטבעי מגרמניה, אוסטריה ודרום צרפת. **טיפ:** המקום zero waste — מודל ייחודי וערכי שווה לתמוך בו.',
    opening_hours: 'רביעי-ראשון: 17:00 - 24:00 (סגור שני-שלישי)',
    type_emoji: '🍷',
    instagram_url: 'https://www.instagram.com/rhodorawine/',
    faq: [
      { q: 'מה זה Rhodora?', a: 'בר יין נטורל בפורט גרין, ברוקלין. מתמקד ביינות **בקנה מידה קטן וטבעי** מגרמניה, אוסטריה, דרום-מזרח צרפת ועוד. **המקום zero-waste** — מודל ייחודי בעולם.' },
      { q: 'מה מיוחד ב-Rhodora?', a: 'מעבר ליין הנטורל המעולה, **Rhodora הוא בר היין הראשון בעולם עם תפעול zero-waste** — כל החומרים ממוחזרים, אין פלסטיק, אין אריזות. ערכי ומעולה.' },
      { q: 'איפה ממוקם Rhodora?', a: 'ב-197 Adelphi Street, **Fort Greene, Brooklyn**. הקרוב ביותר זה תחנת **Lafayette Avenue** (קו C) או **Atlantic Av-Barclays Center**.' },
      { q: 'מה האוכל ב-Rhodora?', a: 'תפריט קטן של **חטיפים פריזאיים**: גבינות, נקניקים, זיתים, לחמים, מנות קטנות מצוינות. הכל מקומי וטרי, מותאם ליין הנטורל.' },
    ],
  },
  {
    slug: 'plus-de-vin-wine-bar',
    name_he: 'Plus de Vin',
    name_en: 'Plus de Vin',
    area: 'ברוקלין',
    area_en: 'Brooklyn',
    google_query: 'Plus de Vin wine bar Brooklyn',
    excerpt: 'בר יין צבעוני וטרנדי בברוקלין עם קיר יינות מסוקרן ותפריט snacks מבושל לעילא. חצר אחורית מקורה הופכת אותו לבחירה מצוינת לערבי קיץ. **טיפ:** השוערים מצוינים בהמלצות — תגידו להם מה אתם אוהבים והם יוצאו לכם בקבוק מושלם.',
    description: 'בר יין צבעוני וטרנדי בברוקלין עם קיר יינות מסוקרן ותפריט snacks מבושל לעילא. חצר אחורית מקורה הופכת אותו לבחירה מצוינת לערבי קיץ. **טיפ:** השוערים מצוינים בהמלצות — תגידו להם מה אתם אוהבים והם יוצאו לכם בקבוק מושלם.',
    opening_hours: 'שלישי-ראשון: 17:00 - 24:00 (סגור שני)',
    type_emoji: '🍷',
    instagram_url: 'https://www.instagram.com/plusdevinbk/',
    faq: [
      { q: 'מה זה Plus de Vin?', a: 'בר יין טרנדי בברוקלין עם **קיר יינות צבעוני ומסוקרן** ותפריט snacks מצוין. **חצר אחורית מקורה** הופכת את המקום לאידיאלי גם בקיץ וגם בחורף.' },
      { q: 'מה מומלץ ב-Plus de Vin?', a: 'ה-bar snacks מבוצעים מצוין — **anchovies, gougères, צלחת גבינות**. תזרזו את הסומליר להציע לכם בקבוק שמתאים לטעם — הם מקצוענים.' },
      { q: 'מתי הכי טוב ללכת ל-Plus de Vin?', a: 'ערבי שני-חמישי שקטים יותר. **בקיץ** החצר האחורית מטורפת. **בחורף** המקום הפנימי חמים ואינטימי. תמיד טוב!' },
      { q: 'איפה ממוקם Plus de Vin?', a: 'ב-**Brooklyn**. בדקו ב-Google Maps לפני ההגעה (מספר סניפים מוזכרים). מוגש דרך **Resy** להזמנות.' },
    ],
  },
]

// Step 1: Validate each via Google Places API
async function fetchPlace(query) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_KEY}`
  const res = await fetch(url)
  const data = await res.json()
  if (data.status !== 'OK' || !data.results?.length) {
    return { error: data.status, results: [] }
  }
  const place = data.results[0]
  return {
    place_id: place.place_id,
    name: place.name,
    address: place.formatted_address,
    rating: place.rating,
    user_ratings_total: place.user_ratings_total,
    business_status: place.business_status,
    photo_ref: place.photos?.[0]?.photo_reference,
    location: place.geometry?.location,
  }
}

async function fetchDetails(placeId) {
  const fields = 'opening_hours,formatted_phone_number,website,url'
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_KEY}`
  const res = await fetch(url)
  const data = await res.json()
  return data.result || {}
}

console.log('=== Validating wine bars via Google Places API ===\n')

const validated = []
for (const wb of wineBars) {
  process.stdout.write(`${wb.name_en}... `)
  const place = await fetchPlace(wb.google_query)
  if (place.error || !place.place_id) {
    console.log(`✗ NOT FOUND (${place.error})`)
    continue
  }
  const details = await fetchDetails(place.place_id)
  const photoUrl = place.photo_ref
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${place.photo_ref}&key=${GOOGLE_KEY}`
    : null
  console.log(`✓ ${place.name} | ${place.rating}⭐ (${place.user_ratings_total}) | ${place.business_status || 'OK'}`)
  validated.push({
    ...wb,
    google_place_id: place.place_id,
    address: place.address,
    rating: place.rating,
    review_count: place.user_ratings_total,
    business_status: place.business_status,
    photo_url: photoUrl,
    google_maps_url: details.url || `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
    phone: details.formatted_phone_number || null,
    website: details.website || null,
  })
}

console.log(`\n=== ${validated.length}/${wineBars.length} validated ===\n`)

// Filter out closed
const operating = validated.filter(v => v.business_status !== 'CLOSED_PERMANENTLY')
console.log(`${operating.length} operating, ${validated.length - operating.length} closed\n`)

// Step 2: Insert into Supabase
console.log('=== Inserting into Supabase ===\n')

let inserted = 0
for (const wb of operating) {
  const row = {
    destination_id: 'new-york',
    slug: wb.slug,
    name_he: wb.name_he,
    name_en: wb.name_en,
    excerpt: wb.excerpt,
    description: wb.description,
    full_content: null,
    area: wb.area,
    venue_type: 'wine-bar',
    price_range: null,
    address: wb.address,
    opening_hours: wb.opening_hours,
    google_maps_url: wb.google_maps_url,
    image: wb.photo_url,
    booking_url: null,
    faq: wb.faq,
    meta_title: `${wb.name_he} — בר יין ב${wb.area_en} | ניו יורקר`,
    meta_description: wb.excerpt.slice(0, 155).replace(/\*\*/g, '').replace(/\n/g, ' '),
    published: true,
    featured: false,
    sort_order: 0,
    metadata: {
      type_emoji: wb.type_emoji,
      tickets_url: null,
      instagram_url: wb.instagram_url,
      google_rating: wb.rating,
      google_review_count: wb.review_count,
    },
    phone: wb.phone,
    website: wb.website,
    google_place_id: wb.google_place_id,
    gallery_urls: [],
  }

  const { error } = await supabase
    .from('nightlife')
    .upsert(row, { onConflict: 'destination_id,slug' })

  if (error) {
    console.error(`✗ ${wb.slug}:`, error.message)
  } else {
    console.log(`✓ ${wb.slug} inserted (${wb.area})`)
    inserted++
  }
}

console.log(`\nDone. ${inserted}/${operating.length} wine bars inserted.`)
