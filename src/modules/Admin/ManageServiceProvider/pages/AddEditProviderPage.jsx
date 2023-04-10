import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import ProviderForm from '../components/ProviderForm';

const AddEditProviderPage = () => {
  const { providerId } = useParams();
  const isEdit = Boolean(providerId);

  const [provider, setProvider] = useState();

  // call API
  // useEffect(() => {}, []);
  const initialValues = {
    email: 'nguyenvanteo@gmail.com',
    full_name: 'Nguyen Van Teo',
    birthday: '1/1/2001',
    gender: 'male',
    phone_number: '0983742843',
    location: 'Hai Chau, Da Nang',
    ...provider,
  };

  const handleProviderFormSubmit = () => {};

  return (
    <Box>
      <Link to={'/admin/provider'}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft />
          <Box>Trở về trang quản lý khách hàng</Box>
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Chỉnh sửa thông tin khách hàng' : 'Thêm mới khách hàng'}</Typography>
      {(!isEdit || Boolean(provider)) && (
        <Box mt={3}>
          <ProviderForm initialValues={initialValues} onSubmit={handleProviderFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditProviderPage;
