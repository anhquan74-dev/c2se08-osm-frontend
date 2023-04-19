import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ProviderDetailPage.scss';
import Slider from 'react-slick';
import { categoryList } from '../../../Home/categoryList';
import ProviderPackage from '../../components/ProviderPackage';

const ProviderDetailPage = () => {
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

  return (
    <div className="provider-detail-wrapper container">
      <div className="break-crum">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
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
            <div>
              {starArr?.map((item, index) => {
                if (index <= 3) {
                  return (
                    <img
                      key={index}
                      src="https://oddjob.vn/assets/images/yellow_star.svg"
                      style={{ width: 14, height: 14 }}
                    />
                  );
                }
                return (
                  <img
                    key={index}
                    src="https://oddjob.vn/assets/images/white_star.svg"
                    style={{ width: 14, height: 14 }}
                  />
                );
              })}
            </div>
            <div>11 phản hồi</div>
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
            <span>Chat</span>
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
                  <div key={index}>
                    <img src={item.icon} alt="image" />
                  </div>
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
