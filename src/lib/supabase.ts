
import { createClient } from '@supabase/supabase-js';

// Default fallback values for local development
// In production, these should be set as environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize the Supabase client with fallback error handling
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};
