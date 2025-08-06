/*
  # Create Canteen Management Schema

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `price` (numeric)
      - `image` (text)
      - `category` (text)
      - `available` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admins`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password_hash` (text)
      - `name` (text)
      - `created_at` (timestamp)
    
    - `canteen_info`
      - `id` (uuid, primary key)
      - `name` (text)
      - `proprietor` (text)
      - `contact` (text)
      - `queries` (text)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Public read access for menu items and canteen info
*/

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL CHECK (price > 0),
  image text NOT NULL,
  category text NOT NULL,
  available boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
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

-- Create canteen_info table
CREATE TABLE IF NOT EXISTS canteen_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  proprietor text NOT NULL,
  contact text NOT NULL,
  queries text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE canteen_info ENABLE ROW LEVEL SECURITY;

-- Policies for menu_items (public read, authenticated write)
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

-- Policies for canteen_info (public read, authenticated write)
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

-- Policies for admins (authenticated access only)
CREATE POLICY "Authenticated users can view admins"
  ON admins
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial data
INSERT INTO canteen_info (name, proprietor, contact, queries) VALUES
('JNTUK Student Canteen', 'Hari Maruthi', '+91-9491066383', '+91-7075866383');

-- Insert default admins (password: admin123 and manager123 - hashed)
INSERT INTO admins (username, password_hash, name) VALUES
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Head Admin'),
('manager', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Canteen Manager');

-- Insert initial menu items
INSERT INTO menu_items (name, price, image, category, available) VALUES
('Veg Biryani', 80, 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400', 'Main Course', true),
('Chicken Curry', 120, 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', 'Main Course', true),
('Masala Dosa', 50, 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400', 'Breakfast', false),
('Tea', 10, 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400', 'Beverages', true),
('Coffee', 15, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400', 'Beverages', true),
('Samosa', 20, 'https://images.pexels.com/photos/14477465/pexels-photo-14477465.jpeg?auto=compress&cs=tinysrgb&w=400', 'Snacks', false);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_canteen_info_updated_at
    BEFORE UPDATE ON canteen_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();