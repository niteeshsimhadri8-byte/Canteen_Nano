import { MenuItem, Admin, CanteenInfo } from '../types';

export const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Veg Biryani',
    price: 80,
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Main Course',
    available: true,
    addedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Chicken Curry',
    price: 120,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Main Course',
    available: true,
    addedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Masala Dosa',
    price: 50,
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Breakfast',
    available: false,
    addedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Tea',
    price: 10,
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Beverages',
    available: true,
    addedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Coffee',
    price: 15,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Beverages',
    available: true,
    addedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Samosa',
    price: 20,
    image: 'https://images.pexels.com/photos/14477465/pexels-photo-14477465.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Snacks',
    available: false,
    addedAt: new Date().toISOString()
  }
];

export const defaultAdmins: Admin[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Head Admin'
  },
  {
    id: '2',
    username: 'manager',
    password: 'manager123',
    name: 'Canteen Manager'
  }
];

export const canteenInfo: CanteenInfo = {
  name: 'JNTU K Student Canteen',
  proprietor: 'Mr. Rajesh Kumar',
  contact: '+91-9876543210',
  queries: '+91-9876543211'
};