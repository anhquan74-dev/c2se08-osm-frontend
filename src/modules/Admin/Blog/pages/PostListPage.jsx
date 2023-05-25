import { Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import PostFilters from '../components/PostFilters';
import PostTable from '../components/PostTable';
import { postList } from '../postList';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../ManageCustomer/customerSlice';
import { blogActions, getBlogs } from '../blogSlice';
import postApi from '../../../../api/postApi';
import { LIMIT_DEFAULT } from '../../../../utils/constants';

const PostListPage = () => {
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, loading, conditions } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs(conditions));
  }, [dispatch, conditions]);

  const handlePageChange = (e, page) => {
    dispatch(
      blogActions.setConditions({
        ...conditions,
        page: page,
      })
    );
  };

  const handleFilterChange = (conditions) => {
    dispatch(blogActions.setConditions(conditions));
  };

  const handleRemovePost = (post) => {
    (async () => {
      const res = await postApi.remove(post.id);
      console.log(res);
    })();
    dispatch(
      blogActions.setConditions({
        page: 1,
        limit: LIMIT_DEFAULT,
      })
    );
    console.log(post);
  };

  const handleEditPost = (post) => {
    navigate(`${url}/${post.id}`);
  };

  return (
    <Box sx={root}>
      {loading && <LinearProgress sx={isLoading} />}
      <Box sx={titleContainer}>
        <Typography variant="h4">Quản lý bài đăng</Typography>

        <Link to={`${url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Thêm mới
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <PostFilters conditions={conditions} onChange={handleFilterChange} />
      </Box>

      <PostTable postList={list.data} onRemove={handleRemovePost} onEdit={handleEditPost} />

      <Box sx={{ my: '16px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          color="primary"
          count={Math.ceil(list?.total / list?.per_page)}
          page={conditions.page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

const root = {
  position: 'relative',
  paddingTop: '8px',
};

const titleContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: '20px',
};

const isLoading = {
  position: 'absolute',
  width: '100%',
  top: '-8px',
};

export default PostListPage;
