import React from 'react';
import './Home.scss';
import MenuEditInfo from '../../../assets/images/provider-edit-info.jpg';
import MenuManageAppointment from '../../../assets/images/provider-manage-appointment.png';
import MenuOSMInfo from '../../../assets/images/provider-osm-info.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="provider-home container">
      <h2>Trang chủ</h2>
      <div className="provider-home-content">
        <div className="menu-item" onClick={() => navigate('/provider/appointments')}>
          <div className="image">
            <img src={MenuManageAppointment} alt="manage-appointment" />
          </div>
          <p>Quản lý lịch hẹn</p>
        </div>
        <div className="menu-item" onClick={() => navigate('/provider/information')}>
          <div className="image">
            <img src={MenuEditInfo} alt="edit-info" />
          </div>
          <p>Chỉnh sửa Thông tin hiển thị</p>
        </div>
        <div className="menu-item" onClick={() => navigate('')}>
          <div className="image">
            <img src={MenuOSMInfo} alt="osm-info" />
          </div>
          <p>Thông tin về website OSM</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
