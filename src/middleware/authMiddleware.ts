
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
    // Check the user's metadata for admin role
    const user = session.user;
    const isAdmin = user.app_metadata?.role === 'admin' || 
                   user.user_metadata?.role === 'admin' || 
                   user.email === 'admin@example.com'; // Fallback for demo
    
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
