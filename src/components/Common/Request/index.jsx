import React from 'react';
import './Request.scss';
export default function Request() {
  let requestStatus = 'new';
  return (
    <div className="request-container">
      <div className="request-service">
        <div className="request-service-left">
          <h3>Service name</h3>
          <p>Package name</p>
          <p>Đã nhận 3 giờ trước</p>
        </div>
        <div className="request-service-right">
          <button>Từ chối lịch hẹn</button>
          <button>Chat</button>
        </div>
      </div>
      <div className="request-customer">
        <div className="request-customer-left">Avatar Icon</div>
        <div className="request-customer-right">
          <p>Khách hàng</p>
          <h3>Trần Anh Quân</h3>
          <button>Liên hệ</button>
        </div>
      </div>
      <div className="request-time">
        <div className="request-time-left">Time Icon</div>
        <div className="request-time-right">
          <p>Thời gian làm việc</p>
          <h4>05 tháng 5, 2023 | 12:09</h4>
        </div>
      </div>
      <div className="request-location">
        <div className="request-location-left">Location Icon</div>
        <div className="request-location-right">
          <h4>Địa điểm</h4>
          <p>654 Trưng Nữ Vương, Hòa Cường, Hải Châu, Đà Nẵng</p>
        </div>
      </div>
      <div className="request-price">
        <div className="request-price-top">
          <div className="request-price-top-left">Price Icon</div>
          <div className="request-price-top-right">
            <h4>Báo giá</h4>
            <p>Chưa báo giá</p>
          </div>
        </div>
        <div className="request-price-bottom">
          <p>Nhập báo giá tại đây</p>
          <input placeholder="Nhập giá"></input>
          <button>Gửi báo giá</button>
        </div>
      </div>
    </div>
  );
}
