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

const { data: guides, error } = await supabase
  .from('guides')
  .select('id, slug, name_he, image, hero_image_url, metadata')
  .eq('destination_id', DESTINATION_ID)
  .eq('published', true)

if (error) {
  console.error('Error:', error)
  process.exit(1)
}

const publicDir = '/Users/tulcha/Desktop/dev/Travel/newyork/public'

const missing = []
const existing = []
const external = []

for (const g of guides) {
  const src = g.image || g.hero_image_url
  if (!src) {
    missing.push({ ...g, reason: 'no_src' })
    continue
  }
  if (src.startsWith('http')) {
    external.push(g)
    continue
  }
  const fullPath = path.join(publicDir, src.startsWith('/') ? src.slice(1) : src)
  if (fs.existsSync(fullPath)) {
    existing.push({ ...g, fullPath })
  } else {
    missing.push({ ...g, fullPath, reason: 'file_not_found' })
  }
}

console.log(`Total: ${guides.length}`)
console.log(`Existing files: ${existing.length}`)
console.log(`External URL: ${external.length}`)
console.log(`Missing files: ${missing.length}\n`)

console.log('=== MISSING ===')
missing.forEach((g) => {
  console.log(`${g.slug}\t${g.image || g.hero_image_url || '(none)'}`)
})

if (external.length) {
  console.log('\n=== EXTERNAL ===')
  external.forEach((g) => console.log(`${g.slug}\t${g.image || g.hero_image_url}`))
}
