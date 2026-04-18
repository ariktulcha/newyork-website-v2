export type TripDuration = 3 | 5 | 7
export type TripStyle = 'classic' | 'foodie' | 'culture' | 'family' | 'budget'

export interface DayPlan {
  day: number
  title: string
  morning: string
  afternoon: string
  evening: string
  tip: string
  tourLink?: { text: string; href: string }
}

export const STYLE_META: Record<TripStyle, { label: string; emoji: string; desc: string }> = {
  classic: { label: 'קלאסי', emoji: '📸', desc: 'כל האטרקציות המרכזיות' },
  foodie: { label: 'אוכל', emoji: '🍽️', desc: 'טעימות, מסעדות ושווקים' },
  culture: { label: 'תרבות ואמנות', emoji: '🎭', desc: 'מוזיאונים, ברודווי וגלריות' },
  family: { label: 'משפחות', emoji: '👨‍👩‍👧', desc: 'פעילויות לילדים ומבוגרים' },
  budget: { label: 'חסכוני', emoji: '💸', desc: 'חוויות מדהימות בתקציב נמוך' },
}

const classic3: DayPlan[] = [
  {
    day: 1,
    title: 'מנהטן הקלאסית',
    morning: 'התחילו בטיימס סקוור וספגו את האנרגיה. משם לרוקפלר סנטר ועלו ל-Top of the Rock — הנוף הכי יפה של העיר.',
    afternoon: 'ירדו ברגל לגראנד סנטרל (אל תפספסו את התקרה!) ומשם לאמפייר סטייט. אחרי — פליטאיירון וברודווי.',
    evening: 'הצגת ברודווי! הזמינו מראש או נסו TKTS בטיימס סקוור — עד 50% הנחה.',
    tip: 'הסיור שלנו "מנהטן כמו מקומי" מכסה בדיוק את המסלול הזה.',
    tourLink: { text: 'הצטרפו לסיור מנהטן', href: '/tours/manhattan-classic' },
  },
  {
    day: 2,
    title: 'סנטרל פארק ו-Upper West Side',
    morning: 'סנטרל פארק — Bethesda Fountain, Bow Bridge, Strawberry Fields. אל תנסו לכסות הכל.',
    afternoon: 'מוזיאון הטבע (AMNH) — 2–3 שעות מינימום. אחרי — טיילו ב-Upper West Side.',
    evening: 'ארוחה ליד Lincoln Center. אוהבי ג׳אז — Jazz at Lincoln Center.',
    tip: 'הזמנה מראש למוזיאון הטבע חוסכת תורים ארוכים.',
  },
  {
    day: 3,
    title: 'ברוקלין ו-Lower Manhattan',
    morning: 'גשר ברוקלין מצד ברוקלין (תחנת York Street) לכיוון מנהטן + DUMBO לצילומים.',
    afternoon: 'אנדרטת 9/11, Wall Street, Battery Park, ומעבורת סטטן איילנד החינמית לנוף לפסל החירות.',
    evening: 'SoHo + ארוחה בליטל איטלי או צ׳יינה טאון.',
    tip: 'הסיור שלנו "ברוקלין האמיתית" לוקח אתכם למקומות שלא תמצאו לבד.',
    tourLink: { text: 'הצטרפו לסיור ברוקלין', href: '/tours/brooklyn-graffiti' },
  },
]

const classic5: DayPlan[] = [
  ...classic3,
  {
    day: 4,
    title: 'High Line, Chelsea ו-Greenwich Village',
    morning: 'High Line מ-34th דרומה. ב-Chelsea Market — אוכל ופודי ווייב.',
    afternoon: 'Greenwich Village + Washington Square Park. הכניסו West Village לרשימה.',
    evening: 'ערב קטן בסצינה המקומית — בר יין או ג׳אז אינטימי ב-Village.',
    tip: 'יום חול עדיף — Chelsea Market הרבה פחות עמוס.',
  },
  {
    day: 5,
    title: 'מוזיאונים ו-Upper East Side',
    morning: 'The Met — 3 שעות לפחות. האגף המצרי והאמנות האירופאית חובה.',
    afternoon: 'Guggenheim או MoMA (תלוי טעם). טיול ב-Madison Ave.',
    evening: 'ארוחת סיום באחת המסעדות של Upper East Side.',
    tip: 'The Met עולה $30 לתיירים — כרטיס נכנס לכל האגפים באותו יום.',
  },
]

