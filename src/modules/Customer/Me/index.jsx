import { NavLink, Route, Routes } from 'react-router-dom';
import EditProfile from './EditProfile';
import Appointment from './Appointment';
import Notification from './Notification';
import Favorite from './Favorite';
import { SearchBar } from '../../../components/Common';
import './Me.scss';

const Me = () => {
  return (
    <div className="customer-profile container">
      <SearchBar />
      <div className="profile-content">
        <div className="profile-tab-wrap">
          <div className="profile-tab-content">
            <div className="profile-info">
              <img src="https://lh3.googleusercontent.com/a/AGNmyxbPNpE4pGT68pfoJVUum2R2QRwenWcQ1aYUTqk4=s96-c" alt />
              <div className="profile-name">
                <div className="name">TRAN ANH QUAN</div>
                <div className="edit-link">
                  <NavLink to="/me">Chỉnh sửa tài khoản &gt;</NavLink>
                </div>
              </div>
            </div>
            <div className="profile-tab">
              <div className="appointment">
                <NavLink className="tab" to="/me/appointment">
                  Quản lý lịch hẹn
                </NavLink>
              </div>
              <div className="notification">
                <NavLink className="tab" to="/me/notification">
                  Thông báo
                </NavLink>
              </div>
              <div className="saved-sp">
                <NavLink className="tab" to="/me/saved-service-providers">
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
