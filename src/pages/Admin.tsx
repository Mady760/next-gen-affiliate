
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Home as LucideHome, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreHorizontal, 
  Eye as EyeIcon, 
  Filter,
  Link,
  DollarSign
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { requireAdmin } from '@/middleware/authMiddleware';
import { toast } from 'sonner';

const blogPosts = [
  {
    id: '1',
    title: 'How to Increase Your Affiliate Marketing Conversions in 2023',
    status: 'Published',
    category: 'Marketing',
    author: 'Sarah Johnson',
    date: 'May 10, 2023',
    views: 1245
  },
  {
    id: '2',
    title: 'The Complete Guide to SEO for Affiliate Sites',
    status: 'Published',
    category: 'SEO',
    author: 'Michael Chen',
    date: 'Apr 28, 2023',
    views: 890
  },
  {
    id: '3',
    title: 'Best Product Review Templates That Convert',
    status: 'Draft',
    category: 'Content',
    author: 'Jessica Adams',
    date: 'Apr 15, 2023',
    views: 0
  },
  {
    id: '4',
    title: 'Affiliate Marketing Legal Requirements You Should Know',
    status: 'Published',
    category: 'Legal',
    author: 'Robert Martinez',
    date: 'Apr 05, 2023',
    views: 756
  },
  {
    id: '5',
    title: 'How to Choose the Right Affiliate Programs for Your Niche',
    status: 'Published',
    category: 'Strategy',
    author: 'David Wilson',
    date: 'Mar 22, 2023',
    views: 623
  },
  {
    id: '6',
    title: 'Email Marketing Strategies for Affiliate Promotions',
    status: 'Draft',
    category: 'Email',
    author: 'Laura Thompson',
    date: 'Mar 15, 2023',
    views: 0
  }
];

