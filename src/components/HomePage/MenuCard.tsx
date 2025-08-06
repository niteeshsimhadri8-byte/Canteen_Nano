import React from 'react';
import { MenuItem } from '../../types';
import { Clock, IndianRupee } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.available 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {item.available ? 'Available' : 'Not Available'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <div className="flex items-center text-green-600 font-bold">
            <IndianRupee className="h-4 w-4" />
            <span>{item.price}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
            {item.category}
          </span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{new Date(item.addedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;