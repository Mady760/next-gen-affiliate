
import { supabase } from '@/lib/supabase';

export interface AffiliateProgram {
  id: string;
  name: string;
  description?: string;
  category?: string;
  commission?: string;
  cookie_duration?: string;
  payment_threshold?: string;
  status: 'Active' | 'Inactive' | 'Pending';
  website?: string;
  logo?: string;
  rating?: number;
  user_id: string;
}

export const fetchAffiliatePrograms = async (): Promise<AffiliateProgram[]> => {
  const { data, error } = await supabase
    .from('affiliate_programs')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching affiliate programs:', error);
    throw error;
  }
  
  return data || [];
};

export const createAffiliateProgram = async (program: Omit<AffiliateProgram, 'id'>): Promise<AffiliateProgram> => {
  const { data, error } = await supabase
    .from('affiliate_programs')
    .insert([program])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating affiliate program:', error);
    throw error;
  }
  
  return data;
};

export const updateAffiliateProgram = async (id: string, program: Partial<AffiliateProgram>): Promise<AffiliateProgram> => {
  const { data, error } = await supabase
    .from('affiliate_programs')
    .update(program)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating affiliate program:', error);
    throw error;
  }
  
  return data;
};

export const deleteAffiliateProgram = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('affiliate_programs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting affiliate program:', error);
    throw error;
  }
};
