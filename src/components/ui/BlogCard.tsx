
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, User, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
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
    featuredImage?: string;
    slug: string;
  };
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, className }) => {
  return (
    <article 
      className={cn(
        "glass-card overflow-hidden flex flex-col animate-fade-up", 
        className
      )}
    >
      {post.featuredImage && (
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden w-full h-48 relative">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        </Link>
      )}
      
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
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
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center">
            {post.author.avatar ? (
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <User size={14} className="text-primary" />
              </div>
            )}
            <span className="text-xs">{post.author.name}</span>
          </div>
          
          <Link 
            to={`/blog/${post.slug}`} 
            className="text-xs text-primary font-medium flex items-center button-subtle-hover"
          >
            Read More
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
