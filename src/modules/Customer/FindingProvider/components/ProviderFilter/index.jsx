import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../Admin/Category/categorySlice';
import Star from '../Star';
import './ProviderFilter.scss';
import Skeleton from 'react-loading-skeleton';
import { providerCustomerActions } from '../../providerCustomerSlice';
import { PAGE_DEFAULT } from '../../../../../utils/constants';
import { FormControl } from '@mui/material';
import { convertDistrictIdToDistrictName, convertProvinceIdToProvinceName } from '../../../../../utils/common';
import locationApi from '../../../../../api/locationApi';
import categoryApi from '../../../../../api/categoryApi';
import { useSearchParams } from 'react-router-dom';

const ProviderFilter = ({ onChange, conditions }) => {
  const [categoryPick, setCategoryPick] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const [starPick, setStarPick] = useState(0);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(99999999);
  // const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState();
  const rateArr = [5, 4, 3, 2, 1];

  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.category);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  useEffect(() => {
    const getPublicProvinces = async () => {
      const res = await locationApi.getPublicProvinces();
      setProvinces(res?.data?.results);
    };
    getPublicProvinces();
  }, []);

  useEffect(() => {
    if (list.length === 0) dispatch(getCategories());
    // (async () => {
    //   const res = await categoryApi.getAll();
    //   setLoading(false);
    //   setCategoryList(res.data);
    // })();
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    setCategoryPick(categoryId);
  }, [list]);

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

  useEffect(() => {
    const getPublicDistricts = async () => {
      const res = await locationApi.getPublicDistricts(province);
      setDistricts(res?.data?.results);
    };
    getPublicDistricts();
  }, [province]);

  const handleClearCondition = () => {
    dispatch(
      providerCustomerActions.setConditions({
        page: PAGE_DEFAULT,
        limit: 20,
      })
    );
    setCategoryPick(0);
    setStarPick(0);
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    const newConditions = {
      ...conditions,
      filter: {
        ...conditions.filter,
        province_name: convertProvinceIdToProvinceName(value, provinces),
        district_name: '',
      },
      page: 1,
    };
    onChange(newConditions);
    setProvince(value);
    setDistrict('');
  };

  const handleDistrictChange = (e) => {
    console.log('handleDistrictChange');
    const { value } = e.target;
    const newConditions = {
      ...conditions,
      filter: {
        ...conditions.filter,
        province_name: convertProvinceIdToProvinceName(province, provinces),
        district_name: convertDistrictIdToDistrictName(value, districts),
      },
      page: 1,
    };
    console.log('handleDistrictChange,', newConditions);

    onChange(newConditions);
    setDistrict(value);
  };

  const handleChangePrice = () => {
    const newConditions = {
      ...conditions,
      filter: {
        ...conditions.filter,
        price_min: priceMin,
        price_max: priceMax,
      },
      page: 1,
    };
    onChange(newConditions);
  };
  return (
    <div className="provider-filter-content">
      <div className="title">
        <p>Bộ lọc</p>
        <span onClick={handleClearCondition}>Xóa hết</span>
      </div>
      <div className="provider-filter-item">
        <h3>Danh mục</h3>
        <ul>
          <li className={`pick-item ${categoryPick == 0 ? 'active' : ''}`} onClick={() => setCategoryPick(0)}>
            Tất cả
          </li>

          {loading &&
            Array(4)
              .fill(0)
              .map(() => {
                return <Skeleton width={150} height={45} style={{ margin: '8px 0' }} />;
              })}
          {!loading &&
            list &&
            list?.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`pick-item ${categoryPick == item.id ? 'active' : ''}`}
                  onClick={() => setCategoryPick(item.id)}
                >
                  {item.name}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="provider-filter-item">
        <FormControl fullWidth sx={{ margin: '4px 0' }} size="small">
          <select
            // value={conditions?.filter?.province_name || ''}
            value={province || ''}
            className="select-dashboard"
            label="Lọc theo thành phố"
            onChange={handleCityChange}
          >
            <option value={''}>
              <em>Tất cả thành phố</em>
            </option>
            {provinces?.map((city) => {
              return (
                <option
                  key={city.province_id}
                  // value={convertProvinceName(city.province_name)}
                  value={city.province_id}
                >
                  <em>{city.province_name}</em>
                </option>
              );
            })}
          </select>
        </FormControl>
        <FormControl fullWidth sx={{ margin: '4px 0' }} size="small">
          <select
            value={district || ''}
            className="select-dashboard"
            label="Lọc theo thành phố"
            onChange={handleDistrictChange}
          >
            <option value={''}>
              <em>Tất cả Quận/Huyện</em>
            </option>
            {districts?.map((district) => {
              return (
                <option key={district.district_id} value={district.district_id}>
                  <em>{district.district_name}</em>
                </option>
              );
            })}
          </select>
        </FormControl>
      </div>
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
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />

          <span></span>
          <input
            className="range"
            type="number"
            name="to_price"
            minLength={0}
            maxLength={999999999999}
            placeholder="Đến"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </div>
        <button className="" onClick={handleChangePrice}>
          ÁP DỤNG
        </button>
      </div>
    </div>
  );
};

export default ProviderFilter;
