import React, { useState } from 'react';
import './AppointmentItem.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ImageIcon from '@mui/icons-material/Image';
import Rating from '../../../../../components/Common/Rating';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Star from '@mui/material/Rating';
import appointmentApi from '../../../../../api/appointmentApi';
import { isTimeBeforeNow } from '../../../../../utils/common';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import feedbackApi from '../../../../../api/feedbackApi';
import { toast } from 'react-toastify';

const AppointmentItem = (props) => {
  const { status, appointment, setStatusPicker } = props;
  const [openRateDialog, setOpenRateDialog] = useState(false);
  const [star, setStar] = useState();
  const [comment, setComment] = useState();
  const [render, setRender] = useState();
  console.log(status, appointment);

  const handleCloseRateDialog = () => {
    setOpenRateDialog(false);
  };

  const handleRating = () => {
    console.log(star, comment, appointment.id);
    (async () => {
      const res = await feedbackApi.add({
        appointment_id: appointment.id,
        comment,
        star,
      });
      console.log(res);
    })();
    setOpenRateDialog(false);
    setComment('');
    setStar(0);
    setStatusPicker('1');
  };

  // xu ly chap nhan bao gia
  const handleAcceptPrice = () => {
    const { id, price, status, complete_date, cancel_date, job_status } = appointment;
    (async () => {
      const res = await appointmentApi.update({
        id,
        price,
        status: 'appointed',
        job_status,
        complete_date,
        cancel_date,
      });
      console.log(res);
      setStatusPicker('appointed');
    })();
  };

  // xu ly hoan thanh lich hen
  const handleAppointmentCompleted = () => {
    const { id, price, status, complete_date, cancel_date, job_status } = appointment;
    (async () => {
      const res = await appointmentApi.update({
        id,
        price,
        status: 'done',
        job_status,
        complete_date,
        cancel_date,
      });
      console.log(res);
      setStatusPicker('done');
    })();
  };

  // xu ly huy lich hen
  const handleCancelAppointment = () => {
    const { id, price, complete_date, cancel_date, job_status } = appointment;
    (async () => {
      const res = await appointmentApi.update({
        id,
        price,
        status: 'canceled',
        job_status,
        complete_date,
        cancel_date,
      });
      toast.success('Hủy lịch hẹn thành công!');
      console.log(res);
    })();
    setStatusPicker('canceled');
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
              <img src={appointment?.provider?.avatar?.url} alt="avatar" className="avatar" />
            </div>
          </div>
          <div className="right">
            <div>Thợ</div>
            <div>{appointment?.provider?.full_name}</div>
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
          {appointment?.status === 'appointed' && (
            <p>
              Vui lòng nhấn nút <strong>Xác nhận để hoàn thành Lịch Hẹn</strong> và Thợ có thể nhận thanh toán.
            </p>
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
            <button className="accept-price-btn" onClick={handleAcceptPrice}>
              Chấp nhận báo giá
            </button>
          )}
          {appointment?.price && appointment?.status === 'appointed' && (
            <button
              className="done-btn"
              disabled={appointment?.job_status === 'new'}
              onClick={handleAppointmentCompleted}
            >
              Hoàn thành lịch hẹn
            </button>
          )}
          {appointment?.price && appointment?.status === 'done' && !appointment?.feedback && (
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
      {(appointment?.status === 'new' || appointment?.status === 'offered') && (
        <div className="cancel-appointment" onClick={handleCancelAppointment}>
          <div>
            <DoDisturbIcon />
            <p>Hủy lịch hẹn</p>
          </div>
        </div>
      )}

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
                <img src={appointment?.provider?.avatar?.url} alt="" />
              </div>
              <p>Thợ</p>
              <h4>{appointment?.provider?.full_name}</h4>
              <Star
                name="simple-controlled"
                value={star}
                onChange={(event, newValue) => {
                  setStar(newValue);
                }}
                size="large"
              />
              <textarea
                class="customer-comment"
                placeholder="Bạn nghĩ gì về Nhà cung cấp này?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
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
