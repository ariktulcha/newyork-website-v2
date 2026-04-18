import fs from 'fs'
import path from 'path'

const env = fs.readFileSync('.env', 'utf-8').split('\n').reduce((a, l) => {
  const [k, ...v] = l.split('=')
  if (k && v.length) a[k.trim()] = v.join('=').trim()
  return a
}, {})

const GMAPS_KEY = env.GOOGLE_MAPS_API_KEY
const BLOG_DIR = '/Users/tulcha/Desktop/dev/Travel/newyork/public/images/blog'

const RETRY = [
  { slug: 'nyc-tipping-guide', query: 'Katz\'s Delicatessen New York' },
]

async function fetchPhoto(query) {
  const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,photos&key=${GMAPS_KEY}`
  const r1 = await fetch(findUrl).then((r) => r.json())
  const cand = r1.candidates?.[0]
  if (!cand) return null
  let photoRef = cand.photos?.[0]?.photo_reference
  if (!photoRef) {
    const detUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${cand.place_id}&fields=photos&key=${GMAPS_KEY}`
    const r2 = await fetch(detUrl).then((r) => r.json())
    photoRef = r2.result?.photos?.[0]?.photo_reference
  }
  return photoRef
}

for (const { slug, query } of RETRY) {
  const photoRef = await fetchPhoto(query)
  if (!photoRef) {
    console.log(`✗ ${slug}: no photo for "${query}"`)
    continue
  }
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${photoRef}&key=${GMAPS_KEY}`
  const res = await fetch(url, { redirect: 'follow' })
  const buf = Buffer.from(await res.arrayBuffer())
  const outPath = path.join(BLOG_DIR, `${slug}.jpg`)
  fs.writeFileSync(outPath, buf)
  console.log(`✓ ${slug}: ${(buf.length / 1024).toFixed(0)}KB`)
}
