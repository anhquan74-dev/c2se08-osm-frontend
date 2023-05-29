import React, { useEffect, useState } from 'react';
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
import { io } from 'socket.io-client';
import moment from 'moment';
import 'moment/dist/locale/vi';
import Chat from '../../../Chat/Chat';
import LightBox from '../../../../../components/Common/LightBox/LightBox';

const ENDPOINT = import.meta.env.VITE_REACT_APP_DOMAIN_NODE_SERVER;

const AppointmentItem = (props) => {
  const { status, appointment, setStatusPicker } = props;
  const [socket, setSocket] = useState(null);
  const [openRateDialog, setOpenRateDialog] = useState(false);
  const [star, setStar] = useState();
  const [comment, setComment] = useState();
  const [render, setRender] = useState();
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);
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
      setOpenRateDialog(false);
      setComment('');
      setStar(0);
      setStatusPicker('1');
      socket?.emit('customer_feedback_done');
      console.log(res);
    })();
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
      socket?.emit('customer_accept_price');
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
      socket?.emit('customer_confirmed_done');
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
      socket?.emit('customer_cancel_request');
      console.log(res);
    })();
    setStatusPicker('canceled');
  };

  const handleShowChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };
  return (
    <div className="appointment-item">
      <div className="btn-chat" onClick={handleShowChat}>
        <img src="https://oddjob.vn/assets/images/black-chat-icon.svg" className="chat-icon" /> CHAT
      </div>
      <div className="header">
        <div className="wrapper">
          <div className="category">{appointment?.service?.name}</div>
          <div className="name">{appointment?.package?.name}</div>
          <div className="from-now" style={{ color: 'rgb(255, 190, 23)' }}>
            {/* <span>Đã gửi 6 phút trước</span> */}
            <span>Đã gửi {moment(appointment?.created_at).locale('vi').fromNow()}</span>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="group">
          <div className="left">
            <div>
              {appointment?.provider?.avatar?.url && (
                <img src={appointment?.provider?.avatar?.url} alt="avatar" className="avatar" />
              )}
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
                <div className="image" onClick={handleSetOpen}>
                  {appointment?.attach_photo?.url && <img src={appointment?.attach_photo?.url} alt="" />}
                </div>
                <LightBox src={appointment?.attach_photo?.url} isOpen={isOpen} handleSetOpen={handleSetOpen} />
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
              <div className="note">{appointment?.note_for_provider ? appointment?.note_for_provider : ''}</div>
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
        <div className="cancel-appointment" onClick={() => setOpenRemoveDialog(true)}>
          <div>
            <DoDisturbIcon />
            <p>Hủy lịch hẹn</p>
          </div>
        </div>
      )}
      <Dialog
        open={openRemoveDialog}
        onClose={handleCloseRemoveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Hủy lịch hẹn</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn hủy lịch hẹn này! <br />
            Hành động này không thể khôi phục
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemoveDialog} variant="outlined" color="info">
            Đóng
          </Button>
          <Button onClick={handleCancelAppointment} color="success" variant="contained" autoFocus>
            Hủy lịch
          </Button>
        </DialogActions>
      </Dialog>

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
      {openChat && (
        <Chat currentProvider={appointment?.provider} openChat={openChat} handleCloseChat={handleCloseChat} />
      )}
    </div>
  );
};

export default AppointmentItem;
