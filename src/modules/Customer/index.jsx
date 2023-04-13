import React from 'react';
import { Route, Routes, useResolvedPath } from 'react-router-dom';
import Home from './Home';
import FindingProvider from './FindingProvider';
import About from './About';
import News from './News';
import Profile from './Profile';
import CustomerAppoinment from './CustomerAppoinment';

const Customer = () => {
  const url = useResolvedPath('').pathname;
  console.log(url);
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="finding-provider/*" element={<FindingProvider />} />
      <Route path="about/*" element={<About />} />
      <Route path="blog/*" element={<News />} />
      <Route path="profile/*" element={<Profile />} />
      <Route path="appointment/*" element={<CustomerAppoinment />} />
    </Routes>
  );
};

export default Customer;
