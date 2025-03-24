
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ExternalLink, Tag, Star, DollarSign, Percent } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample affiliate programs data - will be replaced with Supabase data
const affiliateProgramsData = [
  {
    id: '1',
    name: 'Amazon Associates',
    description: 'One of the largest affiliate programs with millions of products across various categories.',
    category: 'Retail',
    commissionRate: '1-10%',
    cookieDuration: '24 hours',
    paymentThreshold: '$10',
    rating: 4.5,
    website: 'https://affiliate-program.amazon.com/',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '2',
    name: 'ShareASale',
    description: 'A large affiliate network with thousands of merchants across various niches.',
    category: 'Network',
    commissionRate: 'Varies',
    cookieDuration: '30 days',
    paymentThreshold: '$50',
    rating: 4.2,
    website: 'https://www.shareasale.com/',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '3',
    name: 'Awin',
    description: 'Global affiliate network with advertisers across retail, telecom, travel and finance.',
    category: 'Network',
    commissionRate: 'Varies',
    cookieDuration: '30-45 days',
    paymentThreshold: '$20',
    rating: 4.3,
    website: 'https://www.awin.com/',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '4',
    name: 'ClickBank',
    description: 'Specializes in digital products including e-books, software, and online courses.',
    category: 'Digital Products',
    commissionRate: '50-75%',
    cookieDuration: '60 days',
    paymentThreshold: '$10',
    rating: 4.0,
    website: 'https://www.clickbank.com/',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '5',
    name: 'CJ Affiliate',
    description: 'Premium affiliate marketing with major retail, travel, and financial brands.',
    category: 'Network',
    commissionRate: 'Varies',
    cookieDuration: '30 days',
    paymentThreshold: '$50',
    rating: 4.4,
    website: 'https://www.cj.com/',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '6',
    name: 'HostGator',
    description: 'Web hosting affiliate program with high commissions and long cookie duration.',
    category: 'Hosting',
    commissionRate: '$65-125 per sale',
    cookieDuration: '60 days',
    paymentThreshold: '$100',
    rating: 4.1,
    website: 'https://www.hostgator.com/affiliates',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

// Available categories for filtering
const categories = [
  'All Categories',
  'Retail',
  'Network',
  'Digital Products',
  'Hosting',
  'Travel',
  'Finance'
];

const AffiliatePrograms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const filteredPrograms = affiliateProgramsData.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All Categories' || program.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Affiliate Programs</h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Discover the best affiliate programs to maximize your earnings. Compare commission rates, cookie durations, and payment terms.
            </p>
            
            <div className="relative max-w-xl mx-auto mb-8">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search affiliate programs..."
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
          </div>
        </div>
      </section>
      
      {/* Affiliate Programs List */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-subtitle mb-8">
            {selectedCategory === 'All Categories' 
              ? 'All Programs' 
              : `${selectedCategory} Programs`}
          </h2>
          
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <div 
                  key={program.id}
                  className="glass-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 relative">
                    <img 
                      src={program.logo}
                      alt={program.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 mt-4 ml-4">
                      <span className="bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {program.category}
                      </span>
                    </div>
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                      <div className="flex items-center bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        <span className="text-xs font-medium">{program.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Percent size={16} className="text-primary mt-0.5 mr-2 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Commission</p>
                          <p className="text-sm font-medium">{program.commissionRate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Tag size={16} className="text-primary mt-0.5 mr-2 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Cookie</p>
                          <p className="text-sm font-medium">{program.cookieDuration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <DollarSign size={16} className="text-primary mt-0.5 mr-2 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Min. Payout</p>
                          <p className="text-sm font-medium">{program.paymentThreshold}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <a 
                        href={program.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline flex items-center"
                      >
                        Visit Website
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                      
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">No affiliate programs found</h3>
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
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join these affiliate programs and start monetizing your website today. Apply for multiple programs to maximize your earning potential.
          </p>
          <Button size="lg">
            Get Started
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AffiliatePrograms;