const classic7: DayPlan[] = [
  {
    day: 1,
    title: 'נחיתה והתאקלמות — מידטאון',
    morning: 'אחרי הנחיתה — למלון, מזוודות, וצאו לרחובות. התחילו בטיימס סקוור.',
    afternoon: 'רוקפלר סנטר ו-Top of the Rock — הנוף מלמעלה ייתן את ה-wow הראשון.',
    evening: 'פיצה ניו יורקית אמיתית — Joe׳s Pizza או Prince Street Pizza.',
    tip: 'אל תנסו לעשות הכל ביום הראשון. ג׳ט לג מתיש — קחו את זה בקלילות.',
  },
  ...classic5.slice(0, 2).map((d, i) => ({ ...d, day: i + 2 })),
  { ...classic5[2], day: 4 },
  { ...classic5[3], day: 5 },
  { ...classic5[4], day: 6 },
  {
    day: 7,
    title: 'יום חופשי + יציאה',
    morning: 'שחזרו את המקום האהוב. קפה אחרון ב-West Village.',
    afternoon: 'שופינג אחרון ב-SoHo / Fifth Avenue או ב-Woodbury Common Outlets.',
    evening: 'ארוחת פרידה עם נוף — Peak ב-Hudson Yards או The View ב-Times Square.',
    tip: 'Woodbury ~שעה צפונה — נסיעה שווה אם הזמן מאפשר.',
  },
]

const foodie3: DayPlan[] = [
  {
    day: 1,
    title: 'Lower East Side + צ׳יינה טאון',
    morning: 'Russ & Daughters לבאגל סלמון מושלם. Katz׳s Deli לסנדוויץ׳ פסטרמה אגדי.',
    afternoon: 'צ׳יינה טאון — Xi׳an Famous Foods, Joe׳s Shanghai (dumplings), Prosperity Dumpling.',
    evening: 'ברי יין קטנים ב-LES או קוקטיילים ב-Attaboy.',
    tip: 'Katz׳s — לשבת בצד עם מלצר, לא בצד self-service.',
    tourLink: { text: 'סיור אוכל NYC', href: '/tours/food-tour-nyc' },
  },
  {
    day: 2,
    title: 'ברוקלין פודי',
    morning: 'Smorgasburg (סופ״ש) ב-Williamsburg / Prospect Park — 100+ דוכנים.',
    afternoon: 'Williamsburg + Greenpoint — קפה קראפט, Peter Luger לסטייק בוער.',
    evening: 'DUMBO — Juliana׳s Pizza (תחרות Lombardi על הפיצה הראשונה).',
    tip: 'Peter Luger — רק cash או כרטיס Luger׳s. הזמנה חובה.',
  },
  {
    day: 3,
    title: 'מידטאון ו-Hell׳s Kitchen',
    morning: 'Chelsea Market — Los Tacos No.1, Fat Witch, Jacques Torres.',
    afternoon: 'Hell׳s Kitchen — Gazala׳s (ישראלי), Totto Ramen, Los Mariscos.',
    evening: 'קוקטייל ב-Please Don׳t Tell (PDT) או ארוחה ב-Le Bernardin.',
    tip: 'Los Tacos No.1 — קופה בלבד, נפתח ב-11 ועמוס כל היום.',
  },
]

