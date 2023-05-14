import React, { useState } from 'react';
import './AppointmentItem.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ImageIcon from '@mui/icons-material/Image';
import Rating from '../../../../../components/Common/Rating';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Star from '@mui/material/Rating';

const AppointmentItem = (props) => {
  const { status, appointment } = props;
  const [openRateDialog, setOpenRateDialog] = useState(false);
  const [star, setStar] = useState();
  console.log(status, appointment);

  const handleCloseRateDialog = () => {
    setOpenRateDialog(false);
  };

  const handleRating = () => {
    setOpenRateDialog(false);
  };
  return (
    <div className="appointment-item">
      <div className="btn-chat">
        <img src="https://oddjob.vn/assets/images/black-chat-icon.svg" className="chat-icon" /> CHAT{' '}
      </div>
      <div className="header">
        <div className="wrapper">
          <div className="category">{appointment?.service?.name}</div>
          <div className="name">{appointment?.package?.name}</div>
          <div className="from-now" style={{ color: 'rgb(255, 190, 23)' }}>
            <span>Đã gửi 6 phút trước</span>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="group">
          <div className="left">
            <div>
              <img src={appointment?.service?.provider?.avatar?.url} alt="avatar" className="avatar" />
            </div>
          </div>
          <div className="right">
            <div>Thợ</div>
            <div>{appointment?.service?.provider?.full_name}</div>
          </div>
        </div>
        <div className="group">
          <div className="left">
            <div>
              <LocationOnIcon />
            </div>
          </div>
          <div className="right">
            <div>Địa điểm</div>
            <div>{appointment?.location?.address}</div>
          </div>
        </div>
        <div className="group-3">
          <div className="group-2">
            <div className="group">
              <div className="left">
                <div>
                  <WorkHistoryIcon />
                </div>
              </div>
              <div className="right">
                <div>Thời gian làm việc</div>
                <div>{appointment?.date}</div>
              </div>
            </div>
            <div className="group">
              <div className="left">
                <div>
                  <ImageIcon />
                </div>
              </div>
              <div className="right last">
                <div>Ảnh đính kèm</div>
                <div className="image">
                  <img src={appointment?.attach_photo?.url} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="group">
            <div className="left">
              <div>
                <BorderColorIcon />
              </div>
            </div>
            <div className="right last">
              <div>Ghi chú</div>
              <div className="note">{appointment?.note_for_provider}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="rating">
          {appointment?.feedback && (
            <>
              <span>Đánh giá của bạn</span>
              <span>
                <Rating starNumber={appointment?.feedback?.star} />
              </span>
            </>
          )}
        </div>
        <div className="price">
          {appointment?.price ? (
            <div className="price-offered">
              <p>Báo giá</p> <span>{appointment?.price} VNĐ</span>
            </div>
          ) : (
            <strong>Chưa nhận được báo giá</strong>
          )}
          {appointment?.price && appointment?.status === 'offered' && (
            <button className="accept-price-btn">Chấp nhận báo giá</button>
          )}
          {appointment?.price && appointment?.status === 'appointed' && (
            <button className="done-btn">Hoàn thành lịch hẹn</button>
          )}
          {appointment?.price && appointment?.status === 'done' && (
            <button
              className="rate-btn"
              onClick={() => {
                setOpenRateDialog(true);
              }}
            >
              Đánh giá ngay
            </button>
          )}
        </div>
      </div>
      <Dialog
        open={openRateDialog}
        onClose={handleCloseRateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="md"
      >
        <DialogContent>
          <div className="customer-rating">
            <div className="rating-header">
              <h3>Đánh giá</h3>
              <span onClick={() => setOpenRateDialog(false)}>Đóng</span>
            </div>
            <div className="rating-content">
              <div className="provider-image">
                <img src="" alt="" />
              </div>
              <p>Thợ</p>
              <h4>Trần Anh Quân</h4>
              <Star
                name="simple-controlled"
                value={star}
                onChange={(event, newValue) => {
                  setStar(newValue);
                }}
                size="large"
              />
              <textarea class="customer-comment" placeholder="Bạn nghĩ gì về Nhà cung cấp này?"></textarea>
              <div className="note">
                Sau khi gửi, bạn sẽ <strong>không thể chỉnh sửa</strong> đánh giá được nữa. Bạn chắc chắn muốn gửi nội
                dung đánh giá này chứ?
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleRating()} color="info" variant="contained" autoFocus>
            Gửi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppointmentItem;
