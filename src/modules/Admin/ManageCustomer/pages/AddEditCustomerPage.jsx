import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import CustomerForm from '../components/CustomerForm';

const AddEditCustomerPage = () => {
  const { customerId } = useParams();
  const isEdit = Boolean(customerId);

  const [customer, setCustomer] = useState();

  // call API
  // useEffect(() => {}, []);
  const initialValues = {
    email: 'nguyenvanteo@gmail.com',
    full_name: 'Nguyen Van Teo',
    birthday: '1/1/2001',
    gender: 'male',
    phone_number: '0983742843',
    location: 'Hai Chau, Da Nang',
    ...customer,
  };

  const handleCustomerFormSubmit = () => {};

  return (
    <Box>
      <Link to={'/admin/customer'}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft />
          <Box>Trở về trang quản lý khách hàng</Box>
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Chỉnh sửa thông tin khách hàng' : 'Thêm mới khách hàng'}</Typography>
      {(!isEdit || Boolean(customer)) && (
        <Box mt={3}>
          <CustomerForm initialValues={initialValues} onSubmit={handleCustomerFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditCustomerPage;
