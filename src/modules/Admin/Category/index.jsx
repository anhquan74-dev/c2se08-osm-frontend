import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoryListPage from './pages/CategoryListPage';
import AddEditCategoryPage from '../Category/pages/AddEditCategoryPage';

const Category = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<CategoryListPage />} />
        <Route path="add" element={<AddEditCategoryPage />} />
        <Route path=":categoryId" element={<AddEditCategoryPage />} />
      </Routes>
    </>
  );
};

export default Category;
