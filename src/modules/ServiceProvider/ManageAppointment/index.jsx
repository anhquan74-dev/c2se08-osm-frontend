import React, { useState } from 'react';
import './ManageAppointment.scss';
import { AppointmentItem, EmptyAppointment } from '../../../components/Common';

const ManageAppointment = () => {
  const [statusPicker, setStatusPicker] = useState(0);
  // fetch danh sách appointment theo status
  // --> listAppointment
  const listAppointment = [{}];
  return (
    <div className="me-appointment container">
      <div className="appointment-status">
        <div
          className={`status-item ${statusPicker === 0 ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker(0);
          }}
        >
          <span>Yêu cầu</span>
          <span>0</span>
        </div>
        <div
          className={`status-item ${statusPicker === 1 ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker(1);
          }}
        >
          <span>Lịch hẹn</span>
          <span>1</span>
        </div>
        <div
          className={`status-item ${statusPicker === 2 ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker(2);
          }}
        >
          <span>Đã xong</span>
          <span>1</span>
        </div>
        <div
          className={`status-item ${statusPicker === 3 ? 'active' : ''}`}
          onClick={() => {
            setStatusPicker(3);
          }}
        >
          <span>Đã hủy</span>
          <span>0</span>
        </div>
      </div>
      <div className="appointment-content">
        {listAppointment.length === 0 ? (
          <EmptyAppointment status={statusPicker} />
        ) : (
          listAppointment.map((item, index) => {
            return <AppointmentItem key={index} status={statusPicker} appointment={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default ManageAppointment;
