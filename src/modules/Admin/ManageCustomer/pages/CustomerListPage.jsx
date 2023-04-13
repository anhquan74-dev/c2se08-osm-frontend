import { Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import CustomerFilters from '../components/CustomerFilters';
import CustomerTable from '../components/CustomerTable';
import { getCustomers } from '../customerSlice';

const CustomerListPage = () => {
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const handlePageChange = () => {};

  const handleSearchChange = (filter) => {
    console.log('Search Change: ', filter);
    // call API
  };

  const handleRemoveCustomer = (customer) => {
    console.log('handleRemoveCustomer: ', customer);
  };

  const handleEditCustomer = (customer) => {
    navigate(`${url}/${customer.id}`);
  };

  return (
    <Box sx={root}>
      {loading && <LinearProgress sx={isLoading} />}
      <Box sx={titleContainer}>
        <Typography variant="h4">Khách hàng</Typography>

        <Link to={`${url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Thêm mới
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <CustomerFilters onSearchChange={handleSearchChange} />
      </Box>

      <CustomerTable customerList={customers} onRemove={handleRemoveCustomer} onEdit={handleEditCustomer} />

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

export default CustomerListPage;
