// Parse FAQ blocks from full_content markdown and save to `faq` JSONB column.
// Targets only entities I expanded in 2026-04-14 (listed in audit-results.json + attractions).
// Usage: node scripts/parse-faqs-to-jsonb.mjs [--apply]
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

/**
 * Parse FAQ from markdown. Format I used consistently:
 *   ## שאלות נפוצות על X
 *   (blank)
 *   **Q?**
 *   A.
 *   (blank)
 *   **Q?**
 *   A.
 * Returns array of {q, a} pairs, or null if no FAQ found.
 */
function parseFaqs(markdown) {
  if (!markdown) return null
  // Find FAQ section start (accepts both em-dash and hyphen variants)
  const faqStart = markdown.search(/^## שאלות נפוצות/m)
  if (faqStart === -1) return null
  const faqSection = markdown.substring(faqStart)
  // Get only the FAQ section (until next H2 or end of string)
  const nextH2 = faqSection.substring(3).search(/^## /m)
  const faqText = nextH2 === -1 ? faqSection : faqSection.substring(0, nextH2 + 3)

  // Parse **Q?** pattern followed by answer (two formats supported)
  const qaPairs = []
  const lines = faqText.split('\n')
  let currentQ = null
  let currentA = []
  const flush = () => {
    if (currentQ && currentA.length > 0) {
      qaPairs.push({ q: currentQ, a: currentA.join(' ').trim() })
    }
    currentQ = null
    currentA = []
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    // Next H2: stop
    if (currentQ !== null && line.startsWith('## ')) { flush(); break }

    // Format A: Q on own line: **Q?**
    const qOnlyMatch = line.match(/^\*\*(.+?)\*\*\s*$/)
    // Format B: Q + A on same line: **Q?** A
    const qAndAMatch = line.match(/^\*\*(.+?)\*\*\s*(.+?)\s*$/)

    if (qOnlyMatch) {
      flush()
      currentQ = qOnlyMatch[1].trim()
    } else if (qAndAMatch) {
      flush()
      currentQ = qAndAMatch[1].trim()
      currentA = [qAndAMatch[2].trim()]
    } else if (currentQ && line.trim() && !line.startsWith('#')) {
      currentA.push(line.trim())
    }
  }
  flush()
  return qaPairs.length >= 2 ? qaPairs : null
}

const TABLES = ['restaurants', 'attractions', 'tours', 'nightlife']
let totalTouched = 0, totalSkipped = 0, totalFailed = 0

for (const table of TABLES) {
  let from = 0, all = []
  while (true) {
    const { data, error } = await sb.from(table)
      .select('id, slug, name_he, full_content, faq')
      .eq('destination_id', DESTINATION_ID)
      .eq('published', true)
      .range(from, from + 999)
    if (error) { console.error(table, error.message); break }
    all = all.concat(data); if (data.length < 1000) break; from += 1000
  }

  let touched = 0, parseFail = 0, alreadyOk = 0, overwrite = 0
  for (const r of all) {
    // Skip entities that already have proper FAQ (array with 3+ items) UNLESS full_content has a FAQ section
    const existingFaq = Array.isArray(r.faq) ? r.faq : []
    const hasGoodFaq = existingFaq.length >= 3 && existingFaq[0].q && existingFaq[0].a

    const parsed = parseFaqs(r.full_content)
    if (!parsed) {
      if (hasGoodFaq) alreadyOk++
      else parseFail++
      continue
    }

    // Overwrite existing FAQ with parsed version if parsed has 3+ pairs
    // (my new content has cleaner FAQs than old seed data)
    const shouldWrite = parsed.length >= 3
    if (!shouldWrite) {
      parseFail++
      continue
    }

    if (hasGoodFaq) overwrite++

    touched++
    if (apply) {
      const { error } = await sb.from(table).update({ faq: parsed }).eq('id', r.id)
      if (error) { console.error(`  ✗ ${table}/${r.slug}: ${error.message}`); totalFailed++ }
    }
  }
  console.log(`${table.padEnd(14)} touched=${touched} (overwriting ${overwrite}) parse_fail=${parseFail} kept_existing=${alreadyOk} total=${all.length}`)
  totalTouched += touched
  totalSkipped += alreadyOk
}

console.log(`\nTotal touched: ${totalTouched}, skipped (existing OK): ${totalSkipped}, failed: ${totalFailed}`)
if (!apply) console.log('(dry-run — run with --apply)')
