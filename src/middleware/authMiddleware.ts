
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Authentication middleware to check if user is logged in
export const requireAuth = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // User is not authenticated
    toast.error('You must be logged in to access this page');
    
    // Redirect to login page
    window.location.href = '/login';
    return false;
  }
  
  return true;
};

// Authorization middleware to check if user has admin role
export const requireAdmin = async () => {
  // First check if user is authenticated
  const isAuth = await requireAuth();
  
  if (!isAuth) return false;
  
  // Then check if user has admin role
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (error || !profile || profile.role !== 'admin') {
      // User does not have admin role
      toast.error('You do not have permission to access this page');
      
      // Redirect to home page
      window.location.href = '/';
      return false;
    }
    
    return true;
  }
  
  return false;
};
