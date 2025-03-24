
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const seedBlogPosts = async (userId: string) => {
  const posts = [
    {
      title: 'How to Increase Your Affiliate Marketing Conversions in 2023',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
      status: 'Published',
      category: 'Marketing',
      author: 'Sarah Johnson',
      views: 1245,
      user_id: userId
    },
    {
      title: 'The Complete Guide to SEO for Affiliate Sites',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
      status: 'Published',
      category: 'SEO',
      author: 'Michael Chen',
      views: 890,
      user_id: userId
    },
    {
      title: 'Best Product Review Templates That Convert',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
      status: 'Draft',
      category: 'Content',
      author: 'Jessica Adams',
      views: 0,
      user_id: userId
    },
    {
      title: 'Affiliate Marketing Legal Requirements You Should Know',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
      status: 'Published',
      category: 'Legal',
      author: 'Robert Martinez',
      views: 756,
      user_id: userId
    },
    {
      title: 'How to Choose the Right Affiliate Programs for Your Niche',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
      status: 'Published',
      category: 'Strategy',
      author: 'David Wilson',
      views: 623,
      user_id: userId
    },
    {
      title: 'Email Marketing Strategies for Affiliate Promotions',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
      status: 'Draft',
      category: 'Email',
      author: 'Laura Thompson',
      views: 0,
      user_id: userId
    }
  ];

  try {
    const { data, error } = await supabase.from('blog_posts').insert(posts).select();
    
    if (error) throw error;
    
    toast.success(`Seeded ${data.length} blog posts`);
    return data;
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    toast.error('Failed to seed blog posts');
    return [];
  }
};

export const seedAffiliatePrograms = async (userId: string) => {
  const programs = [
    {
      name: 'Amazon Associates',
      description: 'One of the largest affiliate programs with millions of products across various categories.',
      category: 'Retail',
      commission: '1-10%',
      cookie_duration: '24 hours',
      payment_threshold: '$10',
      rating: 4.5,
      website: 'https://affiliate-program.amazon.com/',
      logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'Active',
      user_id: userId
    },
    {
      name: 'ShareASale',
      description: 'A large affiliate network with thousands of merchants across various niches.',
      category: 'Network',
      commission: 'Varies',
      cookie_duration: '30 days',
      payment_threshold: '$50',
      rating: 4.2,
      website: 'https://www.shareasale.com/',
      logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'Active',
      user_id: userId
    },
    {
      name: 'Awin',
      description: 'Global affiliate network with advertisers across retail, telecom, travel and finance.',
      category: 'Network',
      commission: 'Varies',
      cookie_duration: '30-45 days',
      payment_threshold: '$20',
      rating: 4.3,
      website: 'https://www.awin.com/',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'Pending',
      user_id: userId
    },
    {
      name: 'ClickBank',
      description: 'Specializes in digital products including e-books, software, and online courses.',
      category: 'Digital Products',
      commission: '50-75%',
      cookie_duration: '60 days',
      payment_threshold: '$10',
      rating: 4.0,
      website: 'https://www.clickbank.com/',
      logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'Inactive',
      user_id: userId
    },
    {
      name: 'CJ Affiliate',
      description: 'Premium affiliate marketing with major retail, travel, and financial brands.',
      category: 'Network',
      commission: 'Varies',
      cookie_duration: '30 days',
      payment_threshold: '$50',
      rating: 4.4,
      website: 'https://www.cj.com/',
      logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      status: 'Active',
      user_id: userId
    }
  ];

  try {
    const { data, error } = await supabase.from('affiliate_programs').insert(programs).select();
    
    if (error) throw error;
    
    toast.success(`Seeded ${data.length} affiliate programs`);
    return data;
  } catch (error) {
    console.error('Error seeding affiliate programs:', error);
    toast.error('Failed to seed affiliate programs');
    return [];
  }
};

export const seedDemoData = async () => {
  try {
    // First, get the current user's ID
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      toast.error('You must be logged in to seed data');
      return;
    }

    const userId = session.user.id;
    
    // Check if data already exists to avoid duplicates
    const { count: postsCount, error: postsError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true });
      
    const { count: programsCount, error: programsError } = await supabase
      .from('affiliate_programs')
      .select('*', { count: 'exact', head: true });
    
    if (postsError || programsError) {
      toast.error('Error checking existing data');
      return;
    }
    
    // Only seed if there's no data
    if (postsCount === 0) {
      await seedBlogPosts(userId);
    } else {
      toast.info(`${postsCount} blog posts already exist`);
    }
    
    if (programsCount === 0) {
      await seedAffiliatePrograms(userId);
    } else {
      toast.info(`${programsCount} affiliate programs already exist`);
    }
    
    // Update the stats
    const { data: viewsData } = await supabase
      .from('blog_posts')
      .select('views');
      
    const totalViews = viewsData?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;
    
    await supabase
      .from('user_stats')
      .update({
        total_posts: postsCount || 0,
        total_views: totalViews,
        total_users: 1,
        total_earnings: 4385,
        last_updated: new Date().toISOString()
      })
      .eq('id', (await supabase.from('user_stats').select('id').limit(1).single()).data.id);
      
    toast.success('Demo data seeded successfully');
  } catch (error) {
    console.error('Error seeding demo data:', error);
    toast.error('Failed to seed demo data');
  }
};
