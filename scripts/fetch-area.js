#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nsfmucsdxhcywisejxxq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZm11Y3NkeGhjeXdpc2VqeHhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDMzOTAwNywiZXhwIjoyMDg5OTE1MDA3fQ.xwTYYmf4r0fd_u8q5RQpNYCnygROD8BA0vY20ehkrBc'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const slug = process.argv[2] || 'chinatown'

const { data } = await supabase
  .from('areas')
  .select('*')
  .eq('slug', slug)
  .eq('destination_id', 'newyork')
  .single()

if (data) {
  console.log(JSON.stringify(data, null, 2))
} else {
  console.log(`No area found with slug: ${slug}`)
}
