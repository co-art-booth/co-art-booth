import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/** Demo mode = everything runs on sample data in src/data. Default ON so the app works out of the box. */
export const isDemo = import.meta.env.VITE_DEMO !== 'false' || !url || !key

export const supabase = !isDemo && url && key ? createClient(url, key) : null
