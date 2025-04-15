import { createClient } from '@supabase/supabase-js'

// Variables de entorno para la configuración de Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Las variables de entorno de Supabase no están configuradas')
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Tablas de la base de datos
export const TABLES = {
  AUTH_QUESTIONS: 'auth_questions', //Pregunta de verificacion
  MEDIA_ASSETS: 'media_assets', //Recursos multimedia
  WATCH_PARTY: 'watch_party' // Manejar la URL de la Crunchyfiesta
}