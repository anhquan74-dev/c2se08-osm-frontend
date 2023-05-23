import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import ProviderForm from '../components/ProviderForm';
import providerApi from '../../../../api/providerApi';
import { toast } from 'react-toastify';
import locationApi from '../../../../api/locationApi';
import moment from 'moment';

const AddEditProviderPage = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();
  const isEdit = Boolean(providerId);

  const [provider, setProvider] = useState();

  // call API
  useEffect(() => {
    if (!providerId) return;
    (async () => {
      try {
        const res = await providerApi.get(providerId);
        setProvider(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(provider);
  const initialValues = {
    email: '',
    password: undefined,
    full_name: '',
    birthday: '',
    gender: 'male',
    phone_number: '',
    avatar: '',
    introduction: '',
    is_valid: 1,
    is_favorite: '',
    is_working: '',
    total_rate: '',
    total_star: '',
    avg_star: '',
    clicks: '',
    views: '',
    click_rate: '',
    ...provider,
  };

  const handleProviderFormSubmit = async (formValues, location) => {
    let user = {
      ...formValues,
      location: { ...location, is_primary: 1 },
    };
    console.log(formValues);
    const formData = new FormData();
    formData.append('phone_number', user.phone_number);
    formData.append('gender', user.gender);
    formData.append('birthday', moment(user.birthday).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('full_name', user.full_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('is_valid', user.is_valid);
    formData.append('introduction', user.introduction);
    formData.append('location[address]', user.location.address);
    formData.append('location[province_name]', user.location.province_name);
    formData.append('location[district_name]', user.location.district_name);
    formData.append('location[country_name]', user.location.country_name);
    formData.append('location[coords_latitude]', user.location.coords_latitude);
    formData.append('location[coords_longitude]', user.location.coords_longitude);
    formData.append('location[is_primary]', user.location.is_primary);
    formData.append('is_favorite', user.is_favorite);
    formData.append('is_working', user.is_working);
    formData.append('total_rate', user.total_rate);
    formData.append('total_star', user.total_star);
    formData.append('avg_star', user.avg_star);
    formData.append('clicks', user.clicks);
    formData.append('views', user.views);
    formData.append('click_rate', user.click_rate);
    // Thêm avatar vào formData nếu có
    if (user.avatar && user.avatar instanceof File) {
      formData.append('avatar', user.avatar);
    }

    if (user.banner) {
      for (let i = 0; i < user.banner.length; i++) {
        formData.append('banner[]', user.banner[i]);
      }
    }

    if (isEdit) {
      formData.append('id', user.id);
      await providerApi.update(formData);
      toast.success('Cập nhật thành công!');
    } else {
      await providerApi.add(formData);
      toast.success('Tạo mới thành công!');
    }

    navigate('/admin/provider');
  };

  return (
    <Box>
      <Link to={'/admin/provider'}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft />
          <Box>Trở về trang quản lý thợ</Box>
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Chỉnh sửa thông tin thợ' : 'Thêm mới thợ'}</Typography>
      {(!isEdit || Boolean(provider)) && (
        <Box mt={3}>
          <ProviderForm initialValues={initialValues} onSubmit={handleProviderFormSubmit} isEdit={isEdit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditProviderPage;
