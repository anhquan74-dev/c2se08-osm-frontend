import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import CategoryForm from '../components/CategoryForm';
import categoryApi from '../../../../api/categoryApi';
import { toast } from 'react-toastify';

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
    if (isEdit) {
      await categoryApi.update(formValues);
      toast.success('Cập nhật thành công!');
    } else {
      console.log(formValues);
      await categoryApi.add(formValues);
      toast.success('Tạo mới thành công!');
    }

    navigate('/admin/category');
  };

  return (
    <Box>
      <Link to={'/admin/category'}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft />
          <Box>Trở về trang quản lý bài đăng</Box>
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Chỉnh sửa thông tin bài đăng' : 'Thêm mới bài đăng'}</Typography>
      {(!isEdit || Boolean(category)) && (
        <Box mt={3}>
          <CategoryForm initialValues={initialValues} onSubmit={handleCategoryFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditCategoryPage;
