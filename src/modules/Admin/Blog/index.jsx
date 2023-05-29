import React from 'react';
import PostListPage from './pages/PostListPage';
import AddEditPostPage from './pages/AddEditPostPage';
import { Route, Routes } from 'react-router-dom';

const Blog = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<PostListPage />} />
        <Route path="add" element={<AddEditPostPage />} />
        <Route path=":postId" element={<AddEditPostPage />} />
      </Routes>
    </>
  );
};

export default Blog;
