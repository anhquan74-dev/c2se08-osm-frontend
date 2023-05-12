import { Chat, LocationOn, Search } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, FormControl, InputLabel, Link, OutlinedInput, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import FeedbackDialog from '../../../../../components/Common/FeedbackDialog';
import { categoryList } from '../../../Home/categoryList';
import ProviderPackage from '../../components/ProviderPackage';
import './ProviderDetailPage.scss';
import Rating from '../../../../../components/Common/Rating';

const ProviderDetailPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const starArr = [1, 2, 3, 4, 5];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };

  const handleOpenFeedbackDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="provider-detail-wrapper container">
      <div className="search-bar">
        <span className="search-map-btn">
          <LocationOn fontSize="medium" /> Bản đồ
        </span>
        <div>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel color="primary" htmlFor="searchByName">
              Tìm kiếm theo tên
            </InputLabel>
            <OutlinedInput
              color="primary"
              id="searchByName"
              endAdornment={<Search position="start"></Search>}
              label="Tìm kiểm theo tên"
            />
          </FormControl>
        </div>
      </div>
      <div className="break-crum">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
              Trang chủ
            </Link>
            <Link underline="hover" key="2" color="inherit" href="/finding-provider" onClick={handleClick}>
              Tìm thợ
            </Link>
            <Typography key="3" color="text.primary">
              Tên thợ
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <div className="provider-detail-content">
        <div className="pd-left">
          <div className="avatar-rate pd-left-item">
            <div>
              <img
                src="https://icdn.dantri.com.vn/thumb_w/680/2023/04/01/afp-messi-1-167911043942020387261-75-0-625-881-crop-1679110702236160038944-1679118122610-1680330659064.jpeg"
                alt="avatar"
              />
            </div>
            <Rating starNumber={4} size="large" />
            <div onClick={handleOpenFeedbackDialog}>11 phản hồi</div>
            <FeedbackDialog type="provider" open={open} onClose={handleClose} />
          </div>
          <div className="pd-left-item">
            <h3>Địa điểm</h3>
            <div>
              <h4>Thành phố Đà Nẵng</h4>
              <ul>
                <li>Hải Châu</li>
                <li>Thanh Khê</li>
              </ul>
            </div>
          </div>
          <div className="pd-left-item">
            <h3>Liên hệ</h3>
            <div>
              <h4>Số điện thoại</h4>
              <ul>
                <li>+84362474855</li>
              </ul>
            </div>
            <div>
              <h4>Email</h4>
              <ul>
                <li>trananhquan0704@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pd-right">
          <div className="provider-name">
            <span>Điện lạnh Hưng Thịnh</span>
            <span>
              <Chat fontSize="small" />
              Chat
            </span>
          </div>
          <div className="provider-desc">
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
          <div className="provider-package">
            <ProviderPackage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailPage;
