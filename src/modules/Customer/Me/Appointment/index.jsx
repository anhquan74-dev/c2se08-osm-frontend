import React, { useEffect, useState } from 'react';
import './Appointment.scss';
import EmptyAppointment from './EmptyAppointment';
import AppointmentItem from './AppointmentItem';
import appointmentApi from '../../../../api/appointmentApi';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

const Appointment = () => {
  const [statusPicker, setStatusPicker] = useState('new-or-offered');
  const [listAppointment, setListAppointment] = useState();
  const [loading, setLoading] = useState(true);
  const [totalAppoinment, setTotalAppointment] = useState();
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  useEffect(() => {
    (async () => {
      const data = (await appointmentApi.getTotalByUser(currentUser?.id))?.data;
      setTotalAppointment(data);
    })();
  }, [statusPicker]);

  useEffect(() => {
    if (statusPicker === '1') {
      setStatusPicker('done');
    } else {
      (async () => {
        setLoading(true);
        const res = await appointmentApi.getByStatus(statusPicker);
        setLoading(false);
        console.log(res);
        setListAppointment(res.data);
      })();
    }
  }, [statusPicker]);
  console.log(listAppointment);
  return (
    <div className="me-appointment">
      <div className="appointment-status">
        <div
          className={`status-item ${statusPicker === 'new-or-offered' ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker('new-or-offered');
          }}
        >
          <span>Yêu cầu</span>
          <span>{totalAppoinment?.newOrOffered}</span>
        </div>
        <div
          className={`status-item ${statusPicker === 'appointed' ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker('appointed');
          }}
        >
          <span>Lịch hẹn</span>
          <span>{totalAppoinment?.appointed}</span>
        </div>
        <div
          className={`status-item ${statusPicker === 'done' ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker('done');
          }}
        >
          <span>Đã xong</span>
          <span>{totalAppoinment?.done}</span>
        </div>
        <div
          className={`status-item ${statusPicker === 'canceled' ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker('canceled');
          }}
        >
          <span>Đã hủy</span>
          <span>{totalAppoinment?.canceled}</span>
        </div>
      </div>
      <div className="appointment-content">
        {loading && (
          <div style={{ margin: '8px 0 0 0' }}>
            <Skeleton width={915} height={420} />
          </div>
        )}
        {!loading &&
          (listAppointment?.length === 0 ? (
            <EmptyAppointment status={statusPicker} />
          ) : (
            listAppointment?.map((item, index) => {
              return (
                <AppointmentItem
                  key={index}
                  status={statusPicker}
                  appointment={item}
                  setStatusPicker={setStatusPicker}
                />
              );
            })
          ))}
      </div>
    </div>
  );
};

export default Appointment;
