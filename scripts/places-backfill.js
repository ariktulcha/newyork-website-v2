// Places API backfill - populate google_place_id, rating, opening_hours, photos for attractions + restaurants
// Usage:
//   node scripts/places-backfill.js attractions          // dry-run, first 5
//   node scripts/places-backfill.js attractions --apply  // write to Supabase
//   node scripts/places-backfill.js restaurants --apply --limit 20
//   node scripts/places-backfill.js attractions --slug=central-park --apply

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env','utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m) process.env[m[1]] = m[2]
}

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const API_KEY = process.env.GOOGLE_MAPS_API_KEY
const DEST = process.env.DESTINATION_ID || 'new-york'

const args = process.argv.slice(2)
const table = args[0]
if (!['attractions', 'restaurants'].includes(table)) {
  console.error('Usage: node scripts/places-backfill.js <attractions|restaurants> [--apply] [--limit=N] [--slug=X] [--force]')
  process.exit(1)
}
const apply = args.includes('--apply')
const force = args.includes('--force')
const limitArg = args.find(a => a.startsWith('--limit='))
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : (apply ? 200 : 5)
const slugArg = args.find(a => a.startsWith('--slug='))
const singleSlug = slugArg ? slugArg.split('=')[1] : null

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function findPlace(query) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,formatted_address,rating,user_ratings_total,geometry&key=${API_KEY}`
  const r = await fetch(url)
  const j = await r.json()
  if (j.status !== 'OK' || !j.candidates?.length) return null
  return j.candidates[0]
}

async function placeDetails(place_id) {
  const fields = 'place_id,name,formatted_address,rating,user_ratings_total,international_phone_number,website,url,geometry,opening_hours,current_opening_hours,photos,editorial_summary,price_level,business_status'
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&language=en&key=${API_KEY}`
  const r = await fetch(url)
  const j = await r.json()
  if (j.status !== 'OK') return null
  return j.result
}

function formatHours(oh) {
  if (!oh?.weekday_text) return null
  return oh.weekday_text.join('\n')
}

function photoUrls(photos, max = 6) {
  if (!photos) return []
  return photos.slice(0, max).map(p =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${p.photo_reference}&key=${API_KEY}`
  )
}

async function run() {
  const skipBroadway = args.includes('--skip-broadway')
  const onlyBroadway = args.includes('--only-broadway')
  let q = sb.from(table).select('*').eq('destination_id', DEST).eq('published', true)
  if (singleSlug) q = q.eq('slug', singleSlug)
  else {
    if (!force) q = q.is('google_place_id', null)
    if (skipBroadway && table === 'attractions') q = q.not('category', 'eq', 'broadway')
    if (onlyBroadway && table === 'attractions') q = q.eq('category', 'broadway')
  }
  q = q.order('slug').limit(limit)

  const { data: rows, error } = await q
  if (error) { console.error('Supabase error:', error); process.exit(1) }

  console.log(`Processing ${rows.length} ${table} rows (apply=${apply})`)
  const results = { ok: 0, missed: 0, errors: 0 }

  for (const row of rows) {
    const queryName = row.name_en || row.name_he
    let searchQuery
    if (table === 'attractions' && row.category === 'broadway') {
      const theater = row.metadata?.theater
      searchQuery = theater
        ? `${theater} Broadway theater New York`
        : `${queryName} Broadway musical theater New York`
    } else {
      searchQuery = `${queryName} ${row.address || 'New York'}`
    }
    process.stdout.write(`[${row.slug}] "${searchQuery.slice(0,60)}" ... `)

    try {
      const cand = await findPlace(searchQuery)
      if (!cand) { console.log('NOT FOUND'); results.missed++; await sleep(120); continue }
      const details = await placeDetails(cand.place_id)
      if (!details) { console.log('DETAILS FAIL'); results.missed++; await sleep(120); continue }

      const updates = {
        google_place_id: details.place_id,
        google_maps_url: details.url || row.google_maps_url,
        address: row.address || details.formatted_address,
        phone: row.phone || details.international_phone_number || null,
        website: row.website || details.website || null,
        opening_hours: row.opening_hours || formatHours(details.opening_hours) || null,
      }

      if (table === 'restaurants') {
        updates.rating = details.rating || row.rating
      }

      const photos = photoUrls(details.photos)
      const existingGallery = Array.isArray(row.gallery_urls) ? row.gallery_urls : []
      if (photos.length && existingGallery.length === 0) {
        updates.gallery_urls = photos
      }

      const newMeta = { ...(row.metadata || {}) }
      if (details.rating) newMeta.google_rating = details.rating
      if (details.user_ratings_total) newMeta.google_reviews_count = details.user_ratings_total
      if (details.editorial_summary?.overview) newMeta.google_summary = details.editorial_summary.overview
      if (details.price_level !== undefined) newMeta.google_price_level = details.price_level
      if (details.geometry?.location) {
        newMeta.lat = details.geometry.location.lat
        newMeta.lng = details.geometry.location.lng
      }
      updates.metadata = newMeta

      if (apply) {
        const { error: uErr } = await sb.from(table).update(updates).eq('id', row.id)
        if (uErr) { console.log('UPDATE ERR:', uErr.message); results.errors++; continue }
      }
      console.log(`OK (rating=${details.rating||'?'}, photos=${photos.length})`)
      results.ok++
    } catch (e) {
      console.log('EXCEPTION:', e.message)
      results.errors++
    }
    await sleep(120)
  }

  console.log('\n---')
  console.log('Done:', results)
}

run()
