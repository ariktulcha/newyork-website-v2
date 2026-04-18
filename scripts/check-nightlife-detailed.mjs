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
  .select('*')
  .eq('destination_id', 'new-york')

if (error) { console.error(error); process.exit(1) }

console.log(`Total: ${data.length}`)
console.log('\nColumns:', Object.keys(data[0] || {}).join(', '))

console.log('\n=== Full sample entry ===')
console.log(JSON.stringify(data[0], null, 2))

console.log('\n=== Full excerpts per venue ===')
for (const item of data) {
  console.log(`\n${item.name_he} (${item.venue_type})`)
  console.log(`  excerpt: ${item.excerpt?.substring(0, 150)}`)
  console.log(`  tags: ${JSON.stringify(item.tags)}`)
}
