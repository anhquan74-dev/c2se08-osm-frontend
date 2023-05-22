import React from 'react';
import { useEffect } from 'react';
import elasticSearchApi from '../../../api/elasticSearchApi';
import { Route, Routes } from 'react-router-dom';
import NewsDetailPage from './pages/NewsDetailPage';
import NewsListPage from './pages/NewsListPage';

const ElasticSearch = () => {
  return (
    <Routes>
      <Route path="" element={<NewsListPage />} />
      <Route path=":postId" element={<NewsDetailPage />} />
    </Routes>
  );
};

export default ElasticSearch;
