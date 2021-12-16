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
import Logout from '@/pages/Auth/Logout';
import InnerLayout from './InnerLayout';

const publicRoutes = {
  '/': Feed,
  '/login': Login,
  '/logout': Logout,
};

const routes = {
  '/protected': Protected,
};

const App: React.FC = () => (
  <AuthContextProvider>
    <ThemeProvider theme={theme}>
      <InnerLayout>
        <Routes>
          {Object.entries(publicRoutes).map(([path, Page]) => (
            <Route path={path} key={path} element={<Page />} />
          ))}
          {Object.entries(routes).map(([path, Page]) => (
            <Route
              path={path}
              key={path}
              element={
                <ProtectedRoute>
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
