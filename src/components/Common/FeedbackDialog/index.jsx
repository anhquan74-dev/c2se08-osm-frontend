import { Box, CircularProgress, Dialog } from '@mui/material';
import React, { useState } from 'react';
import FeedbackItem from '../FeedbackItem';
import ServicePicker from '../ServicePicker';
import './FeedbackDialog.scss';
import Rating from '../Rating';
import moment from 'moment';
import feedbackApi from '../../../api/feedbackApi';

const FeedbackDialog = (props) => {
  const { onClose, type, open, services, star, provider } = props;
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
  console.log(provider);
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <div className="feedback-dialog">
        <div className="header">
          <div className="title">
            <h3>Đánh giá</h3>
            <p>{provider?.full_name}</p>
            {star ? <Rating starNumber={star} /> : <small>Chưa có đánh giá</small>}
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
                  <div className="feedback-group">
                    <div className="content-up">
                      <FeedbackItem key={index} feedbackInfo={item} />
                      <hr class="horizontal-line"></hr>
                    </div>
                    <div className="content-down">
                      {item?.feedback?.reply && (
                        <>
                          <p>Phản hồi của nhà cung cấp</p>
                          <div className="content">{item?.feedback?.reply}</div>
                          <div className="date">{moment(item?.feedback?.reply_at).format('DD/MM/YYYY')}</div>
                        </>
                      )}
                    </div>
                  </div>
                  {item?.feedback?.reply && <hr class="horizontal-line"></hr>}
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
