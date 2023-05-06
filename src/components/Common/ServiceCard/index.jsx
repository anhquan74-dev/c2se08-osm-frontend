import React, { useEffect, useState } from 'react';
import './ServiceCard.scss';
import { NavLink } from 'react-router-dom';
import Rating from '../Rating';
import providerApi from '../../../api/providerApi';
import serviceApi from '../../../api/serviceApi';

const ServiceCard = (props) => {
  const { name, description, is_negotiable, avg_star, price, service, provider } = props;
  const starArr = [1, 2, 3, 4, 5];
  starArr.length = 5;
  // const [provider, setProvider] = useState();
  // useEffect(() => {
  //   if (!service_id) return;
  //   (async () => {
  //     const res = await serviceApi.get(service_id);
  //     setProvider(res.data[0]?.user);
  //   })();
  // }, []);
  return (
    <div className="service-card">
      <h3 title={name}>{name?.length < 31 ? name : <>{name?.slice(0, 30)}...</>}</h3>
      <h4>{provider?.full_name}</h4>
      {avg_star ? <Rating starNumber={avg_star} size="small" /> : <span className="no-rating">Chưa có đánh giá</span>}
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
      <NavLink className="service-card-btn">Lấy báo giá</NavLink>
    </div>
  );
};

export default ServiceCard;
