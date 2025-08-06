import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CanteenInfo } from '../types';

export const useCanteenInfo = () => {
  const [canteenInfo, setCanteenInfo] = useState<CanteenInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCanteenInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('canteen_info')
        .select('*')
        .single();

      if (error) throw error;

      setCanteenInfo({
        name: data.name,
        proprietor: data.proprietor,
        contact: data.contact,
        queries: data.queries
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch canteen info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCanteenInfo();
  }, []);

  return { canteenInfo, loading, error };
};