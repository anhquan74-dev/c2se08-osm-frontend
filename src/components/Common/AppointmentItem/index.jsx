import React from 'react';
import './AppointmentItem.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ImageIcon from '@mui/icons-material/Image';
import Rating from '../Rating';
import { TextField } from '@mui/material';

const AppointmentItem = (props) => {
  const { status, appointment, type } = props;
  const RenderAppointment =
    type === 'provider' ? (
      <AppointmentProviderItem status={status} appointment={appointment} />
    ) : (
      <AppointmentCustomerItem status={status} appointment={appointment} />
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
              <div className="right ">
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

        <div className="group">
          <div className="left">
            <div>
              <WorkHistoryIcon />
            </div>
          </div>
          <div className="right last">
            <div>Báo giá</div>
            {/* {appointment?.price !== 0 ? <div>250.000 VND</div> : <div>Chưa báo giá</div>} */}
            {status !== 0 ? <div>250.000 VND</div> : <div>Chưa báo giá</div>}
          </div>
        </div>
      </div>
      <div className="footer">
        {(status === 0 || status === 1) && (
          <div className="cancel">
            <span>Từ chối lịch hẹn</span>
          </div>
        )}
        {status === 0 && (
          <div className="price">
            <span>Nhập báo giá tại đây</span>
            <div>
              <input type="text" placeholder="Nhập giá" />
              VND
            </div>
            <button className="btn-price">Gửi báo giá</button>
          </div>
        )}
        {/* <div className="price1">
          <span>Báo giá</span>
          <p>250.000 VND</p>
        </div> */}
      </div>
    </div>
  );
};

export default AppointmentItem;
