import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MenuItemSelector from './MenuItemSelector';
import AddItemForm from './AddItemForm';
import { LogOut, Plus, Save, Clock, BarChart3, Home } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { 
    menuItems, 
    currentAdmin, 
    logout, 
    updateMenuItemAvailability,
    loading,
    error,
    deleteMenuItem
  } = useApp();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  const stats = useMemo(() => {
    const total = menuItems.length;
    const available = menuItems.filter(item => item.available).length;
    const unavailable = total - available;
    
    return { total, available, unavailable };
  }, [menuItems]);

  const categorizedItems = useMemo(() => {
    const categories = [...new Set(menuItems.map(item => item.category))];
    return categories.map(category => ({
      category,
      items: menuItems.filter(item => item.category === category)
    }));
  }, [menuItems]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleToggleItem = (id: string, available: boolean) => {
    updateMenuItemAvailability(id, available);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMenuItem(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome, {currentAdmin?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                View Homepage
              </Link>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unavailable</p>
                <p className="text-2xl font-bold text-red-600">{stats.unavailable}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center text-blue-800">
            <Clock className="h-5 w-5 mr-2" />
            <span className="text-sm">
              Real-time database connection active - changes sync instantly
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Menu Items Management
          </h2>
          <p className="text-gray-600 mb-6">
            Click on items to toggle their availability. Green items are currently available to customers.
          </p>
          
          <div className="space-y-8">
            {categorizedItems.map(({ category, items }) => (
              <div key={category}>
                <h3 className="text-lg font-medium text-gray-700 mb-4 border-l-4 border-blue-500 pl-3">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map(item => (
                    <MenuItemSelector
                      key={item.id}
                      item={item}
                      onToggle={handleToggleItem}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AddItemForm isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
    </div>
  );
};

export default AdminDashboard;