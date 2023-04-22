import React, { useState } from 'react';

const Appointment = () => {
  const [statusPicker, setStatusPicker] = useState();
  return (
    <div className="me-appointment">
      <div className="appointment-status">
        <div
          className="status-item"
          onClick={() => {
            setStatusPicker(0);
          }}
        >
          <span>Yêu cầu</span>
          <span>0</span>
        </div>
        <div
          className="status-item"
          onClick={() => {
            setStatusPicker(1);
          }}
        >
          <span>Lịch hẹn</span>
          <span>1</span>
        </div>
        <div
          className="status-item"
          onClick={() => {
            setStatusPicker(2);
          }}
        >
          <span>Đã xong</span>
          <span>1</span>
        </div>
        <div
          className="status-item"
          onClick={() => {
            setStatusPicker(3);
          }}
        >
          <span>Đã hủy</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
