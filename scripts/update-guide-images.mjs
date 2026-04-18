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
const BLOG_DIR = '/Users/tulcha/Desktop/dev/Travel/newyork/public/images/blog'

const { data: guides } = await supabase
  .from('guides')
  .select('id, slug, image, hero_image_url')
  .eq('destination_id', DESTINATION_ID)
  .eq('published', true)

let updated = 0
let skipped = 0
let missing = 0

for (const g of guides) {
  const filePath = path.join(BLOG_DIR, `${g.slug}.jpg`)
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  No file: ${g.slug}`)
    missing++
    continue
  }
  const newImagePath = `/images/blog/${g.slug}.jpg`
  if (g.image === newImagePath && g.hero_image_url === newImagePath) {
    skipped++
    continue
  }
  const { error } = await supabase
    .from('guides')
    .update({ image: newImagePath, hero_image_url: newImagePath })
    .eq('id', g.id)
  if (error) {
    console.log(`✗ ${g.slug}: ${error.message}`)
  } else {
    updated++
  }
}

console.log(`\nUpdated: ${updated}`)
console.log(`Skipped (already correct): ${skipped}`)
console.log(`Missing files: ${missing}`)
