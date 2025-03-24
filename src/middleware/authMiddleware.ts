
import { supabase } from '@/lib/supabase';

// Middleware function to check if user is authenticated
export const requireAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// Middleware function to check if user is admin
export const requireAdmin = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return false;
  }
  
  try {
    // Since we're connected to Supabase but may not have the profiles table,
    // let's check the user's metadata instead
    const user = session.user;
    // Assuming admin role is set in user metadata or using a hardcoded value for demo
    const isAdmin = user.app_metadata?.role === 'admin' || 
                   user.user_metadata?.role === 'admin' || 
                   user.email === 'admin@example.com'; // Fallback for demo
    
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
