import React from 'react';
import './Rating.scss';

const Rating = ({ starNumber, size }) => {
  const starArr = [1, 2, 3, 4, 5];

  return (
    <div className={`rating-star ${size === 'small' && 'small-star'}`}>
      {starArr?.map((item, index) => {
        if (index < starNumber) {
          return (
            <img
              className={`star ${size === 'large' ? 'large-star' : ''}`}
              key={index}
              src="https://oddjob.vn/assets/images/yellow_star.svg"
            />
          );
        }
        return (
          <img
            className={`star ${size === 'large' ? 'large-star' : ''}`}
            key={index}
            src="https://oddjob.vn/assets/images/white_star.svg"
          />
        );
      })}
    </div>
  );
};

export default Rating;
