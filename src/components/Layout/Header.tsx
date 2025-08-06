import React from 'react';
import { ChefHat, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const { canteenInfo, loading } = useApp();

  if (loading || !canteenInfo) {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-blue-500 rounded w-64 mb-2"></div>
            <div className="h-4 bg-blue-500 rounded w-48"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ChefHat className="h-10 w-10 text-yellow-300" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{canteenInfo.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <User className="h-4 w-4 text-blue-200" />
                <p className="text-blue-200 text-sm">Proprietor: {canteenInfo.proprietor}</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <p className="text-blue-200 text-sm">Contact</p>
              <p className="font-semibold">{canteenInfo.contact}</p>
            </div>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
              title="Admin Login"
            >
              <Settings className="h-4 w-4" />
              <span className="font-medium">Admin Login</span>
            </Link>
          </div>
          
          {/* Mobile Admin Login */}
          <div className="md:hidden">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              title="Admin Login"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;