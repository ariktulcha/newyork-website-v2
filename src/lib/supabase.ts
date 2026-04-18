import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_KEY

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
export const DESTINATION_ID = import.meta.env.DESTINATION_ID || 'new-york'
