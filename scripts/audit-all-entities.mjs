// Comprehensive audit: image presence/validity + text content sufficiency for every entity.
// Reads all entity tables, checks image URLs (HTTP HEAD), local paths (file exists),
// and content length. Outputs per-entity issues sorted by table.

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
const PUBLIC = new URL('../public', import.meta.url).pathname

const TABLES = ['restaurants', 'hotels', 'attractions', 'tours', 'nightlife', 'guides', 'areas']

// content-length thresholds
const MIN_EXCERPT = 60
const MIN_DESC = 200
const MIN_FULL = 400

const HAS_GALLERY = new Set(['restaurants', 'hotels', 'attractions', 'tours', 'nightlife'])
async function fetchAll(table) {
  const cols = HAS_GALLERY.has(table)
    ? 'id, slug, name_he, name_en, image, gallery_urls, excerpt, description, full_content, published'
    : 'id, slug, name_he, name_en, image, excerpt, description, full_content, published'
  let all = []
  let from = 0
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(cols)
      .eq('destination_id', DESTINATION_ID)
      .eq('published', true)
      .range(from, from + 999)
    if (error) { throw new Error(`${table}: ${error.message}`) }
    all = all.concat(data)
    if (data.length < 1000) break
    from += 1000
  }
  return all
}

async function checkUrl(url) {
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(url, { method: 'HEAD', signal: ctrl.signal, redirect: 'follow' })
    clearTimeout(t)
    if (res.ok) return { ok: true, status: res.status }
    // some CDNs don't allow HEAD - try GET range
    if (res.status === 405 || res.status === 403) {
      const ctrl2 = new AbortController()
      const t2 = setTimeout(() => ctrl2.abort(), 8000)
      const res2 = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-1' }, signal: ctrl2.signal, redirect: 'follow' })
      clearTimeout(t2)
      return { ok: res2.ok || res2.status === 206, status: res2.status }
    }
    return { ok: false, status: res.status }
  } catch (e) {
    return { ok: false, status: e.name === 'AbortError' ? 'timeout' : 'error', err: e.message }
  }
}

function textLen(s) {
  if (!s) return 0
  return String(s).replace(/\s+/g, ' ').trim().length
}

function imageStatus(img) {
  if (!img || String(img).trim() === '') return { kind: 'empty' }
  const v = String(img).trim()
  if (v.startsWith('http://') || v.startsWith('https://')) return { kind: 'remote', url: v }
  const rel = v.startsWith('/') ? v.slice(1) : v
  const abs = join(PUBLIC, rel)
  return { kind: 'local', path: v, exists: existsSync(abs) }
}

const summary = {}

for (const table of TABLES) {
  process.stderr.write(`\n[${table}] fetching...\n`)
  let rows
  try { rows = await fetchAll(table) }
  catch (e) {
    summary[table] = { error: e.message }
    continue
  }
  process.stderr.write(`[${table}] ${rows.length} rows; checking images...\n`)

  const issues = []
  // Limit concurrency for HTTP checks
  const CONC = 12
  let idx = 0
  async function worker() {
    while (idx < rows.length) {
      const i = idx++
      const r = rows[i]
      const img = imageStatus(r.image)
      const probs = []
      if (img.kind === 'empty') probs.push('NO_IMAGE')
      else if (img.kind === 'local' && !img.exists) probs.push(`LOCAL_MISSING:${img.path}`)
      else if (img.kind === 'remote') {
        const res = await checkUrl(img.url)
        if (!res.ok) probs.push(`REMOTE_BAD:${res.status}`)
      }

      const tExcerpt = textLen(r.excerpt)
      const tDesc = textLen(r.description)
      const tFull = textLen(r.full_content)
      const totalText = tExcerpt + tDesc + tFull

      if (totalText < MIN_DESC + MIN_EXCERPT) probs.push(`THIN_TEXT(total=${totalText})`)
      else {
        if (tExcerpt < MIN_EXCERPT) probs.push(`SHORT_EXCERPT(${tExcerpt})`)
        if (tDesc < MIN_DESC && tFull < MIN_FULL) probs.push(`SHORT_BODY(desc=${tDesc},full=${tFull})`)
      }

      // gallery check
      const gallerySize = Array.isArray(r.gallery_urls) ? r.gallery_urls.length : 0

      if (probs.length) {
        issues.push({ slug: r.slug, name: r.name_he || r.name_en, gallerySize, probs })
      }
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker))

  summary[table] = { total: rows.length, issuesCount: issues.length, issues }
  process.stderr.write(`[${table}] ${issues.length}/${rows.length} with issues\n`)
}

// Pretty report
console.log('\n================ AUDIT SUMMARY ================')
for (const [t, s] of Object.entries(summary)) {
  if (s.error) { console.log(`\n## ${t}: ERROR ${s.error}`); continue }
  console.log(`\n## ${t}: ${s.issuesCount}/${s.total} need attention`)
  for (const i of s.issues) {
    const fixable = i.probs.some((p) => p.startsWith('LOCAL_MISSING') || p === 'NO_IMAGE' || p.startsWith('REMOTE_BAD'))
      ? (i.gallerySize > 0 ? ' [gallery-fixable]' : '')
      : ''
    console.log(`  - ${i.slug} (${i.name})${fixable}`)
    for (const p of i.probs) console.log(`      • ${p}`)
  }
}

// Machine-readable JSON snapshot
import { writeFileSync } from 'fs'
writeFileSync(new URL('./audit-results.json', import.meta.url), JSON.stringify(summary, null, 2))
console.log('\n→ saved scripts/audit-results.json')