const foodie5: DayPlan[] = [
  ...foodie3,
  {
    day: 4,
    title: 'Italian New York',
    morning: 'Ferrara׳s Bakery בליטל איטלי לקרנולי קלאסי.',
    afternoon: 'Di Fara Pizza בברוקלין (דום מימון עצמי עושה אחת-אחת).',
    evening: 'Carbone ב-Village — פסטה vodka אגדית (הזמנה 4 שבועות מראש).',
    tip: 'Carbone סגור בשני וראשון. Resy פותח הזמנות ב-10 בבוקר.',
  },
  {
    day: 5,
    title: 'Queens — מטבח עולמי',
    morning: 'Flushing (Queens) — לב צ׳יינה טאון האמיתי של NYC.',
    afternoon: 'Astoria ליוון — Agnanti, Taverna Kyclades לדגים.',
    evening: 'Jackson Heights — אוכל אינדי ודרום-אמריקני. Jackson Diner חובה.',
    tip: 'Queens סאבוויי 7 היא "המטבח בסאבוויי" — כל תחנה מדינה.',
  },
]

const foodie7: DayPlan[] = [
  ...foodie5,
  {
    day: 6,
    title: 'Bronx + Arthur Avenue',
    morning: 'Arthur Avenue — ליטל איטלי האמיתית (יותר מזו של מנהטן).',
    afternoon: 'Mike׳s Deli, Casa Della Mozzarella, Madonia Bakery.',
    evening: 'ארוחת סיום ב-Dominick׳s — אין תפריט, השף מחליט.',
    tip: 'Arthur Avenue פחות תיירותית — שווה את הנסיעה.',
  },
  {
    day: 7,
    title: 'Brunch + ארוחת פרידה',
    morning: 'Brunch ב-West Village — Jack׳s Wife Freda או Buvette.',
    afternoon: 'Eataly (Flatiron) — שוק איטלקי ענק, מסעדות בתוך.',
    evening: 'ארוחת פרידה ב-Le Bernardin / Eleven Madison Park / Gramercy Tavern.',
    tip: 'מסעדות מישלן — 2–3 חודשים מראש ב-Resy/OpenTable.',
  },
]

const culture3: DayPlan[] = [
  {
    day: 1,
    title: 'מוזיאוני Upper East Side',
    morning: 'The Met — 4 שעות. האגף המצרי + האמנות האירופאית חובה.',
    afternoon: 'Guggenheim — אדריכלות Frank Lloyd Wright + תערוכות מתחלפות.',
    evening: 'ברודווי! Hamilton / Lion King / Wicked.',
    tip: 'TodayTix / TKTS לכרטיסי last-minute ב-30–50% הנחה.',
  },
  {
    day: 2,
    title: 'MoMA ו-Midtown אמנות',
    morning: 'MoMA — Van Gogh, Warhol, Picasso. תכננו 3 שעות.',
    afternoon: 'Rockefeller Center — אמנות ב-Lobby + Top of the Rock.',
    evening: 'Off-Broadway או קונצרט קלאסי ב-Carnegie Hall / Lincoln Center.',
    tip: 'MoMA חינם חמישי 16:00–20:00 — אבל עמוס מאוד.',
  },
  {
    day: 3,
    title: 'Downtown + Brooklyn גלריות',
    morning: 'Whitney Museum (Meatpacking) — אמנות אמריקאית.',
    afternoon: 'Chelsea Gallery District — עשרות גלריות חינמיות ברחובות 20–27.',
    evening: 'Brooklyn Academy of Music (BAM) — תיאטרון אוונגרדי וקולנוע.',
    tip: 'רוב הגלריות ב-Chelsea סגורות ביום שני.',
  },
]

const culture5: DayPlan[] = [...culture3, classic5[3], classic5[4]]
const culture7: DayPlan[] = [...culture5, foodie7[5], foodie7[6]]

const family3: DayPlan[] = [
  {
    day: 1,
    title: 'טיימס סקוור ומידטאון לילדים',
    morning: 'Times Square + M&M׳s World + Hershey׳s (חינם לראייה, מתוק לילדים).',
    afternoon: 'American Girl Place / Lego Store / Nintendo NY.',
    evening: 'הצגת ברודווי מותאמת לילדים — Lion King / Aladdin / Frozen.',
    tip: 'הזמנת ברודווי לילדים — בחרו אזור Orchestra Center לחוויה הכי טובה.',
  },
  {
    day: 2,
    title: 'סנטרל פארק ומוזיאון הטבע',
    morning: 'Central Park Zoo + Bethesda Fountain + Alice in Wonderland statue.',
    afternoon: 'מוזיאון הטבע (AMNH) — דינוזאורים, כוכבים, לויתן הכחול הענק.',
    evening: 'גלידה ב-Serendipity 3 (Frozen Hot Chocolate).',
    tip: 'השכירו סירה ב-Central Park Lake — חוויה כיפית ולא יקרה.',
  },
  {
    day: 3,
    title: 'פסל החירות וברוקלין',
    morning: 'מעבורת לפסל החירות (הזמנה מראש ל-Crown Access).',
    afternoon: 'Brooklyn Bridge Park + Jane׳s Carousel + DUMBO לצילומים.',
    evening: 'Grimaldi׳s Pizza מתחת לגשר.',
    tip: 'Crown Access מוזמן 3 חודשים מראש — ולא ביום הגעה.',
  },
]

