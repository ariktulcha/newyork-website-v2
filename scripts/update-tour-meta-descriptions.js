#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const metaDescriptions = {
  'manhattan-classic': 'סיור מנהטן קלאסי בניו יורק — טיימס סקוור, סנטרל פארק, אמפייר סטייט בילדינג, סטטו של חירות. סיור מודרך לתיירים עם טיפים ודברים חובה לעשות.',
  'brooklyn-graffiti': 'סיור street art וגרפיטי בברוקלין — וויליאמסבורג, בושוויק, דמבו. גלו את אמנות הרחוב של ניו יורק עם מדריך מומחה בתולדות וטכניקות.',
  'food-tour-nyc': 'סיור אוכל בניו יורק — טעמו מסעדות אמיתיות, חנויות מזון ומיוחדויות מקומיות. למד על תולדות הקולינריה של ניו יורק מדליל מומחה בקולינריה.',
  'index': 'סיורים בניו יורק עם מדריך בעברית — טיולים מונחים למנהטן, ברוקלין, food tour ועוד. כל סיור כולל טיפים מקומיים, עצירות יוניות וסיפורים היסטוריים.',
}

async function updateTourMetaDescriptions() {
  for (const [slug, metaDescription] of Object.entries(metaDescriptions)) {
    let updateFn = supabase
      .from('tours')
      .update({ meta_description: metaDescription })
      .eq('destination_id', 'newyork')

    if (slug !== 'index') {
      updateFn = updateFn.eq('slug', slug)
    } else {
      // For index page, we update the tour list collection itself
      // This might not have a separate row, so let's check
      continue // Skip this for now as it's typically not a tour record
    }

    const { data, error } = await updateFn.select()

    if (error) {
      console.error(`❌ Failed to update tour ${slug}:`, error.message)
    } else {
      console.log(`✅ Updated tour ${slug} (${metaDescription.length} chars)`)
    }
  }
}

updateTourMetaDescriptions().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
