#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nsfmucsdxhcywisejxxq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'
)
const DESTINATION_ID = 'new-york'

const { data: restaurants } = await supabase
  .from('restaurants')
  .select('slug, area, cuisine_types')
  .eq('destination_id', DESTINATION_ID)
  .eq('published', true)

const areas = {}
const cuisines = {}
for (const r of restaurants || []) {
  const key = r.area || '(null)'
  areas[key] = (areas[key] || 0) + 1
  for (const c of r.cuisine_types || []) {
    cuisines[c] = (cuisines[c] || 0) + 1
  }
}

console.log('=== AREAS (count) ===')
Object.entries(areas).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`${v}\t${k}`))

console.log('\n=== CUISINES (count) ===')
Object.entries(cuisines).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`${v}\t${k}`))

console.log(`\n=== TOTAL RESTAURANTS: ${restaurants?.length || 0} ===`)

const { data: pages } = await supabase
  .from('category_pages')
  .select('slug, title, source_category_field, source_category_value, sort_order, published')
  .eq('destination_id', DESTINATION_ID)
  .eq('source_table', 'restaurants')
  .order('sort_order')

console.log('\n=== EXISTING category_pages (restaurants) ===')
for (const p of pages || []) {
  console.log(`${p.published ? '✓' : '✗'}  ${p.slug.padEnd(20)} ${p.source_category_field}=${p.source_category_value}`)
}
console.log(`\nTotal category_pages: ${pages?.length || 0}`)
