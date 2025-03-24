
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ExternalLink, Tag, Star, DollarSign, Percent } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fetchAffiliatePrograms, AffiliateProgram } from '@/services/affiliateService';

// Available categories for filtering, we'll populate this dynamically
const initialCategories = ['All Categories'];

const AffiliatePrograms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  
  const { data: affiliatePrograms = [], isLoading, error } = useQuery({
    queryKey: ['affiliatePrograms'],
    queryFn: fetchAffiliatePrograms,
  });
  
  // Extract unique categories from affiliate programs
  useEffect(() => {
    if (affiliatePrograms.length > 0) {
      const uniqueCategories = ['All Categories', ...new Set(
        affiliatePrograms
          .map(program => program.category)
          .filter(Boolean) as string[]
      )];
      setCategories(uniqueCategories);
    }
  }, [affiliatePrograms]);
  
  const filteredPrograms = affiliatePrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (program.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
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
            
            {isFilterOpen && (
              <div className="mt-4 md:hidden">
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map(category => (
                    <button 
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
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
              </div>
            )}
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
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card h-[400px] animate-pulse">
                  <div className="h-48 bg-secondary/50"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-secondary/50 rounded w-3/4"></div>
                    <div className="h-4 bg-secondary/50 rounded w-full"></div>
                    <div className="h-4 bg-secondary/50 rounded w-full"></div>
                    <div className="h-10 bg-secondary/50 rounded w-full mt-8"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium mb-2">Error loading affiliate programs</h3>
              <p className="text-muted-foreground mb-6">
                There was an error loading the affiliate programs. Please try again later.
              </p>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          ) : filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <div 
                  key={program.id}
                  className="glass-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 relative bg-secondary/30 flex items-center justify-center">
                    {program.logo ? (
                      <img 
                        src={program.logo}
                        alt={program.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-5xl font-bold text-primary/30">
                        {program.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute top-0 left-0 mt-4 ml-4">
                      <span className="bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {program.category || 'Uncategorized'}
                      </span>
                    </div>
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                      <div className="flex items-center bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        <span className="text-xs font-medium">{program.rating || '0.0'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{program.description || 'No description available.'}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Percent size={16} className="text-primary mt-0.5 mr-2 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Commission</p>
                          <p className="text-sm font-medium">{program.commission || 'Varies'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Tag size={16} className="text-primary mt-0.5 mr-2 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Cookie</p>
                          <p className="text-sm font-medium">{program.cookie_duration || 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <DollarSign size={16} className="text-primary mt-0.5 mr-2 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Min. Payout</p>
                          <p className="text-sm font-medium">{program.payment_threshold || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      {program.website ? (
                        <a 
                          href={program.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary text-sm hover:underline flex items-center"
                        >
                          Visit Website
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-sm">No website</span>
                      )}
                      
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
