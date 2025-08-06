import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';

const AdminPage: React.FC = () => {
  const { currentAdmin } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentAdmin) {
      navigate('/login');
    }
  }, [currentAdmin, navigate]);

  if (!currentAdmin) {
    return null;
  }

  return <AdminDashboard />;
};

export default AdminPage;