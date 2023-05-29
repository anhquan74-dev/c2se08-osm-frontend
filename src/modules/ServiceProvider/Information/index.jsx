import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Switch from '@mui/material/Switch';
import '@reach/combobox/styles.css';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import CustomMarker from '../../../assets/images/pin-icon.png';
import FeedbackDialog from '../../../components/Common/FeedbackDialog';
import Rating from '../../../components/Common/Rating';
import './Information.scss';
import Slider from 'react-slick';
import { categoryList } from '../../Customer/Home/categoryList';
import { json, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Stack, Typography, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import feedbackApi from '../../../api/feedbackApi';
import { updateWorkingStatus } from '../../Auth/authSlice';

const Information = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  const [open, setOpen] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  const { currentUser } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(Boolean(currentUser?.is_working));
  console.log(currentUser);
  const [totalFeedback, setTotalFeedback] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const res = await feedbackApi.getTotalFeedbackByProviderId(currentUser?.id);
      setTotalFeedback(res.data);
    })();
  }, [currentUser]);

  const handleOpenFeedbackDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    // setChecked(event.target.checked);
    dispatch(updateWorkingStatus(currentUser?.id));
  };

  const handleClickEditBtn = () => {
    navigate('/provider/edit-profile');
  };

  const handleEditService = () => {
    navigate('/provider/services');
  };

  const handleClickBreadCrum = (event) => {
    console.log(event.target.href);
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };
  return (
    <div className="provider-info container">
      <div className="break-crum">
        <Stack spacing={2} marginTop={3}>
          <Breadcrumbs separator={<NavigateNext fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/provider" onClick={handleClickBreadCrum}>
              Trang chủ
            </Link>
            <Typography key="3" color="text.primary">
              Thông tin hiển thị
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>

      <h3>Thông tin hiển thị</h3>
      <div className="info-name">
        <div className="name-left">
          <div className="name">
            <p>{currentUser?.full_name}</p>
            <span className="edit-btn" onClick={handleClickEditBtn}>
              Sửa tên
            </span>
          </div>
          <div className="rate-avatar">
            <div className="avatar">
              <img src={currentUser?.avatar?.url} alt="" />
              {/* <label htmlFor="file-avatar">
                <CameraAltIcon />
                <input type="file" id="file-avatar" />
              </label> */}
            </div>
            <div className="rate">
              <Rating starNumber={currentUser?.avg_star} size="large" />
              <div onClick={handleOpenFeedbackDialog}>{totalFeedback} phản hồi</div>
              <FeedbackDialog
                type="provider"
                open={open}
                onClose={handleClose}
                services={currentUser?.service}
                star={currentUser?.avg_star}
                provider={currentUser}
              />
            </div>
          </div>
        </div>
        <div className="name-right">
          <div>
            <Switch
              color="success"
              checked={currentUser?.is_working}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <strong>Đang {checked ? <>mở</> : <>tắt</>}</strong>
            <span> nhận lịch hẹn từ khách hàng</span>
          </div>
          {checked ? (
            <div>
              Nếu TẮT chức năng này, Khách hàng sẽ không thể đặt lịch hẹn với bạn trên ứng dụng được. Nhưng Khách hàng
              vẫn có thể tìm ra bạn và đọc được thông tin và Bảng giá của bạn.
            </div>
          ) : (
            <div>
              Nếu MỞ chức năng này, Khách hàng sẽ có thể tìm thấy bạn và đặt lịch hẹn với bạn trên ứng dụng được.
            </div>
          )}
        </div>
      </div>
      <div className="info-item info-location">
        <h4>
          <span>Địa chỉ</span>
          <span className="edit-btn" onClick={handleClickEditBtn}>
            Sửa địa chỉ
          </span>
        </h4>
        <span>{currentUser?.location?.[0]?.address}</span>
        {isLoaded && (
          <GoogleMap
            // onLoad={onMapLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: '80%', height: '340px', margin: '0 auto' }}
            center={{
              lat: parseFloat(currentUser?.location?.[0]?.coords_latitude),
              lng: parseFloat(currentUser?.location?.[0]?.coords_longitude),
            }}
            zoom={13}
          >
            <Marker
              position={{
                lat: parseFloat(currentUser?.location?.[0]?.coords_latitude),
                lng: parseFloat(currentUser?.location?.[0]?.coords_longitude),
              }}
              options={{ icon: CustomMarker }}
              onClick={() => setActiveMarker(true)}
            >
              {activeMarker ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{currentUser?.location?.[0]?.address}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          </GoogleMap>
        )}
      </div>
      <div className="info-item info-service">
        <h4>
          <span>Dịch vụ</span>
          <span className="edit-btn" onClick={handleEditService}>
            Sửa dịch vụ
          </span>
        </h4>
        <div className="services">
          {currentUser?.service?.map((item) => {
            return <div key={item.id}>{item?.name}</div>;
          })}
        </div>
      </div>
      <div className="info-item info-intro">
        <h4>
          <span>Giới thiệu</span>
          <span className="edit-btn" onClick={handleClickEditBtn}>
            Sửa giới thiệu
          </span>
        </h4>
        <div className="intro">
          <div>{currentUser?.introduction}</div>
          <div className="provider-slick">
            <Slider {...settings}>
              {currentUser?.banner?.map((item, index) => {
                return (
                  <>
                    <img key={index} src={item?.url} alt="image" />
                  </>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className="info-item info-contact">
        <h4>
          <span>Liên hệ</span>
          <span className="edit-btn" onClick={handleClickEditBtn}>
            Sửa liên hệ
          </span>
        </h4>
        <div className="contacts">
          <div>
            <h5>Số điện thoại</h5>
            <span>(+84){currentUser?.phone_number}</span>
          </div>
          <div>
            <h5>Email</h5>
            <span>{currentUser?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
