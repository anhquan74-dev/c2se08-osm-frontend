import React from 'react';
import './Home.scss';
import MenuEditInfo from '../../../assets/images/provider-edit-info.jpg';
import MenuManageAppointment from '../../../assets/images/provider-manage-appointment.png';
import MenuOSMInfo from '../../../assets/images/provider-osm-info.png';
import Support from '../../../assets/images/help-desk.png';
import Services from '../../../assets/images/services.png';
import Review from '../../../assets/images/review.png';

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
        <div className="menu-item" onClick={() => navigate('/provider/services')}>
          <div className="image">
            <img src={Services} alt="osm-info" />
          </div>
          <p>Quản lý dịch vụ</p>
        </div>
        <div className="menu-item" onClick={() => navigate('/provider/comment-analysis')}>
          <div className="image">
            <img src={Review} alt="osm-info" />
          </div>
          <p>Khách hàng phản hồi</p>
        </div>
        <div className="menu-item" onClick={() => navigate('/provider-chat')}>
          <div className="image">
            <img src={Support} alt="osm-info" />
          </div>
          <p>Hỗ trợ khách hàng</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