const affiliatePrograms = [
  {
    id: '1',
    name: 'Amazon Associates',
    category: 'Retail',
    commission: '1-10%',
    cookieDuration: '24 hours',
    status: 'Active'
  },
  {
    id: '2',
    name: 'ShareASale',
    category: 'Marketplace',
    commission: '5-30%',
    cookieDuration: '30 days',
    status: 'Active'
  },
  {
    id: '3',
    name: 'ClickBank',
    category: 'Digital Products',
    commission: '50-75%',
    cookieDuration: '60 days',
    status: 'Inactive'
  },
  {
    id: '4',
    name: 'CJ Affiliate',
    category: 'Marketplace',
    commission: '5-25%',
    cookieDuration: '30 days',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Awin',
    category: 'Marketplace',
    commission: '3-15%',
    cookieDuration: '30 days',
    status: 'Pending'
  }
];

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isSupabaseConfigured()) {
        toast.error('Supabase is not properly configured. Please set environment variables.');
        setLoading(false);
        return;
      }
      
      const isAdmin = await requireAdmin();
      if (!isAdmin) {
        navigate('/login');
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        try {
          // Safe fallback for profiles query
          setUserProfile({ 
            full_name: session.user.user_metadata?.full_name || 'Admin User',
            email: session.user.email || 'admin@example.com'
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/login');
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex bg-secondary/30">
      <aside 
        className={cn(
          "bg-background h-screen fixed top-0 left-0 bottom-0 z-50 transition-all duration-300 glass shadow-glass-strong border-r border-border",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center">
            <div className="mr-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              A
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold">
                Admin<span className="text-primary">Panel</span>
              </span>
            )}
          </div>
          
          <button 
            onClick={toggleSidebar}
            className="absolute top-6 -right-4 bg-background border border-border rounded-full p-1 shadow-md button-subtle-hover"
          >
            <Layout size={16} />
          </button>
          
          <nav className="flex-1 mt-6">
            <ul className="space-y-1 px-3">
              <li>
                <a href="#dashboard" 
                  className="flex items-center px-3 py-3 rounded-md bg-primary text-white"
                  onClick={() => setActiveTab('dashboard')}
                >
                  <LucideHome size={20} />
                  {sidebarOpen && <span className="ml-3">Dashboard</span>}
                </a>
              </li>
              <li>
                <a href="#posts" 
                  className="flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors"
                  onClick={() => setActiveTab('posts')}
                >
                  <FileText size={20} />
                  {sidebarOpen && <span className="ml-3">Posts</span>}
                </a>
              </li>
              <li>
                <a href="#affiliates" 
                  className="flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors"
                  onClick={() => setActiveTab('affiliates')}
                >
                  <Link size={20} />
                  {sidebarOpen && <span className="ml-3">Affiliate Programs</span>}
                </a>
              </li>
              <li>
                <a href="#users" 
                  className="flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors"
                  onClick={() => setActiveTab('users')}
                >
                  <Users size={20} />
                  {sidebarOpen && <span className="ml-3">Users</span>}
                </a>
              </li>
              <li>
                <a href="#analytics" 
                  className="flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors"
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart3 size={20} />
                  {sidebarOpen && <span className="ml-3">Analytics</span>}
                </a>
              </li>
              <li>
                <a href="#settings" 
                  className="flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings size={20} />
                  {sidebarOpen && <span className="ml-3">Settings</span>}
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t border-border mt-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Users size={18} />
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="font-medium text-sm">{userProfile?.full_name || 'Admin User'}</p>
                  <p className="text-xs text-muted-foreground">{userProfile?.email || 'admin@example.com'}</p>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button 
                className="mt-4 text-sm text-muted-foreground hover:text-foreground flex items-center w-full button-subtle-hover"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      </aside>
      
      <main 
        className={cn(
          "flex-1 transition-all duration-300 pt-6 pb-12 px-6",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your affiliate blog admin panel</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Total Posts</p>
                  <h3 className="text-2xl font-bold mt-1">42</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-md">
                  <FileText size={20} className="text-primary" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12% increase
              </p>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Total Views</p>
                  <h3 className="text-2xl font-bold mt-1">18,245</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-md">
                  <EyeIcon size={20} className="text-primary" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                24% increase
              </p>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">245</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-md">
                  <Users size={20} className="text-primary" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                8% increase
              </p>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-muted-foreground text-sm">Total Earnings</p>
                  <h3 className="text-2xl font-bold mt-1">$4,385</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-md">
                  <DollarSign size={20} className="text-primary" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                16% increase
              </p>
            </div>
          </div>
          
          {activeTab === 'posts' && (
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
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center">
                          <input 
                            type="checkbox"
                            checked={selectedPosts.length === blogPosts.length}
                            onChange={selectAllPosts}
                            className="rounded border-border"
                          />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Title</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Status</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Category</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Author</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Date</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Views</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox"
                            checked={selectedPosts.includes(post.id)}
                            onChange={() => toggleSelectPost(post.id)}
                            className="rounded border-border"
                          />
                        </td>
                        <td className="px-6 py-4 font-medium">{post.title}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.status === 'Published' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{post.category}</td>
                        <td className="px-6 py-4 text-sm">{post.author}</td>
                        <td className="px-6 py-4 text-sm">{post.date}</td>
                        <td className="px-6 py-4 text-sm">{post.views > 0 ? post.views.toLocaleString() : '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                              <Edit2 size={16} className="text-blue-500" />
                            </button>
                            <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                              <EyeIcon size={16} className="text-gray-500" />
                            </button>
                            <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'affiliates' && (
            <div className="glass-card overflow-hidden mb-12">
              <div className="p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h2 className="text-xl font-semibold mb-4 sm:mb-0">Affiliate Programs</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Plus size={16} className="mr-2" />
                      Add Program
                    </Button>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="Search programs..."
                        className="py-2 pl-9 pr-4 rounded-md border border-border bg-background w-48 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={15} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left font-medium text-sm">Program Name</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Category</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Commission</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Cookie Duration</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Status</th>
                      <th className="px-6 py-3 text-left font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliatePrograms.map((program) => (
                      <tr key={program.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{program.name}</td>
                        <td className="px-6 py-4 text-sm">{program.category}</td>
                        <td className="px-6 py-4 text-sm">{program.commission}</td>
                        <td className="px-6 py-4 text-sm">{program.cookieDuration}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            program.status === 'Active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' 
                              : program.status === 'Inactive'
                                ? 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'
                          }`}>
                            {program.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                              <Edit2 size={16} className="text-blue-500" />
                            </button>
                            <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                              <Link size={16} className="text-gray-500" />
                            </button>
                            <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
