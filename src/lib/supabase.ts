import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: string;
          name: string;
          price: number;
          image: string;
          category: string;
          available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          image: string;
          category: string;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          image?: string;
          category?: string;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      admins: {
        Row: {
          id: string;
          username: string;
          password_hash: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          password_hash: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          password_hash?: string;
          name?: string;
          created_at?: string;
        };
      };
      canteen_info: {
        Row: {
          id: string;
          name: string;
          proprietor: string;
          contact: string;
          queries: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          proprietor: string;
          contact: string;
          queries: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          proprietor?: string;
          contact?: string;
          queries?: string;
          updated_at?: string;
        };
      };
    };
  };
}