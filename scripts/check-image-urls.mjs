// Verify every `image` URL is reachable.
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => l.split('=').map((s) => s.trim()).filter(Boolean))
    .filter((p) => p.length === 2)
)

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
const DESTINATION_ID = env.DESTINATION_ID
const tableArg = process.argv[2] || 'restaurants'

let all = []
let from = 0
while (true) {
  const { data, error } = await supabase
    .from(tableArg)
    .select('id, slug, name_he, image, gallery_urls')
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)
    .range(from, from + 999)
  if (error) { console.error(error.message); process.exit(1) }
  all = all.concat(data)
  if (data.length < 1000) break
  from += 1000
}

console.log(`בודק ${all.length} רשומות מ-${tableArg}...`)
const broken = []
let i = 0
for (const row of all) {
  i++
  process.stdout.write(`\r${i}/${all.length}`)
  try {
    const r = await fetch(row.image, { method: 'HEAD', redirect: 'follow' })
    if (!r.ok) broken.push({ ...row, status: r.status })
  } catch (e) {
    broken.push({ ...row, status: 'FETCH_ERR: ' + e.message })
  }
}
console.log(`\n\nשבורים: ${broken.length}`)
broken.forEach((r) => {
  const galleryCount = Array.isArray(r.gallery_urls) ? r.gallery_urls.length : 0
  console.log(`  [${r.status}] ${r.slug} | gallery:${galleryCount} | ${r.name_he}`)
  console.log(`    image: ${(r.image || '').slice(0, 120)}`)
})
