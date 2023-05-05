import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container-provider container">
      <Link to="appointment-management" className="home-menu-item">
        <div className="item-icon">Icon</div>
        <div className="item-title">Quản lý lịch hẹn</div>
      </Link>

      <Link to="edit-profile" className="home-menu-item">
        <div className="item-icon">Icon</div>
        <div className="item-title">Chỉnh sửa thông tin hiển thị</div>
      </Link>

      <Link to="edit-identify-card" className="home-menu-item">
        <div className="item-icon">Icon</div>
        <div className="item-title">Chỉnh sửa thông tin CMND</div>
      </Link>

      <Link to="about" className="home-menu-item">
        <div className="item-icon">Icon</div>
        <div className="item-title">Thông tin về ứng dụng</div>
      </Link>
    </div>
  );
};

export default Home;
