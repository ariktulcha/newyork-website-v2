#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const metaDescriptions = {
  // Category landing pages
  '5-stars': 'מלונות 5 כוכבים בניו יורק — אתרים יוקרתיים עם שירות מצוין, מטבח עולמי וחדרים פאר. בחרו את המלון הטוב ביותר עבור נסיעה יוקרתית בניו יורק.',
  'luxury': 'מלונות יוקרה בניו יורק — אתרים חמישה כוכבים עם מיתקנים פרימיום, וספא, ובר קוקטיילים. חוויה בלתי נשכחת של הנוח הגבוה ביותר.',
  'family': 'מלונות משפחתיים בניו יורק — חדרים גדולים, בריכות, מסעדות טובות לילדים וחדרי משחקים. מקומות מעולים לטיול משפחתי בניו יורק.',

  // Specific hotels (sample - we'll update the ones with low meta descriptions)
  '1-hotel-brooklyn-bridge': '1 Hotels Brooklyn Bridge — מלון עכשוי ידידותי לסביבה עם חדרים מינימליסטיים וגינה על הגג. ממוקם בדמבו עם נוף מנהטן.',
  'ace-hotel-brooklyn': 'Ace Hotel Brooklyn — מלון טרנדי בוויליאמסבורג עם ביתן אמנות, מסעדות טובות וחדרי קבוצות. מושלם ללונים צעירים ותרבותיים.',
}

async function updateHotelMetaDescriptions() {
  console.log('Fetching hotels with short meta descriptions...')

  const { data: hotels, error: fetchError } = await supabase
    .from('hotels')
    .select('id, slug, name_he, meta_description')
    .eq('destination_id', 'newyork')
    .eq('published', true)

  if (fetchError) {
    console.error('Error fetching hotels:', fetchError.message)
    return
  }

  console.log(`Found ${hotels?.length || 0} hotels`)

  // Update the ones we have explicit descriptions for
  for (const [slug, metaDescription] of Object.entries(metaDescriptions)) {
    const { data, error } = await supabase
      .from('hotels')
      .update({ meta_description: metaDescription })
      .eq('slug', slug)
      .eq('destination_id', 'newyork')
      .select()

    if (error) {
      console.error(`❌ Failed to update hotel ${slug}:`, error.message)
    } else if (data && data.length > 0) {
      console.log(`✅ Updated ${slug} (${metaDescription.length} chars)`)
    } else {
      console.log(`⚠️  No hotel found with slug: ${slug}`)
    }
  }
}

updateHotelMetaDescriptions().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
