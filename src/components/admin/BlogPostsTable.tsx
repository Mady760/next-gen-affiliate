
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  EyeIcon,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { fetchBlogPosts, deleteBlogPost, BlogPost } from '@/services/blogService';
import { supabase } from '@/lib/supabase';

const BlogPostsTable = () => {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const queryClient = useQueryClient();
  
  const { data: blogPosts = [], isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Post deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  });

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel('blog-posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_posts'
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
  
  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate(id);
    }
  };
  
  const toggleSelectPost = (postId: string) => {
    if (selectedPosts.includes(postId)) {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    } else {
      setSelectedPosts([...selectedPosts, postId]);
    }
  };
  
  const selectAllPosts = () => {
    if (selectedPosts.length === blogPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(blogPosts.map(post => post.id));
    }
  };
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.author?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (post.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="glass-card overflow-hidden mb-12">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Blog Posts</h2>
            <div className="flex space-x-2">
              <div className="h-10 w-24 bg-secondary/50 animate-pulse rounded-md"></div>
              <div className="h-10 w-48 bg-secondary/50 animate-pulse rounded-md"></div>
              <div className="h-10 w-32 bg-secondary/50 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-secondary/50 animate-pulse rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card overflow-hidden mb-12 p-6">
        <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-md">
          <p className="text-red-600 dark:text-red-400">Error loading blog posts: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['blogPosts'] })}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="glass-card overflow-hidden mb-12">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h2 className="text-xl font-semibold mb-4 sm:mb-0">Blog Posts</h2>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Plus size={16} className="mr-2" />
              New Post
            </Button>
            <div className="relative">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="py-2 pl-9 pr-4 rounded-md border border-border bg-background w-48 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={15} />
            </div>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2 pl-9 pr-4 rounded-md border border-border bg-background appearance-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="All">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={15} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input 
                  type="checkbox"
                  checked={selectedPosts.length === blogPosts.length && blogPosts.length > 0}
                  onChange={selectAllPosts}
                  className="rounded border-border"
                />
              </TableHead>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No posts found. Try a different search term or create a new post.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <TableCell>
                    <input 
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => toggleSelectPost(post.id)}
                      className="rounded border-border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'Published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'
                    }`}>
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{post.category || '-'}</TableCell>
                  <TableCell className="text-sm">{post.author || '-'}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(post.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm">{post.views > 0 ? post.views.toLocaleString() : '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                        <Edit2 size={16} className="text-blue-500" />
                      </button>
                      <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                        <EyeIcon size={16} className="text-gray-500" />
                      </button>
                      <button 
                        className="p-1 hover:bg-secondary rounded-full transition-colors"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BlogPostsTable;
