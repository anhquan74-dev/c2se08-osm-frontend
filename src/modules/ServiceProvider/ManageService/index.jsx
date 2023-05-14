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
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './ManageService.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesForProvider, getCategoriesProviderNotHave } from './manageServiceSlice';
import serviceApi from '../../../api/serviceApi';

const ManageService = () => {
  const currentUserId = useSelector((state) => state.auth.currentUser.id);
  const serviceList = useSelector((state) => state.manageService.serviceList);
  const selectCategory = useSelector((state) => state.manageService.serviceProviderNotHaveList);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState();
  const [service, setService] = useState(null);
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

  const handleAddClick = async () => {
    setOpenDialogAdd(true);
  };

  const handleRemoveService = () => {};

  const handleAddService = async () => {
    if (service !== null) {
      setService(selectCategory[0]?.value);
      const dataSend = {
        category_id: service,
        provider_id: currentUserId,
        is_valid: 1,
      };
      await serviceApi.create(dataSend);
    } else {
      const dataSend = {
        category_id: selectCategory[0]?.value,
        provider_id: currentUserId,
        is_valid: 1,
      };
      await serviceApi.create(dataSend);
    }

    dispatch(getCategoriesForProvider(currentUserId));
    dispatch(getCategoriesProviderNotHave(currentUserId));
  };

  const handleClickService = () => {};

  const handleChangeService = (e) => {
    setService(e.target.value);
  };
  const handleClickBreadCrum = (event) => {
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };
  useEffect(() => {
    dispatch(getCategoriesForProvider(currentUserId));
    dispatch(getCategoriesProviderNotHave(currentUserId));
  }, [dispatch]);

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
          {serviceList &&
            serviceList.map((item, index) => {
              return (
                <div key={index} className="service-item" onClick={handleClickService}>
                  <div className="item-left">
                    <h4>{item.dataCategory[0]?.name}</h4>
                    <span>{item.countPackage} báo giá</span>
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
              );
            })}
          <div
            className={selectCategory.length === 0 ? 'disable' : 'service-item add-service'}
            onClick={handleAddClick}
          >
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
                defaultValue={selectCategory[0]?.value}
                onChange={(e) => handleChangeService(e)}
              >
                {selectCategory &&
                  selectCategory.map((option) => {
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
