import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Admin } from '../types';

export const useAuth = () => {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Fetch admin details
        const { data } = await supabase
          .from('admins')
          .select('*')
          .eq('username', session.user.email?.split('@')[0])
          .single();
        
        if (data) {
          setCurrentAdmin({
            id: data.id,
            username: data.username,
            password: '', // Don't store password
            name: data.name
          });
        }
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setCurrentAdmin(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll use simple authentication
      // In production, you'd want proper password hashing
      const { data } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single();

      if (data && (password === 'admin123' || password === 'manager123')) {
        // Sign in with Supabase Auth using a dummy email
        const { error } = await supabase.auth.signInWithPassword({
          email: `${username}@canteen.local`,
          password: 'dummypassword123'
        });

        if (!error) {
          setCurrentAdmin({
            id: data.id,
            username: data.username,
            password: '',
            name: data.name
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentAdmin(null);
  };

  return { currentAdmin, loading, login, logout };
};