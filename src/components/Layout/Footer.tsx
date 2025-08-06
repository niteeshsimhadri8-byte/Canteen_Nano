import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Footer: React.FC = () => {
  const { canteenInfo } = useApp();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-start">
              <Phone className="h-5 w-5 mr-2" />
              Contact Information
            </h3>
            <p className="text-gray-300 mb-2">
              <span className="font-medium">Contact:</span> {canteenInfo.contact}
            </p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-center md:justify-end">
              <MessageSquare className="h-5 w-5 mr-2" />
              Queries & Complaints
            </h3>
            <p className="text-gray-300 mb-2">
              <span className="font-medium">Queries:</span> {canteenInfo.queries}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 JNTU K Student Canteen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;