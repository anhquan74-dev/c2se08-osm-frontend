import { Box } from '@mui/material';
import React from 'react';
import AdminHeader from '../components/AdminHeader';
import { Sidebar } from '../components/index';

const AdminLayout = ({ children }) => {
  console.log(children);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={header}>
        <AdminHeader />
      </Box>
      <Box sx={sidebar}>
        <Sidebar />
      </Box>
      <Box sx={main}>{children}</Box>
    </Box>
  );
};

const header = {
  height: '52px',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
};

const sidebar = {
  width: '240px',
  position: 'fixed',
  top: '52px',
  left: '0',
  bottom: '0',
  borderRight: '1px solid #e0e0e0',
};

const main = {
  display: 'block',
  ml: '240px',
  padding: '80px 20px',
};

export default AdminLayout;
