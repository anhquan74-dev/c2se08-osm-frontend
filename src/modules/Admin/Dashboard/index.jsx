import React, { useEffect, useState } from 'react';
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
import providerApi from '../../../api/providerApi.js';
import { PAGE_DEFAULT } from '../../../utils/constants';
import Chart from './components/Chart';
import dashboardApi from '../../../api/dashboardApi';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalProviders, totalCustomers, totalServices, totalPosts, loading } = useSelector(
    (state) => state.dashboard
  );
  const [listProviderHaNoi, setListProviderHaNoi] = useState([]);
  const [listProviderDaNang, setListProviderDaNang] = useState([]);
  const [listProviderHCM, setListProviderHCM] = useState([]);
  const [listDataApp12Month, setListDataApp12Month] = useState(null);

  useEffect(() => {
    dispatch(getTotalProviders());
    dispatch(getTotalCustomers());
    dispatch(getTotalServices());
    dispatch(getTotalPosts());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const res = await providerApi.getAll({
        sort: [
          {
            sort_by: 'avg_star',
            sort_dir: 'desc',
          },
        ],
        filter: {
          province_name: 'Đà Nẵng',
        },
        page: PAGE_DEFAULT,
        limit: 10,
      });
      setListProviderDaNang(res.data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await providerApi.getAll({
        sort: [
          {
            sort_by: 'avg_star',
            sort_dir: 'desc',
          },
        ],
        filter: {
          province_name: 'Hồ Chí Minh',
        },
        page: PAGE_DEFAULT,
        limit: 10,
      });
      setListProviderHCM(res.data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await providerApi.getAll({
        sort: [
          {
            sort_by: 'avg_star',
            sort_dir: 'desc',
          },
        ],
        filter: {
          province_name: 'Hà Nội',
        },
        page: PAGE_DEFAULT,
        limit: 10,
      });
      setListProviderHaNoi(res.data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const res = await dashboardApi.getTotalAppointmentIn12Month();
      setListDataApp12Month(res.data_by_months);
    })();
  }, []);

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
      <Typography sx={{ my: '30px' }} variant="h4">
        Biểu đồ
      </Typography>
      <Chart listDataApp12Month={listDataApp12Month} />
      <Box mt={5}>
        <Typography variant="h4">Xếp hạng thợ theo thành phố</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="TP Hồ Chí Minh">
                <CityRankingList providerList={listProviderHCM} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Hà Nội">
                <CityRankingList providerList={listProviderHaNoi} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Đã Nẵng">
                <CityRankingList providerList={listProviderDaNang} />
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
