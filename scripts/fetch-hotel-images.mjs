// Fetch images for hotels from Google Places using slug → name + address.
// Usage: node scripts/fetch-hotel-images.mjs [--apply] [--limit=N]

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n').filter(Boolean)
    .map((l) => l.split('=').map((s) => s.trim()).filter(Boolean))
    .filter((p) => p.length === 2)
)

const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
const API_KEY = env.GOOGLE_MAPS_API_KEY
const DEST = env.DESTINATION_ID

const apply = process.argv.includes('--apply')
const limitArg = process.argv.find((a) => a.startsWith('--limit='))
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 999

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function slugToName(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

async function findPlace(query) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,formatted_address&key=${API_KEY}`
  const r = await fetch(url)
  const j = await r.json()
  if (j.status !== 'OK' || !j.candidates?.length) return null
  return j.candidates[0]
}

async function placeDetails(place_id) {
  const fields = 'place_id,name,formatted_address,photos,url,rating,user_ratings_total,geometry'
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&language=en&key=${API_KEY}`
  const r = await fetch(url)
  const j = await r.json()
  if (j.status !== 'OK') return null
  return j.result
}

function photoUrls(photos, max = 6) {
  if (!photos) return []
  return photos.slice(0, max).map((p) =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${p.photo_reference}&key=${API_KEY}`
  )
}

const { data: rows, error } = await sb
  .from('hotels')
  .select('id, slug, name_he, name_en, address, image, gallery_urls, google_place_id, metadata')
  .eq('destination_id', DEST)
  .eq('published', true)
  .is('google_place_id', null)
  .order('slug')
  .limit(limit)

if (error) { console.error(error); process.exit(1) }

console.log(`בודק ${rows.length} מלונות (apply=${apply})`)
let ok = 0, missed = 0, errors = 0

for (const row of rows) {
  const baseName = row.name_en || row.name_he || slugToName(row.slug)
  const query = `${baseName} ${row.address || 'New York'}`
  process.stdout.write(`[${row.slug}] ... `)

  try {
    const cand = await findPlace(query)
    if (!cand) { console.log('NOT FOUND'); missed++; await sleep(120); continue }
    const d = await placeDetails(cand.place_id)
    if (!d) { console.log('DETAILS FAIL'); missed++; await sleep(120); continue }

    const photos = photoUrls(d.photos)
    if (photos.length === 0) { console.log('NO PHOTOS'); missed++; await sleep(120); continue }

    const updates = {
      google_place_id: d.place_id,
      image: photos[0],
      gallery_urls: photos,
    }
    const newMeta = { ...(row.metadata || {}) }
    if (d.rating) newMeta.google_rating = d.rating
    if (d.user_ratings_total) newMeta.google_reviews_count = d.user_ratings_total
    if (d.geometry?.location) {
      newMeta.lat = d.geometry.location.lat
      newMeta.lng = d.geometry.location.lng
    }
    updates.metadata = newMeta

    if (apply) {
      const { error: uErr } = await sb.from('hotels').update(updates).eq('id', row.id)
      if (uErr) { console.log('UPDATE ERR:', uErr.message); errors++; continue }
    }
    console.log(`OK (photos=${photos.length}, rating=${d.rating || '?'})`)
    ok++
  } catch (e) {
    console.log('EXCEPTION:', e.message)
    errors++
  }
  await sleep(150)
}

console.log(`\n---\nDone: ok=${ok} missed=${missed} errors=${errors}`)
if (!apply) console.log('(dry-run — הרץ עם --apply)')
