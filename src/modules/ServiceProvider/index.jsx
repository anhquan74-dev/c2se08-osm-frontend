import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Information from './Information';
import ManageAppointment from './ManageAppointment';
import ManagePackage from './ManagePackage';
import ManageService from './ManageService';
import ServiceDetail from './ManageService/ServiceDetail';
import EditProfile from './EditProfile';
import Home from './Home';
import Chat from './Chat';
import CommentAnalysis from './CommentAnalysis';

const ServiceProvider = () => {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="appointments/*" element={<ManageAppointment />} />
      <Route path="information/*" element={<Information />} />
      <Route path="edit-profile/*" element={<EditProfile />} />
      <Route path="services/*" element={<ManageService />} />
      <Route path="services/:service_id" element={<ServiceDetail />} />
      <Route path="packages/*" element={<ManagePackage />} />
      <Route path="chat/*" element={<Chat />} />
      <Route path="comment-analysis/*" element={<CommentAnalysis />} />
      {/* <Route path="packages/:package_id" element={<AddEditPackagePage />} />
      <Route path="packages/add" element={<AddEditPackagePage />} /> */}
    </Routes>
  );
};

export default ServiceProvider;
