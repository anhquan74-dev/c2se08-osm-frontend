import React from 'react';
import { Header } from '../components';

const ProviderLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-header pro-header">
        <Header />
      </div>
      <>{children}</>
    </div>
  );
};

export default ProviderLayout;
