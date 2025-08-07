/*
  # JNTU K Canteen Management System Database Schema

  1. New Tables
    - `canteen_info`
      - `id` (uuid, primary key)
      - `name` (text) - Canteen name
      - `proprietor` (text) - Proprietor name
      - `contact` (text) - Contact number
      - `queries` (text) - Queries contact number
      - `updated_at` (timestamp)

    - `admins`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password_hash` (text)
      - `name` (text) - Admin display name
      - `created_at` (timestamp)

    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text, unique) - Item name
      - `price` (numeric) - Item price
      - `image` (text) - Image URL
      - `category` (text) - Food category
      - `available` (boolean) - Availability status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on menu_items and canteen_info
    - Add policies for authenticated admin access
    - Add trigger for automatic updated_at timestamps

  3. Initial Data
    - Insert default canteen information
    - Insert demo admin accounts
    - Insert sample menu items
*/

-- Create update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create canteen_info table
CREATE TABLE IF NOT EXISTS canteen_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  proprietor text NOT NULL,
  contact text NOT NULL,
  queries text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  price numeric NOT NULL CHECK (price > 0),
  image text NOT NULL,
  category text NOT NULL,
  available boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE canteen_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for canteen_info
CREATE POLICY "Anyone can view canteen info"
  ON canteen_info
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update canteen info"
  ON canteen_info
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for admins
CREATE POLICY "Authenticated users can view admins"
  ON admins
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for menu_items
CREATE POLICY "Anyone can view menu items"
  ON menu_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert menu items"
  ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu items"
  ON menu_items
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete menu items"
  ON menu_items
  FOR DELETE
  TO authenticated
  USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_canteen_info_updated_at
  BEFORE UPDATE ON canteen_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial canteen information
INSERT INTO canteen_info (name, proprietor, contact, queries)
VALUES (
  'JNTU K Student Canteen',
  'Mr. Rajesh Kumar',
  '+91-9876543210',
  '+91-9876543211'
) ON CONFLICT DO NOTHING;

-- Insert demo admin accounts
INSERT INTO admins (username, password_hash, name)
VALUES 
  ('admin', 'admin123', 'Head Admin'),
  ('manager', 'manager123', 'Canteen Manager')
ON CONFLICT (username) DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (name, price, image, category, available)
VALUES 
  (
    'Veg Biryani',
    80,
    'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Main Course',
    true
  ),
  (
    'Chicken Curry',
    120,
    'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Main Course',
    true
  ),
  (
    'Masala Dosa',
    50,
    'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Breakfast',
    false
  ),
  (
    'Tea',
    10,
    'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Beverages',
    true
  ),
  (
    'Coffee',
    15,
    'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Beverages',
    true
  ),
  (
    'Samosa',
    20,
    'https://images.pexels.com/photos/14477465/pexels-photo-14477465.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Snacks',
    false
  )
ON CONFLICT (name) DO NOTHING;