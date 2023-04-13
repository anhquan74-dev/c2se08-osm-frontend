import { Button, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import CategoryFilters from '../components/CategoryFilters';
import CategoryTable from '../components/CategoryTable';
import { categoryList } from '../categoryList';

const CategoryListPage = () => {
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();

  const handlePageChange = () => {};

  const handleSearchChange = (filter) => {
    console.log('Search Change: ', filter);
    // call API
  };

  const handleRemoveCategory = (category) => {
    console.log(category);
  };

  const handleEditCategory = (category) => {
    navigate(`${url}/${category.id}`);
  };

  return (
    <Box sx={root}>
      <Box sx={titleContainer}>
        <Typography variant="h4">Quản lý danh mục</Typography>

        <Link to={`${url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Thêm mới
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <CategoryFilters onSearchChange={handleSearchChange} />
      </Box>

      <CategoryTable categoryList={categoryList} onRemove={handleRemoveCategory} onEdit={handleEditCategory} />

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

export default CategoryListPage;
