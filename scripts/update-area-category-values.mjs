#!/usr/bin/env node
// Updates source_category_value on existing category_pages (areas) to include
// all neighborhood names so the /restaurants/[borough] pages catch sub-area restaurants.
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nsfmucsdxhcywisejxxq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'
)
const DESTINATION_ID = 'new-york'

const updates = [
  {
    slug: 'manhattan',
    source_category_value: [
      'מנהטן', // catches "מנהטן/ Manhattan"
      'SoHo', 'Lower East Side', 'East Village', 'NoLita',
      'Upper West Side', 'Upper East Side', 'Midtown', 'Midtown East',
      'Greenwich Village', 'East Harlem', 'Murray Hill', 'Chelsea', 'West Village',
    ].join('|'),
  },
  {
    slug: 'brooklyn',
    source_category_value: [
      'ברוקלין', // catches "ברוקלין/ Brooklyn"
      'Williamsburg', 'DUMBO', 'Park Slope', 'Brooklyn Heights',
      'Bushwick', 'Carroll Gardens', 'Boerum Hill', 'Midwood',
      'Cobble Hill', 'Crown Heights', 'Greenpoint', 'Bay Ridge',
    ].join('|'),
  },
  {
    slug: 'queens',
    source_category_value: [
      'קווינס', // catches "קווינס/ Queens"
      'Astoria', 'Flushing', 'Long Island City', 'Jackson Heights', 'Corona',
      'Forest Hills', 'Rego Park',
    ].join('|'),
  },
  {
    slug: 'bronx',
    source_category_value: [
      'הברונקס', 'Bronx',
      'Arthur Avenue', 'Belmont', 'Riverdale',
    ].join('|'),
  },
  {
    slug: 'staten-island',
    source_category_value: [
      'סטייטן איילנד', 'Staten Island',
    ].join('|'),
  },
]

for (const u of updates) {
  const { error, data } = await supabase
    .from('category_pages')
    .update({ source_category_value: u.source_category_value })
    .eq('destination_id', DESTINATION_ID)
    .eq('source_table', 'restaurants')
    .eq('slug', u.slug)
    .select('slug, source_category_value')
  if (error) {
    console.error(`✗ ${u.slug}: ${error.message}`)
  } else {
    console.log(`✓ ${u.slug}: updated → ${data?.[0]?.source_category_value?.slice(0, 80)}...`)
  }
}

console.log('\n=== VERIFY: new counts per area category ===')
const { data: pages } = await supabase
  .from('category_pages')
  .select('slug, source_category_field, source_category_value')
  .eq('destination_id', DESTINATION_ID)
  .eq('source_table', 'restaurants')
  .eq('source_category_field', 'area')
  .eq('published', true)

for (const p of pages) {
  const values = p.source_category_value.split('|').map(v => v.trim())
  const orClause = values.map(v => `area.ilike.%${v}%`).join(',')
  const { count } = await supabase
    .from('restaurants')
    .select('slug', { count: 'exact', head: true })
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)
    .or(orClause)
  console.log(`${(count ?? 0).toString().padStart(3)} | ${p.slug}`)
}
