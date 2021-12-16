import { useAuthContext } from '../contexts/AuthContext';
import React from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute: React.FC = ({ children }) => {
  const { auth } = useAuthContext();
  if (!auth) return <Navigate to="/login" />;
  return <>{children}</>;
};
export default ProtectedRoute;
