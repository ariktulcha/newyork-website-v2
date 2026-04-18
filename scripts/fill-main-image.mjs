// Replace `image` with gallery_urls[0] when current image is empty, local-missing,
// or (with --check-remote) a remote URL that returns non-2xx / times out.
// Saves the broken URL to metadata.original_image as a backup.
// Usage:
//   node scripts/fill-main-image.mjs [--apply]                  # local + empty only
//   node scripts/fill-main-image.mjs --check-remote [--apply]   # also probe http(s)

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
const apply = process.argv.includes('--apply')
const checkRemote = process.argv.includes('--check-remote')
const publicRoot = new URL('../public', import.meta.url).pathname

async function probeUrl(url) {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(url, { method: 'HEAD', signal: ctrl.signal, redirect: 'follow' })
    clearTimeout(t)
    if (res.ok) return true
    if (res.status === 405 || res.status === 403) {
      const ctrl2 = new AbortController()
      const t2 = setTimeout(() => ctrl2.abort(), 8000)
      const res2 = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-1' }, signal: ctrl2.signal, redirect: 'follow' })
      clearTimeout(t2)
      return res2.ok || res2.status === 206
    }
    return false
  } catch { return false }
}

async function classify(img) {
  if (!img || String(img).trim() === '') return 'empty'
  const s = String(img).trim()
  if (s.startsWith('http')) {
    if (!checkRemote) return 'ok'
    const ok = await probeUrl(s)
    return ok ? 'ok' : 'remote-bad'
  }
  const rel = s.startsWith('/') ? s.slice(1) : s
  return existsSync(join(publicRoot, rel)) ? 'ok' : 'local-missing'
}

const TABLES = ['restaurants', 'attractions', 'hotels', 'nightlife', 'tours']
const CONC = 12

for (const table of TABLES) {
  let all = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select('id, slug, image, gallery_urls, metadata')
      .eq('destination_id', DESTINATION_ID)
      .eq('published', true)
      .range(from, from + 999)
    if (error) { console.error(`${table}: ${error.message}`); process.exit(1) }
    all = all.concat(data)
    if (data.length < 1000) break
    from += 1000
  }

  process.stderr.write(`[${table}] classifying ${all.length}…\n`)
  let idx = 0
  const flagged = []
  await Promise.all(Array.from({ length: CONC }, async () => {
    while (idx < all.length) {
      const r = all[idx++]
      const status = await classify(r.image)
      if (status !== 'ok') { r._status = status; flagged.push(r) }
    }
  }))

  const fixable = flagged.filter((r) => Array.isArray(r.gallery_urls) && r.gallery_urls.length > 0)
  const stuck = flagged.filter((r) => !Array.isArray(r.gallery_urls) || r.gallery_urls.length === 0)

  console.log(`\n=== ${table} ===`)
  console.log(`broken: ${flagged.length} | fixable: ${fixable.length} | stuck (no gallery): ${stuck.length}`)
  if (stuck.length) for (const r of stuck) console.log(`  ⚠ stuck: ${r.slug} (${r._status})`)

  let ok = 0
  for (const row of fixable) {
    if (apply) {
      const newMeta = { ...(row.metadata && typeof row.metadata === 'object' ? row.metadata : {}) }
      if (!newMeta.original_image) newMeta.original_image = row.image
      const { error } = await supabase
        .from(table)
        .update({ image: row.gallery_urls[0], metadata: newMeta })
        .eq('id', row.id)
      if (error) { console.log(`  ✗ ${row.slug}: ${error.message}`); continue }
    }
    ok++
    if (!apply) console.log(`  → ${row.slug} (${row._status}) → ${row.gallery_urls[0].slice(0, 80)}…`)
  }
  console.log(`${apply ? 'עודכנו' : 'יעודכנו'}: ${ok}`)
}
if (!apply) console.log('\n(dry-run — הרץ עם --apply)')
