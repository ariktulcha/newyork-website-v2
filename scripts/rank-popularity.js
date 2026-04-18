// Popularity ranking - set sort_order based on:
//   1) hardcoded "priority tier" for top NY icons (by slug)
//   2) Google rating * log(reviews_count) as tiebreaker
// Lower sort_order = shown first.
// Usage: node scripts/rank-popularity.js attractions [--apply]
//        node scripts/rank-popularity.js broadway    [--apply]

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env','utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const DEST = process.env.DESTINATION_ID || 'new-york'

const target = process.argv[2]
const apply = process.argv.includes('--apply')
if (!['attractions', 'broadway'].includes(target)) {
  console.error('Usage: node scripts/rank-popularity.js <attractions|broadway> [--apply]')
  process.exit(1)
}

// Priority lists - lower = more popular. Items not listed get default tier.
const ATTRACTION_PRIORITY = [
  'statue-of-liberty', 'central-park', 'times-square', 'empire-state-building',
  'brooklyn-bridge', 'one-world-observatory', '9-11-memorial', 'top-of-the-rock',
  'rockefeller-center', 'high-line', 'met-museum', 'moma',
  'summit-one-vanderbilt', 'edge-observation', 'natural-history-museum',
  'grand-central-terminal', 'chelsea-market', 'bryant-park', 'washington-square-park',
  'little-island', 'guggenheim', 'whitney-museum', 'intrepid-museum',
  'flatiron-building', 'st-patricks-cathedral', 'madison-square-garden',
  'staten-island-ferry', 'dumbo-brooklyn', 'williamsburg-brooklyn', 'yankee-stadium',
  'coney-island', 'tenement-museum', 'soho-shopping', 'little-italy-chinatown',
  'brooklyn-botanic-garden', 'harlem-attraction', 'the-vessel',
]

const BROADWAY_PRIORITY = [
  'the-lion-king', 'wicked', 'hamilton', 'mj-the-musical',
  'harry-potter-cursed-child', 'aladdin', 'hadestown', 'moulin-rouge',
  'chicago', 'the-book-of-mormon', 'six', 'back-to-the-future',
  'the-outsiders', 'maybe-happy-ending', 'the-great-gatsby',
  'beetlejuice', 'come-from-away', 'dear-evan-hansen', 'phantom-of-the-opera',
  'hells-kitchen', 'cabaret', 'merrily-we-roll-along', 'romeo-and-juliet',
  'the-notebook', 'water-for-elephants', 'stereophonic', 'suffs',
  'the-whos-tommy', 'gutenberg-the-musical',
]

async function run() {
  let q = sb.from('attractions').select('slug,name_he,metadata').eq('destination_id', DEST).eq('published', true)
  if (target === 'broadway') q = q.eq('category', 'broadway')
  else q = q.not('category', 'eq', 'broadway')
  const { data: rows, error } = await q
  if (error) { console.error(error); process.exit(1) }

  const priority = target === 'broadway' ? BROADWAY_PRIORITY : ATTRACTION_PRIORITY
  const priorityMap = new Map(priority.map((s, i) => [s, i]))

  // Score: priority rank has strongest weight; rating*log(reviews) breaks ties
  const scored = rows.map(r => {
    const pIdx = priorityMap.has(r.slug) ? priorityMap.get(r.slug) : 999
    const rating = r.metadata?.google_rating || 0
    const reviews = r.metadata?.google_reviews_count || 0
    const quality = rating * Math.log10(Math.max(reviews, 10))
    // Combine: priority tier gives base ordering; quality breaks ties within tier
    const compositeScore = pIdx * 1000 - quality  // lower = more popular
    return { ...r, pIdx, rating, reviews, quality, compositeScore }
  }).sort((a, b) => a.compositeScore - b.compositeScore)

  console.log(`\nTop 15 by popularity (${target}):`)
  for (let i = 0; i < Math.min(15, scored.length); i++) {
    const s = scored[i]
    console.log(`  ${i+1}. ${s.slug} — rating ${s.rating||'?'}, reviews ${s.reviews||'?'} (pIdx=${s.pIdx})`)
  }
  console.log(`  ... (total ${scored.length})`)

  if (!apply) {
    console.log('\n(dry-run - pass --apply to write sort_order)')
    return
  }

  // Assign sort_order 1..N
  let updated = 0
  for (let i = 0; i < scored.length; i++) {
    const sortOrder = i + 1
    const featured = i < 10  // top-10 marked featured
    const { error } = await sb.from('attractions').update({ sort_order: sortOrder, featured }).eq('slug', scored[i].slug).eq('destination_id', DEST)
    if (error) console.log(`FAIL ${scored[i].slug}:`, error.message)
    else updated++
  }
  console.log(`\nUpdated ${updated}/${scored.length} rows with sort_order + featured (top 10)`)
}

run()
