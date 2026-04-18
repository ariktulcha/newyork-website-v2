// Audit + auto-fix 93 blog guides:
// 1. Titles missing "ניו יורק" — append for SEO keyword density
// 2. Meta descriptions missing "ניו יורק" — append a sentence
// 3. Articles without internal links — auto-link to relevant entities (attractions/restaurants/areas/broadway shows)

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env','utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const DEST = 'new-york'
const apply = process.argv.includes('--apply')

const KW = 'ניו יורק'

function fixTitle(name_he, slug) {
  if (!name_he || name_he.includes(KW) || name_he.includes('NY')) return null
  // Insert "בניו יורק" naturally — usually after the main subject
  // Pattern A: "X - Y" or "X — Y" → "X בניו יורק - Y"
  if (name_he.match(/^([^-—]+)\s*[—-]\s*(.+)$/)) {
    const [, head, tail] = name_he.match(/^([^-—]+)\s*[—-]\s*(.+)$/)
    return `${head.trim()} בניו יורק — ${tail.trim()}`
  }
  // Pattern B: starts with verb/question → append "בניו יורק"
  return `${name_he} בניו יורק`
}

function fixMetaDescription(meta, name_he) {
  if (!meta || meta.includes(KW) || meta.includes('NY')) return null
  // Append a contextual sentence
  return `${meta.trim()} מדריך ${KW} מקיף לישראלים — טיפים, מחירים, וכל המידע שאתם צריכים.`
}

function autoLinkContent(text, entities) {
  if (!text) return null
  let modified = text
  let added = 0
  // Sort by name length desc — prefer longer matches first
  const sorted = entities.slice().sort((a, b) => b.name_he.length - a.name_he.length)
  // Track which entities we've already linked to avoid spamming
  const linkedSlugs = new Set()
  // Find existing links to avoid double-linking
  const existingLinks = new Set()
  for (const m of text.matchAll(/\]\(\/([^)]+)\)/g)) existingLinks.add(m[1])

  for (const ent of sorted) {
    if (linkedSlugs.has(ent.slug)) continue
    if (existingLinks.has(`${ent.path}/${ent.slug}`)) continue
    if (ent.name_he.length < 4) continue  // skip very short names (false positives)
    // Match ent.name_he as standalone phrase (not inside an existing link)
    // Use a simple regex — escape special chars
    const safeName = ent.name_he.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`(?<![\\[\\w])${safeName}(?![\\]\\w])`, 'g')
    const matches = [...modified.matchAll(re)]
    if (matches.length === 0) continue
    // Replace ONLY the first occurrence (to avoid spam)
    modified = modified.replace(re, (match, offset) => {
      // Check we're not inside an existing markdown link
      const before = modified.slice(Math.max(0, offset - 3), offset)
      if (before.includes('](')) return match
      if (linkedSlugs.has(ent.slug)) return match
      linkedSlugs.add(ent.slug)
      added++
      return `[${match}](/${ent.path}/${ent.slug})`
    })
    if (added >= 5) break  // cap at 5 internal links per article
  }
  return added > 0 ? modified : null
}

async function loadEntities() {
  const entities = []
  for (const [table, path] of [['attractions','attractions'], ['restaurants','restaurants'], ['areas','areas'], ['guides','blog']]) {
    const { data } = await sb.from(table).select('slug,name_he,name_en,category').eq('destination_id', DEST).eq('published', true)
    for (const r of data || []) {
      if (table === 'attractions' && r.category === 'broadway') {
        entities.push({ slug: r.slug, name_he: r.name_he, name_en: r.name_en, path: 'broadway' })  // route to /broadway/[slug]? actually /attractions/[slug]
        entities.push({ slug: r.slug, name_he: r.name_he, name_en: r.name_en, path: 'attractions' })
      } else {
        entities.push({ slug: r.slug, name_he: r.name_he, name_en: r.name_en, path })
      }
    }
  }
  return entities
}

async function run() {
  const entities = await loadEntities()
  console.log(`Loaded ${entities.length} entities for auto-linking`)

  const { data: guides } = await sb.from('guides').select('id,slug,name_he,full_content,meta_description').eq('destination_id', DEST).eq('published', true)
  console.log(`Auditing ${guides.length} guides (apply=${apply})`)

  const stats = { titlesFixed: 0, metaFixed: 0, linksAdded: 0 }

  for (const g of guides) {
    const updates = {}
    // Don't link the guide back to itself
    const ents = entities.filter(e => !(e.path === 'blog' && e.slug === g.slug))

    const newTitle = fixTitle(g.name_he, g.slug)
    if (newTitle) { updates.name_he = newTitle; stats.titlesFixed++ }

    const newMeta = fixMetaDescription(g.meta_description, g.name_he)
    if (newMeta) { updates.meta_description = newMeta; stats.metaFixed++ }

    const newContent = autoLinkContent(g.full_content, ents)
    if (newContent) { updates.full_content = newContent; stats.linksAdded++ }

    if (Object.keys(updates).length === 0) continue
    const changes = Object.keys(updates).join(',')
    console.log(`  [${g.slug}] ${changes}`)
    if (apply) {
      const { error } = await sb.from('guides').update(updates).eq('id', g.id)
      if (error) console.log('    FAIL:', error.message)
    }
  }
  console.log('\n=== STATS ===')
  console.log('Titles fixed:', stats.titlesFixed)
  console.log('Meta descriptions fixed:', stats.metaFixed)
  console.log('Articles auto-linked:', stats.linksAdded)
}

run()
