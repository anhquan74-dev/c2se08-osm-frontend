import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageAppointment from './ManageAppointment';
import Information from './Information';

const ServiceProvider = () => {
  return (
    <Routes>
      {/* <Route path="" element={<Home />} /> */}
      <Route path="appointments/*" element={<ManageAppointment />} />
      <Route path="information/*" element={<Information />} />
    </Routes>
  );
};

export default ServiceProvider;
