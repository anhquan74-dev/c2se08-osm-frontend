import React from 'react';
import { Footer, Header } from '../components';
import './MainLayout.scss';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-header">
        <Header />
      </div>
      <div className="customer-content">{children}</div>
      <div className="main-footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
