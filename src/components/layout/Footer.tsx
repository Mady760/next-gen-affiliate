
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold flex items-center mb-4">
              <div className="mr-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                A
              </div>
              <span>Affiliate</span>
              <span className="text-primary">Pro</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              The premier platform for bloggers and affiliates to connect, create, and convert.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="button-subtle-hover p-2 rounded-full bg-background" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="button-subtle-hover p-2 rounded-full bg-background" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="button-subtle-hover p-2 rounded-full bg-background" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="button-subtle-hover p-2 rounded-full bg-background" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Navigation</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/affiliates" className="text-muted-foreground hover:text-foreground transition-colors">For Affiliates</Link>
              <Link to="/bloggers" className="text-muted-foreground hover:text-foreground transition-colors">For Bloggers</Link>
              <Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </nav>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="font-medium text-base mb-4">Join Our Newsletter</h4>
            <p className="text-muted-foreground mb-4">Subscribe to get the latest updates and news.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-background border border-border rounded-l-full px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-white rounded-r-full px-4 flex items-center justify-center button-subtle-hover">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AffiliatePro. All rights reserved.
          </p>
          <div className="flex mt-4 md:mt-0 space-x-8">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
