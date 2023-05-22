import React from 'react';
import './NewsItem.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatBirthDay, getText } from '../../../../../utils/common';
import moment from 'moment';
import PostImage from '../../../../../assets/images/post-default.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const NewsItem = ({ news }) => {
  const { id, title, content, image, category, date } = news;

  return (
    <div className="news-item">
      <div className="wrapper">
        <div className="image">
          {image?.url ? <img src={image?.url} alt="image" /> : <img src={PostImage} alt="image" />}
        </div>
        <div className="content">
          <p className="category">{category?.name}</p>
          <NavLink to={`/blog/${id}`} className="title">
            {title.length <= 43 ? <>{title.slice(0, 43)}</> : <>{title.slice(0, 43)}...</>}
          </NavLink>
          <p className="desc">
            {getText(content).length <= 121 ? <>{getText(content)}</> : <>{getText(content).slice(0, 121)}...</>}
          </p>
          <div className="time">
            <AccessTimeIcon />
            <span>{moment(date).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="news-item">
      <div className="wrapper">
        <div className="image">
          <Skeleton width={375} height={215} />
        </div>
        <div className="content">
          <p className="category">
            <Skeleton width={120} height={24} />
          </p>
          <Skeleton width={340} height={50} />

          <p className="desc">
            <Skeleton width={340} height={80} />
          </p>
          <div className="time">
            <Skeleton width={77} height={22} />
          </div>
        </div>
      </div>
    </div>
  );
};
NewsItem.Loading = Loading;

export default NewsItem;
