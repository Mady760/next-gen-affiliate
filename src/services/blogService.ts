
import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  content?: string;
  status: 'Published' | 'Draft';
  category?: string;
  author?: string;
  date: string;
  views: number;
  user_id: string;
}

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
  
  return data || [];
};

export const createBlogPost = async (post: Omit<BlogPost, 'id' | 'date' | 'views'>): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{ ...post, views: 0 }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
  
  return data;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
  
  return data;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};
