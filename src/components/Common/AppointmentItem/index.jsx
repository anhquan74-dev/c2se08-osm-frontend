import React, { useEffect, useState } from 'react';
import './AppointmentItem.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ImageIcon from '@mui/icons-material/Image';
import Rating from '../Rating';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { DoDisturb, Star } from '@mui/icons-material';
import { isTimeBeforeNow } from '../../../utils/common';
import appointmentApi from '../../../api/appointmentApi';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ImgsViewer from 'react-images-viewer';
import LightBox from '../LightBox/LightBox';
const ENDPOINT = import.meta.env.VITE_REACT_APP_DOMAIN_NODE_SERVER;

const AppointmentItem = (props) => {
  const { status, appointment, type, setStatusPicker } = props;
  const RenderAppointment =
    type === 'provider' ? (
      <AppointmentProviderItem status={status} appointment={appointment} setStatusPicker={setStatusPicker} />
    ) : (
      <AppointmentCustomerItem status={status} appointment={appointment} setStatusPicker={setStatusPicker} />
    );
  return <>{RenderAppointment}</>;
};

// const AppointmentCustomerItem = (props) => {
//   const { status, appointment } = props;

//   return (
//     <div className="appointment-item">
//       <div className="btn-chat">
//         <img src="https://oddjob.vn/assets/images/black-chat-icon.svg" className="chat-icon" /> CHAT{' '}
//       </div>
//       <div className="header">
//         <div className="wrapper">
//           <div className="category">Dọn dẹp vệ sinh</div>
//           <div className="name">lau nhà cửa</div>
//           <div className="from-now" style={{ color: 'rgb(255, 190, 23)' }}>
//             <span>Đã nhận 6 phút trước</span>
//           </div>
//         </div>
//       </div>
//       <div className="body">
//         <div className="group">
//           <div className="left">
//             <div>
//               <img
//                 src="https://s3-ap-southeast-1.amazonaws.com/files.oddjob.vn/small/6403f1202e39f1cb520d9967"
//                 alt="avatar"
//                 className="avatar"
//               />
//             </div>
//           </div>
//           <div className="right">
//             <div>Khách hàng</div>
//             <div>Trần Anh Quân</div>
//           </div>
//         </div>
//         <div className="group">
//           <div className="left">
//             <div>
//               <LocationOnIcon />
//             </div>
//           </div>
//           <div className="right">
//             <div>Địa điểm</div>
//             <div>654 Trưng Nữ Vương, Hoà Cường Bắc, Hải Châu, Đà Nẵng 550000 ベトナム</div>
//           </div>
//         </div>
//         <div className="group-3">
//           <div className="group-2">
//             <div className="group">
//               <div className="left">
//                 <div>
//                   <WorkHistoryIcon />
//                 </div>
//               </div>
//               <div className="right">
//                 <div>Thời gian làm việc</div>
//                 <div>24 tháng 4, 2023 ❘ 20:13</div>
//               </div>
//             </div>
//             <div className="group">
//               <div className="left">
//                 <div>
//                   <ImageIcon />
//                 </div>
//               </div>
//               <div className="right last">
//                 <div>Ảnh đính kèm</div>
//                 <div className="image">
//                   <img
//                     src="https://s3-ap-southeast-1.amazonaws.com/files.oddjob.vn/small/6418825673e43877165303e3"
//                     alt=""
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="group">
//             <div className="left">
//               <div>
//                 <BorderColorIcon />
//               </div>
//             </div>
//             <div className="right last">
//               <div>Ghi chú</div>
//               <div className="note">
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Non adipisci deserunt blanditiis aliquam.
//                 Aliquid maiores dicta quis! Laudantium, culpa quo ipsam neque earum error. Aliquam voluptatibus sapiente
//                 aliquid veritatis amet?
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="footer">
//         <div className="rating">
//           <span>Đánh giá của bạn</span>
//           <span>
//             <Rating starNumber={4} />
//           </span>
//         </div>
//         <div className="price">
//           <span>Báo giá</span>
//           <span>200.000 VNĐ</span>
//         </div>
//       </div>
//     </div>
//   );
// };

