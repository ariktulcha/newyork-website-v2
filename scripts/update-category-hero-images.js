#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'
const DESTINATION_ID = 'new-york'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function pickHeroForCategory(cat) {
  const base = supabase
    .from('restaurants')
    .select('slug, name_he, image, rating, gallery_urls')
    .eq('destination_id', DESTINATION_ID)
    .eq('published', true)
    .not('image', 'is', null)

  let data
  if (cat.source_category_field === 'area') {
    const values = cat.source_category_value.split('|').map(v => v.trim()).filter(Boolean)
    const orClause = values.map(v => `area.ilike.%${v}%`).join(',')
    const res = await base.or(orClause).order('rating', { ascending: false, nullsFirst: false }).limit(5)
    data = res.data
  } else {
    const res = await base.eq(cat.source_category_field, cat.source_category_value).order('rating', { ascending: false, nullsFirst: false }).limit(5)
    data = res.data
  }

  if (!data || data.length === 0) return null
  const withImage = data.find(r => r.image && r.image.startsWith('http'))
  return withImage?.image || null
}

async function run() {
  const { data: categories, error } = await supabase
    .from('category_pages')
    .select('id, slug, title, source_category_field, source_category_value, hero_image_url')
    .eq('destination_id', DESTINATION_ID)
    .eq('source_table', 'restaurants')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Fetch error:', error.message)
    process.exit(1)
  }

  console.log(`\nPicking hero images for ${categories.length} categories...\n`)

  for (const cat of categories) {
    const heroUrl = await pickHeroForCategory(cat)
    if (!heroUrl) {
      console.log(`  ${cat.slug}: no image found, skipping`)
      continue
    }

    const { error: updateError } = await supabase
      .from('category_pages')
      .update({ hero_image_url: heroUrl })
      .eq('id', cat.id)

    if (updateError) {
      console.error(`✗ ${cat.slug}: ${updateError.message}`)
    } else {
      console.log(`✓ ${cat.slug} — ${heroUrl.substring(0, 80)}...`)
    }
  }

  console.log()
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
