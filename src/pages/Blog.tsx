
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/ui/BlogCard';
import FeaturedPost from '@/components/ui/FeaturedPost';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample data
const featuredPostData = {
  id: '1',
  title: 'How to Increase Your Affiliate Marketing Conversions in 2023',
  excerpt: 'Learn the latest strategies and techniques to boost your conversion rates and maximize earnings from your affiliate marketing campaigns.',
  category: 'Marketing',
  author: { name: 'Sarah Johnson' },
  publishDate: '2023-05-10',
  readTime: '6 min read',
  featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  slug: 'increase-affiliate-marketing-conversions'
};

const postsData = [
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
    id: '4',
    title: 'Affiliate Marketing Legal Requirements You Should Know',
    excerpt: 'Stay compliant with these essential legal requirements and disclosures for affiliate marketers.',
    category: 'Legal',
    author: { name: 'Robert Martinez' },
    publishDate: '2023-04-05',
    readTime: '7 min read',
    featuredImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'affiliate-marketing-legal-requirements'
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
  },
  {
    id: '6',
    title: 'Email Marketing Strategies for Affiliate Promotions',
    excerpt: 'Effective email marketing tactics to promote affiliate products without being pushy or losing subscriber trust.',
    category: 'Email',
    author: { name: 'Laura Thompson' },
    publishDate: '2023-03-15',
    readTime: '7 min read',
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'email-marketing-affiliate-promotions'
  },
  {
    id: '7',
    title: 'Social Media Tactics for Affiliate Marketers',
    excerpt: 'Leverage different social media platforms to drive traffic to your affiliate offers and increase conversions.',
    category: 'Social Media',
    author: { name: 'James Peterson' },
    publishDate: '2023-03-08',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    slug: 'social-media-affiliate-marketers'
  }
];

const categories = [
  'All Categories',
  'Marketing',
  'SEO',
  'Content',
  'Legal',
  'Strategy',
  'Email',
  'Social Media'
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const filteredPosts = postsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Resources</h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Discover the latest insights, strategies, and tips for successful affiliate marketing and content creation.
            </p>
            
            <div className="relative max-w-xl mx-auto mb-8">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            </div>
            
            <div className="flex justify-center">
              <div className="hidden md:flex flex-wrap gap-2 justify-center">
                {categories.map(category => (
                  <button 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-sm transition-colors",
                      selectedCategory === category 
                        ? "bg-primary text-white" 
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <button 
                className="md:hidden flex items-center bg-secondary px-4 py-2 rounded-full text-sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} className="mr-2" />
                {selectedCategory === 'All Categories' ? 'Filter by Category' : selectedCategory}
              </button>
            </div>
            
            {/* Mobile filter dropdown */}
            {isFilterOpen && (
              <div className="mt-4 p-4 bg-background border border-border rounded-lg shadow-glass md:hidden">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Filter by Category</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  {categories.map(category => (
                    <button 
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm text-left transition-colors",
                        selectedCategory === category 
                          ? "bg-primary text-white" 
                          : "hover:bg-secondary"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-subtitle mb-8">Featured Post</h2>
          <FeaturedPost post={featuredPostData} className="h-[500px]" />
        </div>
      </section>
      
      {/* All Posts */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-subtitle mb-8">
            {selectedCategory === 'All Categories' 
              ? 'All Articles' 
              : `${selectedCategory} Articles`}
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  className={`animate-fade-up animate-delay-${index % 3 * 100}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
          
          {filteredPosts.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
