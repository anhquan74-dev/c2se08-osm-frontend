import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import NewsItem from '../../components/NewsItem';
import './NewsListPage.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, newActions } from '../../newSlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import categoryApi from '../../../../../api/categoryApi';
import Skeleton from 'react-loading-skeleton';

const NewsListPage = () => {
  const listNews = [{}, {}, {}, {}, {}, {}, {}, {}];
  const dispatch = useDispatch();
  const { list, loading, conditions } = useSelector((state) => state.new);
  const searchRef = useRef();
  const typingTimeoutRef = useRef(null);
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const [categories, setCategories] = useState();

  useEffect(() => {
    (async () => {
      const res = await categoryApi.getAll();
      setCategories(res.data);
    })();
  }, []);
  useEffect(() => {
    dispatch(getNews(conditions));
  }, [dispatch, conditions]);

  const handlePageChange = (e, page) => {
    dispatch(
      newActions.setConditions({
        ...conditions,
        page: page,
      })
    );
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    // debounce
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const newConditions = {
        ...conditions,
        filter: {
          ...conditions.filter,
          title: value,
        },
        page: 1,
      };
      dispatch(newActions.setConditions(newConditions));
    }, 500);
  };
  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const newConditions = {
      ...conditions,
      filter: {
        ...conditions.filter,
        category_id: value,
      },
      page: 1,
    };
    dispatch(newActions.setConditions(newConditions));
  };
  return (
    <div className="news-list-page container">
      <div className="search">
        <input type="text" placeholder="Tìm kiếm" onChange={handleSearchChange} inputRef={searchRef} />
        <FormControl size="small" sx={{ marginRight: '6px' }}>
          <InputLabel id="filterByCategory">Lọc theo danh mục</InputLabel>
          <Select
            labelId="filterByCategory"
            id="filterByCategory"
            label="Lọc theo thành phố"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            {categories?.map((category) => {
              return (
                <MenuItem key={category.id} value={category.id}>
                  <em>{category.name}</em>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="break-crum">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" key="2" color="inherit" href="/" onClick={handleClick}>
            Trang chủ
          </Link>
          <Typography color="text.primary">Blog</Typography>
        </Breadcrumbs>
      </div>
      {search && (
        <p className="search-text">
          Kết quả tìm kiếm của từ khoá <strong>{search}</strong> :
        </p>
      )}
      {list?.data?.length === 0 ? (
        <h3>Không tìm thấy bài viết</h3>
      ) : (
        <>
          <div className="news-list-grid">
            {loading &&
              Array(3)
                .fill(0)
                .map(() => {
                  return <NewsItem.Loading />;
                })}
            {!loading && (
              <>
                {list?.data?.map((item, index) => {
                  return <NewsItem key={index} news={item} />;
                })}
              </>
            )}
          </div>
          <div className="pagination">
            {loading && <Skeleton width={100} height={30} />}
            {!loading && (
              <Pagination
                color="primary"
                count={Math.ceil(list?.total / list?.per_page)}
                page={conditions.page}
                onChange={handlePageChange}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsListPage;
