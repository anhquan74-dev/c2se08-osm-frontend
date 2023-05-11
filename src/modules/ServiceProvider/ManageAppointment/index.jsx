import React, { useState } from 'react';
import './ManageAppointment.scss';
import { AppointmentItem, EmptyAppointment } from '../../../components/Common';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ManageAppointment = () => {
  const [statusPicker, setStatusPicker] = useState(0);
  // fetch danh sách appointment theo status
  // --> listAppointment
  const listAppointment = [{}];
  const navigate = useNavigate();
  const handleClickBreadCrum = (event) => {
    console.log(event.target.href);
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };
  return (
    <div className="provider-appointment container">
      <div className="break-crum">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNext fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/provider" onClick={handleClickBreadCrum}>
              Trang chủ
            </Link>
            <Typography key="3" color="text.primary">
              Lịch hẹn
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <h3>Lịch hẹn</h3>
      <div className="me-appointment ">
        <div className="appointment-status">
          <div
            className={`status-item ${statusPicker === 0 ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker(0);
            }}
          >
            <span>Yêu cầu đã nhận</span>
            <span>0</span>
          </div>
          <div
            className={`status-item ${statusPicker === 1 ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker(1);
            }}
          >
            <span>Đã báo giá</span>
            <span>1</span>
          </div>
          <div
            className={`status-item ${statusPicker === 2 ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker(2);
            }}
          >
            <span>Lịch hẹn</span>
            <span>1</span>
          </div>
          <div
            className={`status-item ${statusPicker === 3 ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker(3);
            }}
          >
            <span>Đã xong</span>
            <span>1</span>
          </div>
          <div
            className={`status-item ${statusPicker === 4 ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker(4);
            }}
          >
            <span>Đã hủy</span>
            <span>0</span>
          </div>
        </div>
        <div className="appointment-content">
          {listAppointment.length === 0 ? (
            <EmptyAppointment status={statusPicker} type="provider" />
          ) : (
            listAppointment.map((item, index) => {
              return <AppointmentItem key={index} status={statusPicker} appointment={item} type="provider" />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAppointment;
