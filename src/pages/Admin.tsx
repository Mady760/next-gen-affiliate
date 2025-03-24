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
  Link,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { requireAdmin } from '@/middleware/authMiddleware';
import { toast } from 'sonner';
import DashboardStats from '@/components/admin/DashboardStats';
import BlogPostsTable from '@/components/admin/BlogPostsTable';
import AffiliateTable from '@/components/admin/AffiliateTable';

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
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
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors",
                    activeTab === 'dashboard' && "bg-primary text-white"
                  )}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <LucideHome size={20} />
                  {sidebarOpen && <span className="ml-3">Dashboard</span>}
                </a>
              </li>
              <li>
                <a href="#posts" 
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors",
                    activeTab === 'posts' && "bg-primary text-white"
                  )}
                  onClick={() => setActiveTab('posts')}
                >
                  <FileText size={20} />
                  {sidebarOpen && <span className="ml-3">Posts</span>}
                </a>
              </li>
              <li>
                <a href="#affiliates" 
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors",
                    activeTab === 'affiliates' && "bg-primary text-white"
                  )}
                  onClick={() => setActiveTab('affiliates')}
                >
                  <Link size={20} />
                  {sidebarOpen && <span className="ml-3">Affiliate Programs</span>}
                </a>
              </li>
              <li>
                <a href="#users" 
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors",
                    activeTab === 'users' && "bg-primary text-white"
                  )}
                  onClick={() => setActiveTab('users')}
                >
                  <Users size={20} />
                  {sidebarOpen && <span className="ml-3">Users</span>}
                </a>
              </li>
              <li>
                <a href="#analytics" 
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors",
                    activeTab === 'analytics' && "bg-primary text-white"
                  )}
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart3 size={20} />
                  {sidebarOpen && <span className="ml-3">Analytics</span>}
                </a>
              </li>
              <li>
                <a href="#settings" 
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-foreground/80 hover:bg-secondary transition-colors",
                    activeTab === 'settings' && "bg-primary text-white"
                  )}
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
          
          {/* Dashboard Stats */}
          <DashboardStats />
          
          {/* Blog Posts Section */}
          {activeTab === 'posts' && <BlogPostsTable />}
          
          {/* Affiliate Programs Section */}
          {activeTab === 'affiliates' && <AffiliateTable />}
          
          {/* Other tabs can be implemented similarly */}
          {activeTab === 'users' && (
            <div className="glass-card p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Users Management</h2>
              <p className="text-muted-foreground">User management functionality coming soon.</p>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="glass-card p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <p className="text-muted-foreground">Analytics functionality coming soon.</p>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="glass-card p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p className="text-muted-foreground">Settings functionality coming soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
