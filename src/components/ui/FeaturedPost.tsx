
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedPostProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: {
      name: string;
      avatar?: string;
    };
    publishDate: string;
    readTime: string;
    featuredImage: string;
    slug: string;
  };
  className?: string;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, className }) => {
  return (
    <article 
      className={cn(
        "relative overflow-hidden rounded-2xl animate-fade-in", 
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />
      
      <img 
        src={post.featuredImage} 
        alt={post.title} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-8">
        <div className="flex flex-wrap items-center text-xs text-white/80 mb-3 gap-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center">
            <Tag size={14} className="mr-1" />
            <span>{post.category}</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 hover:text-primary/90 transition-colors md:max-w-2xl">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-white/80 mb-5 md:max-w-2xl line-clamp-2 md:line-clamp-3">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blog/${post.slug}`} 
          className="self-start inline-flex items-center text-sm text-white font-medium border-b border-white/30 pb-1 hover:border-white transition-colors button-subtle-hover"
        >
          Read Article
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </article>
  );
};

export default FeaturedPost;
