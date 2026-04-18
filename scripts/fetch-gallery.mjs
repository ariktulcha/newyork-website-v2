/**
 * fetch-gallery.mjs
 * Fetches Google Places photos for all restaurants/hotels/attractions/nightlife/tours
 * and stores them permanently in Supabase Storage → updates gallery_urls in DB
 *
 * Usage:
 *   GOOGLE_PLACES_KEY=your_key node scripts/fetch-gallery.mjs
 *   GOOGLE_PLACES_KEY=your_key node scripts/fetch-gallery.mjs --table hotels
 *   GOOGLE_PLACES_KEY=your_key node scripts/fetch-gallery.mjs --force  (re-fetch even if already has photos)
 *
 * Requires:
 *   - Google Places API key with "Places API (New)" enabled
 *   - SUPABASE_SERVICE_KEY env var (or hardcoded below)
 */

import { createClient } from '@supabase/supabase-js'

// ─── Config ─────────────────────────────────────────────────────────────────
const SUPABASE_URL   = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const SUPABASE_KEY   = process.env.SUPABASE_SERVICE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'
const GOOGLE_KEY     = process.env.GOOGLE_PLACES_KEY
const DESTINATION_ID = process.env.DESTINATION_ID || 'new-york'
const PHOTOS_COUNT   = 4           // photos per place (+ main image = 5 total)
const BUCKET         = 'place-photos'
const MAX_WIDTH      = 1200        // photo width in pixels

const TABLES = ['restaurants', 'hotels', 'attractions', 'nightlife', 'tours']

// Parse CLI args
const args = process.argv.slice(2)
const tableFilter = args.includes('--table') ? args[args.indexOf('--table') + 1] : null
const forceRefetch = args.includes('--force')

// ─── Init ────────────────────────────────────────────────────────────────────
if (!GOOGLE_KEY) {
  console.error('❌  Missing GOOGLE_PLACES_KEY env var')
  console.error('    Usage: GOOGLE_PLACES_KEY=AIza... node scripts/fetch-gallery.mjs')
  process.exit(1)
}

const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

// ─── Google Places helpers ───────────────────────────────────────────────────

/** Find a place by name in Bali → returns place_id */
async function findPlaceId(name) {
  const query = encodeURIComponent(`${name} Bali`)
  const url = `https://places.googleapis.com/v1/places:searchText`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName'
    },
    body: JSON.stringify({ textQuery: `${name} Bali` })
  })
  const data = await res.json()
  if (data.places && data.places.length > 0) {
    return data.places[0].id
  }
  return null
}

/** Get photo names for a place_id */
async function getPhotoNames(placeId) {
  const url = `https://places.googleapis.com/v1/places/${placeId}`
  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': GOOGLE_KEY,
      'X-Goog-FieldMask': 'photos'
    }
  })
  const data = await res.json()
  return (data.photos || []).slice(0, PHOTOS_COUNT).map(p => p.name)
}

/** Download a Google Places photo as buffer */
async function downloadPhoto(photoName) {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${MAX_WIDTH}&key=${GOOGLE_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download photo: ${res.status}`)
  const buffer = await res.arrayBuffer()
  return Buffer.from(buffer)
}

/** Upload image to Supabase Storage → returns public URL */
async function uploadToStorage(imageBuffer, path) {
  const { data, error } = await sb.storage
    .from(BUCKET)
    .upload(path, imageBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    })
  if (error) throw new Error(`Storage upload failed: ${error.message}`)
  const { data: urlData } = sb.storage.from(BUCKET).getPublicUrl(path)
  return urlData.publicUrl
}

// ─── Main logic ──────────────────────────────────────────────────────────────

async function processTable(table) {
  console.log(`\n📋 Processing: ${table}`)

  // Fetch records
  let query = sb
    .from(table)
    .select('id, slug, name_he, name_en, google_place_id, gallery_urls')
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)

  if (!forceRefetch) {
    query = query.or('gallery_urls.is.null,gallery_urls.eq.[]')
  }

  const { data: records, error } = await query
  if (error) { console.error(`  ❌ Query error: ${error.message}`); return }
  console.log(`  Found ${records.length} records to process`)

  for (const record of records) {
    const name = record.name_en || record.name_he
    console.log(`  → ${name}`)

    try {
      // Step 1: Find/use place_id
      let placeId = record.google_place_id
      if (!placeId) {
        process.stdout.write(`    🔍 Finding place ID... `)
        placeId = await findPlaceId(name)
        if (!placeId) {
          console.log(`not found, skipping`)
          continue
        }
        console.log(`found: ${placeId}`)

        // Save place_id
        await sb.from(table).update({ google_place_id: placeId }).eq('id', record.id)
      }

      // Step 2: Get photo names
      process.stdout.write(`    📸 Fetching photos... `)
      const photoNames = await getPhotoNames(placeId)
      if (photoNames.length === 0) {
        console.log(`no photos available`)
        continue
      }
      console.log(`${photoNames.length} photos`)

      // Step 3: Download + upload each photo
      const galleryUrls = []
      for (let i = 0; i < photoNames.length; i++) {
        try {
          process.stdout.write(`    ⬆️  Photo ${i + 1}/${photoNames.length}... `)
          const buffer = await downloadPhoto(photoNames[i])
          const storagePath = `${DESTINATION_ID}/${table}/${record.slug}/${i}.jpg`
          const url = await uploadToStorage(buffer, storagePath)
          galleryUrls.push(url)
          console.log(`✅`)
        } catch (err) {
          console.log(`❌ ${err.message}`)
        }
      }

      // Step 4: Update gallery_urls in DB
      if (galleryUrls.length > 0) {
        const { error: updateError } = await sb
          .from(table)
          .update({ gallery_urls: galleryUrls })
          .eq('id', record.id)
        if (updateError) console.error(`    ❌ DB update failed: ${updateError.message}`)
        else console.log(`    ✅ Saved ${galleryUrls.length} URLs to DB`)
      }

      // Rate limit: 100ms between places
      await new Promise(r => setTimeout(r, 100))

    } catch (err) {
      console.error(`    ❌ Error: ${err.message}`)
    }
  }
}

async function main() {
  console.log('🚀 Yalla Bali — Gallery Fetch Script')
  console.log(`📍 Destination: ${DESTINATION_ID}`)
  console.log(`📷 Photos per place: ${PHOTOS_COUNT}`)
  console.log(`🔄 Force refetch: ${forceRefetch}`)
  if (tableFilter) console.log(`📋 Table filter: ${tableFilter}`)

  const tables = tableFilter ? [tableFilter] : TABLES

  for (const table of tables) {
    if (!TABLES.includes(table)) {
      console.error(`❌ Unknown table: ${table}. Valid: ${TABLES.join(', ')}`)
      continue
    }
    await processTable(table)
  }

  console.log('\n✅ Done!')
  console.log('Now rebuild the site: npm run build')
}

main().catch(console.error)
