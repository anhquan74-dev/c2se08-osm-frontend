import React from 'react';
import ProviderFilter from '../components/ProviderFilter';
import ProviderSort from '../components/ProviderSort';
import './FindingProviderPage.scss';

const FindingProviderPage = () => {
  return (
    <div className="finding-provider container">
      <div className="provider-sort">
        <ProviderSort />
      </div>
      <div className="provider-filter">
        <ProviderFilter />
      </div>
      <div className="provider-main">main content</div>
    </div>
  );
};

export default FindingProviderPage;
