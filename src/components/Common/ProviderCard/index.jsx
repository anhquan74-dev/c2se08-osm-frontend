import React from 'react';
import './ProviderCard.scss';
import Rating from '../Rating';
import { useSelector } from 'react-redux';
import DefaultAvatar from '../../../assets/images/default-avatar.png';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const ProviderCard = (props) => {
  const { id, avatar, avg_star, full_name, price, is_favorite, service } = props;
  const starArr = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  // check favorite provider
  const { list } = useSelector((state) => state.category);

  const handleOnclickFullname = () => {
    navigate(`/finding-provider/${id}`);
  };

  return (
    <div className="provider-card">
      <div className="provider-card__left">
        <div className="avatar">
          <img src={avatar?.url ? avatar.url : DefaultAvatar} alt="avatar" />
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
        <p onClick={handleOnclickFullname}>{full_name}</p>
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
  // let serviceName;
  // for (let i = 0; i < list.length; i++) {
  //   if (services[0]?.category_id === list[i].id) {
  //     serviceName = list[i].name;
  //     break;
  //   }
  // }
  if (services.length === 1) {
    return <strong>{services[0]?.name}</strong>;
  }
  return (
    <>
      <strong>{services[0]?.name || <Skeleton width={166} height={16} />}</strong>
      <span> và {services.length - 1 || <Skeleton width={19} height={16} />} dịch vụ khác</span>
    </>
  );
};

const Loading = () => {
  return (
    <div className="provider-card">
      <div className="provider-card__left">
        <div className="avatar">
          <Skeleton width={77} height={77} />
        </div>
        <Skeleton width={77} height={14} />
        <div>
          <Skeleton width={19} height={16} />
        </div>
      </div>
      <div className="provider-card__right">
        <p>
          <Skeleton width={166} height={24} />
        </p>
        <div className="price">
          <Skeleton width={166} height={20} />
        </div>
        <div className="price">
          <Skeleton width={166} height={20} />
        </div>
        <div className="services">
          <Skeleton width={166} height={30} />
        </div>
      </div>
    </div>
  );
};

ProviderCard.Loading = Loading;

export default ProviderCard;
