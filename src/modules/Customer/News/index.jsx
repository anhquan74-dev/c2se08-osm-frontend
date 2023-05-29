import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsDetailPage from './pages/NewsDetailPage';
import NewsListPage from './pages/NewsListPage';

const News = () => {
  return (
    <Routes>
      <Route path="" element={<NewsListPage />} />
      <Route path=":postId" element={<NewsDetailPage />} />
    </Routes>
  );
};

export default News;
