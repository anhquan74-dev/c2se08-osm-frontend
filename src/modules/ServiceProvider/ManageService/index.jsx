import { NavigateNext } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
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
import { getCategoriesForProvider, getCategoriesProviderNotHave, getServicesByProvider } from './manageServiceSlice';
import serviceApi from '../../../api/serviceApi';
import { toast } from 'react-toastify';
const ManageService = () => {
  const currentUserId = useSelector((state) => state.auth.currentUser.id);
  const { serviceList, loading } = useSelector((state) => state.manageService);
  const selectCategory = useSelector((state) => state.manageService.serviceProviderNotHaveList);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState();
  const [service, setService] = useState();
  const [categoryChoose, setCategoryChoose] = useState(null);
  const [serviceChoose, setServiceChoose] = useState();
  const navigate = useNavigate();
  const { services, loadingServices } = useSelector((state) => state.manageService);

  useEffect(() => {
    dispatch(getServicesByProvider(currentUserId));
  }, []);

  useEffect(() => {
    dispatch(getCategoriesProviderNotHave(currentUserId));
  }, [dispatch]);

  useEffect(() => {
    setService(selectCategory?.[0]?.id);
  }, [selectCategory]);

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

  const handleRemoveClick = () => {
    setOpenDialogRemove(true);
  };

  const handleAddClick = async () => {
    setOpenDialogAdd(true);
  };

  const handleRemoveService = () => {
    (async () => {
      const res = await serviceApi.delete(serviceChoose);
      toast.success('Dịch vụ đã được xóa!');
    })();

    dispatch(getCategoriesProviderNotHave(currentUserId));
    dispatch(getServicesByProvider(currentUserId));
    setAnchorEl(null);
  };

  const handleAddService = async () => {
    setService(selectCategory?.[0]?.id);
    let data = {
      category_id: service,
      provider_id: currentUserId,
      is_valid: 1,
    };
    (async () => {
      const res = await serviceApi.create(data);
      toast.success('Dịch vụ đã được thêm thành công!');
    })();
    dispatch(getServicesByProvider(currentUserId));
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

  console.log(services);
  return (
    <>
      <div className="manage-service container">
        <Stack spacing={2} marginTop={3}>
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
        {loadingServices && (
          <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '220px', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        {!loadingServices && services && (
          <div className="service-content">
            {services?.length > 0 ? (
              services?.map((item, index) => {
                return (
                  <div key={index} className="service-item" onClick={handleClickService}>
                    <div className="item-left">
                      <h4>{item?.service?.name}</h4>
                      <span>{item?.totalPackages} báo giá</span>
                    </div>
                    <div
                      className="item-right"
                      onClick={(event) => {
                        handleClickSetting(event);
                        setServiceChoose(item?.service?.id);
                      }}
                    >
                      <SettingsIcon />
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Chưa có dịch vụ nào, hãy thêm mới một dịch vụ!</p>
            )}
            <div
              className={selectCategory.length === 0 ? 'disable' : 'service-item add-service'}
              onClick={handleAddClick}
            >
              <h4>+ Thêm dịch vụ</h4>
            </div>
          </div>
        )}
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
            <NavLink to={`/provider/services/${serviceChoose}`}>Bảng báo giá</NavLink>
          </li>
          <li>
            <NavLink to="" onClick={handleRemoveClick}>
              Xóa danh mục
            </NavLink>
          </li>
        </ul>
      </Popover>
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
              handleRemoveService();
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
                {selectCategory &&
                  selectCategory.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item?.id}>
                        {item?.name}
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
              setOpenDialogAdd(false);
              handleAddService();
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
