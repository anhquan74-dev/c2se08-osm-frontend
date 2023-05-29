import React from 'react';
import './Star.scss';

const Star = ({ rate, className, onClick }) => {
  const starArr = [1, 2, 3, 4, 5];
  return (
    <div className={`star-pick ${className}`} onClick={onClick}>
      {starArr?.map((item, index) => {
        if (item <= rate) {
          return (
            <img key={index} src="https://oddjob.vn/assets/images/yellow_star.svg" style={{ width: 14, height: 14 }} />
          );
        }
        return (
          <img key={index} src="https://oddjob.vn/assets/images/white_star.svg" style={{ width: 14, height: 14 }} />
        );
      })}
    </div>
  );
};

export default Star;
