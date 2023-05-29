import { NavLink, Route, Routes, useResolvedPath } from 'react-router-dom';
import EditProfile from './EditProfile';
import Appointment from './Appointment';
import Notification from './Notification';
import Favorite from './Favorite';
import { SearchBar } from '../../../components/Common';
import './Me.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Me = () => {
  const url = useResolvedPath('').pathname;
  const { currentUser } = useSelector((state) => state.auth);

  console.log(url);
  const [tabPicker, setTabPicker] = useState();

  return (
    <div className="customer-profile container">
      <SearchBar />
      <div className="profile-content">
        <div className="profile-tab-wrap">
          <div className="profile-tab-content">
            <div className="profile-info">
              <div className="profile-image">
                <img src={currentUser?.avatar?.url} alt />
              </div>
              <div className="profile-name">
                <div className="name">{currentUser?.full_name}</div>
                <div className="edit-link">
                  <NavLink to="/me" onClick={() => setTabPicker(3)}>
                    Chỉnh sửa tài khoản &gt;
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="profile-tab">
              <div className="appointment">
                <NavLink
                  className={`tab ${tabPicker === 0 ? 'active' : ''}`}
                  to="/me/appointment"
                  onClick={() => {
                    setTabPicker(0);
                  }}
                >
                  Quản lý lịch hẹn
                </NavLink>
              </div>
              <div className="notification">
                <NavLink
                  className={`tab ${tabPicker === 1 ? 'active' : ''}`}
                  to="/me/notification"
                  onClick={() => {
                    setTabPicker(1);
                  }}
                >
                  Thông báo
                </NavLink>
              </div>
              <div className="saved-sp">
                <NavLink
                  className={`tab ${tabPicker === 2 ? 'active' : ''}`}
                  to="/me/saved-service-providers"
                  onClick={() => {
                    setTabPicker(2);
                  }}
                >
                  Danh sách yêu thích
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-content-right">
          <Routes>
            <Route path="" element={<EditProfile />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="notification" element={<Notification />} />
            <Route path="saved-service-providers" element={<Favorite />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Me;
