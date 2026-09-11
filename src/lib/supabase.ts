import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export type Project = {
  id: string
  title: string
  description: string
  tech_stack: string[]
  live_url: string
  github_url: string
  order_index: number
  created_at: string
}

export type Certificate = {
  id: string
  name: string
  issuer: string
  issued_date: string
  file_url: string
  file_type: string
  created_at: string
}
