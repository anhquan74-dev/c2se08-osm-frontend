import React from 'react';
import './ProviderCard.scss';

const ProviderCard = ({ ...props }) => {
  const { id, avatar, star, name, price, services } = props;
  const starArr = [1, 2, 3, 4, 5];
  console.log(starArr);

  // check favorite provider

  return (
    <div className="provider-card">
      <div className="provider-card__left">
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <div>
          {starArr?.map((item, index) => {
            console.log(index);
            if (index <= 3) {
              return <img src="https://oddjob.vn/assets/images/yellow_star.svg" style={{ width: 14, height: 14 }} />;
            }
            return <img src="https://oddjob.vn/assets/images/white_star.svg" style={{ width: 14, height: 14 }} />;
          })}
        </div>
        <div>
          <img src="https://oddjob.vn/assets/images/empty_heart.svg" className="favorite-btn" />
        </div>
      </div>
      <div className="provider-card__right">
        <p>{name}</p>
        <div>
          {price === 'negotiate' ? (
            <span>Giá thương lượng</span>
          ) : (
            <>
              Giá từ <span>{price}</span>
            </>
          )}
        </div>
        <div>Sửa điện & nước và 2 dịch vụ khác</div>
      </div>
    </div>
  );
};

export default ProviderCard;
