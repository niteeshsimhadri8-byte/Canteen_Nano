import React, { createContext, useContext, ReactNode } from 'react';
import { MenuItem, Admin, CanteenInfo } from '../types';
import { useMenuItems } from '../hooks/useMenuItems';
import { useCanteenInfo } from '../hooks/useCanteenInfo';
import { useAuth } from '../hooks/useAuth';

interface AppContextType {
  menuItems: MenuItem[];
  canteenInfo: CanteenInfo | null;
  currentAdmin: Admin | null;
  loading: boolean;
  error: string | null;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItemAvailability: (id: string, available: boolean) => void;
  deleteMenuItem: (id: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  refetch: () => void;
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
  const { 
    menuItems, 
    loading: menuLoading, 
    error: menuError, 
    addMenuItem, 
    updateMenuItemAvailability,
    deleteMenuItem,
    refetch 
  } = useMenuItems();
  
  const { canteenInfo, loading: infoLoading } = useCanteenInfo();
  const { currentAdmin, loading: authLoading, login, logout } = useAuth();

  const loading = menuLoading || infoLoading || authLoading;
  const error = menuError;

  return (
    <AppContext.Provider value={{
      menuItems,
      canteenInfo,
      currentAdmin,
      loading,
      error,
      addMenuItem,
      updateMenuItemAvailability,
      deleteMenuItem,
      login,
      logout,
      refetch
    }}>
      {children}
    </AppContext.Provider>
  );
};