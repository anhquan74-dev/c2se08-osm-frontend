import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Switch from '@mui/material/Switch';
import '@reach/combobox/styles.css';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useState } from 'react';
import CustomMarker from '../../../assets/images/pin-icon.png';
import FeedbackDialog from '../../../components/Common/FeedbackDialog';
import Rating from '../../../components/Common/Rating';
import './Information.scss';
import Slider from 'react-slick';
import { categoryList } from '../../Customer/Home/categoryList';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Stack, Typography, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

const Information = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
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

  const handleOpenFeedbackDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
        <Stack spacing={2}>
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
            <p>Trần Anh Quân</p>
            <span className="edit-btn" onClick={handleClickEditBtn}>
              Sửa tên
            </span>
          </div>
          <div className="rate-avatar">
            <div className="avatar">
              <img
                src="https://lh3.googleusercontent.com/a/AGNmyxbPNpE4pGT68pfoJVUum2R2QRwenWcQ1aYUTqk4=s96-c"
                alt=""
              />
              <label htmlFor="file-avatar">
                <CameraAltIcon />
                <input type="file" id="file-avatar" />
              </label>
            </div>
            <div className="rate">
              <Rating starNumber={4} size="large" />
              <div onClick={handleOpenFeedbackDialog}>11 phản hồi</div>
              <FeedbackDialog type="provider" open={open} onClose={handleClose} />
            </div>
          </div>
        </div>
        <div className="name-right">
          <div>
            <Switch
              color="success"
              checked={checked}
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
        <span>654 Trung Nu Vuong, phuong Hoa Thuan Tay, quan Hai Chau, thanh pho Da Nang</span>
        {isLoaded && (
          <GoogleMap
            // onLoad={onMapLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={{ width: '80%', height: '340px', margin: '0 auto' }}
            center={{
              lat: 16.0238326,
              lng: 108.2125453,
            }}
            zoom={13}
          >
            <Marker
              position={{
                lat: 16.0238326,
                lng: 108.2125453,
              }}
              options={{ icon: CustomMarker }}
              onClick={() => setActiveMarker(true)}
            >
              {activeMarker ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>654 Trung Nu Vuong, phuong Hoa Thuan Tay, quan Hai Chau, thanh pho Da Nang</div>
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
          <div>Sửa điện nước</div>
          <div>Sửa xe</div>
          <div>Sửa đồ điện gia dụng</div>
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
          <div>
            👨‍🔧ĐIỆN LẠNH HƯNG THỊNH - HOTLINE: 0987.880.307 📌 Chúng tôi chuyên: ✓ Sữa chữa, vệ sinh, lắp đặt các thiết
            bị điện lạnh: tủ lạnh, máy giặt, máy lạnh, máy nước nóng... ✓ Mua bán trao đổi các mặt hàng điện máy mới và
            cũ.... ✓ Nhận bảo trì thi công Điện - Nước cho công ty, khách sạn, nhà hàng..... -----------------------
            LIÊN HỆ SỬA CHỮA ĐIỆN LẠNH TẠI NHÀ - ĐIỆN LẠNH HƯNG THỊNH ☎️ Hotline | zalo: 0987.880.307 🏠 Địa chỉ | L7
            688/57 - Lê Đức Thọ- P17 Gò Vấp
          </div>
          <div className="provider-slick">
            <Slider {...settings}>
              {categoryList.map((item, index) => {
                return (
                  <>
                    <img
                      key={index}
                      src="https://icdn.dantri.com.vn/thumb_w/680/2023/04/01/afp-messi-1-167911043942020387261-75-0-625-881-crop-1679110702236160038944-1679118122610-1680330659064.jpeg"
                      alt="image"
                    />
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
            <span>+84362474855</span>
          </div>
          <div>
            <h5>Email</h5>
            <span>trananhquan0704@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
