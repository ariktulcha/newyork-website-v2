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

// Categories: bar | wine-bar | rooftop | club
// Rules:
//   - rooftop: venue's primary identity is a rooftop/sky bar
//   - club: primary purpose is DJ/dancing/electronic/hip-hop parties
//   - bar: primary purpose is drinking/socializing (incl. gay bars, lounges, pubs, sports bars)
//   - wine-bar: dedicated wine bars (none currently in data)

const mapping = {
  // === CLUBS ===
  'marquee-new-york': 'club',
  'avant-gardner-the-great-hall': 'club',
  'house-of-yes': 'club',
  'nowadays': 'club',
  'elsewhere': 'club',
  'house-of-x-house-of-yes-the-mirage': 'club',
  'knockdown-center': 'club',
  'lavo-nightclub': 'club',
  'tao-downtown': 'club',
  'webster-hall-the-venue': 'club',
  'brooklyn-monarch': 'club',
  'the-meadows': 'club',
  'babys-all-right': 'club',
  'the-sultan-room': 'club',
  'bam-brooklyn-academy-of-music': 'club',
  'brooklyn-bowl': 'club',
  'copacabana': 'club',
  '3-dollar-bill': 'club',
  'la-marina': 'club',
  'the-dl': 'club',

  // === ROOFTOP ===
  'le-bain-the-standard': 'rooftop',

  // === BARS ===
  'the-monster': 'bar',
  'industry-bar': 'bar',
  'icon-astoria': 'bar',
  'sweet-sixteen': 'bar',
  'ainsworth-chelsea': 'bar',
  'the-hop-shoppe': 'bar',
  'hypnotiq-hookah-lounge': 'bar',
  'melody-lanes': 'bar',
  'blend-on-the-water': 'bar',
  'pier-76': 'bar',
  'the-bronx-night-market': 'bar',
}

// Fetch all NY nightlife slugs to validate mapping
const { data: venues, error } = await supabase
  .from('nightlife')
  .select('slug, name_he, venue_type')
  .eq('destination_id', 'new-york')

if (error) { console.error(error); process.exit(1) }

console.log(`Found ${venues.length} venues in DB\n`)

const mappedSlugs = Object.keys(mapping)
const dbSlugs = venues.map(v => v.slug)

const missingFromMapping = dbSlugs.filter(s => !mappedSlugs.includes(s))
const missingFromDb = mappedSlugs.filter(s => !dbSlugs.includes(s))

if (missingFromMapping.length) {
  console.log('⚠️  Slugs in DB but not in mapping:')
  for (const s of missingFromMapping) {
    const v = venues.find(x => x.slug === s)
    console.log(`  - ${s} (${v.name_he})`)
  }
}

if (missingFromDb.length) {
  console.log('\n⚠️  Slugs in mapping but not in DB:')
  for (const s of missingFromDb) console.log(`  - ${s}`)
}

if (missingFromMapping.length || missingFromDb.length) {
  console.log('\nFIX mapping first. Exiting without updates.')
  process.exit(1)
}

console.log('✓ All slugs match. Updating venue_type...\n')

let updated = 0
for (const [slug, category] of Object.entries(mapping)) {
  const venue = venues.find(v => v.slug === slug)
  // Preserve old genre info in metadata
  const { data: currentMeta } = await supabase
    .from('nightlife')
    .select('metadata')
    .eq('destination_id', 'new-york')
    .eq('slug', slug)
    .single()

  const newMetadata = {
    ...(currentMeta?.metadata || {}),
    music_genre: venue.venue_type, // preserve old genre
  }

  const { error: updateError } = await supabase
    .from('nightlife')
    .update({ venue_type: category, metadata: newMetadata })
    .eq('destination_id', 'new-york')
    .eq('slug', slug)

  if (updateError) {
    console.error(`✗ Failed to update ${slug}:`, updateError.message)
  } else {
    console.log(`✓ ${slug} → ${category} (preserved genre: ${venue.venue_type})`)
    updated++
  }
}

console.log(`\nDone. Updated ${updated}/${venues.length} venues.`)

// Summary by category
const byCategory = {}
for (const [slug, cat] of Object.entries(mapping)) {
  byCategory[cat] = (byCategory[cat] || 0) + 1
}
console.log('\n=== Summary ===')
for (const [cat, count] of Object.entries(byCategory)) {
  console.log(`  ${cat}: ${count}`)
}
