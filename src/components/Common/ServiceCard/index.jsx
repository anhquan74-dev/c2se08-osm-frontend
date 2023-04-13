import React from 'react';
import './ServiceCard.scss';
import { NavLink } from 'react-router-dom';

const ServiceCard = ({ ...props }) => {
  const { name, provider, star, price } = props;
  const starArr = [1, 2, 3, 4, 5];
  starArr.length = 5;

  return (
    <div className="service-card">
      <h3>{name}</h3>
      <h4>{provider}</h4>
      <div>
        {starArr?.map((item, index) => {
          if (index <= 4) {
            return <img src="https://oddjob.vn/assets/images/yellow_star.svg" style={{ width: 14, height: 14 }} />;
          }
          return <img src="https://oddjob.vn/assets/images/white_star.svg" style={{ width: 14, height: 14 }} />;
        })}
      </div>
      <div>{price === 'negotiate' ? <span>Giá thương lượng </span> : <span>{price}</span>}</div>
      <NavLink className="service-card-btn">Lấy báo giá</NavLink>
    </div>
  );
};

export default ServiceCard;
