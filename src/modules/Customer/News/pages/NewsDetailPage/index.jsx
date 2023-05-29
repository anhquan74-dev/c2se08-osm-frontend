import { AccessTime } from '@mui/icons-material';
import { Box, Breadcrumbs, CircularProgress, Link, Typography } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import NewsItem from '../../components/NewsItem';
import './NewsDetailPage.scss';
import postApi from '../../../../../api/postApi';
import moment from 'moment';
import { getText } from '../../../../../utils/common';
import DOMPurify from 'dompurify';
import PostImage from '../../../../../assets/images/post-default.jpg';

const NewsDetailPage = () => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const [showNetwork, setShowNetwork] = useState(true);
  const { postId } = useParams();
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const [postsCategory, setPostsCategory] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await postApi.get(postId);
      setLoading(false);
      setPost(res.data);
    })();
  }, [postId]);

  useLayoutEffect(() => {
    setHeight(ref?.current?.offsetHeight);
  }, [post]);

  useEffect(() => {
    (async () => {
      const res = await postApi.getByCategory(post?.category_id);
      setPostsCategory(res.data);
    })();
  }, [post]);

  const showHideSocialNetwork = () => {
    const scrollValue = document.documentElement.scrollTop;
    if (scrollValue > height - 120) {
      setShowNetwork(false);
    } else {
      setShowNetwork(true);
    }
  };

  window.addEventListener('scroll', showHideSocialNetwork);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };
  return (
    <div className="news-detail">
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '220px', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
          {' '}
          <div className="container">
            <div ref={ref} className="news-content">
              <div className="left">
                <div className={`social-network-fixed d-none ${showNetwork === true ? 'd-lg-block' : ''}`} style={{}}>
                  <div className="social-title">Chia sẻ</div>
                  <ul className="social-network-group">
                    <li className="social-network-item">
                      <img src="https://oddjob.vn/blog/wp-content/themes/oddjob-blog-theme/img/facebook.svg" />
                    </li>
                    <li className="social-network-item">
                      <img src="https://oddjob.vn/blog/wp-content/themes/oddjob-blog-theme/img/zalo.svg" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right">
                <div className="break-crum">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" key="2" color="inherit" href="/" onClick={handleClick}>
                      Trang chủ
                    </Link>
                    <Link underline="hover" key="2" color="inherit" href="/blog" onClick={handleClick}>
                      Blog
                    </Link>
                    <Typography color="text.primary">{post?.title}</Typography>
                  </Breadcrumbs>
                </div>
                <div className="main">
                  <p className="category">{post?.category?.name}</p>
                  <h3 className="title">{post?.title}</h3>
                  <div className="time">
                    <AccessTime />
                    <span>{moment(post?.date).fromNow()}</span>
                  </div>
                  <div className="image">
                    {post?.image ? <img src={post?.image?.url} alt="image" /> : <img src={PostImage} alt="image" />}{' '}
                  </div>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post?.content),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="shared">
            <div className="content">
              <p>Hãy chia sẻ bài viết này cho</p>
              <div>
                <img src="https://oddjob.vn/blog/wp-content/themes/oddjob-blog-theme/img/facebook.svg" />
                <img src="https://oddjob.vn/blog/wp-content/themes/oddjob-blog-theme/img/zalo.svg" />
              </div>
            </div>
          </div>
          <div className="related container">
            <h3>Bài viết liên quan</h3>
            <div className="news-grid">
              {postsCategory?.length > 0 &&
                postsCategory?.map((item, index) => {
                  if (index < 3) {
                    return <NewsItem key={item.id} news={item} />;
                  }
                })}
              {/* <NewsItem />
          <NewsItem />
          <NewsItem /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsDetailPage;
