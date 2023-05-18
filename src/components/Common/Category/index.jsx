import React from 'react';
import './Category.scss';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Category = ({ ...props }) => {
  const { item } = props;
  const navigate = useNavigate();
  return (
    <div
      className="category-container"
      onClick={() => {
        navigate(`/finding-provider?categoryId=${item.id}`);
      }}
    >
      <div>
        <img src={item.logo?.url} alt="category-icon" />
      </div>
      <p>{item.name}</p>
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
