import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const env = fs.readFileSync('.env', 'utf-8').split('\n').reduce((a, l) => {
  const [k, ...v] = l.split('=')
  if (k && v.length) a[k.trim()] = v.join('=').trim()
  return a
}, {})

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
const DESTINATION_ID = env.DESTINATION_ID
const GMAPS_KEY = env.GOOGLE_MAPS_API_KEY

const BLOG_DIR = '/Users/tulcha/Desktop/dev/Travel/newyork/public/images/blog'
fs.mkdirSync(BLOG_DIR, { recursive: true })

// Slug → Google Places text search query
const QUERY_MAP = {
  'visa-esta-usa-israelis': 'Statue of Liberty New York',
  'youker-hamachiya-new-york': 'Times Square New York',
  '3-days-nyc': 'Manhattan skyline New York',
  'bagels-breakfast-nyc': 'Ess-a-Bagel New York',
  'best-broadway-shows-2026': 'Broadway theater Times Square New York',
  'best-seats-broadway': 'Gershwin Theatre Broadway New York',
  'best-views-nyc': 'Top of the Rock New York',
  'bridges-nyc': 'Brooklyn Bridge New York',
  'broadway-dining': 'Sardi\'s Restaurant Broadway New York',
  'broadway-for-beginners': 'Broadway theater district New York',
  'broadway-for-non-english': 'Broadway theater New York',
  'broadway-history': 'Broadway Theater District New York',
  'broadway-lottery': 'Hamilton Richard Rodgers Theatre New York',
  'broadway-tickets-cheap': 'TKTS Times Square New York',
  'broadway-tickets': 'Broadway theater marquee New York',
  'broadway-with-kids': 'Lion King Minskoff Theatre New York',
  'brooklyn-guide': 'Brooklyn Bridge Park New York',
  'central-park-secrets': 'Central Park Bow Bridge New York',
  'chinatown-les-guide': 'Chinatown Manhattan New York',
  'cosmetics-makeup-nyc': 'Sephora Times Square New York',
  'electronics-shopping-nyc': 'B&H Photo Video New York',
  'fifth-avenue-shopping': 'Fifth Avenue Manhattan New York',
  'food-guide-nyc': 'Chelsea Market New York',
  'free-nyc': 'Central Park Bethesda Terrace New York',
  'greenwich-village-guide': 'Washington Square Park New York',
  'harlem-guide': 'Apollo Theater Harlem New York',
  'instagram-spots-nyc': 'Dumbo Manhattan Bridge view New York',
  'jfk-to-manhattan': 'JFK Airport New York',
  'kids-shopping-nyc': 'FAO Schwarz New York',
  'kosher-restaurants-nyc': 'Times Square New York night',
  'mistakes-israelis-nyc': 'New York Times Square',
  'museums-nyc': 'Metropolitan Museum of Art New York',
  'nightlife-nyc': 'Meatpacking District New York night',
  'nyc-night-photography': 'Manhattan skyline night New York',
  'nyc-pizza-guide': 'Lombardi\'s Pizza New York',
  'passover-nyc': 'Manhattan skyline New York',
  'nyc-tipping-guide': 'New York restaurant',
  'nyc-weather-seasons': 'Central Park autumn New York',
  'nyc-winter': 'Rockefeller Center Christmas tree New York',
  'nyc-with-kids': 'American Museum of Natural History New York',
  'off-broadway-guide': 'Off-Broadway theater New York',
  'outlets-nyc-complete-guide': 'Woodbury Common Premium Outlets New York',
  'save-money-nyc': 'Staten Island Ferry New York',
  'shabbat-nyc': 'Manhattan skyline sunset New York',
  'shoes-sneakers-nyc': 'Nike SoHo New York',
  'shopping-guide-nyc': 'Macy\'s Herald Square New York',
  'soho-shopping-guide': 'SoHo Manhattan New York',
  'soho-tribeca-guide': 'SoHo cast iron buildings New York',
  'sports-nyc': 'Madison Square Garden New York',
  'street-food-nyc': 'Halal Guys cart New York',
  'subway-guide': 'New York subway station',
  'sunrises-sunsets-nyc': 'Brooklyn Bridge sunset New York',
  'tax-free-shopping-nyc': 'Fifth Avenue New York shopping',
  'thrift-stores-vintage-nyc': 'Beacon\'s Closet Brooklyn New York',
  'times-square-guide': 'Times Square New York',
  'tkts-guide': 'TKTS booth Times Square New York',
  'week-in-nyc': 'Manhattan Brooklyn Bridge New York',
  'electricity-adapter-nyc': 'Manhattan skyline New York',
  'what-to-pack-nyc': 'Manhattan street New York',
  'what-to-wear-broadway': 'Broadway theater Times Square New York',
  'where-to-stay-nyc': 'Times Square hotel New York',
  'woodbury-common-guide': 'Woodbury Common Premium Outlets New York',
  'niagara-falls-day-trip': 'Niagara Falls',
  'washington-dc-day-trip': 'Washington DC Capitol',
  'boston-day-trip': 'Boston Massachusetts skyline',
  'nyc-passes-comparison': 'Empire State Building New York',
  'hanukkah-nyc': 'Manhattan skyline New York night',
  'israeli-restaurants-nyc': 'Miznon New York',
  'best-apps-nyc': 'New York subway map',
  'nyc-summer-guide': 'Central Park summer New York',
  'nyc-fall-guide': 'Central Park autumn foliage New York',
  'hebrew-tours-nyc': 'Central Park New York walking tour',
  'best-brunch-nyc': 'Clinton Street Baking Company New York',
  'best-coffee-nyc': 'Blue Bottle Coffee New York',
  'brooklyn-food-scene': 'Smorgasburg Brooklyn New York',
  'spring-in-nyc': 'Central Park cherry blossoms New York',
  'sim-card-nyc': 'Manhattan street New York',
  'currency-nyc': 'Wall Street New York',
  'solo-travel-nyc-women': 'Central Park New York',
  'nyc-couples': 'Brooklyn Bridge Park sunset New York',
  'walking-nyc': 'High Line New York',
  'dumbo-guide': 'DUMBO Brooklyn Manhattan Bridge New York',
  'high-line-guide': 'High Line park New York',
  'nyc-budget-hotel': 'Manhattan skyline night New York',
  'mta-unlimited-card': 'MetroCard subway New York',
  'new-years-eve-nyc': 'Times Square ball drop New York',
  'nyc-shopping-tips-israelis': 'Fifth Avenue Manhattan New York',
  'broadway-complete-guide': 'Broadway theater marquee New York',
  'shopping-nyc-complete-guide': 'Fifth Avenue Saks New York',
  'food-nyc-complete-guide': 'Katz\'s Delicatessen New York',
  'planning-nyc-trip': 'Empire State Building view New York',
  'nyc-neighborhoods-guide': 'Greenwich Village brownstones New York',
  'jewish-nyc-guide': 'Lower East Side synagogue New York',
}

