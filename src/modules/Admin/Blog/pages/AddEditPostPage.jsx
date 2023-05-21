import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import PostForm from '../components/PostForm';
import postApi from '../../../../api/postApi';
import { toast } from 'react-toastify';
import moment from 'moment';

const AddEditPostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEdit = Boolean(postId);

  const [post, setPost] = useState();

  // call API
  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const res = await postApi.get(postId);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const initialValues = {
    title: '',
    content: '',
    image: '',
    is_valid: 1,
    date: '',
    category_id: 1,
    ...post,
  };

  const handlePostFormSubmit = async (post) => {
    console.log(post);

    const formData = new FormData();
    formData.append('category_id', post.category_id);
    formData.append('content', post.content);
    formData.append('date', moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('title', post.title);
    formData.append('is_valid', post.is_valid);

    if (post.image && post.image instanceof File) {
      formData.append('image', post.image);
    }

    if (isEdit) {
      formData.append('id', post.id);
      await postApi.update(formData);
      toast.success('Cập nhật thành công!');
    } else {
      await postApi.add(formData);
      toast.success('Tạo mới thành công!');
    }

    navigate('/admin/post');
  };

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
          <PostForm initialValues={initialValues} onSubmit={handlePostFormSubmit} isEdit={isEdit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditPostPage;
