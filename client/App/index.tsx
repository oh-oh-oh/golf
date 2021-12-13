import React from 'react';
import './config';
import { Routes, Route } from 'react-router-dom';

import Feed from '@/pages/Feed';

const routes = {
  '/': Feed,
  '/login': Feed,
  '/feed': Feed,
};

const App: React.FC = () => (
  <Routes>
    {Object.entries(routes).map(([path, Page]) => (
      <Route path={path} key={path} element={<Feed />} />
    ))}
  </Routes>
);

export default App;
