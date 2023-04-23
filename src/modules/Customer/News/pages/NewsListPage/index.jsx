import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React from 'react';
import NewsItem from '../../components/NewsItem';
import './NewsListPage.scss';
import { NavLink } from 'react-router-dom';

const NewsListPage = () => {
  const listNews = [{}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <div className="news-list-page container">
      <div className="search">
        <input type="text" placeholder="Tìm kiếm" />
      </div>
      <div className="break-crum">
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink to="/">Trang chủ</NavLink>
          <Typography color="text.primary">Blog</Typography>
        </Breadcrumbs>
      </div>
      <div className="news-list-grid">
        {listNews.map((item, index) => {
          return <NewsItem news={item} />;
        })}
      </div>
      <div className="pagination">
        <Pagination count={10} color="primary" />
      </div>
    </div>
  );
};

export default NewsListPage;
