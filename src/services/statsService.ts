import { supabase } from '@/lib/supabase';

export interface UserStats {
  id: string;
  total_posts: number;
  total_views: number;
  total_users: number;
  total_earnings: number;
  last_updated: string;
}

export const fetchUserStats = async (): Promise<UserStats> => {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .limit(1)
    .single();
  
  if (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
  
  return data;
};

export const updateUserStats = async (stats: Partial<UserStats>): Promise<UserStats> => {
  // First, get the existing stats
  const { data: existingStats } = await supabase
    .from('user_stats')
    .select('id')
    .limit(1)
    .single();
  
  if (!existingStats) {
    throw new Error('No stats record found to update');
  }
  
  const { data, error } = await supabase
    .from('user_stats')
    .update({ ...stats, last_updated: new Date().toISOString() })
    .eq('id', existingStats.id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user stats:', error);
    throw error;
  }
  
  return data;
};

// Helper function to recalculate stats based on current data
export const recalculateStats = async (): Promise<UserStats> => {
  // Get count of blog posts
  const { count: postsCount, error: postsError } = await supabase
    .from('blog_posts')
    .select('id', { count: 'exact', head: true });
    
  if (postsError) {
    console.error('Error counting posts:', postsError);
    throw postsError;
  }
  
  // Sum all views
  const { data: viewsData, error: viewsError } = await supabase
    .from('blog_posts')
    .select('views');
    
  if (viewsError) {
    console.error('Error summing views:', viewsError);
    throw viewsError;
  }
  
  const totalViews = viewsData.reduce((sum, post) => sum + (post.views || 0), 0);
  
  // Get count of users
  const { count: usersCount, error: usersError } = await supabase
    .from('auth.users')
    .select('id', { count: 'exact', head: true });
    
  // If we can't access auth.users directly, we'll just keep the existing count
  const totalUsers = usersError ? 1 : (usersCount || 1); // Default to at least 1 user
  
  // Update stats
  return updateUserStats({
    total_posts: postsCount || 0,
    total_views: totalViews,
    total_users: totalUsers
  });
};
