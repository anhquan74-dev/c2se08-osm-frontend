import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FindingProviderPage from './pages/FindingProviderPage';
import ProviderDetail from './pages/ProviderDetail';

const FindingProvider = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<FindingProviderPage />} />
        <Route path=":providerId" element={<ProviderDetail />} />
      </Routes>
    </>
  );
};

export default FindingProvider;
