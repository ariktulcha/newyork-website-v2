// Generate meta_title + meta_description for entities that lack them.
// Derives from existing fields (name, area, cuisine, excerpt) — no LLM.
// Usage: node scripts/generate-meta-tags.mjs [--apply]
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split('\n').filter(Boolean)
    .map((l) => l.split('=').map((s) => s.trim()).filter(Boolean))
    .filter((p) => p.length === 2)
)
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)
const DESTINATION_ID = env.DESTINATION_ID
const apply = process.argv.includes('--apply')

const BRAND = 'WeNewYorker'
const SITE = 'ניו יורק'

// Title strategies per table
const titleFor = {
  restaurants: (r) => {
    const cuisine = cuisineHe(r.cuisine_category) || 'מסעדה'
    const area = r.area || SITE
    return `${r.name_he} - ${cuisine} ב${area} | ${BRAND}`
  },
  attractions: (r) => {
    const cat = attractionCatHe(r.category) || 'אטרקציה'
    const area = r.area || SITE
    return `${r.name_he} - ${cat} ב${area} | ${BRAND}`
  },
  tours: (r) => `${r.name_he} - סיור ב${SITE} | ${BRAND}`,
  nightlife: (r) => {
    const vt = venueTypeHe(r.venue_type) || 'חיי לילה'
    return `${r.name_he} - ${vt} ב${r.area || SITE} | ${BRAND}`
  },
  hotels: (r) => {
    const area = r.area || SITE
    return `${r.name_he} - מלון ב${area} | ${BRAND}`
  },
  guides: (r) => `${r.name_he} | מדריך ל${SITE} | ${BRAND}`,
  areas: (r) => `${r.name_he} ב${SITE} - מדריך שכונה | ${BRAND}`,
}

function cuisineHe(c) {
  const m = {
    italian: 'מסעדה איטלקית', pizza: 'פיצרייה', bagels: 'בייגלייה',
    'jewish-deli': 'דלי יהודי', brunch: 'ברנץ', asian: 'מסעדה אסייתית',
    israeli: 'מסעדה ישראלית', coffee: 'בית קפה', bakery: 'מאפייה',
    steaks: 'סטייקהאוס', steakhouse: 'סטייקהאוס', 'cocktail-bar': 'בר קוקטיילים',
  }
  return m[c]
}

function attractionCatHe(c) {
  const m = {
    broadway: 'מחזה ברודווי', park: 'פארק', museum: 'מוזיאון',
    sports: 'אצטדיון', observation: 'תצפית', landmark: 'אתר תיירות',
    shopping: 'קניות', architecture: 'אדריכלות',
  }
  return m[c]
}

function venueTypeHe(c) {
  const m = {
    club: 'מועדון לילה', bar: 'בר', rooftop: 'בר גג', 'wine-bar': 'בר יין',
  }
  return m[c]
}

function smartDescription(r) {
  const candidates = [r.excerpt, r.description]
  for (const c of candidates) {
    if (c && c.length >= 80 && c.length <= 160) return c.trim()
  }
  // Try excerpt truncation
  if (r.description && r.description.length > 160) {
    // Find a sentence end near 155 chars
    const text = r.description.substring(0, 155)
    const lastPeriod = Math.max(text.lastIndexOf('. '), text.lastIndexOf('.\n'), text.lastIndexOf('! '), text.lastIndexOf('? '))
    if (lastPeriod > 80) return text.substring(0, lastPeriod + 1).trim()
    return text.trim() + '...'
  }
  if (r.excerpt && r.excerpt.length >= 30) return r.excerpt.trim()
  return ''
}

const SELECT = {
  restaurants: 'id, slug, name_he, area, cuisine_category, excerpt, description, meta_title, meta_description',
  attractions: 'id, slug, name_he, area, category, excerpt, description, meta_title, meta_description',
  tours: 'id, slug, name_he, excerpt, description, meta_title, meta_description',
  nightlife: 'id, slug, name_he, area, venue_type, excerpt, description, meta_title, meta_description',
  hotels: 'id, slug, name_he, area, excerpt, description, meta_title, meta_description',
  guides: 'id, slug, name_he, excerpt, description, meta_title, meta_description',
  areas: 'id, slug, name_he, excerpt, description, meta_title, meta_description',
}

const TABLES = ['restaurants', 'attractions', 'tours', 'nightlife', 'hotels', 'guides', 'areas']
let totalTouched = 0

for (const table of TABLES) {
  let from = 0, all = []
  while (true) {
    const { data, error } = await sb.from(table)
      .select(SELECT[table])
      .eq('destination_id', DESTINATION_ID)
      .eq('published', true)
      .range(from, from + 999)
    if (error) { console.error(table, error.message); break }
    all = all.concat(data); if (data.length < 1000) break; from += 1000
  }

  let touched = 0, skipped = 0
  for (const r of all) {
    const patch = {}
    const needTitle = !r.meta_title || r.meta_title.length < 10 || r.meta_title.length > 70
    const needDesc = !r.meta_description || r.meta_description.length < 80

    if (needTitle) {
      const title = titleFor[table](r)
      if (title.length <= 70) patch.meta_title = title
      else patch.meta_title = title.substring(0, 67) + '...'
    }
    if (needDesc) {
      const desc = smartDescription(r)
      if (desc.length >= 60) patch.meta_description = desc
    }

    if (Object.keys(patch).length > 0) {
      touched++
      if (apply) {
        const { error } = await sb.from(table).update(patch).eq('id', r.id)
        if (error) console.error(`  ✗ ${table}/${r.slug}: ${error.message}`)
      }
    } else skipped++
  }
  console.log(`${table.padEnd(14)} touched=${touched} already_ok=${skipped} total=${all.length}`)
  totalTouched += touched
}

console.log(`\nTotal touched: ${totalTouched}`)
if (!apply) console.log('(dry-run — run with --apply)')
