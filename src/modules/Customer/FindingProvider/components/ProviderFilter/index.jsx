import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../Admin/Category/categorySlice';
import Star from '../Star';
import './ProviderFilter.scss';

const ProviderFilter = ({ onChange, conditions }) => {
  const [categoryPick, setCategoryPick] = useState(0);
  const [starPick, setStarPick] = useState(0);
  const rateArr = [5, 4, 3, 2, 1];

  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    let newConditions;
    console.log(categoryPick);
    if (categoryPick === 0) {
      newConditions = {
        ...conditions,
        filter: {
          ...conditions.filter,
          category_id: null,
        },
        page: 1,
      };
    } else {
      newConditions = {
        ...conditions,
        filter: {
          ...conditions.filter,
          category_id: categoryPick,
        },
        page: 1,
      };
    }
    console.log(newConditions);
    onChange(newConditions);
  }, [categoryPick]);

  useEffect(() => {
    let newConditions;
    console.log(starPick);
    if (starPick === 0) {
      newConditions = {
        ...conditions,
        filter: {
          ...conditions.filter,
          avg_star: null,
        },
        page: 1,
      };
    } else {
      newConditions = {
        ...conditions,
        filter: {
          ...conditions.filter,
          avg_star: starPick,
        },
        page: 1,
      };
    }
    onChange(newConditions);
  }, [starPick]);

  return (
    <div className="provider-filter-content">
      <div className="title">
        <p>Bộ lọc</p>
        <span>Xóa hết</span>
      </div>
      <div className="provider-filter-item">
        <h3>Danh mục</h3>
        <ul>
          <li className={`pick-item ${categoryPick === 0 ? 'active' : ''}`} onClick={() => setCategoryPick(0)}>
            Tất cả
          </li>
          {list.map((item, index) => {
            return (
              <li
                key={index}
                className={`pick-item ${categoryPick === item.id ? 'active' : ''}`}
                onClick={() => setCategoryPick(item.id)}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="provider-filter-item"></div>
      <div className="provider-filter-item">
        <h3>Đánh giá</h3>
        <div className={`pick-item ${starPick === 0 ? 'active' : ''}`} onClick={() => setStarPick(0)}>
          Tất cả
        </div>
        <div className="star-group">
          {rateArr.map((item, index) => {
            return (
              <Star
                key={index}
                rate={item}
                className={starPick === item ? 'active' : ''}
                onClick={() => setStarPick(item)}
              />
            );
          })}
        </div>
      </div>
      <div className="provider-filter-item">
        <h3>Khoảng giá</h3>
        <div className="price-pick">
          <input
            className="range"
            type="number"
            name="from_price"
            minLength={0}
            maxLength={999999999999}
            placeholder="Từ"
          />

          <span></span>
          <input
            className="range"
            type="number"
            name="to_price"
            minLength={0}
            maxLength={999999999999}
            placeholder="Đến"
          />
        </div>
        <button className="">ÁP DỤNG</button>
      </div>
    </div>
  );
};

export default ProviderFilter;
