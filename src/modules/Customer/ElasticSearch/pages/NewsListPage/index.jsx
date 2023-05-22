import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewsItem from '../../components/NewsItem';
import { elasticSearchActions, getNews } from '../../elasticSearchSlice';
import './NewsListPage.scss';

const NewsListPage = () => {
  const dispatch = useDispatch();
  const { list, loading, conditions } = useSelector((state) => state.elastic);
  const searchRef = useRef();
  const typingTimeoutRef = useRef(null);
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  console.log(list);

  useEffect(() => {
    console.log(conditions);
    dispatch(getNews(conditions));
  }, [dispatch, conditions]);

  const handlePageChange = (e, page) => {
    dispatch(
      elasticSearchActions.setConditions({
        ...conditions,
        from: (page - 1) * conditions.size,
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
      let newConditions;
      if (value == '') {
        newConditions = { from: 0, size: 3 };
      } else {
        newConditions = {
          ...conditions,
          query: {
            bool: {
              must: [
                {
                  match: {
                    content: value,
                  },
                },
              ],
              should: {
                match: {
                  title: value,
                },
              },
            },
          },
          highlight: {
            pre_tags: ['<strong style="color: black; "}>'],
            post_tags: ['</strong>'],
            fields: {
              title: {},
              content: {},
            },
            type: 'plain',
            number_of_fragments: 1,
            fragment_size: 200,
            order: 'score',
          },
          from: 0,
        };
      }
      dispatch(elasticSearchActions.setConditions(newConditions));
    }, 500);
  };
  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };

  return (
    <div className="news-list-page container">
      <div className="search">
        <input type="text" placeholder="Tìm kiếm" onChange={handleSearchChange} inputRef={searchRef} />
      </div>
      <div className="break-crum">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" key="2" color="inherit" href="/" onClick={handleClick}>
            Trang chủ
          </Link>
          <Typography color="text.primary">Search Engine</Typography>
        </Breadcrumbs>
      </div>
      {search && (
        <p className="search-text">
          Kết quả tìm kiếm của từ khoá <strong>{search}</strong> :
        </p>
      )}
      {list?.hits?.length === 0 ? (
        <h3>Không tìm thấy bài viết</h3>
      ) : (
        <>
          <div className="news-list-grid">
            {list?.hits?.map((item, index) => {
              if (item?.highlight) {
                return <NewsItem key={index} news={item._source} highlight={item?.highlight} id={item._id} />;
              }
              return <NewsItem key={index} news={item._source} id={item._id} />;
            })}
          </div>
          <div className="pagination">
            <Pagination
              color="primary"
              count={Math.ceil(list?.total?.value / conditions?.size)}
              page={conditions.from / conditions.size + 1}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NewsListPage;
