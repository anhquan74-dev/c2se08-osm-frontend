import React from 'react';
import './FeedbackItem.scss';
import { ThumbUpOffAlt } from '@mui/icons-material';
import DefaultAvatar from '../../../assets/images/default-avatar.png';
import Rating from '../Rating';

const FeedbackItem = (props) => {
  return (
    <div className="feedback-item">
      <div className="heading">
        <div className="right">
          <div className="avatar">
            <img src={DefaultAvatar} alt="" />
          </div>
          <div className="name-rate">
            <h3>Anh Quan</h3>
            <p>
              <Rating starNumber={4} />
            </p>
          </div>
        </div>
        <div className="left">
          <span>1</span>
          <ThumbUpOffAlt />
        </div>
      </div>
      <div className="content">
        Anh thợ làm việc rất chuyên nghiệp và nhiệt tình. Phản hồi dịch vụ nhanh và đến làm đúng giờ. Giá cả rất phải
        chăng và hợp lý. Sẽ ủng hộ dịch vụ của anh và giới thiệu anh thợ cho bạn bè, người thân khi cần.{' '}
      </div>
      <div className="date">06/02/2023</div>
    </div>
  );
};

export default FeedbackItem;
