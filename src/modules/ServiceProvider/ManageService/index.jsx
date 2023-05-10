import SettingsIcon from '@mui/icons-material/Settings';
import { Popover } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import ManagePackage from '../ManagePackage';
import './ManageService.scss';
import ServiceDetail from './ServiceDetail';

const ManageService = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickSetting = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClickService = () => {};
  return (
    <>
      <div className="manage-service container">
        <h3>Dịch vụ</h3>
        <div className="service-content">
          <div className="service-item" onClick={handleClickService}>
            <div className="item-left">
              <h4>Sửa điện & nước</h4>
              <span>2 báo giá</span>
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
                  <NavLink to="/provider/services/1">Bảng báo giá</NavLink>
                </li>
                <li>
                  <NavLink to="/me/appointment">Xóa danh mục</NavLink>
                </li>
              </ul>
            </Popover>
          </div>
          <div className="service-item">
            <div className="item-left">
              <h4>Sửa xe</h4>
              <span>1 báo giá</span>
            </div>
            <div className="item-right">
              <SettingsIcon />
            </div>
          </div>
          <div className="service-item">
            <div className="item-left">
              <h4>Sửa đồ điện gia dụng</h4>
              <span>3 báo giá</span>
            </div>
            <div className="item-right">
              <SettingsIcon />
            </div>
          </div>
          <div className="service-item">
            <div className="item-left">
              <h4>Dọn dẹp vệ sinh</h4>
              <span>0 báo giá</span>
            </div>
            <div className="item-right">
              <SettingsIcon />
            </div>
          </div>
          <div className="service-item add-service">
            <h4>+ Thêm dịch vụ</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageService;
