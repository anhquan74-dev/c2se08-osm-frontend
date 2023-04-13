import React from 'react';
import './Category.scss';

const Category = ({ ...props }) => {
  const { icon, title } = props;
  return (
    <div className="category-container">
      <div>
        <img src={icon} alt="category-icon" />
      </div>
      <p>{title}</p>
    </div>
  );
};

export default Category;
