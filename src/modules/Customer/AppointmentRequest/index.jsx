import { AccessTimeFilled, LocationOn } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import './AppointmentRequest.scss';

const AppointmentRequest = () => {
  return (
    <div className="appointment-request container">
      <form className="request-form">
        <h3>Chi tiết công việc</h3>
        <div className="form-group">
          <label htmlFor="service">Dịch vụ</label>
          <select name="service" id="" value={1}>
            <option value="1">Sửa điện và nước</option>
            <option value="2">Sửa đồ điện gia dụng</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quotation">Mục báo giá</label>
          <select name="quotation" id="" value={1}>
            <option value="1">Khắc phục sự cố chập điện</option>
            <option value="2">Vệ sinh bồn nước</option>
            <option value="3">Thi công hệ thống điện nhà</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time">Thời gian</label>
          <div className="time-flex">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  label="Chọn ngày giờ"
                  sx={{
                    backgroundColor: 'white',
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <span className="request-form-icon">
              <AccessTimeFilled />
            </span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa điểm</label>
          <div className="address-flex">
            <input type="text" />
            <span className="request-form-icon">
              <LocationOn />
            </span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="images">Hình ảnh</label>
          <input type="file" />
        </div>
        <div className="form-group">
          <label htmlFor="mark">
            Ghi chú cho Thợ <span>(không bắt buộc)</span>
          </label>
          <textarea rows="8" placeholder="Nhập ghi chú"></textarea>
        </div>
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default AppointmentRequest;
