import React from 'react';
import { Footer, Header } from '../components';

const ProviderLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-header pro-header">
        <Header />
      </div>
      <>{children}</>
      <div className="main-footer">
        <Footer />
      </div>
    </div>
  );
};

export default ProviderLayout;
