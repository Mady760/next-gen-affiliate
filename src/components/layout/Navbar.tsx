
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { requireAuth } from '@/middleware/authMiddleware';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await requireAuth();
      setIsLoggedIn(isAuth);
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setShowSearch(false);
  }, [location.pathname]);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to blog with search query
      navigate(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };
  
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const resourcesItems = [
    { name: 'For Affiliates', path: '/affiliate-programs' },
    { name: 'For Bloggers', path: '/for-bloggers' },
    { name: 'Documentation', path: '/documentation' },
    { name: 'FAQ', path: '/faq' },
  ];
  
  const legalItems = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Sitemap', path: '/sitemap' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'glass py-3 shadow-glass' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-bold flex items-center"
        >
          <div className="mr-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            A
          </div>
          <span className="animate-fade-in">Affiliate</span>
          <span className="text-primary animate-fade-in animate-delay-100">Pro</span>
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'nav-link text-sm',
                location.pathname === item.path && 'nav-link-active'
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="relative group">
            <button className="nav-link text-sm flex items-center">
              Resources
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 glass-card shadow-glass rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-1">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm hover:bg-primary/10"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="relative group">
            <button className="nav-link text-sm flex items-center">
              Legal
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 glass-card shadow-glass rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-1">
                {legalItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 text-sm hover:bg-primary/10"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {showSearch ? (
            <form onSubmit={handleSearch} className="relative animate-fade-in">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-border bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
                autoFocus
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60" />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="button-subtle-hover p-2 rounded-full"
              aria-label="Search"
            >
              <Search size={20} className="text-foreground/80" />
            </button>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin" 
                className="button-subtle-hover flex items-center justify-center text-sm bg-primary text-white px-4 py-2 rounded-full"
              >
                <User size={16} className="mr-2" />
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="button-subtle-hover flex items-center justify-center text-sm px-4 py-2 rounded-full border border-border"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="button-subtle-hover flex items-center justify-center text-sm bg-primary text-white px-4 py-2 rounded-full"
            >
              <User size={16} className="mr-2" />
              Login
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="button-subtle-hover p-2" 
            aria-label="Search"
          >
            <Search size={22} />
          </button>
          <button 
            className="md:hidden button-subtle-hover p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden px-6 py-3 glass animate-fade-in">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60" />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </form>
        </div>
      )}
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          'md:hidden absolute top-full left-0 w-full glass p-6 shadow-glass transition-all duration-300 ease-in-out overflow-hidden',
          isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col space-y-6 mb-6">
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'nav-link text-base py-1',
                location.pathname === item.path && 'nav-link-active',
                `animate-fade-up animate-delay-${index * 100}`
              )}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">Resources</p>
            {resourcesItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-base py-1 pl-2 border-l-2 border-border hover:border-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">Legal</p>
            {legalItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-base py-1 pl-2 border-l-2 border-border hover:border-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        
        {isLoggedIn ? (
          <div className="flex flex-col space-y-4 animate-fade-up animate-delay-600">
            <Link 
              to="/admin" 
              className="button-subtle-hover flex items-center justify-center text-base bg-primary text-white px-4 py-2 rounded-full"
            >
              <User size={16} className="mr-2" />
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="button-subtle-hover flex items-center justify-center text-base px-4 py-2 rounded-full border border-border"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="button-subtle-hover flex items-center justify-center text-base bg-primary text-white px-4 py-2 rounded-full animate-fade-up animate-delay-500"
          >
            <User size={16} className="mr-2" />
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
