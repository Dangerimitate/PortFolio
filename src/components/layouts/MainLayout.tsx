import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const MainLayout: React.FC = () => {
  return (
    <div className="portfolio-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
