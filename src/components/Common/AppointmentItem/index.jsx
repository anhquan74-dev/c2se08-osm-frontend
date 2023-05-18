import React, { useState } from 'react';
import './AppointmentItem.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ImageIcon from '@mui/icons-material/Image';
import Rating from '../Rating';
import { TextField } from '@mui/material';
import { DoDisturb, Star } from '@mui/icons-material';
import { isTimeBeforeNow } from '../../../utils/common';
import appointmentApi from '../../../api/appointmentApi';
import { toast } from 'react-toastify';

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

const AppointmentCustomerItem = (props) => {
  const { status, appointment } = props;

  return (
    <div className="appointment-item">
      <div className="btn-chat">
        <img src="https://oddjob.vn/assets/images/black-chat-icon.svg" className="chat-icon" /> CHAT{' '}
      </div>
      <div className="header">
        <div className="wrapper">
          <div className="category">Dọn dẹp vệ sinh</div>
          <div className="name">lau nhà cửa</div>
          <div className="from-now" style={{ color: 'rgb(255, 190, 23)' }}>
            <span>Đã nhận 6 phút trước</span>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="group">
          <div className="left">
            <div>
              <img
                src="https://s3-ap-southeast-1.amazonaws.com/files.oddjob.vn/small/6403f1202e39f1cb520d9967"
                alt="avatar"
                className="avatar"
              />
            </div>
          </div>
          <div className="right">
            <div>Khách hàng</div>
            <div>Trần Anh Quân</div>
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
            <div>654 Trưng Nữ Vương, Hoà Cường Bắc, Hải Châu, Đà Nẵng 550000 ベトナム</div>
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
                <div>24 tháng 4, 2023 ❘ 20:13</div>
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
                  <img
                    src="https://s3-ap-southeast-1.amazonaws.com/files.oddjob.vn/small/6418825673e43877165303e3"
                    alt=""
                  />
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
              <div className="note">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non adipisci deserunt blanditiis aliquam.
                Aliquid maiores dicta quis! Laudantium, culpa quo ipsam neque earum error. Aliquam voluptatibus sapiente
                aliquid veritatis amet?
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="rating">
          <span>Đánh giá của bạn</span>
          <span>
            <Rating starNumber={4} />
          </span>
        </div>
        <div className="price">
          <span>Báo giá</span>
          <span>200.000 VNĐ</span>
        </div>
      </div>
    </div>
  );
};

const AppointmentProviderItem = (props) => {
  const { status, appointment, setStatusPicker } = props;
  const [price, setPrice] = useState(0);
  const [openRateDialog, setOpenRateDialog] = useState(false);
  const [star, setStar] = useState();
  console.log(status, appointment);

  const handleCloseRateDialog = () => {
    setOpenRateDialog(false);
  };

  const handleRating = () => {
    setOpenRateDialog(false);
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
    <div className="appointment-item appointment-pro-item">
      <div className="btn-chat">
        <img src="https://oddjob.vn/assets/images/black-chat-icon.svg" className="chat-icon" /> CHAT{' '}
      </div>
      <div className="header">
        <div className="wrapper">
          <div className="category">{appointment?.service?.name}</div>
          <div className="name">{appointment?.package?.name}</div>
          <div className="from-now" style={{ color: 'rgb(255, 190, 23)' }}>
            <span>Đã nhận 6 phút trước</span>
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
            <div>Khách hàng</div>
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
              <div className="right ">
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
                max={999999999}
                placeholder="Nhập giá"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              VND
            </div>
            <button className="btn-price" onClick={handleSendPrice}>
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
        <div className="cancel-appointment" onClick={handleCancelAppointment}>
          <div>
            <DoDisturb />
            <p>Hủy lịch hẹn</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentItem;
