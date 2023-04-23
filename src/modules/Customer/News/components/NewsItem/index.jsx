import React from 'react';
import './NewsItem.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const NewsItem = ({ news }) => {
  return (
    <div className="news-item">
      <div className="wrapper">
        <div className="image">
          <img
            src="https://oddjob.vn/blog/wp-content/uploads/2022/06/thiet-ke-va-thi-cong-nha-ve-sinh-2-300x212.png"
            alt="image"
          />
        </div>
        <div className="content">
          <p className="category">Dọn dẹp nhà cửa</p>
          <h3 className="title">NHỮNG THÓI QUEN XẤU KHI DỌN DẸP NHÀ CỬA</h3>
          <p className="desc">
            Những thói quen xấu trong việc vệ sinh nhà ở sẽ làm bạn cảm thấy mất thời gian và mệt mỏi. Chỉ cần sửa được
            những thói
          </p>
          <div className="time">
            <AccessTimeIcon />
            <span>2022-06-22</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
