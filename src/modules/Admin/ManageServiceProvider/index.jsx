import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProviderListPage from './pages/ProviderListPage';
import AddEditProviderPage from './pages/AddEditProviderPage';

const ManageServiceProvider = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<ProviderListPage />} />
        <Route path="add" element={<AddEditProviderPage />} />
        <Route path=":providerId" element={<AddEditProviderPage />} />
      </Routes>
    </>
  );
};

export default ManageServiceProvider;
