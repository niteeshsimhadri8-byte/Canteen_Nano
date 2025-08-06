import React from 'react';
import { MenuItem } from '../../types';
import { IndianRupee } from 'lucide-react';

interface MenuItemSelectorProps {
  item: MenuItem;
  onToggle: (id: string, available: boolean) => void;
}

const MenuItemSelector: React.FC<MenuItemSelectorProps> = ({ item, onToggle }) => {
  const handleClick = () => {
    onToggle(item.id, !item.available);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        item.available
          ? 'bg-green-100 border-green-300 shadow-md'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-center space-x-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className={`font-semibold ${item.available ? 'text-green-800' : 'text-gray-700'}`}>
            {item.name}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-sm ${item.available ? 'text-green-600' : 'text-gray-500'}`}>
              {item.category}
            </span>
            <div className={`flex items-center ${item.available ? 'text-green-700' : 'text-gray-600'}`}>
              <IndianRupee className="h-4 w-4" />
              <span className="font-medium">{item.price}</span>
            </div>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          item.available
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 bg-white'
        }`}>
          {item.available && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemSelector;