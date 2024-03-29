import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useUserRole } from '../../../hooks/useUserRole';
import authApi from '../../../api/authApi';
import { logOut } from '../../../modules/Auth/authSlice';
import { useEffect } from 'react';
import Logo from '../../../assets/images/logo.png';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser } = useSelector((state) => state.auth);
  const role = useUserRole();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  const handleClickLogo = () => {
    currentUser?.roles[0]?.name === 'provider' ? navigate('/provider') : navigate('/');
  };
  return (
    <div className="header-content container">
      <div className="header-logo" onClick={handleClickLogo}>
        <img src={Logo} alt="" />
      </div>
      <ul className="header-link">
        {role === 'provider' && (
          <>
            <li>
              <NavLink end to="/provider" label="Trang chủ">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/provider/appointments" label="Quản lý lịch hẹn">
                Quản lý lịch hẹn
              </NavLink>
            </li>
            <li>
              <NavLink to="/provider/services" label="Dịch vụ">
                Dịch vụ
              </NavLink>
            </li>
            <li>
              <NavLink to="/provider-chat" label="Hỗ trợ khách hàng">
                Hỗ trợ khách hàng
              </NavLink>
            </li>
            <li>
              <NavLink to="/provider/comment-analysis" label="Khách hàng phản hồi">
                Khách hàng phản hồi
              </NavLink>
            </li>
          </>
        )}

        {role === 'customer' && (
          <>
            <li>
              <NavLink to="/" label="Trang chủ">
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/finding-provider" label="Tìm thợ">
                Tìm thợ
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/about" label="Về OSM System">
                Về OSM System
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/blog" label="Blog">
                Blog
              </NavLink>
            </li>
          </>
        )}
        <li>
          <div onClick={handleClick}>
            <div>
              <img src={currentUser?.avatar?.url} alt="avatar" />
            </div>
            <div>
              {currentUser?.full_name}
              <ArrowDropDownIcon />
            </div>
          </div>
          <Popover
            sx={{
              borderRadius: '20px !important',
            }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <ul className="profile-popover">
              <li onClick={() => setAnchorEl(null)}>
                <NavLink to={currentUser?.roles[0]?.name === 'provider' ? '/provider/information' : '/me'}>
                  Tài khoản
                </NavLink>
              </li>
              <li onClick={() => setAnchorEl(null)}>
                <NavLink to={currentUser?.roles[0]?.name === 'provider' ? '/provider/appointments' : '/me/appointment'}>
                  Quản lý lịch hẹn
                </NavLink>
              </li>
              <li onClick={() => setAnchorEl(null)}>
                <a onClick={handleLogout}>Đăng xuất</a>
              </li>
            </ul>
          </Popover>
        </li>
      </ul>
    </div>
  );
};

export default Header;
