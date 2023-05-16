import { Box, CircularProgress, Dialog } from '@mui/material';
import React, { useState } from 'react';
import FeedbackItem from '../FeedbackItem';
import ServicePicker from '../ServicePicker';
import './FeedbackDialog.scss';
import Rating from '../Rating';
import feedbackApi from '../../../api/feedbackApi';

const FeedbackDialog = (props) => {
  const { onClose, type, open, services, star } = props;
  const [feedbackList, setFeedbackList] = useState();
  const [loading, setLoading] = useState(true);
  const handleChangeService = (serviceId) => {
    console.log(serviceId);
    (async () => {
      setLoading(true);
      const res = await feedbackApi.getAllFeedbackByServiceId(serviceId);
      setLoading(false);
      setFeedbackList(res.feedbackList);
    })();
  };
  console.log(feedbackList);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <div className="feedback-dialog">
        <div className="header">
          <div className="title">
            <h3>Đánh giá</h3>
            <p>Điện lạnh Hưng Thịnh</p>
            <Rating starNumber={star} />
          </div>
          <p onClick={onClose}>Đóng</p>
        </div>
        <ServicePicker services={services} handleChangeService={handleChangeService} />
        <div className="feedback-content">
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '220px', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          )}
          {!loading &&
            feedbackList &&
            feedbackList?.map((item, index) => {
              return (
                <>
                  <FeedbackItem key={item?.id} feedbackInfo={item} />
                  <hr class="horizontal-line"></hr>
                </>
              );
            })}
          {!loading && !feedbackList && (
            <div className="no-feedback">
              <span>Chưa có đánh giá</span>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default FeedbackDialog;
