import { ChevronLeft } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import categoryApi from '../../../../api/categoryApi';
import CategoryForm from '../components/CategoryForm';

const AddEditCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const isEdit = Boolean(categoryId);

  const [category, setCategory] = useState();

  // call API
  useEffect(() => {
    if (!categoryId) return;
    (async () => {
      try {
        const res = await categoryApi.get(categoryId);
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const initialValues = {
    name: '',
    logo: '',
    total_provider: 0,
    view_priority: '',
    is_valid: 1,
    ...category,
  };

  const handleCategoryFormSubmit = async (formValues) => {
    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('view_priority', formValues.view_priority);
    formData.append('is_valid', formValues.is_valid);

    if (formValues.logo && formValues.logo instanceof File) {
      formData.append('logo', formValues.logo);
    }
    if (isEdit) {
      formData.append('id', formValues.id);
      await categoryApi.update(formData);
      toast.success('Cập nhật thành công!');
    } else {
      console.log(formValues);
      await categoryApi.add(formData);
      toast.success('Tạo mới thành công!');
    }
    navigate('/admin/category');
  };

  return (
    <Box>
      <Link to={'/admin/category'}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft />
          <Box>Trở về trang quản lý danh mục</Box>
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Chỉnh sửa thông tin danh mục' : 'Thêm mới danh mục'}</Typography>
      {(!isEdit || Boolean(category)) && (
        <Box mt={3}>
          <CategoryForm initialValues={initialValues} onSubmit={handleCategoryFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditCategoryPage;
