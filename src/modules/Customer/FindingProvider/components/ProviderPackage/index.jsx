import React, { useState } from 'react';
import './ProviderPackage.scss';
import { NavLink } from 'react-router-dom';
import ServicePicker from '../../../../../components/Common/ServicePicker';
import Rating from '../../../../../components/Common/Rating';

const ProviderPackage = () => {
  const services = ['Sửa điện nước', 'Sửa đồ điện gia dụng'];
  const starArr = [1, 2, 3, 4, 5];
  const [activeService, setActiveService] = useState(0);

  const handleChangeService = (index) => {
    // setActiveService(index);
    console.log(index);
  };
  return (
    <div className="provider-package-wrapper">
      <ServicePicker handleChangeService={handleChangeService} services={services} />
      <div className="content">
        <div className="package-item">
          <h3>khắc phục sự cố chập điện</h3>
          <div className="price">{'price' === 'negotiate' ? <span>Giá thương lượng </span> : <span>100000</span>}</div>
          <div className="rating">
            <Rating starNumber={4} size="small" />
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
            <Rating starNumber={4} size="small" />
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
            <Rating starNumber={4} size="small" />
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
            <Rating starNumber={4} size="small" />
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
