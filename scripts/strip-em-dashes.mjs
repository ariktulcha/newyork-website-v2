// Replace em-dashes (—) with regular hyphen (-) in full_content, description, excerpt
// across all tables I updated. Em-dashes are an "AI tell" per hebrew-article-writer skill.
// Usage: node scripts/strip-em-dashes.mjs [--apply]
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n').filter(Boolean)
    .map((l) => l.split('=').map((s) => s.trim()).filter(Boolean))
    .filter((p) => p.length === 2)
)
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
const DESTINATION_ID = env.DESTINATION_ID
const apply = process.argv.includes('--apply')

const EM = /—/g  // em-dash only, keep regular hyphen
// Replace em-dash with " - " (space-hyphen-space) for readability
const REPLACEMENT = ' - '

const TABLES = ['restaurants', 'hotels', 'attractions', 'tours', 'nightlife', 'guides', 'areas']
let totalTouched = 0, totalChanges = 0

for (const table of TABLES) {
  let from = 0, all = []
  while (true) {
    const { data, error } = await sb.from(table)
      .select('id, slug, excerpt, description, full_content')
      .eq('destination_id', DESTINATION_ID)
      .eq('published', true)
      .range(from, from + 999)
    if (error) { console.error(table, error.message); break }
    all = all.concat(data); if (data.length < 1000) break; from += 1000
  }

  let touched = 0, changes = 0
  for (const r of all) {
    const patch = {}
    for (const field of ['excerpt', 'description', 'full_content']) {
      const v = r[field]
      if (v && typeof v === 'string' && EM.test(v)) {
        patch[field] = v.replace(EM, REPLACEMENT).replace(/  +/g, ' ')
        changes += (v.match(EM) || []).length
      }
    }
    if (Object.keys(patch).length > 0) {
      touched++
      if (apply) {
        const { error } = await sb.from(table).update(patch).eq('id', r.id)
        if (error) console.error(`  ✗ ${table}/${r.slug}: ${error.message}`)
      }
    }
  }
  console.log(`${table.padEnd(14)} touched=${touched}/${all.length} em-dashes=${changes}`)
  totalTouched += touched
  totalChanges += changes
}

console.log(`\nTotal: ${totalTouched} rows touched, ${totalChanges} em-dashes replaced`)
if (!apply) console.log('(dry-run — run with --apply)')
