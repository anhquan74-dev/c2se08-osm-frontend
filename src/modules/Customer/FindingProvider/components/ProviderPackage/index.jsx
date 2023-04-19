import React from 'react';
import './ProviderPackage.scss';
import { NavLink } from 'react-router-dom';

const ProviderPackage = () => {
  const services = ['Sửa điện nước', 'Sửa đồ điện gia dụng'];
  const starArr = [1, 2, 3, 4, 5];
  return (
    <div className="provider-package-wrapper">
      <div className="header">
        {services.map((item, index) => {
          return item;
        })}
      </div>
      <div className="content">
        <div className="package-item">
          <h3>khắc phục sự cố chập điện</h3>
          <div className="price">{'price' === 'negotiate' ? <span>Giá thương lượng </span> : <span>100000</span>}</div>
          <div className="rating">
            {starArr?.map((item, index) => {
              if (index <= 4) {
                return <img src="https://oddjob.vn/assets/images/yellow_star.svg" style={{ width: 14, height: 14 }} />;
              }
              return <img src="https://oddjob.vn/assets/images/white_star.svg" style={{ width: 14, height: 14 }} />;
            })}
          </div>
          <div className="desc">
            chuyên khắc phục sự cố mất điện, chập điện cho hộ gia đình, cơ quan, khách sạn. bắt bệnh nhanh chóng.
          </div>
          <NavLink className="quotation-btn">Lấy báo giá</NavLink>
        </div>
        <div className="package-item">
          <h3>khắc phục sự cố chập điện</h3>
          <div className="price">{'price' === 'negotiate' ? <span>Giá thương lượng </span> : <span>100000</span>}</div>
          <div className="rating">
            {starArr?.map((item, index) => {
              if (index <= 4) {
                return <img src="https://oddjob.vn/assets/images/yellow_star.svg" style={{ width: 14, height: 14 }} />;
              }
              return <img src="https://oddjob.vn/assets/images/white_star.svg" style={{ width: 14, height: 14 }} />;
            })}
          </div>
          <div className="desc">
            chuyên khắc phục sự cố mất điện, chập điện cho hộ gia đình, cơ quan, khách sạn. bắt bệnh nhanh chóng.
          </div>
          <NavLink className="quotation-btn">Lấy báo giá</NavLink>
        </div>
        <div className="package-item">
          <h3>khắc phục sự cố chập điện</h3>
          <div className="price">{'price' === 'negotiate' ? <span>Giá thương lượng </span> : <span>100000</span>}</div>
          <div className="rating">
            {starArr?.map((item, index) => {
              if (index <= 4) {
                return <img src="https://oddjob.vn/assets/images/yellow_star.svg" style={{ width: 14, height: 14 }} />;
              }
              return <img src="https://oddjob.vn/assets/images/white_star.svg" style={{ width: 14, height: 14 }} />;
            })}
          </div>
          <div className="desc">
            chuyên khắc phục sự cố mất điện, chập điện cho hộ gia đình, cơ quan, khách sạn. bắt bệnh nhanh chóng.
          </div>
          <NavLink className="quotation-btn">Lấy báo giá</NavLink>
        </div>
        <div className="package-item">
          <h3>khắc phục sự cố chập điện</h3>
          <div className="price">{'price' === 'negotiate' ? <span>Giá thương lượng </span> : <span>100000</span>}</div>
          <div className="rating">
            {starArr?.map((item, index) => {
              if (index <= 4) {
                return <img src="https://oddjob.vn/assets/images/yellow_star.svg" style={{ width: 14, height: 14 }} />;
              }
              return <img src="https://oddjob.vn/assets/images/white_star.svg" style={{ width: 14, height: 14 }} />;
            })}
          </div>
          <div className="desc">
            chuyên khắc phục sự cố mất điện, chập điện cho hộ gia đình, cơ quan, khách sạn. bắt bệnh nhanh chóng.
          </div>
          <NavLink className="quotation-btn">Lấy báo giá</NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProviderPackage;
