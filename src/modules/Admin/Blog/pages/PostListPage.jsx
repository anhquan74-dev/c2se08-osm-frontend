import { Button, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import PostFilters from '../components/PostFilters';
import PostTable from '../components/PostTable';
import { postList } from '../postList';

const PostListPage = () => {
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();

  const handlePageChange = () => {};

  const handleSearchChange = (filter) => {
    console.log('Search Change: ', filter);
    // call API
  };

  const handleRemovePost = (post) => {
    console.log(post);
  };

  const handleEditPost = (post) => {
    navigate(`${url}/${post.id}`);
  };

  return (
    <Box sx={root}>
      <Box sx={titleContainer}>
        <Typography variant="h4">Quản lý bài đăng</Typography>

        <Link to={`${url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Thêm mới
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <PostFilters onSearchChange={handleSearchChange} />
      </Box>

      <PostTable postList={postList} onRemove={handleRemovePost} onEdit={handleEditPost} />

      <Box sx={{ my: '16px', display: 'flex', justifyContent: 'center' }}>
        <Pagination color="primary" count={10} page={1} onChange={handlePageChange} />
      </Box>
      {/* <Pagination
        count={Math.ceil(pagination?.total_rows / pagination?.limit)}
        page={pagination?.page}
        onChange={handlePageChange}
      /> */}
      {/* // totalRows // limit // totalPages = Math.ceil(totalRows / limit) */}
    </Box>
  );
};

const root = {};

const titleContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: '20px',
};

export default PostListPage;
