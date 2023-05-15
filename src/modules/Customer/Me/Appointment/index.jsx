import React, { useEffect, useState } from 'react';
import './Appointment.scss';
import EmptyAppointment from './EmptyAppointment';
import AppointmentItem from './AppointmentItem';
import appointmentApi from '../../../../api/appointmentApi';

const Appointment = () => {
  const [statusPicker, setStatusPicker] = useState('new-or-offered');
  const [listAppointment, setListAppointment] = useState();
  useEffect(() => {
    (async () => {
      const res = await appointmentApi.getByStatus(statusPicker);
      console.log(res);
      setListAppointment(res.data);
    })();
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
          <span>0</span>
        </div>
        <div
          className={`status-item ${statusPicker === 'appointed' ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker('appointed');
          }}
        >
          <span>Lịch hẹn</span>
          <span>1</span>
        </div>
        <div
          className={`status-item ${statusPicker === 'done' ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker('done');
          }}
        >
          <span>Đã xong</span>
          <span>1</span>
        </div>
        <div
          className={`status-item ${statusPicker === 'canceled' ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker('canceled');
          }}
        >
          <span>Đã hủy</span>
          <span>0</span>
        </div>
      </div>
      <div className="appointment-content">
        {listAppointment?.length === 0 ? (
          <EmptyAppointment status={statusPicker} />
        ) : (
          listAppointment?.map((item, index) => {
            return <AppointmentItem key={index} status={statusPicker} appointment={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default Appointment;
