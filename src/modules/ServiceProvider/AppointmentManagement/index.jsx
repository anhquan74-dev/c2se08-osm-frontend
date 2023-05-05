import { AppBar, Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import './AppointmentManagement.scss';
import Request from '../../../components/Common/Request';
const TabPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
};

const AppointmentManagement = () => {
  const [value, setValue] = useState(0);
  const handleTabs = (e, val) => {
    setValue(val);
  };
  return (
    <div>
      <AppBar position="static">
        <Tabs value={-1} onChange={handleTabs}>
          <Tab label="Yêu cầu đã nhận" />
          <Tab label="Đã báo giá" />
          <Tab label="Lịch hẹn" />
          <Tab label="Đã xong" />
          <Tab label="Đã hủy" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Yêu cầu đã nhận
        <Request />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Đã báo giá
      </TabPanel>
      <TabPanel value={value} index={2}>
        Lịch hẹn
      </TabPanel>
      <TabPanel value={value} index={3}>
        Đã xong
      </TabPanel>
      <TabPanel value={value} index={4}>
        Đã hủy
      </TabPanel>
    </div>
  );
};

export default AppointmentManagement;
