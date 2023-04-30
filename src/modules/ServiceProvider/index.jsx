import React from 'react';
import { Route, Routes } from 'react-router-dom';

const ServiceProvider = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="finding-provider/*" element={<FindingProvider />} />
      <Route path="about/*" element={<About />} />
      <Route path="blog/*" element={<News />} />
      <Route path="me/*" element={<Me />} />
      <Route path="appointment-request-form/*" element={<AppointmentRequest />} />
    </Routes>
  );
};

export default ServiceProvider;
