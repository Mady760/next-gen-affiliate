
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BarChart4, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import BlogCard from '@/components/ui/BlogCard';
import FeaturedPost from '@/components/ui/FeaturedPost';

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

const recentPostsData = [
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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-6">
                The Future of Affiliate Marketing
              </div>
              <h1 className="text-title mb-6">
                Elevate Your <span className="text-gradient">Affiliate</span> Marketing Strategy
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                A powerful platform for bloggers and affiliates to create compelling content, track performance, and maximize earnings with advanced analytics.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  icon={<ArrowRight size={18} />} 
                  iconPosition="right"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-8 mt-12">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Zap size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Fast Integration</p>
                    <p className="text-sm text-muted-foreground">Quick setup with any blog</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <BarChart4 size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Advanced Analytics</p>
                    <p className="text-sm text-muted-foreground">Track all performance</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <ShieldCheck size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Secure Platform</p>
                    <p className="text-sm text-muted-foreground">Enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-2xl blur-xl opacity-70"></div>
              <div className="relative glass-card overflow-hidden h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-subtitle">Featured Post</h2>
            <Link 
              to="/blog" 
              className="text-primary font-medium flex items-center button-subtle-hover"
            >
              View All Posts
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <FeaturedPost post={featuredPostData} className="h-[500px]" />
        </div>
      </section>
      
      {/* Recent Posts */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-subtitle">Recent Articles</h2>
            <Link 
              to="/blog" 
              className="text-primary font-medium flex items-center button-subtle-hover"
            >
              View All
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPostsData.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                className={`animate-delay-${index * 100}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')] opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-subtitle mb-6">Ready to Transform Your Affiliate Marketing?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of successful affiliate marketers and bloggers who have elevated their strategy with our platform.
            </p>
            <Button 
              size="lg" 
              icon={<ArrowRight size={18} />} 
              iconPosition="right"
              className="mx-auto"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
