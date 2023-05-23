import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import CustomerForm from '../components/CustomerForm';
import customerApi from '../../../../api/customerApi';
import locationApi from '../../../../api/locationApi';
import moment from 'moment';
import { toast } from 'react-toastify';

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
    is_valid: 1,
    ...customer,
  };

  const handleCustomerFormSubmit = async (formValues, location) => {
    let user = {
      ...formValues,
      location: { ...location, is_primary: 1 },
    };
    console.log(formValues);

    const formData = new FormData();
    // for (const key in formValues) {
    //   if (Object.hasOwnProperty.call(formValues, key)) {
    //     const value = formValues[key];
    //     formData.append(key, value);
    //   }
    // }
    console.log(moment(user.birthday).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('phone_number', user.phone_number);
    formData.append('gender', user.gender);
    formData.append('birthday', moment(user.birthday).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('full_name', user.full_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('is_valid', user.is_valid);
    formData.append('location[address]', user.location.address);
    formData.append('location[province_name]', user.location.province_name);
    formData.append('location[district_name]', user.location.district_name);
    formData.append('location[country_name]', user.location.country_name);
    formData.append('location[coords_latitude]', user.location.coords_latitude);
    formData.append('location[coords_longitude]', user.location.coords_longitude);
    formData.append('location[is_primary]', user.location.is_primary);
    // Thêm avatar vào formData nếu có
    if (user.avatar && user.avatar instanceof File) {
      formData.append('avatar', user.avatar);
    }

    if (isEdit) {
      formData.append('id', user.id);
      await customerApi.update(formData);
      toast.success('Cập nhật thành công!');
    } else {
      await customerApi.add(formData);
      toast.success('Tạo mới thành công!');
    }

    navigate('/admin/customer');
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
