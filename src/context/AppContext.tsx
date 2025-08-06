import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, Admin, CanteenInfo } from '../types';
import { initialMenuItems, defaultAdmins, canteenInfo } from '../data/initialData';

interface AppContextType {
  menuItems: MenuItem[];
  admins: Admin[];
  canteenInfo: CanteenInfo;
  currentAdmin: Admin | null;
  lastUpdated: string;
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItemAvailability: (id: string, available: boolean) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateLastModified: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItemsState] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('menuItems');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [admins] = useState<Admin[]>(defaultAdmins);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(() => {
    const saved = localStorage.getItem('currentAdmin');
    return saved ? JSON.parse(saved) : null;
  });

  const [lastUpdated, setLastUpdated] = useState<string>(() => {
    const saved = localStorage.getItem('lastUpdated');
    return saved || new Date().toISOString();
  });

  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));
  }, [currentAdmin]);

  useEffect(() => {
    localStorage.setItem('lastUpdated', lastUpdated);
  }, [lastUpdated]);

  const setMenuItems = (items: MenuItem[]) => {
    setMenuItemsState(items);
    updateLastModified();
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      addedAt: new Date().toISOString()
    };
    setMenuItems([...menuItems, newItem]);
  };

  const updateMenuItemAvailability = (id: string, available: boolean) => {
    const updatedItems = menuItems.map(item =>
      item.id === id ? { ...item, available } : item
    );
    setMenuItems(updatedItems);
  };

  const login = (username: string, password: string): boolean => {
    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
      setCurrentAdmin(admin);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentAdmin(null);
  };

  const updateLastModified = () => {
    setLastUpdated(new Date().toISOString());
  };

  return (
    <AppContext.Provider value={{
      menuItems,
      admins,
      canteenInfo,
      currentAdmin,
      lastUpdated,
      setMenuItems,
      addMenuItem,
      updateMenuItemAvailability,
      login,
      logout,
      updateLastModified
    }}>
      {children}
    </AppContext.Provider>
  );
};