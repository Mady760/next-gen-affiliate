
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Re-export the supabase client from the integrations folder
export const supabase = supabaseClient;

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true; // Using the client from integrations which is always configured
};