async function findPlaceId(query) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,photos&key=${GMAPS_KEY}`
  const res = await fetch(url)
  const json = await res.json()
  if (json.status !== 'OK' || !json.candidates?.length) return null
  const cand = json.candidates[0]
  return { placeId: cand.place_id, photoRef: cand.photos?.[0]?.photo_reference }
}

async function getPlacePhoto(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GMAPS_KEY}`
  const res = await fetch(url)
  const json = await res.json()
  return json.result?.photos?.[0]?.photo_reference
}

async function downloadPhoto(photoRef, outPath) {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${photoRef}&key=${GMAPS_KEY}`
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(outPath, buf)
  return buf.length
}

// Fetch all published guides
const { data: guides } = await supabase
  .from('guides')
  .select('id, slug, image')
  .eq('destination_id', DESTINATION_ID)
  .eq('published', true)

const results = { success: [], failed: [], skipped: [] }

for (const g of guides) {
  const slug = g.slug
  const query = QUERY_MAP[slug]
  if (!query) {
    console.log(`⚠️  No query for ${slug}`)
    results.failed.push({ slug, reason: 'no_query' })
    continue
  }
  const outPath = path.join(BLOG_DIR, `${slug}.jpg`)
  if (fs.existsSync(outPath)) {
    console.log(`✓ Exists: ${slug}`)
    results.skipped.push(slug)
    continue
  }
  try {
    const found = await findPlaceId(query)
    if (!found) {
      console.log(`✗ Not found: ${slug} — "${query}"`)
      results.failed.push({ slug, reason: 'place_not_found', query })
      continue
    }
    let photoRef = found.photoRef
    if (!photoRef) {
      photoRef = await getPlacePhoto(found.placeId)
    }
    if (!photoRef) {
      console.log(`✗ No photo: ${slug} — "${query}"`)
      results.failed.push({ slug, reason: 'no_photo', query })
      continue
    }
    const size = await downloadPhoto(photoRef, outPath)
    console.log(`✓ Downloaded: ${slug} (${(size / 1024).toFixed(0)}KB)`)
    results.success.push({ slug, path: `/images/blog/${slug}.jpg` })
  } catch (e) {
    console.log(`✗ Error: ${slug} — ${e.message}`)
    results.failed.push({ slug, reason: e.message, query })
  }
  await new Promise((r) => setTimeout(r, 200))
}

fs.writeFileSync(
  path.join('/Users/tulcha/Desktop/dev/Travel/newyork/scripts', 'fetch-results.json'),
  JSON.stringify(results, null, 2)
)

console.log(`\n=== SUMMARY ===`)
console.log(`Success: ${results.success.length}`)
console.log(`Skipped: ${results.skipped.length}`)
console.log(`Failed: ${results.failed.length}`)
if (results.failed.length) {
  console.log('\nFailed items:')
  results.failed.forEach((f) => console.log(`  - ${f.slug}: ${f.reason}`))
}
