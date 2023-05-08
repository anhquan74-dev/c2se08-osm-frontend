import React, { useEffect } from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import StatisticItem from './components/StatisticItem';
import { PeopleAlt } from '@mui/icons-material';
import Widget from './components/Widget';
import CityRankingList from './components/CityRankingList';
import { useDispatch, useSelector } from 'react-redux';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { getTotalCustomers, getTotalPosts, getTotalProviders, getTotalServices } from './dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalProviders, totalCustomers, totalServices, totalPosts, loading } = useSelector(
    (state) => state.dashboard
  );
  const highestStudentList = [];
  const lowestStudentList = [];
  const rankingByCityList = [];

  useEffect(() => {
    dispatch(getTotalProviders());
    dispatch(getTotalCustomers());
    dispatch(getTotalServices());
    dispatch(getTotalPosts());
  }, [dispatch]);
  return (
    <Box sx={root}>
      {loading && <LinearProgress sx={loadingStyle} />}
      <Typography variant="h4">Tổng số</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<EngineeringIcon fontSize="large" color="primary" />}
            label="Thợ"
            value={totalProviders}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="Khách hàng"
            value={totalCustomers}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<CleaningServicesIcon fontSize="large" color="primary" />}
            label="Dịch vụ"
            value={totalServices}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<DocumentScannerIcon fontSize="large" color="primary" />}
            label="Bài đăng"
            value={totalPosts}
          />
        </Grid>
      </Grid>

      {/* All students rankings */}
      <Box mt={5}>
        <Typography variant="h4">Xếp hạng thợ theo thành phố</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="TP Hồ Chí Minh">
                <CityRankingList cityList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Hà Nội">
                <CityRankingList cityList={lowestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Đã Nẵng">
                <CityRankingList cityList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const loadingStyle = {
  position: 'absolute',
  top: '-8px',
  width: '100%',
  marginBottom: '8px',
};
const root = {
  position: 'relative',
  paddingTop: '8px',
};

export default Dashboard;
