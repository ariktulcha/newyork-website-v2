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

for (const table of ['restaurants', 'attractions', 'hotels']) {
  let all = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select('id, slug, name_he, name_en, image, gallery_urls, google_place_id, published')
      .eq('destination_id', DESTINATION_ID)
      .range(from, from + 999)
    if (error) { console.log(error.message); break }
    all = all.concat(data)
    if (data.length < 1000) break
    from += 1000
  }

  const pub = all.filter((r) => r.published)
  const missing = pub.filter((r) => !r.image || String(r.image).trim() === '')
  console.log(`\n=== ${table.toUpperCase()} ===`)
  console.log(`total=${all.length} published=${pub.length} missing_image=${missing.length}`)

  const withGallery = missing.filter((r) => Array.isArray(r.gallery_urls) && r.gallery_urls.length > 0)
  const withoutGallery = missing.filter((r) => !Array.isArray(r.gallery_urls) || r.gallery_urls.length === 0)
  console.log(`  → ${withGallery.length} יש gallery (ניתן להעתיק אוטומטית)`)
  console.log(`  → ${withoutGallery.length} אין gallery`)
  if (withoutGallery.length) {
    withoutGallery.forEach((r) => {
      const gp = r.google_place_id ? 'GP✓' : 'GP✗'
      console.log(`    ${gp} ${r.slug} — ${r.name_he || r.name_en}`)
    })
  }
}
