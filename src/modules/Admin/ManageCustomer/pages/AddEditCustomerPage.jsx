import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import CustomerForm from '../components/CustomerForm';
import customerApi from '../../../../api/customerApi';
import locationApi from '../../../../api/locationApi';

const AddEditCustomerPage = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const isEdit = Boolean(customerId);

  const [customer, setCustomer] = useState();

  // call API
  useEffect(() => {
    if (!customerId) return;
    (async () => {
      try {
        const res = await customerApi.get(customerId);
        setCustomer(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(customer);
  const initialValues = {
    email: '',
    password: '',
    full_name: '',
    birthday: '',
    gender: 'male',
    phone_number: '',
    avatar: '',
    is_valid: '',
    ...customer,
  };

  const handleCustomerFormSubmit = async (formValues, location) => {
    // const newLocation = {
    //   id: formValues.location[0].id,
    //   user_id: formValues.id,
    //   is_primary: 1,
    //   ...location,
    // };
    formValues = {
      ...formValues,
      location: { ...location, is_primary: 1 },
    };
    const formData = new FormData();
    for (const key in formValues) {
      if (Object.hasOwnProperty.call(formValues, key)) {
        const value = formValues[key];
        formData.append(key, value);
      }
    }
    // for (const [key, value] of formData) {
    //   console.log(`${key}: ${value}`);
    // }

    if (isEdit) {
      await customerApi.update(formData);
      toast.success('Cập nhật thành công!');
    } else {
      await customerApi.add(formData);
      toast.success('Tạo mới thành công!');
    }

    // navigate('/admin/customer');
  };

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
          <CustomerForm initialValues={initialValues} onSubmit={handleCustomerFormSubmit} isEdit={isEdit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditCustomerPage;
