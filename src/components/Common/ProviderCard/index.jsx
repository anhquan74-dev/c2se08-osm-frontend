import React from 'react';
import './ProviderCard.scss';
import Rating from '../Rating';
import { useSelector } from 'react-redux';

const ProviderCard = (props) => {
  const { id, avatar, avg_star, full_name, price, is_favorite, service } = props;
  const starArr = [1, 2, 3, 4, 5];

  // check favorite provider
  const { list } = useSelector((state) => state.category);

  return (
    <div className="provider-card">
      <div className="provider-card__left">
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
        {avg_star ? <Rating starNumber={avg_star} size="small" /> : <span>Chưa có đánh giá</span>}
        <div>
          {/* {is_favorite ? ( */}
          <img src="https://oddjob.vn/assets/images/empty_heart.svg" className="favorite-btn" />
          {/* ) : (
            <img src="https://oddjob.vn/assets/images/full_heart.svg" className="favorite-btn" />
          )} */}
        </div>
      </div>
      <div className="provider-card__right">
        <p>{full_name}</p>
        <div className="price">
          {price === 'negotiate' ? (
            <span>Giá thương lượng</span>
          ) : (
            <>
              Giá từ <span>{price}</span>
            </>
          )}
        </div>
        <div className="price">Khoảng cách</div>
        <div className="services">
          <DisplayServicesOnProviderCard services={service} list={list} />
        </div>
      </div>
    </div>
  );
};

const DisplayServicesOnProviderCard = ({ services, list }) => {
  let serviceName;
  for (let i = 0; i < list.length; i++) {
    if (services[0]?.category_id === list[i].id) {
      serviceName = list[i].name;
      break;
    }
  }
  if (services.length === 1) {
    return <strong>{serviceName}</strong>;
  }
  return (
    <>
      <strong>{serviceName}</strong>
      <span> và {services.length - 1} dịch vụ khác</span>
    </>
  );
};

export default ProviderCard;
