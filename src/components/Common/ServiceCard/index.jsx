import React from 'react';
import './ServiceCard.scss';
import { NavLink } from 'react-router-dom';
import Rating from '../Rating';

const ServiceCard = ({ ...props }) => {
  const { name, provider, star, price } = props;
  const starArr = [1, 2, 3, 4, 5];
  starArr.length = 5;

  return (
    <div className="service-card">
      <h3>{name}</h3>
      <h4>{provider}</h4>
      <Rating starNumber={4} size="small" />
      <div>{price === 'negotiate' ? <span>Giá thương lượng </span> : <span>{price}</span>}</div>
      <NavLink className="service-card-btn">Lấy báo giá</NavLink>
    </div>
  );
};

export default ServiceCard;
