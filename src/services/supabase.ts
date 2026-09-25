import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

function readEnvValue(value: string | undefined) {
  return value?.trim() ?? ''
}

export function getSupabaseConfigError() {
  const url = readEnvValue(import.meta.env.VITE_SUPABASE_URL)
  const publishableKey = readEnvValue(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)

  if (!url && !publishableKey) {
    return 'Faltan VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY para cargar los servidores desde Supabase.'
  }

  if (!url) {
    return 'Falta VITE_SUPABASE_URL para cargar los servidores desde Supabase.'
  }

  if (!publishableKey) {
    return 'Falta VITE_SUPABASE_PUBLISHABLE_KEY para cargar los servidores desde Supabase.'
  }

  return null
}

export function isSupabaseConfigured() {
  return getSupabaseConfigError() === null
}

export function getSupabaseClient() {
  const configError = getSupabaseConfigError()

  if (configError) {
    throw new Error(configError)
  }

  if (!supabaseClient) {
    const url = readEnvValue(import.meta.env.VITE_SUPABASE_URL)
    const publishableKey = readEnvValue(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)

    supabaseClient = createClient(url, publishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  }

  return supabaseClient
}
