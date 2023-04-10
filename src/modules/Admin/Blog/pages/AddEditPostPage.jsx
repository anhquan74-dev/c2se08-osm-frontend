import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import PostForm from '../components/PostForm';

const AddEditPostPage = () => {
  const { postId } = useParams();
  const isEdit = Boolean(postId);

  const [post, setPost] = useState();

  // call API
  // useEffect(() => {}, []);
  const initialValues = {
    title: 'Những lưu ý khi thiết kế và thi công nhà cửa',
    content: 'abc',
    image: '98324380.png',
    valid_flag: 1,
    date: '03/04/2023',
    category_id: 1,
    ...post,
  };

  const handlePostFormSubmit = () => {};

  return (
    <Box>
      <Link to={'/admin/post'}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ChevronLeft />
          <Box>Trở về trang quản lý bài đăng</Box>
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Chỉnh sửa thông tin bài đăng' : 'Thêm mới bài đăng'}</Typography>
      {(!isEdit || Boolean(post)) && (
        <Box mt={3}>
          <PostForm initialValues={initialValues} onSubmit={handlePostFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditPostPage;
