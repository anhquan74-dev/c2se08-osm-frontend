import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerListPage from './pages/CustomerListPage';
import AddEditCustomerPage from './pages/AddEditCustomerPage';

const ManageCustomer = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<CustomerListPage />} />
        <Route path="add" element={<AddEditCustomerPage />} />
        <Route path=":customerId" element={<AddEditCustomerPage />} />
      </Routes>
    </>
  );
};

export default ManageCustomer;
