import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const client = url && key ? createClient(url, key) : null

// The real database behind saveLead. The `leads` table allows public inserts only,
// so we never ask for the saved row back.
export const leadsDatabase = {
  async insertLead(row) {
    if (!client) return { error: { message: 'Supabase is not configured' } }
    return client.from('leads').insert(row)
  },
}
