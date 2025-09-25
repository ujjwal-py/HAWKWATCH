import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'

// Get environment variables from the web app's .env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://xcnhhatfvjlxvfkazhuo.supabase.co'
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjbmhoYXRmdmpseHZma2F6aHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTIwODIsImV4cCI6MjA3MTYyODA4Mn0.cy2o6in9njKEb3hVsVCo7kYrUO9y7LmZOSysFmezVWo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      // Use AsyncStorage for React Native
      getItem: (key: string) => {
        // For now, using a simple in-memory store
        // In production, replace with AsyncStorage
        return Promise.resolve(null)
      },
      setItem: (key: string, value: string) => {
        return Promise.resolve()
      },
      removeItem: (key: string) => {
        return Promise.resolve()
      },
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Auth helper functions (reused from web app)
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}