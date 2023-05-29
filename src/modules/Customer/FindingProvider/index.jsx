import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FindingProviderPage from './pages/FindingProviderPage';
import ProviderDetailPage from './pages/ProviderDetailPage';

const FindingProvider = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<FindingProviderPage />} />
        <Route path=":providerId" element={<ProviderDetailPage />} />
      </Routes>
    </>
  );
};

export default FindingProvider;
