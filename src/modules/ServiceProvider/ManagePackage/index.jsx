import React from 'react';
import './ManagePackage.scss';
import { Route, Routes } from 'react-router-dom';
import AddEditPackagePage from './pages/AddEditPackagePage';
import PackageDetailPage from './pages/PackageDetailPage';

const ManagePackage = () => {
  return (
    <Routes>
      <Route path=":package_id" element={<AddEditPackagePage />} />
      <Route path="add" element={<AddEditPackagePage />} />
      <Route path=":package_id/view" element={<PackageDetailPage />} />
    </Routes>
  );
};

export default ManagePackage;
