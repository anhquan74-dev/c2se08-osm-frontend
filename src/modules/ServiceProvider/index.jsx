import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import AppointmentManagement from './AppointmentManagement';
import About from './About';
import EditIdentityCard from './EditIdentityCard';
import EditProfile from './EditProfile';

const ServiceProvider = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="appointment-management/*" element={<AppointmentManagement />} />
      <Route path="edit-profile/*" element={<EditProfile />} />
      <Route path="edit-identify-card/*" element={<EditIdentityCard />} />
      <Route path="about/*" element={<About />} />
    </Routes>
  );
};

export default ServiceProvider;
