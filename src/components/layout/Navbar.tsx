
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' }
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
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="button-subtle-hover p-2 rounded-full">
            <Search size={20} className="text-foreground/80" />
          </button>
          <Link 
            to="/admin" 
            className="button-subtle-hover flex items-center justify-center text-sm bg-primary text-white px-4 py-2 rounded-full"
          >
            <User size={16} className="mr-2" />
            Admin
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden button-subtle-hover p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          'md:hidden absolute top-full left-0 w-full glass p-6 shadow-glass transition-all duration-300 ease-in-out overflow-hidden',
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
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
        </nav>
        <div className="flex items-center space-x-4">
          <button className="button-subtle-hover p-2 rounded-full animate-fade-up animate-delay-400">
            <Search size={20} className="text-foreground/80" />
          </button>
          <Link 
            to="/admin" 
            className="button-subtle-hover flex items-center justify-center text-base bg-primary text-white px-4 py-2 rounded-full animate-fade-up animate-delay-500"
          >
            <User size={16} className="mr-2" />
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
