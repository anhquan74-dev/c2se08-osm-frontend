import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import ProviderForm from '../components/ProviderForm';
import providerApi from '../../../../api/providerApi';
import { toast } from 'react-toastify';
import locationApi from '../../../../api/locationApi';

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
        setProvider(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(provider);
  const initialValues = {
    email: '',
    full_name: '',
    birthday: '',
    gender: 'male',
    phone_number: '',
    avatar: '',
    introduction: '',
    is_valid: '',
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
    const newLocation = {
      id: formValues.location[0].id,
      user_id: formValues.id,
      is_primary: 1,
      ...location,
    };
    console.log(formValues, newLocation);
    if (isEdit) {
      await providerApi.update(formValues);
      await locationApi.updateLocation(newLocation);
      toast.success('Cập nhật thành công!');
    } else {
      await providerApi.add(formValues);
      await locationApi.createLocation({ user_id: formValues.id, is_primary: 1, ...location });
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
