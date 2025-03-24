
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Search,
  Edit2,
  Trash2,
  Link,
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
import { fetchAffiliatePrograms, deleteAffiliateProgram, AffiliateProgram } from '@/services/affiliateService';
import { supabase } from '@/lib/supabase';

const AffiliateTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();
  
  const { data: affiliatePrograms = [], isLoading, error } = useQuery({
    queryKey: ['affiliatePrograms'],
    queryFn: fetchAffiliatePrograms,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAffiliateProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affiliatePrograms'] });
      toast.success('Affiliate program deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting affiliate program:', error);
      toast.error('Failed to delete affiliate program');
    }
  });

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel('affiliate-programs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'affiliate_programs'
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['affiliatePrograms'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
  
  const handleDeleteProgram = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this affiliate program?')) {
      deleteMutation.mutate(id);
    }
  };
  
  const filteredPrograms = affiliatePrograms.filter(program => {
    return program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (program.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="glass-card overflow-hidden mb-12">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Affiliate Programs</h2>
            <div className="flex space-x-2">
              <div className="h-10 w-24 bg-secondary/50 animate-pulse rounded-md"></div>
              <div className="h-10 w-48 bg-secondary/50 animate-pulse rounded-md"></div>
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
          <p className="text-red-600 dark:text-red-400">Error loading affiliate programs: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['affiliatePrograms'] })}
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
          <h2 className="text-xl font-semibold mb-4 sm:mb-0">Affiliate Programs</h2>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Plus size={16} className="mr-2" />
              Add Program
            </Button>
            <div className="relative">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs..."
                className="py-2 pl-9 pr-4 rounded-md border border-border bg-background w-48 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={15} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Cookie Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrograms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No affiliate programs found. Try a different search term or add a new program.
                </TableCell>
              </TableRow>
            ) : (
              filteredPrograms.map((program) => (
                <TableRow key={program.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.category || '-'}</TableCell>
                  <TableCell>{program.commission || '-'}</TableCell>
                  <TableCell>{program.cookie_duration || '-'}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      program.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' 
                        : program.status === 'Inactive'
                          ? 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'
                    }`}>
                      {program.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                        <Edit2 size={16} className="text-blue-500" />
                      </button>
                      <button className="p-1 hover:bg-secondary rounded-full transition-colors">
                        <Link size={16} className="text-gray-500" />
                      </button>
                      <button 
                        className="p-1 hover:bg-secondary rounded-full transition-colors"
                        onClick={() => handleDeleteProgram(program.id)}
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

export default AffiliateTable;
