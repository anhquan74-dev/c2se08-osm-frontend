import React from 'react';
import { Navigate, Route, Routes, useResolvedPath } from 'react-router-dom';
import Blog from './Blog';
import Category from './Category';
import CommentAnalysis from './CommentAnalysis';
import Dashboard from './Dashboard';
import ManageCustomer from './ManageCustomer';
import ManageServiceProvider from './ManageServiceProvider';

const Admin = () => {
  const url = useResolvedPath('').pathname;
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="dashboard/*" element={<Dashboard />} />
      <Route path="customer/*" element={<ManageCustomer />} />
      <Route path="provider/*" element={<ManageServiceProvider />} />
      <Route path="category/*" element={<Category />} />
      <Route path="post/*" element={<Blog />} />
      <Route path="comment-analysis/*" element={<CommentAnalysis />} />
    </Routes>
  );
};

export default Admin;
