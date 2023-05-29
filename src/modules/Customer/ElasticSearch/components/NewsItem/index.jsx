import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DOMPurify from 'dompurify';
import moment from 'moment';
import React from 'react';
import { NavLink } from 'react-router-dom';
import PostImage from '../../../../../assets/images/post-default.jpg';
import './NewsItem.scss';

const NewsItem = ({ news, highlight, id }) => {
  const { title, content, image, category, date } = news;
  console.log(highlight);

  return (
    <div className="news-item-elastic">
      <div className="wrapper">
        <div className="image">
          {image?.url ? <img src={image?.url} alt="image" /> : <img src={PostImage} alt="image" />}
        </div>
        <div className="content">
          <p className="category">{category?.name}</p>
          <NavLink to={`/elastic-search/${id}`} className="title">
            {title.length <= 42 ? <>{title.slice(0, 42)}</> : <>{title.slice(0, 42)}...</>}
          </NavLink>
          {highlight?.content ? (
            <div>
              ...
              <span
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(highlight?.content?.[0]),
                }}
              ></span>
              ...
            </div>
          ) : (
            <p className="desc">{content.length <= 200 ? <>{content}</> : <>{content.slice(0, 200)}...</>}</p>
          )}
          <div className="time">
            <AccessTimeIcon />
            <span>{moment(date).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
