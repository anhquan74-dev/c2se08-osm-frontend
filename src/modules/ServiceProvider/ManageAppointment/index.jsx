import React, { useEffect, useState } from 'react';
import './ManageAppointment.scss';
import { AppointmentItem, EmptyAppointment } from '../../../components/Common';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import appointmentApi from '../../../api/appointmentApi';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
const ENDPOINT = import.meta.env.VITE_REACT_APP_DOMAIN_NODE_SERVER;

const ManageAppointment = () => {
  const [statusPicker, setStatusPicker] = useState('new');
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();
  const handleClickBreadCrum = (event) => {
    console.log(event.target.href);
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };

  const [listAppointment, setListAppointment] = useState();
  const [loading, setLoading] = useState(true);
  const [totalAppointment, setTotalAppointment] = useState();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const data = (await appointmentApi.getTotalByUser(currentUser?.id))?.data;
      setTotalAppointment(data);
    })();
  }, [statusPicker]);

  useEffect(() => {
    if (statusPicker === '2') {
      setStatusPicker('appointed');
    } else if (statusPicker === 'done-feedback') {
      setStatusPicker('done');
    } else {
      (async () => {
        setLoading(true);
        const res = await appointmentApi.getByStatusProvider(statusPicker, currentUser?.id);
        setLoading(false);
        console.log(res);
        setListAppointment(res.data?.reverse());
      })();
    }
  }, [statusPicker]);
  //khiem
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);
  useEffect(() => {
    socket?.on('provider_refresh_request_new', async () => {
      const data = (await appointmentApi.getTotalByUser(currentUser?.id))?.data;
      setTotalAppointment(data);
      if (statusPicker === 'new') {
        const res = await appointmentApi.getByStatusProvider(statusPicker, currentUser?.id);
        setListAppointment(res.data?.reverse());
      } else {
        setStatusPicker('new');
      }
    });
    socket?.on('provider_refresh_request_canceled', async () => {
      const data = (await appointmentApi.getTotalByUser(currentUser?.id))?.data;
      setTotalAppointment(data);
      if (statusPicker === 'canceled') {
        const res = await appointmentApi.getByStatusProvider(statusPicker, currentUser?.id);
        setListAppointment(res.data?.reverse());
      } else {
        setStatusPicker('canceled');
      }
    });
    socket?.on('provider_refresh_request_appointed', async () => {
      const data = (await appointmentApi.getTotalByUser(currentUser?.id))?.data;
      setTotalAppointment(data);
      if (statusPicker === 'appointed') {
        const res = await appointmentApi.getByStatusProvider(statusPicker, currentUser?.id);
        setListAppointment(res.data?.reverse());
      } else {
        setStatusPicker('appointed');
      }
    });
    socket?.on('provider_refresh_request_done', async () => {
      const data = (await appointmentApi.getTotalByUser(currentUser?.id))?.data;
      setTotalAppointment(data);
      if (statusPicker === 'done') {
        const res = await appointmentApi.getByStatusProvider(statusPicker, currentUser?.id);
        setListAppointment(res.data?.reverse());
      } else {
        setStatusPicker('done');
      }
    });
    socket?.on('provider_feedback_refresh_request_done', async () => {
      const data = (await appointmentApi.getTotalByUser(currentUser?.id))?.data;
      setTotalAppointment(data);
      setStatusPicker('done-feedback');
    });
  }, [socket]);
  //khiem
  return (
    <div className="provider-appointment container">
      <div className="break-crum">
        <Stack spacing={2} marginTop={3}>
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
            className={`status-item ${statusPicker === 'new' ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker('new');
            }}
          >
            <span>Yêu cầu đã nhận</span>
            <span>{totalAppointment?.new}</span>
          </div>
          <div
            className={`status-item ${statusPicker === 'offered' ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker('offered');
            }}
          >
            <span>Đã báo giá</span>
            <span>{totalAppointment?.offered}</span>
          </div>
          <div
            className={`status-item ${statusPicker === 'appointed' ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker('appointed');
            }}
          >
            <span>Lịch hẹn</span>
            <span>{totalAppointment?.appointed}</span>
          </div>
          <div
            className={`status-item ${statusPicker === 'done' ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker('done');
            }}
          >
            <span>Đã xong</span>
            <span>{totalAppointment?.done}</span>
          </div>
          <div
            className={`status-item ${statusPicker === 'canceled' ? 'active' : ''}`}
            onClick={() => {
              setStatusPicker('canceled');
            }}
          >
            <span>Đã hủy</span>
            <span>{totalAppointment?.canceled}</span>
          </div>
        </div>
        <div className="appointment-content">
          {loading && (
            <div style={{ margin: '8px 0 0 0' }}>
              <Skeleton width={1230} height={440} />
            </div>
          )}
          {!loading &&
            (listAppointment?.length === 0 ? (
              <EmptyAppointment status={statusPicker} type="provider" />
            ) : (
              listAppointment?.map((item, index) => {
                return (
                  <AppointmentItem
                    key={index}
                    status={statusPicker}
                    appointment={item}
                    type="provider"
                    setStatusPicker={setStatusPicker}
                  />
                );
              })
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageAppointment;
