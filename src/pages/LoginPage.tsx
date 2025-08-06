import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
  return (
    <div className="relative">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors z-10"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Menu
      </Link>
      <LoginForm />
    </div>
  );
};

export default LoginPage;