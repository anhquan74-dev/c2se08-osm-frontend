import { LocationOn } from '@mui/icons-material';
import './EditProfile.scss';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocationPickDialog from '../../../../components/Common/LocationPickDialog';
import { useState } from 'react';

const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="customer-edit-profile">
      <h3>Chỉnh sửa tài khoản</h3>
      <h4>Thông tin</h4>
      <div className="customer-info">
        <div className="avatar">
          <img src="https://lh3.googleusercontent.com/a/AGNmyxbPNpE4pGT68pfoJVUum2R2QRwenWcQ1aYUTqk4=s96-c" alt="" />
          <label htmlFor="file-avatar">
            <CameraAltIcon />
            <input type="file" id="file-avatar" />
          </label>
        </div>
        <div className="information">
          <div className="information-item">
            <h5>Số điện thoại</h5>
            <input type="text" />
          </div>
          <div className="information-group">
            <div className="information-item">
              <h5>Tên đầy đủ</h5>
              <input type="text" />
            </div>
            <div className="information-item">
              <h5>Email</h5>
              <input type="email" />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="customer-address">
        <div className="information-item">
          <h5>Địa chỉ</h5>
          <input type="text" onClick={() => setOpen(true)} />
          <LocationPickDialog onClose={handleClose} open={open} />
        </div>
        <span className="address-icon">
          <LocationOn />
        </span>
      </div>
      <div className="btn-flex">
        <button className="save-btn">Lưu</button>
      </div>
    </div>
  );
};

export default EditProfile;
