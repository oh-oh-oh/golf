import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import Feed from '@/pages/Feed';
import Protected from '@/pages/Protected';
import Login from '@/pages/Auth/Login';
import { theme } from '@/utils/theme';
import './config';

const routes = {
  '/': Feed,
  '/login': Login,
  '/protected': Protected,
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Routes>
      {Object.entries(routes).map(([path, Page]) => (
        <Route path={path} key={path} element={<Page />} />
      ))}
    </Routes>
  </ThemeProvider>
);

export default App;
