import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink, useNavigate } from 'react-router-dom';
import Rating from '../Rating';
import './ServiceCard.scss';

const ServiceCard = (props) => {
  const { name, description, is_negotiable, avg_star, price, service, provider } = props;
  const starArr = [1, 2, 3, 4, 5];
  starArr.length = 5;
  const navigate = useNavigate();

  return (
    <div className="service-card">
      <h3
        title={name}
        onClick={() => {
          navigate(`/finding-provider/${provider?.id}`);
        }}
      >
        {name?.length < 31 ? name : <>{name?.slice(0, 30)}...</>}
      </h3>
      <h4>{provider?.full_name}</h4>
      {avg_star ? (
        <Rating starNumber={Math.round(avg_star)} size="small" />
      ) : (
        <span className="no-rating">Chưa có đánh giá</span>
      )}
      <div>
        {is_negotiable ? (
          <span>Giá thương lượng </span>
        ) : (
          <span>
            {price}
            <sup> VND</sup>
          </span>
        )}
      </div>
      <NavLink to={`/finding-provider/${provider?.id}`} className="service-card-btn">
        Lấy báo giá
      </NavLink>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="service-card">
      <h3>
        <Skeleton width={250} height={16} />
      </h3>
      <h4>
        <Skeleton width={160} height={14} />
      </h4>
      <Skeleton width={140} height={14} />
      <div>
        <Skeleton width={180} height={18} />
      </div>
      <Skeleton width={100} height={24} />
    </div>
  );
};

ServiceCard.Loading = Loading;

export default ServiceCard;
