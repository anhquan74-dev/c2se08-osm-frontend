import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="header-content container">
      <div className="header-logo">OSM System</div>
      <ul className="header-link">
        <li>
          <NavLink to="/">Trang chủ</NavLink>
        </li>
        <li>
          <NavLink to="/finding-provider">Tìm thợ</NavLink>
        </li>
        <li>
          <NavLink to="/about">Về OSM System</NavLink>
        </li>
        <li>
          <NavLink to="/blog">Blog</NavLink>
        </li>
        <li>
          <div onClick={handleClick}>
            <div>
              <img
                src="https://icdn.dantri.com.vn/thumb_w/680/2023/04/01/afp-messi-1-167911043942020387261-75-0-625-881-crop-1679110702236160038944-1679118122610-1680330659064.jpeg"
                alt="avatar"
              />
            </div>
            <div>
              TRAN ANH QUAN
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
              <li>
                <NavLink to="/profile">Tài khoản</NavLink>
              </li>
              <li>
                <NavLink to="/appointment">Quản lý lịch hẹn</NavLink>
              </li>
              <li>
                <NavLink to="/login">Đăng xuất</NavLink>
              </li>
            </ul>
          </Popover>
        </li>
      </ul>
    </div>
  );
};

export default Header;
