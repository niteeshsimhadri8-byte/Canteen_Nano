import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import MenuGrid from '../components/HomePage/MenuGrid';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MenuGrid />
      <Footer />
    </div>
  );
};

export default HomePage;