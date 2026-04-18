#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nsfmucsdxhcywisejxxq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'
)
const DESTINATION_ID = 'new-york'

// Simulate current [category].astro filter for each category
const { data: pages } = await supabase
  .from('category_pages')
  .select('slug, source_category_field, source_category_value')
  .eq('destination_id', DESTINATION_ID)
  .eq('source_table', 'restaurants')
  .eq('published', true)

console.log('=== HOW MANY RESTAURANTS DOES EACH CATEGORY RETURN (current filter) ===')
for (const p of pages) {
  const base = supabase
    .from('restaurants')
    .select('slug', { count: 'exact', head: true })
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)

  const q = p.source_category_field === 'area'
    ? base.ilike('area', `%${p.source_category_value}%`)
    : base.eq(p.source_category_field, p.source_category_value)

  const { count, error } = await q
  console.log(`${(count ?? 'ERR').toString().padStart(3)} | ${p.slug.padEnd(18)} | ${p.source_category_field}=${p.source_category_value}${error ? ' | ' + error.message : ''}`)
}

// Check if there's a cuisine_category column
console.log('\n=== SAMPLE RESTAURANT ROW (all columns) ===')
const { data: sample } = await supabase
  .from('restaurants')
  .select('*')
  .eq('destination_id', DESTINATION_ID)
  .limit(1)
console.log(Object.keys(sample?.[0] ?? {}).join(', '))

// Try contains-based filter for cuisine_types
console.log('\n=== CONTAINS-BASED FILTER (cuisine_types @> array) ===')
for (const val of ['italian', 'איטלקי', 'pizza', 'פיצה', 'asian', 'אסיאתי', 'steakhouse', 'אמריקאי / בשרים']) {
  const { count } = await supabase
    .from('restaurants')
    .select('slug', { count: 'exact', head: true })
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)
    .contains('cuisine_types', [val])
  console.log(`${(count ?? 0).toString().padStart(3)} | cuisine_types contains "${val}"`)
}
