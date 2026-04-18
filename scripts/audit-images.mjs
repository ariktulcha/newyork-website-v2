// Categorize image URLs and find broken ones that can be auto-fixed from gallery_urls.
import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n').filter(Boolean)
    .map((l) => l.split('=').map((s) => s.trim()).filter(Boolean))
    .filter((p) => p.length === 2)
)

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
const DESTINATION_ID = env.DESTINATION_ID
const root = new URL('../public', import.meta.url).pathname

for (const table of ['restaurants', 'attractions', 'hotels']) {
  let all = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select('id, slug, name_he, image, gallery_urls')
      .eq('destination_id', DESTINATION_ID)
      .eq('published', true)
      .range(from, from + 999)
    if (error) { console.error(error.message); process.exit(1) }
    all = all.concat(data)
    if (data.length < 1000) break
    from += 1000
  }

  const stats = { external_ok: 0, local_exists: 0, local_missing: 0, empty: 0 }
  const fixable = [] // local-missing with gallery_urls
  const unfixable = [] // local-missing without gallery_urls

  for (const r of all) {
    if (!r.image || String(r.image).trim() === '') {
      stats.empty++
      continue
    }
    const img = String(r.image).trim()
    if (img.startsWith('http')) {
      stats.external_ok++
      continue
    }
    // local path
    const rel = img.startsWith('/') ? img.slice(1) : img
    const abs = join(root, rel)
    if (existsSync(abs)) {
      stats.local_exists++
    } else {
      stats.local_missing++
      const hasGallery = Array.isArray(r.gallery_urls) && r.gallery_urls.length > 0
      if (hasGallery) fixable.push(r)
      else unfixable.push(r)
    }
  }

  console.log(`\n=== ${table} (${all.length}) ===`)
  console.log(`  external (http): ${stats.external_ok}`)
  console.log(`  local קיים:      ${stats.local_exists}`)
  console.log(`  local חסר:       ${stats.local_missing} (fixable: ${fixable.length}, unfixable: ${unfixable.length})`)
  console.log(`  empty:           ${stats.empty}`)
  if (unfixable.length) {
    console.log(`  ללא gallery:`)
    unfixable.forEach((r) => console.log(`    ${r.slug} — ${r.name_he}`))
  }
}
