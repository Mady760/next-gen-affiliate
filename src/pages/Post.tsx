
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  Tag, 
  Share, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  MessageSquare, 
  ThumbsUp 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/ui/BlogCard';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const postData = {
  id: '1',
  title: 'How to Increase Your Affiliate Marketing Conversions in 2023',
  excerpt: 'Learn the latest strategies and techniques to boost your conversion rates and maximize earnings from your affiliate marketing campaigns.',
  content: `
    <p>Affiliate marketing continues to be one of the most effective ways to earn passive income online. However, with increasing competition, it's more important than ever to optimize your conversion rates.</p>
    
    <h2>Understanding Your Audience</h2>
    <p>The foundation of successful affiliate marketing lies in deeply understanding your target audience. Before promoting any product, take time to research:</p>
    <ul>
      <li>Demographics and psychographics of your audience</li>
      <li>Their pain points and challenges</li>
      <li>What solutions they're actively seeking</li>
      <li>Where they spend time online</li>
    </ul>
    
    <p>This knowledge allows you to select affiliate products that genuinely meet your audience's needs, increasing the likelihood of conversion.</p>
    
    <h2>Creating High-Quality Content</h2>
    <p>Content is still king in affiliate marketing. Your content should:</p>
    <ul>
      <li>Provide genuine value independent of any affiliate promotion</li>
      <li>Establish your credibility and expertise</li>
      <li>Address specific pain points and questions</li>
      <li>Include a clear, compelling call-to-action</li>
    </ul>
    
    <h2>Optimizing Your Affiliate Link Placement</h2>
    <p>Where and how you place your affiliate links can significantly impact conversion rates. Consider these strategies:</p>
    <ul>
      <li>Place links naturally within relevant content</li>
      <li>Use a variety of CTAs (buttons, text links, banners)</li>
      <li>Focus on above-the-fold placement for key offers</li>
      <li>Test different placements to find what works best</li>
    </ul>
    
    <h2>Building Trust with Your Audience</h2>
    <p>Trust is the foundation of successful affiliate marketing. Build trust by:</p>
    <ul>
      <li>Only promoting products you've personally used and believe in</li>
      <li>Being transparent about affiliate relationships</li>
      <li>Including both pros and cons in product reviews</li>
      <li>Sharing authentic case studies and testimonials</li>
    </ul>
    
    <h2>Leveraging Multiple Channels</h2>
    <p>Don't limit your affiliate marketing to just one channel. Consider expanding to:</p>
    <ul>
      <li>Email marketing campaigns</li>
      <li>Social media platforms where your audience spends time</li>
      <li>YouTube videos with demonstrations and reviews</li>
      <li>Webinars and live streams for more complex products</li>
    </ul>
    
    <h2>Testing and Optimizing</h2>
    <p>Continuous testing is key to improving conversion rates. Test variations of:</p>
    <ul>
      <li>Headlines and copywriting approaches</li>
      <li>Call-to-action text and design</li>
      <li>Link placement and formatting</li>
      <li>Landing page design and content</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>By implementing these strategies, you can significantly increase your affiliate marketing conversion rates in 2023. Remember that building a sustainable affiliate marketing business takes time and consistent effort. Focus on providing genuine value to your audience, and the conversions will follow.</p>
  `,
  category: 'Marketing',
  author: { 
    name: 'Sarah Johnson',
    bio: 'Digital marketing specialist with 8+ years of experience in affiliate marketing and content strategy.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' 
  },
  publishDate: 'May 10, 2023',
  readTime: '6 min read',
  featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  tags: ['Affiliate Marketing', 'Conversions', 'Strategy', 'Content'],
  slug: 'increase-affiliate-marketing-conversions'
};

