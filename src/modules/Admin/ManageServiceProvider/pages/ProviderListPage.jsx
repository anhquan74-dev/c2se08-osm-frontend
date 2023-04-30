import { Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import ProviderFilters from '../components/ProviderFilters';
import ProviderTable from '../components/ProviderTable';
import { getProviders, postDeleteProvider, providerActions } from '../providerSlice';

const ProviderListPage = () => {
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const providerResponse = useSelector((state) => state.provider.list);
  const conditions = useSelector((state) => state.provider.conditions);
  const loading = useSelector((state) => state.provider.loading);

  useEffect(() => {
    dispatch(getProviders(conditions));
  }, [dispatch, conditions]);

  const handlePageChange = (e, page) => {
    dispatch(
      providerActions.setConditions({
        ...conditions,
        page: page,
      })
    );
  };

  const handleFilterChange = (conditions) => {
    dispatch(providerActions.setConditions(conditions));
  };

  const handleRemoveProvider = (provider) => {
    const newProvider = {
      ...provider,
      is_valid: 0,
    };
    dispatch(postDeleteProvider(newProvider));
  };

  const handleEditProvider = (provider) => {
    navigate(`${url}/${provider.id}`);
  };

  return (
    <Box sx={root}>
      {loading && <LinearProgress sx={isLoading} />}

      <Box sx={titleContainer}>
        <Typography variant="h4">Thợ</Typography>

        <Link to={`${url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Thêm mới
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <ProviderFilters conditions={conditions} onChange={handleFilterChange} />
      </Box>

      <ProviderTable providerList={providerResponse.data} onRemove={handleRemoveProvider} onEdit={handleEditProvider} />

      <Box sx={{ my: '16px', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          color="primary"
          count={Math.ceil(providerResponse?.total / providerResponse?.per_page)}
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

export default ProviderListPage;
