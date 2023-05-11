import { NavigateNext } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Popover,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './ManageService.scss';

const options = [
  {
    value: '1',
    label: 'Cải tạo nhà cửa',
  },
  {
    value: '2',
    label: 'Sửa xe',
  },
  {
    value: '3',
    label: 'Dọn dẹp vệ sinh',
  },
];

const ManageService = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState();
  const [service, setService] = useState(1);
  const navigate = useNavigate();
  const handleClickSetting = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleCloseDialogRemove = () => {
    setOpenDialogRemove(false);
  };

  const handleCloseDialogAdd = () => {
    setOpenDialogAdd(false);
  };

  const handleRemoveClick = (event) => {
    // setSelectedProvider(provider);
    setOpenDialogRemove(true);
  };

  const handleAddClick = () => {
    setOpenDialogAdd(true);
  };

  const handleRemoveService = () => {};

  const handleAddService = () => {
    console.log(service);
  };

  const handleClickService = () => {};

  const handleChangeService = (e) => {
    setService(e.target.value);
  };
  const handleClickBreadCrum = (event) => {
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };
  return (
    <>
      <div className="manage-service container">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNext fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/provider" onClick={handleClickBreadCrum}>
              Trang chủ
            </Link>
            <Typography key="3" color="text.primary">
              Dịch vụ
            </Typography>
          </Breadcrumbs>
        </Stack>
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
                  <NavLink to="" onClick={handleRemoveClick}>
                    Xóa danh mục
                  </NavLink>
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
          <div className="service-item add-service" onClick={handleAddClick}>
            <h4>+ Thêm dịch vụ</h4>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialogRemove}
        onClose={handleCloseDialogRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xoá danh mục dịch vụ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có thực sự muốn xóa Dịch vụ này không? <br />
            Tất cả đơn giá trong Dịch vụ này sẽ bị xóa vĩnh viễn
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogRemove} variant="text" color="info">
            Huỷ
          </Button>
          <Button
            onClick={() => {
              handleRemoveService(selectedProvider);
              setOpenDialogRemove(false);
            }}
            color="error"
            variant="text"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth="500px"
        open={openDialogAdd}
        onClose={handleCloseDialogAdd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Thêm dịch vụ</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl fullWidth size="small" margin="normal" variant="outlined">
              <InputLabel id="service_label">Thêm dịch vụ</InputLabel>
              <Select
                labelId="service_label"
                label="Thêm dịch vụ"
                value={service}
                onChange={(e) => handleChangeService(e)}
              >
                {options.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogAdd} variant="text" color="info">
            Huỷ
          </Button>
          <Button
            onClick={() => {
              handleAddService();
              setOpenDialogAdd(false);
            }}
            color="success"
            variant="text"
            autoFocus
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageService;
