import { Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import CustomerFilters from '../components/CustomerFilters';
import CustomerTable from '../components/CustomerTable';
import { customerActions, getCustomers, postDeleteCustomer } from '../customerSlice';

const CustomerListPage = () => {
  const url = useResolvedPath('').pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, loading, conditions } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomers(conditions));
  }, [dispatch, conditions]);

  const handlePageChange = (e, page) => {
    dispatch(
      customerActions.setConditions({
        ...conditions,
        page: page,
      })
    );
  };

  const handleFilterChange = (conditions) => {
    dispatch(customerActions.setConditions(conditions));
  };

  const handleRemoveCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      is_valid: 0,
    };
    dispatch(postDeleteCustomer(newCustomer));
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
        <CustomerFilters conditions={conditions} onChange={handleFilterChange} />
      </Box>

      <CustomerTable customerList={list.data} onRemove={handleRemoveCustomer} onEdit={handleEditCustomer} />

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

export default CustomerListPage;
