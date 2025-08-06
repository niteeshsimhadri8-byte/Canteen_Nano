import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import MenuCard from './MenuCard';
import { Clock } from 'lucide-react';

const MenuGrid: React.FC = () => {
  const { menuItems, lastUpdated } = useApp();

  const availableItems = useMemo(() => 
    menuItems.filter(item => item.available),
    [menuItems]
  );

  const categorizedItems = useMemo(() => {
    const categories = [...new Set(availableItems.map(item => item.category))];
    return categories.map(category => ({
      category,
      items: availableItems.filter(item => item.category === category)
    }));
  }, [availableItems]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Available Menu</h2>
        <div className="flex items-center justify-center text-sm text-gray-600 bg-blue-50 rounded-lg px-4 py-2 inline-flex">
          <Clock className="h-4 w-4 mr-2" />
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      </div>

      {availableItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">No Items Available</h3>
            <p className="text-yellow-600">Please check back later for menu updates.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {categorizedItems.map(({ category, items }) => (
            <div key={category}>
              <h3 className="text-2xl font-bold text-gray-700 mb-6 border-l-4 border-blue-500 pl-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MenuGrid;