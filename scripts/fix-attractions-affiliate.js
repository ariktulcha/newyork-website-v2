#!/usr/bin/env node
// Populate attractions.booking_url with the right affiliate URL:
//   - Broadway shows       -> TodayTix (utm_source=wenewyorker)
//   - Paid attractions     -> Tiqets (partner=wenewyorker)
//   - Free / no-ticket     -> leave booking_url null
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nsfmucsdxhcywisejxxq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'
)
const DESTINATION_ID = 'new-york'

const TIQETS_PARTNER = 'wenewyorker'
const TODAYTIX_PARTNER = 'wenewyorker'

const TIQETS_PRODUCTS = {
  'empire-state-building': 'Empire State Building',
  'top-of-the-rock': 'Top of the Rock',
  'edge-observation': 'Edge Hudson Yards',
  'summit-one-vanderbilt': 'Summit One Vanderbilt',
  'one-world-observatory': 'One World Observatory',
  'moma': 'MoMA Museum of Modern Art',
  'met-museum': 'Metropolitan Museum of Art',
  'guggenheim-museum': 'Guggenheim Museum',
  'natural-history-museum': 'American Museum of Natural History',
  'intrepid-museum': 'Intrepid Museum',
  'whitney-museum': 'Whitney Museum',
  '9-11-memorial': '9/11 Memorial Museum',
  'tenement-museum': 'Tenement Museum',
  'the-cloisters': 'The Met Cloisters',
  'brooklyn-museum': 'Brooklyn Museum',
  'ellis-island': 'Ellis Island',
  'statue-of-liberty': 'Statue of Liberty',
  'central-park-zoo': 'Central Park Zoo',
  'brooklyn-botanic-garden': 'Brooklyn Botanic Garden',
  'coney-island': 'Coney Island Luna Park',
  'madison-square-garden': 'Madison Square Garden Tour',
  'yankee-stadium': 'Yankee Stadium Tour',
  'citi-field': 'Citi Field Tour',
  'barclays-center': 'Barclays Center Tour',
  'chelsea-market': 'Chelsea Market food tour',
}

const TODAYTIX_SLUGS = {
  'hamilton': 'hamilton',
  'the-lion-king': 'the-lion-king',
  'wicked': 'wicked',
  'aladdin': 'aladdin',
  'chicago': 'chicago',
  'the-book-of-mormon': 'the-book-of-mormon',
  'moulin-rouge': 'moulin-rouge-the-musical',
  'harry-potter-cursed-child': 'harry-potter-and-the-cursed-child',
  'mj-the-musical': 'mj-the-musical',
  'hadestown': 'hadestown',
  'six': 'six',
  'dear-evan-hansen': 'dear-evan-hansen',
  'phantom-of-the-opera': 'the-phantom-of-the-opera',
  'come-from-away': 'come-from-away',
  'beetlejuice': 'beetlejuice-the-musical',
  'cabaret': 'cabaret-at-the-kit-kat-club',
  'hells-kitchen': 'hells-kitchen',
  'the-great-gatsby': 'the-great-gatsby',
  'water-for-elephants': 'water-for-elephants',
  'suffs': 'suffs',
  'back-to-the-future': 'back-to-the-future-the-musical',
  'the-outsiders': 'the-outsiders',
  'maybe-happy-ending': 'maybe-happy-ending',
  'operation-mincemeat': 'operation-mincemeat',
  'oh-mary': 'oh-mary',
  'othello-denzel': 'othello',
  'romeo-and-juliet': 'romeo-and-juliet',
  'stranger-things-first-shadow': 'stranger-things-the-first-shadow',
  'gypsy-revival': 'gypsy',
  'glengarry-glen-ross-revival': 'glengarry-glen-ross',
  'elf-the-musical': 'elf-the-musical',
  'buena-vista-social-club': 'buena-vista-social-club',
  'sunset-boulevard': 'sunset-boulevard',
  'sunset-blvd-revival': 'sunset-boulevard',
  'stomp-off-broadway': 'stomp',
  'real-women-have-curves': 'real-women-have-curves',
  'boop-musical': 'boop-the-musical',
  'smash': 'smash',
  'tammy-faye': 'tammy-faye',
  'death-becomes-her': 'death-becomes-her',
  'and-juliet': 'and-juliet',
  'all-in-comedy-about-love': 'all-in-comedy-about-love',
  'cult-of-love': 'cult-of-love',
  'gutenberg-the-musical': 'gutenberg-the-musical',
  'a-wonderful-world': 'a-wonderful-world',
  'left-on-tenth': 'left-on-tenth',
  'merrily-we-roll-along': 'merrily-we-roll-along',
  'once-upon-a-mattress': 'once-upon-a-mattress',
  'our-town-revival': 'our-town',
  'stereophonic': 'stereophonic',
  'swept-away': 'swept-away',
  'the-hills-of-california': 'the-hills-of-california',
  'the-notebook': 'the-notebook-the-musical',
  'the-roommate': 'the-roommate',
  'the-whos-tommy': 'the-whos-tommy',
}

function tiqetsSearchUrl(query) {
  return `https://www.tiqets.com/en/search/?q=${encodeURIComponent(query)}&partner=${TIQETS_PARTNER}`
}

function todaytixShowUrl(slug, nameEn) {
  const knownSlug = TODAYTIX_SLUGS[slug]
  if (knownSlug) {
    return `https://www.todaytix.com/nyc/shows/${knownSlug}?utm_source=${TODAYTIX_PARTNER}&utm_medium=affiliate`
  }
  // fallback: search
  const q = encodeURIComponent(nameEn || slug)
  return `https://www.todaytix.com/nyc/shows?q=${q}&utm_source=${TODAYTIX_PARTNER}&utm_medium=affiliate`
}

async function run() {
  const { data: atts, error } = await supabase
    .from('attractions')
    .select('id, slug, name_he, name_en, category')
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)

  if (error) { console.error(error); process.exit(1) }

  console.log(`\nProcessing ${atts.length} attractions...\n`)

  let tiqetsCount = 0, todaytixCount = 0, skipped = 0

  for (const a of atts) {
    let url = null

    if (a.category === 'broadway') {
      url = todaytixShowUrl(a.slug, a.name_en)
    } else if (TIQETS_PRODUCTS[a.slug]) {
      url = tiqetsSearchUrl(TIQETS_PRODUCTS[a.slug])
    }

    if (!url) {
      skipped++
      continue
    }

    const { error: upErr } = await supabase
      .from('attractions')
      .update({ booking_url: url })
      .eq('id', a.id)

    if (upErr) {
      console.error(`  ✗ ${a.slug}: ${upErr.message}`)
      continue
    }

    if (a.category === 'broadway') {
      todaytixCount++
      if (todaytixCount <= 5) console.log(`  🎭 ${a.slug} -> TodayTix`)
    } else {
      tiqetsCount++
      console.log(`  🎟️  ${a.slug} -> Tiqets`)
    }
  }

  console.log(`\nDone. Tiqets=${tiqetsCount}, TodayTix=${todaytixCount}, skipped (free/no-ticket)=${skipped}`)
}

run().catch(e => { console.error(e); process.exit(1) })