const AppointmentProviderItem = (props) => {
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);
  const { status, appointment, setStatusPicker } = props;
  const [price, setPrice] = useState(0);
  const [star, setStar] = useState();
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const navigate = useNavigate();

  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };
  console.log(status, appointment);
  const handleSetOpen = () => {
    setIsOpen(!isOpen);
  };
  // xu ly gui bao gia
  const handleSendPrice = () => {
    const { id, complete_date, cancel_date, job_status } = appointment;
    console.log({
      id,
      price,
      status: 'offered',
      job_status,
      complete_date,
      cancel_date,
    });
    (async () => {
      const res = await appointmentApi.update({
        id,
        price,
        status: 'offered',
        job_status,
        complete_date,
        cancel_date,
      });
      console.log(res);
      setStatusPicker('offered');
      socket?.emit('provider_send_price');
    })();
  };

  // xu ly hoan thanh cong viec
  const handleWorkCompleted = () => {
    const { id, price, status, complete_date, cancel_date, job_status } = appointment;
    (async () => {
      const res = await appointmentApi.update({
        id,
        price,
        status: 'appointed',
        job_status: 'finished',
        complete_date,
        cancel_date,
      });
      console.log(res);
      setStatusPicker('2');
      socket?.emit('provider_complete_appointment');
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
      socket?.emit('provider_cancel_request');
    })();
    setStatusPicker('canceled');
  };

  return (
    <div className="appointment-item appointment-pro-item">
      <div className="btn-chat" onClick={() => navigate('/provider-chat')}>
        <img src="https://oddjob.vn/assets/images/black-chat-icon.svg" className="chat-icon" /> CHAT
      </div>
      <div className="header">
        <div className="wrapper">
          <div className="category">{appointment?.service?.name}</div>
          <div className="name">{appointment?.package?.name}</div>
          <div className="from-now" style={{ color: 'rgb(255, 190, 23)' }}>
            {/* <span>Đã nhận 6 phút trước</span> */}
            <span>Đã nhận {moment(appointment?.created_at).locale('vi').fromNow()}</span>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="group">
          <div className="left">
            <div>
              {appointment?.customer?.avatar?.url && (
                <img src={appointment?.customer?.avatar?.url} alt="avatar" className="avatar" />
              )}
            </div>
          </div>
          <div className="right">
            <div>Khách hàng </div>
            <div>
              {appointment?.customer?.full_name} - SĐT: 0{appointment?.customer?.phone_number}
            </div>
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
              <div className="right ">
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
            <div className="right ">
              <div>Ghi chú</div>
              <div className="note">{appointment?.note_for_provider}</div>
            </div>
          </div>
        </div>

        <div className="group">
          <div className="left">
            <div>
              <WorkHistoryIcon />
            </div>
          </div>
          <div className="right last">
            <div>Báo giá</div>
            {appointment?.status === 'new' ? <div>Chưa báo giá</div> : <div>{appointment?.price}</div>}
          </div>
        </div>
        {appointment?.status === 'done' && (
          <div className="group">
            <div className="left">
              <div>
                <Star />
              </div>
            </div>
            <div className="right last">
              <div>Đánh giá của khách</div>
              {appointment?.feedback?.star ? <div>{appointment?.feedback?.star}/5</div> : <div>Chưa có đánh giá</div>}
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        {/* {(status === 0 || status === 1) && (
          <div className="cancel">
            <span>Từ chối lịch hẹn</span>
          </div>
        )} */}
        {appointment?.status === 'new' && (
          <div className="price">
            <span>Nhập báo giá tại đây</span>
            <div>
              <input
                type="number"
                min={0}
                max={99999999}
                placeholder="Nhập giá"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              VND
            </div>
            <small className="error-price">{price > 99999999 && <>Nhập số quá lớn!</>}</small>
            <button className="btn-price" onClick={handleSendPrice} disabled={price <= 0 || price > 99999999}>
              Gửi báo giá
            </button>
            <div className="note">
              <strong>Lưu ý</strong>, OSM System không can thiệp vào quá trình thương lượng giữa bạn và Khách hàng, vì
              vậy bạn cần <strong>tìm hiểu rõ yêu cầu</strong> của Khách và <strong>đưa ra báo giá phù hợp nhất</strong>{' '}
              để tránh xảy ra mâu thuẫn
            </div>
          </div>
        )}
        {appointment?.status === 'appointed' && appointment?.job_status === 'new' && (
          <div className="price">
            <button className="done-btn" disabled={!isTimeBeforeNow(appointment?.date)} onClick={handleWorkCompleted}>
              Hoàn thành công việc
            </button>
            <div className="note">
              Bạn cần <strong>xác nhận đã làm xong việc</strong> sau đó Khách Hàng mới có thể xác nhận hoàn thành và bạn
              mới có thể nhận được thánh toán của khách hàng
            </div>
          </div>
        )}
        {appointment?.status === 'appointed' && appointment?.job_status === 'finished' && (
          <div className="waiting">Hãy chờ xác nhận từ khách hàng</div>
        )}
        {/* <div className="price1">
          <span>Báo giá</span>
          <p>250.000 VND</p>
        </div> */}
      </div>
      {(appointment?.status === 'new' || appointment?.status === 'offered') && (
        <div className="cancel-appointment" onClick={() => setOpenRemoveDialog(true)}>
          <div>
            <DoDisturb />
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
    </div>
  );
};

export default AppointmentItem;
