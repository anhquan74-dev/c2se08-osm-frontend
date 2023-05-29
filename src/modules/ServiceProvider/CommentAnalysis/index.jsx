import React, { useEffect, useState } from 'react';
import './CommentAnalysis.scss';
import serviceApi from '../../../api/serviceApi';
import { useSelector } from 'react-redux';
import { Box, Breadcrumbs, CircularProgress, Link, Stack, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import feedbackApi from '../../../api/feedbackApi';
import FeedbackItem from '../../../components/Common/FeedbackItem';

const CommentAnalysis = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [services, setServices] = useState();
  const [servicePick, setServicePick] = useState();
  const [feedbacks, setFeedbacks] = useState();
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await serviceApi.getByProvider(currentUser.id);
      setLoading(false);
      setServices(res?.data);
    })();
  }, []);

  useEffect(() => {
    setServicePick(services?.[0]?.service?.id);
  }, [services]);

  useEffect(() => {
    if (!servicePick) return;
    (async () => {
      const res = await feedbackApi.getAllFeedbackByServiceId(servicePick);
      setFeedbacks(res?.feedbackList);
    })();
  }, [servicePick]);

  useEffect(() => {
    if (!status) return;
    if (status === 1) {
      setFeedbacks(feedbacks?.filter((item) => parseFloat(item?.feedback?.rating) > 0));
    } else {
      setFeedbacks(feedbacks?.filter((item) => parseFloat(item?.feedback?.rating) < 0));
    }
  }, [status]);

  console.log(services);

  const handleClickBreadCrum = (event) => {
    console.log(event.target.href);
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };

  const handleClickService = (id) => {
    setServicePick(id);
  };
  return (
    <div className="comment-analysis-provider container">
      <div className="break-crum">
        <Stack spacing={2} marginTop={3}>
          <Breadcrumbs separator={<NavigateNext fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/provider" onClick={handleClickBreadCrum}>
              Trang chủ
            </Link>
            <Typography key="3" color="text.primary">
              Cảm xúc bình luận
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <h3>Cảm xúc bình luận</h3>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '220px', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <>
          <div className="header-status">
            <div className={`status ${status === 1 ? 'active' : ''}`} onClick={() => setStatus(1)}>
              Tích cực
            </div>
            <div className={`status ${status === 0 ? 'active' : ''}`} onClick={() => setStatus(0)}>
              Tiêu cực
            </div>
          </div>
          <div className="comment-wrapper">
            <div className="services-comment">
              {services?.map((item, index) => {
                return (
                  <span
                    className={`comment-service-item ${servicePick === item?.service?.id ? 'active' : ''}`}
                    onClick={() => handleClickService(item?.service?.id)}
                  >
                    {item?.service?.name}
                  </span>
                );
              })}
            </div>
            <div className="comment-content">
              {!feedbacks ? (
                <>Không có bình luận</>
              ) : (
                <>
                  {status === 1 &&
                    (feedbacks.filter((item) => parseFloat(item?.feedback?.rating) > 0).length === 0 ? (
                      <>Không có bình luận</>
                    ) : (
                      feedbacks
                        .filter((item) => parseFloat(item?.feedback?.rating) > 0)
                        ?.map((item, index) => {
                          return (
                            <>
                              <div className="feedback-group">
                                <div className="content-up">
                                  <FeedbackItem key={index} feedbackInfo={item} />
                                </div>
                              </div>
                            </>
                          );
                        })
                    ))}
                  {status === 0 &&
                    (feedbacks.filter((item) => parseFloat(item?.feedback?.rating) < 0).length === 0 ? (
                      <>Không có bình luận</>
                    ) : (
                      feedbacks
                        .filter((item) => parseFloat(item?.feedback?.rating) < 0)
                        ?.map((item, index) => {
                          return (
                            <>
                              <div className="feedback-group">
                                <div className="content-up">
                                  <FeedbackItem key={index} feedbackInfo={item} />
                                </div>
                              </div>
                            </>
                          );
                        })
                    ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentAnalysis;
