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

const { data, error } = await supabase
  .from('nightlife')
  .select('name_he, name_en, slug, area, venue_type, price_range, published, metadata')
  .eq('destination_id', 'new-york')

if (error) {
  console.error('Error:', error)
  process.exit(1)
}

console.log(`\nTotal nightlife venues for new-york: ${data.length}\n`)

const byType = {}
for (const item of data) {
  const type = item.venue_type || 'NONE'
  if (!byType[type]) byType[type] = []
  byType[type].push(item)
}

console.log('=== By venue_type ===')
for (const [type, items] of Object.entries(byType)) {
  console.log(`\n${type} (${items.length}):`)
  for (const item of items) {
    console.log(`  - ${item.name_he} | ${item.name_en} | area: ${item.area} | published: ${item.published}`)
  }
}

console.log('\n=== Metadata sample ===')
for (const item of data.slice(0, 3)) {
  console.log(`${item.name_he}:`, JSON.stringify(item.metadata, null, 2))
}