const family5: DayPlan[] = [
  ...family3,
  {
    day: 4,
    title: 'Coney Island + Luna Park',
    morning: 'נסיעת Q-train ל-Coney Island — Cyclone, Wonder Wheel, Luna Park.',
    afternoon: 'Nathan׳s Hot Dog (אגדי). חוף + Boardwalk.',
    evening: 'New York Aquarium (במקום).',
    tip: 'Luna Park פתוח רק אפריל–ספטמבר. בחורף — רק Boardwalk וה-Aquarium.',
  },
  {
    day: 5,
    title: 'Intrepid Museum + Hudson Yards',
    morning: 'Intrepid Sea, Air & Space — מטוסים, צוללת, ספינה. מגניב במיוחד לבנים.',
    afternoon: 'Edge Observation Deck ב-Hudson Yards — רצפת זכוכית.',
    evening: 'Gazillion Bubble Show Off-Broadway — לגיל גן-כיתה ב׳.',
    tip: 'Intrepid — שורדי הזמנה מקוונת דילגו על התור הארוך.',
  },
]

const family7: DayPlan[] = [...family5, classic7[5], family3[2]]

const budget3: DayPlan[] = [
  {
    day: 1,
    title: 'ניו יורק חינמית — מנהטן',
    morning: 'Staten Island Ferry — חינם, 25 דקות, נוף מדהים לפסל החירות.',
    afternoon: 'High Line (חינם) + Chelsea Market (לא חייבים לאכול).',
    evening: 'Times Square בערב + TKTS להנחת last-minute.',
    tip: 'Grand Central — גם בלי לנסוע שווה לבקר בתקרה ובקומת המטבחים.',
  },
  {
    day: 2,
    title: 'פארקים ומוזיאונים חינמיים',
    morning: 'Central Park — חינם. Bethesda Fountain, Bow Bridge, The Mall.',
    afternoon: 'מוזיאון Met — pay-what-you-wish לתושבי NY בלבד, $30 לתיירים.',
    evening: 'MoMA בחמישי אחה״צ — חינם 16:00–20:00.',
    tip: 'NYC Parks — עשרות פארקים חינמיים עם אירועים בקיץ.',
  },
  {
    day: 3,
    title: 'ברוקלין — אמנות רחוב + חוף',
    morning: 'גשר ברוקלין ברגל — חינם ומדהים.',
    afternoon: 'Bushwick Open Studios / Graffiti tour עצמי סביב Troutman St.',
    evening: 'שקיעה ב-Brooklyn Bridge Park — הכי מצולמת בניו יורק.',
    tip: 'אפליקציות חינמיות עם מסלולי הליכה — Junket / GPSmyCity.',
  },
]

const budget5: DayPlan[] = [...budget3, classic5[3], culture3[2]]
const budget7: DayPlan[] = [...budget5, budget3[1], family3[1]]

export const ITINERARIES: Record<string, DayPlan[]> = {
  'classic-3': classic3, 'classic-5': classic5, 'classic-7': classic7,
  'foodie-3': foodie3, 'foodie-5': foodie5, 'foodie-7': foodie7,
  'culture-3': culture3, 'culture-5': culture5, 'culture-7': culture7,
  'family-3': family3, 'family-5': family5, 'family-7': family7,
  'budget-3': budget3, 'budget-5': budget5, 'budget-7': budget7,
}