const relatedPosts = [
  {
    id: '2',
    title: 'The Complete Guide to SEO for Affiliate Sites',
    excerpt: 'Optimize your affiliate website for search engines with this comprehensive guide covering all aspects of SEO.',
    category: 'SEO',
    author: { name: 'Michael Chen' },
    publishDate: '2023-04-28',
    readTime: '8 min read',
    featuredImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f5f989?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'seo-guide-affiliate-sites'
  },
  {
    id: '3',
    title: 'Best Product Review Templates That Convert',
    excerpt: 'Discover high-converting templates for product reviews that build trust and drive affiliate sales.',
    category: 'Content',
    author: { name: 'Jessica Adams' },
    publishDate: '2023-04-15',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'product-review-templates'
  },
  {
    id: '5',
    title: 'How to Choose the Right Affiliate Programs for Your Niche',
    excerpt: 'Learn how to identify and join the best affiliate programs that align with your content niche and audience interests.',
    category: 'Strategy',
    author: { name: 'David Wilson' },
    publishDate: '2023-03-22',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'choose-right-affiliate-programs'
  }
];

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In a real app, you would fetch the post data based on the slug
  // For now, we'll just use our sample data
  const post = postData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <article className="pt-28 pb-16 flex-1">
        {/* Featured Image & Title */}
        <header className="relative h-[500px] mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />
          
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-20 max-w-5xl mx-auto h-full flex flex-col justify-end p-6 md:p-8">
            <div className="flex flex-wrap items-center text-xs text-white/80 mb-3 gap-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{post.publishDate}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:max-w-3xl">
              {post.title}
            </h1>
            
            <div className="flex items-center">
              {post.author.avatar ? (
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <User size={16} className="text-primary" />
                </div>
              )}
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <p className="text-xs text-white/70">Author</p>
              </div>
            </div>
          </div>
        </header>
        
        <div className="max-w-3xl mx-auto px-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <Link 
                key={tag} 
                to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-secondary text-foreground text-sm px-3 py-1 rounded-full hover:bg-secondary/70 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Share & Engagement */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-b border-border py-6 mb-12">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-muted-foreground mr-4 font-medium">Share:</span>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-secondary button-subtle-hover" aria-label="Share on Facebook">
                  <Facebook size={18} />
                </button>
                <button className="p-2 rounded-full bg-secondary button-subtle-hover" aria-label="Share on Twitter">
                  <Twitter size={18} />
                </button>
                <button className="p-2 rounded-full bg-secondary button-subtle-hover" aria-label="Share on LinkedIn">
                  <Linkedin size={18} />
                </button>
                <button className="p-2 rounded-full bg-secondary button-subtle-hover" aria-label="Copy link">
                  <Copy size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex items-center bg-secondary px-4 py-2 rounded-full button-subtle-hover">
                <ThumbsUp size={16} className="mr-2" />
                <span>42 Likes</span>
              </button>
              <button className="flex items-center bg-secondary px-4 py-2 rounded-full button-subtle-hover">
                <MessageSquare size={16} className="mr-2" />
                <span>12 Comments</span>
              </button>
            </div>
          </div>
          
          {/* Author Box */}
          <div className="glass-card p-6 flex flex-col md:flex-row items-center md:items-start gap-6 mb-16">
            {post.author.avatar ? (
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={24} className="text-primary" />
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-medium mb-2">{post.author.name}</h3>
              <p className="text-muted-foreground mb-4">{post.author.bio}</p>
              <Button variant="outline" size="sm">
                View All Posts
              </Button>
            </div>
          </div>
          
          {/* Comments Section Placeholder */}
          <div className="mb-16">
            <h3 className="text-xl font-medium mb-6">Comments (12)</h3>
            
            {/* Comment form placeholder */}
            <div className="glass-card p-6 mb-8">
              <h4 className="text-lg font-medium mb-4">Leave a Comment</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <textarea 
                  placeholder="Your Comment" 
                  rows={4} 
                  className="w-full px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Submit Comment</Button>
              </div>
            </div>
            
            {/* Comment display placeholder - in a real app, this would be a list of comments */}
            <div className="space-y-6">
              <div className="p-1">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h5 className="font-medium">John Doe</h5>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-muted-foreground mb-2">
                      Great article! I've been struggling with my conversion rates, and these tips are exactly what I needed.
                    </p>
                    <button className="text-sm text-primary font-medium">Reply</button>
                  </div>
                </div>
              </div>
              
              {/* More comments would go here */}
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-subtitle mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map(relatedPost => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default Post;
