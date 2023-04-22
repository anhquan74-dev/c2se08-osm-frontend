import { Dialog } from '@mui/material';
import React from 'react';
import FeedbackItem from '../FeedbackItem';
import ServicePicker from '../ServicePicker';
import './FeedbackDialog.scss';
import Rating from '../Rating';

const FeedbackDialog = (props) => {
  const { onClose, type, open } = props;
  const services = ['Sửa điện và nước', 'Sửa đồ điện gia dụng'];
  return (
    <Dialog onClose={onClose} open={open} maxWidth="md">
      <div className="feedback-dialog">
        <div className="header">
          <div className="title">
            <h3>Đánh giá</h3>
            <p>Điện lạnh Hưng Thịnh</p>
            <Rating starNumber={4} />
          </div>
          <p onClick={onClose}>Đóng</p>
        </div>
        <ServicePicker services={services} />
        <div className="feedback-content">
          <FeedbackItem />
          <hr class="horizontal-line"></hr>
          <FeedbackItem />
          <hr class="horizontal-line"></hr>
          <FeedbackItem />
          <hr class="horizontal-line"></hr>
          <FeedbackItem />
          <hr class="horizontal-line"></hr>
          <FeedbackItem />
          <hr class="horizontal-line"></hr>
        </div>
      </div>
    </Dialog>
  );
};

export default FeedbackDialog;
