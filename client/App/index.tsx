import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import { theme } from '@/utils/theme';
import { AuthContextProvider } from '../contexts/AuthContext';
import './config';
import ProtectedRoute from './ProtectedRoute';

import Feed from '@/pages/Feed';
import Protected from '@/pages/Protected';
import Login from '@/pages/Auth/Login';
import InnerLayout from './InnerLayout';
import Admin from '@/pages/Admin';
import LogoutBtn from '@/components/LogoutBtn';

const publicRoutes = {
  '/': Feed,
  '/login': Login,
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
