#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const metaDescriptions = {
  chinatown: 'צ\'ינאטאון בניו יורק: שכונה סינית עתיקה במנהטן תחתון עם מסעדות אמיתיות, רחוקות, בתימות וחנויות. גלו תרבות סינית אמיתית, אוכל כשר סיני וחיים מקומיים.',
  dumbo: 'דאמבו (Down Under the Manhattan Bridge Overpass) — שכונה מהודרת בברוקלין עם אמנות רחוב, גלריות, מסעדות יוקרה ותצפיות מדהימות על מנהטן. מקום אידיאלי לצילום וחיי לילה.',
  'lower-east-side': 'Lower East Side — שכונה היסטורית בניו יורק עם תיאטרונים, גלריות, מסעדות וחנויות וינטג\'. מרכז התרבות היהודית בנמלט שלו, עם תולדות עשירות וחיים מקומיים תוססים.',
  soho: 'סוהו בניו יורק — שכונת אמנות וחנויות עם בתים עתיקים, גלריות, מסעדות יוקרה וחנויות מעצבים. אווירה מתוחכמת ורומנטית, מושלמת לטיולי קניות וערב מרוח.',
  'greenwich-village': 'גרינוויץ\' ויליג\' — שכונת התרבות וההיסטוריה בניו יורק, עם ספרייה עתיקה, בתים מנופים, מסעדות קסומות וחוקים יוניים. מקום הולדת הקוולס וקצב חיים ארטיסטי.',
  harlem: 'הארלם בניו יורק — שכונה עם תיאטרונים ימיים, מוזיקה, אמנות אפריקאית-אמריקאית וההיסטוריה שלה. צרו קשר בווטסאפ כדי לדעת על סיורים היסטוריים וחוויות תרבותיות.',
  williamsburg: 'וויליאמסבורג בברוקלין — שכונה צעירה עם גלריות, מסעדות טרנדיות, בירה מקומית וחיי לילה חיים. אדריכלות הגנוזה וקהילה יצירתית הופכים אותה למקום שחייבים לבקר.',
  'upper-west-side': 'Upper West Side בניו יורק — שכונה משפחתית שקטה עם מוזיאונים, סנטרל פארק, מסעדות משפחתיות ובתים דירות מתוקים. מושלמת למשפחות וזוגות המחפשים הקשה יותר מקים.',
}

async function updateAreaMetaDescriptions() {
  for (const [slug, metaDescription] of Object.entries(metaDescriptions)) {
    const { data, error } = await supabase
      .from('areas')
      .update({ meta_description: metaDescription })
      .eq('slug', slug)
      .eq('destination_id', 'newyork')
      .select()

    if (error) {
      console.error(`❌ Failed to update ${slug}:`, error.message)
    } else {
      console.log(`✅ Updated ${slug} (${metaDescription.length} chars)`)
    }
  }
}

updateAreaMetaDescriptions().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
