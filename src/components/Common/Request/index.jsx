import React from 'react';
import './Request.scss';
export default function Request() {
  // let requestStatus = 'new';
  // let requestStatus = 'offered';
  // let requestStatus = 'appointed';
  // let requestStatus = 'done';
  let requestStatus = 'canceled';

  return (
    <div className="request-container">
      <div className="request-service">
        <div className="request-service-left">
          <h3>Service name</h3>
          <p>Package name</p>
          <p>
            {requestStatus === 'appointed'
              ? 'Đã chấp nhận báo giá'
              : requestStatus === 'canceled'
              ? 'Đã bị hủy bởi khách'
              : 'Đã nhận 3 giờ trước'}
          </p>
        </div>
        <div className="request-service-right">
          <button className={requestStatus === 'done' || requestStatus === 'canceled' ? 'disable' : ''}>
            Từ chối lịch hẹn
          </button>
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
            <p>{requestStatus === 'new' ? 'Chua bao gia' : '70000d'}</p>
          </div>
        </div>
        <div className={requestStatus === 'new' ? 'request-price-bottom' : 'request-price-bottom disable'}>
          <p>Nhập báo giá tại đây</p>
          <input placeholder="Nhập giá"></input>
          <button>Gửi báo giá</button>
        </div>
        <div className={requestStatus === 'appointed' ? 'request-appointed' : 'request-appointed disable'}>
          <button>Hoàn thành công việc</button>
        </div>
        <div className={requestStatus === 'done' ? 'request-done' : 'request-done disable'}>
          <div className="provider-evaluate">
            <div className="provider-evaluate-left">Like Icon</div>
            <div className="provider-evaluate-right">
              <p>Đánh giá của bạn</p>
              <h4>Có tiền tip</h4>
            </div>
          </div>
          <div className="customer-evaluate">
            <div className="customer-evaluate-left">Star Icon</div>
            <div className="customer-evaluate-right">
              <p>Đánh giá của khách</p>
              <h4>5/5</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
