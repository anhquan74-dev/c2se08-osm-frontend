import React from 'react';
import { Route, Routes, useResolvedPath } from 'react-router-dom';
import About from './About';
import AppointmentRequest from './AppointmentRequest';
import FindingProvider from './FindingProvider';
import Home from './Home';
import Me from './Me';
import News from './News';
import ElasticSearch from './ElasticSearch';

const Customer = () => {
  const url = useResolvedPath('').pathname;
  console.log(url);
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="finding-provider/*" element={<FindingProvider />} />
      <Route path="about/*" element={<About />} />
      <Route path="blog/*" element={<News />} />
      <Route path="me/*" element={<Me />} />
      <Route path="appointment-request-form/*" element={<AppointmentRequest />} />
      <Route path="elastic-search/*" element={<ElasticSearch />} />
    </Routes>
  );
};

export default Customer;
