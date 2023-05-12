import { Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import { categoryActions, getCategoriesPagination } from '../categorySlice';
import CategoryFilters from '../components/CategoryFilters';
import CategoryTable from '../components/CategoryTable';

const CategoryListPage = () => {
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listPagination, conditions, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoriesPagination(conditions));
  }, [dispatch, conditions]);

  const handlePageChange = (e, page) => {
    dispatch(
      categoryActions.setConditions({
        ...conditions,
        page: page,
      })
    );
  };

  const handleFilterChange = (conditions) => {
    dispatch(categoryActions.setConditions(conditions));
  };

  const handleRemoveCategory = (category) => {
    const newCategory = {
      ...category,
      is_valid: 0,
    };
    // dispatch(postDeleteCategory(newCategory));
  };

  const handleEditCategory = (category) => {
    navigate(`${url}/${category.id}`);
  };

  return (
    <Box sx={root}>
      {loading && <LinearProgress sx={isLoading} />}
      <Box sx={titleContainer}>
        <Typography variant="h4">Quản lý danh mục</Typography>

        <Link to={`${url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Thêm mới
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <CategoryFilters conditions={conditions} onChange={handleFilterChange} />
      </Box>

      <CategoryTable categoryList={listPagination.data} onRemove={handleRemoveCategory} onEdit={handleEditCategory} />

      <Box sx={{ my: '16px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          color="primary"
          count={Math.ceil(listPagination?.total / listPagination?.per_page)}
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

export default CategoryListPage;
