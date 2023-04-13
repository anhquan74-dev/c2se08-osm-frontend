import React from 'react';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer container">
      <div className="footer-col copyright">
        <div>
          <NavLink to="/">Online Service Market System</NavLink>
        </div>
        {/* <div className="copyright">Số ĐKKD 0316265764 do Sở KHĐT Tp. HCM cấp ngày 12/05/2020</div>
        <div className=" d-none d-lg-block">
          <a href="http://online.gov.vn/Home/AppDetails/1293" target="_blank" rel="noopener noreferrer">
            <img src="https://oddjob.vn/assets/images/logoCCDV.svg"  />
          </a>
        </div> */}
      </div>
      <div className="footer-col address">
        <div className="title">
          <span className="text">Địa chỉ</span>
        </div>
        <div className="content">
          <div className="title sub-title">
            <span className="text">Trụ sở:</span>
          </div>
          254 Nguyễn Văn Linh, Thạc Gián, Thanh Khê, Đà Nẵng
        </div>
        <div className="title d-none d-lg-flex">
          <span className="text">Tải ứng dụng</span>
        </div>
        <div className="content cta d-none d-lg-flex" id="cta-wrapper">
          <span>
            <span>
              <img src="https://oddjob.vn/assets/images/appstore.svg" />
            </span>
          </span>
          <span>
            <span>
              <img src="https://oddjob.vn/assets/images/googleplay.svg" />
            </span>
          </span>
        </div>
      </div>
      <div className="footer-col contact">
        <div className="title">
          <span className="text">Liên hệ</span>
        </div>
        <div className="content">
          <p className="contact-clickable d-none d-md-block">0123456789</p>
          <p className="contact-clickable mb-3">
            <a href="mailto:support@osmsystem.vn">support@osmsystem.vn</a>
          </p>
          <div className="contact-workingtime">
            <div className="d-block">Thời gian làm việc:</div>
            <div className="d-block">Từ thứ 2 đến thứ 6</div>
            <div className="d-block">Từ 9:00 đến 18:00</div>
          </div>
          <div className="facebook">
            <span>
              <img className="social-logo" src="https://oddjob.vn/assets/images/zalo.svg" />
            </span>
             
            <span>
              <img src="https://oddjob.vn/assets/images/logo-fb.svg" />
            </span>
          </div>
        </div>
      </div>
      <div className="footer-col info">
        <div className="title">
          <span className="text">Thông tin</span>
        </div>
        <div className="content">
          <div>
            <a>Quy chế quản lý và hoạt động ứng dụng</a>
          </div>
          <div>
            <a>Chính sách bảo mật</a>
          </div>
          <div>
            <a>Cơ chế giải quyết tranh chấp</a>
          </div>
          <div>
            <a>Thông tin chủ sở hữu</a>
          </div>
          <div>
            <a>Điều khoản sử dụng</a>
          </div>
          <div>
            <a>Câu hỏi thường gặp</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
