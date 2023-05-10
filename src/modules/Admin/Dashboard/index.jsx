import React from 'react';
import { Outlet, Route, Routes, useResolvedPath } from 'react-router-dom';
import Blogs from '../Blog';

const Dashboard = () => {
  const url = useResolvedPath('').pathname;
  console.log(url);
  return (
    <div>
      Dashboard
      {/* <Routes>
        <Route path="blogs" element={<Blogs />} />
      </Routes> */}
    </div>
  );
};

export default Dashboard;
