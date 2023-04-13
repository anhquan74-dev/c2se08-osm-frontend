import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import CategoryForm from '../components/CategoryForm';

const AddEditCategoryPage = () => {
  const { categoryId } = useParams();
  const isEdit = Boolean(categoryId);

  const [category, setCategory] = useState();

  // call API
  // useEffect(() => {}, []);
  const initialValues = {
    title: 'Những lưu ý khi thiết kế và thi công nhà cửa',
    content: 'abc',
    image: '98324380.png',
    valid_flag: 1,
    date: '03/04/2023',
    category_id: 1,
    ...category,
  };

  const handleCategoryFormSubmit = () => {};

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
