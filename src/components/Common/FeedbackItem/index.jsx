import React from 'react';
import './FeedbackItem.scss';
import { ThumbUpOffAlt } from '@mui/icons-material';
import DefaultAvatar from '../../../assets/images/default-avatar.png';
import Rating from '../Rating';
import moment from 'moment';

const FeedbackItem = (props) => {
  const { feedbackInfo } = props;
  return (
    <div className="feedback-item">
      <div className="heading">
        <div className="right">
          <div className="avatar">
            <img
              src={feedbackInfo?.customerInfo.avatar !== null ? feedbackInfo?.customerInfo.avatar?.url : DefaultAvatar}
              alt=""
            />
          </div>
          <div className="name-rate">
            <h3>{feedbackInfo?.customerInfo?.full_name}</h3>
            <p>
              <Rating starNumber={feedbackInfo?.feedback.star} />
            </p>
          </div>
        </div>
        {/* <div className="left">
          <span>1</span>
          <ThumbUpOffAlt />
        </div> */}
      </div>
      <div className="content">{feedbackInfo?.feedback.comment}. </div>
      <div className="date">{moment(feedbackInfo?.feedback.created_at).format('DD/MM/YYYY')}</div>
    </div>
  );
};

export default FeedbackItem;
