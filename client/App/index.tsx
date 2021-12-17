import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import { theme } from '@/utils/theme';
import { AuthContextProvider } from '../contexts/AuthContext';
import './config';
import ProtectedRoute from './ProtectedRoute';

import InnerLayout from './InnerLayout';
import LogoutBtn from '@/components/LogoutBtn';

import Feed from '@/pages/Feed';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';

import Protected from '@/pages/Protected';
import Admin from '@/pages/Admin';

const publicRoutes = {
  '/': Feed,
  '/login': Login,
  '/register': Register,
};

const routes = {
  '/protected': Protected,
};

const adminRoutes = {
  '/admin': Admin,
};

const App: React.FC = () => (
  <AuthContextProvider>
    <ThemeProvider theme={theme}>
      <InnerLayout>
        <LogoutBtn />
        <Routes>
          {Object.entries(publicRoutes).map(([path, Page]) => (
            <Route path={path} key={path} element={<Page />} />
          ))}
          {Object.entries(routes).map(([path, Page]) => (
            <Route
              path={path}
              key={path}
              element={
                <ProtectedRoute path={path}>
                  <Page />
                </ProtectedRoute>
              }
            />
          ))}
          {Object.entries(adminRoutes).map(([path, Page]) => (
            <Route
              path={path}
              key={path}
              element={
                <ProtectedRoute admin path={path}>
                  <Page />
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </InnerLayout>
    </ThemeProvider>
  </AuthContextProvider>
);

export default App;
