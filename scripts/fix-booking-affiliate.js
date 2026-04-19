#!/usr/bin/env node
import 'dotenv/config'
// Ensure every hotel.booking_url in Supabase includes aid=2162759 + label=wenewyorker
// For hotels with no booking_url at all, fill with Booking.com search affiliate URL.
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const DESTINATION_ID = 'new-york'
const AID = '2162759'
const LABEL = 'wenewyorker'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

function ensureAffiliate(url, fallbackName) {
  if (!url || !url.includes('booking.com')) {
    const search = fallbackName ? `${fallbackName} New York` : 'New York, New York, United States'
    const p = new URLSearchParams({
      aid: AID, label: LABEL, ss: search, dest_type: 'city'
    })
    return `https://www.booking.com/searchresults.html?${p.toString()}`
  }
  try {
    const u = new URL(url)
    u.searchParams.set('aid', AID)
    if (!u.searchParams.get('label')) u.searchParams.set('label', LABEL)
    return u.toString()
  } catch {
    return null
  }
}

async function run() {
  const { data: hotels, error } = await supabase
    .from('hotels')
    .select('id, slug, name_he, name_en, booking_url')
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)

  if (error) { console.error(error); process.exit(1) }

  console.log(`\nProcessing ${hotels.length} hotels...\n`)

  let updated = 0, filled = 0, skipped = 0

  for (const h of hotels) {
    const newUrl = ensureAffiliate(h.booking_url, h.name_en || h.name_he)
    if (!newUrl) {
      console.log(`  ! ${h.slug} — couldn't parse existing URL: ${h.booking_url}`)
      skipped++
      continue
    }
    if (newUrl === h.booking_url) {
      skipped++
      continue
    }

    const { error: upErr } = await supabase
      .from('hotels')
      .update({ booking_url: newUrl })
      .eq('id', h.id)

    if (upErr) {
      console.error(`  ✗ ${h.slug}: ${upErr.message}`)
      continue
    }

    if (!h.booking_url) {
      console.log(`  + ${h.slug} (filled from empty)`)
      filled++
    } else {
      console.log(`  ✓ ${h.slug} (added aid)`)
      updated++
    }
  }

  console.log(`\nDone. updated=${updated}, filled=${filled}, skipped=${skipped}`)

  // Verify
  const { count } = await supabase
    .from('hotels')
    .select('slug', { count: 'exact', head: true })
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)
    .not('booking_url', 'is', null)
    .like('booking_url', `%aid=${AID}%`)

  console.log(`Hotels now with aid=${AID} in booking_url: ${count}`)
}

run().catch(e => { console.error(e); process.exit(1) })
