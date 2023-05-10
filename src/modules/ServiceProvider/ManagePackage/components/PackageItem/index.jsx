import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState } from 'react';
import './PackageItem.scss';
import { Star } from '@mui/icons-material';
import { Popover } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

const PackageItem = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickSetting = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();

  const handleClickPackageItem = () => {
    navigate('/provider/packages/1/view');
  };
  return (
    <div className="package-item">
      <div className="item-left">
        <h4 onClick={handleClickPackageItem}>Đi dây điện âm tường</h4>
        {/* check star */}
        <div className="star">
          <Star sx={{ color: '#ffbe17' }} />
          <span>5/5</span>
        </div>
        {/* <span>Chưa có đánh giá</span> */}
        <p>Cần gì cứ alo tôi</p>
        <strong>150.000 đ</strong>
      </div>
      <div className="item-right" onClick={handleClickSetting}>
        <SettingsIcon />
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
            <NavLink to="/provider/packages/1">Chỉnh sửa</NavLink>
          </li>
          <li>
            <NavLink to="/me/appointment">Xóa danh mục</NavLink>
          </li>
        </ul>
      </Popover>
    </div>
  );
};

export default PackageItem;
