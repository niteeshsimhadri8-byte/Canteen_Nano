import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MenuItem } from '../types';

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedItems: MenuItem[] = data.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        available: item.available,
        addedAt: item.created_at
      }));

      setMenuItems(formattedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id' | 'addedAt'>) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .insert({
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          available: item.available
        });

      if (error) throw error;
      await fetchMenuItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
    }
  };

  const updateMenuItemAvailability = async (id: string, available: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ available })
        .eq('id', id);

      if (error) throw error;
      await fetchMenuItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    }
  };

  const deleteMenuItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchMenuItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  useEffect(() => {
    fetchMenuItems();

    // Set up real-time subscription
    const subscription = supabase
      .channel('menu_items_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'menu_items' },
        () => {
          fetchMenuItems();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    menuItems,
    loading,
    error,
    addMenuItem,
    updateMenuItemAvailability,
    deleteMenuItem,
    refetch: fetchMenuItems
  };
};