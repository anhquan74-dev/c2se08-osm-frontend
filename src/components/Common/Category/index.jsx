import React from 'react';
import './Category.scss';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Category = ({ ...props }) => {
  const { icon, title } = props;
  const navigate = useNavigate();
  return (
    <div
      className="category-container"
      onClick={() => {
        navigate('/finding-provider');
      }}
    >
      <div>
        <img src={icon?.url} alt="category-icon" />
      </div>
      <p>{title}</p>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="category-container">
      <div>
        <Skeleton width={145} height={145} />
      </div>
      <p>
        <Skeleton width={145} height={20} />
      </p>
    </div>
  );
};

Category.Loading = Loading;

export default Category;
