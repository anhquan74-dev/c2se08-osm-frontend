import { Button, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import ProviderFilters from '../components/ProviderFilters';
import ProviderTable from '../components/ProviderTable';
import { providerList } from '../providerList';

const ProviderListPage = () => {
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();

  const handlePageChange = () => {};

  const handleSearchChange = (filter) => {
    console.log('Search Change: ', filter);
    // call API
  };

  const handleRemoveProvider = (provider) => {
    console.log(provider);
  };

  const handleEditProvider = (provider) => {
    navigate(`${url}/${provider.id}`);
  };

  return (
    <Box sx={root}>
      <Box sx={titleContainer}>
        <Typography variant="h4">Thợ</Typography>

        <Link to={`${url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Thêm mới
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <ProviderFilters onSearchChange={handleSearchChange} />
      </Box>

      <ProviderTable providerList={providerList} onRemove={handleRemoveProvider} onEdit={handleEditProvider} />

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

export default ProviderListPage;
