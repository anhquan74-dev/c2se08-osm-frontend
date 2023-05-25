import { Close, LocationOn } from '@mui/icons-material';
import './EditProfile.scss';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocationPickDialog from '../../../../components/Common/LocationPickDialog';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import customerApi from '../../../../api/customerApi';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../../Auth/authSlice';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [location, setLocation] = useState(currentUser?.location?.[0]);
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone_number);
  const [fullName, setFullName] = useState(currentUser?.full_name);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const [avatarPick, setAvatarPick] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAvatar(currentUser?.avatar);
    setAvatarPick();
    setFullName(currentUser?.full_name);
    setPhoneNumber(currentUser?.phone_number);
    setLocation(currentUser?.location?.[0]);
  }, [currentUser]);

  useEffect(() => {
    return () => {
      avatarPick && URL.revokeObjectURL(avatarPick);
    };
  }, [avatarPick]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSetLocation = (location) => {
    console.log(location);
    setLocation(location);
  };

  const handleSaveProfile = () => {
    console.log(phoneNumber, location, fullName, avatar);
    const formData = new FormData();
    formData.append('id', currentUser?.id);
    formData.append('phone_number', phoneNumber);
    formData.append('gender', currentUser?.gender);
    formData.append('birthday', currentUser?.birthday);
    formData.append('full_name', fullName);
    formData.append('email', currentUser?.email);
    formData.append('password', currentUser?.password);
    formData.append('is_valid', currentUser?.is_valid);
    formData.append('location[address]', location.address);
    formData.append('location[province_name]', location.province_name);
    formData.append('location[district_name]', location.district_name);
    formData.append('location[country_name]', location.country_name);
    formData.append('location[coords_latitude]', location.coords_latitude);
    formData.append('location[coords_longitude]', location.coords_longitude);
    formData.append('location[is_primary]', 1);
    // Thêm avatar vào formData nếu có
    if (avatar && avatar instanceof File) {
      formData.append('avatar', avatar);
    }

    (async () => {
      setLoading(true);
      const res = await customerApi.update(formData);
      let access_token = localStorage.getItem('access_token');
      let decoded = jwt_decode(access_token);
      dispatch(getMe(decoded));
      setLoading(false);
      navigate('/me');
    })();
  };
  console.log(location.address === currentUser?.location?.[0].address);
  console.log(phoneNumber === currentUser?.phone_number, fullName === currentUser?.full_name);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    if (file.type.slice(0, 5) != 'image') {
      toast.error('Vui lòng chọn định dạng file ảnh!');
    } else {
      setAvatar(file);
      console.log('file: ', file, 'value: ', avatarPick);
      setAvatarPick(URL.createObjectURL(file));
    }
  };
  return (
    <div className="customer-edit-profile">
      <h3>Chỉnh sửa tài khoản</h3>
      <h4>Thông tin</h4>
      <div className="customer-info">
        <div className="avatar">
          {avatar && <img src={avatarPick || avatar.url} alt="" />}
          <label htmlFor="file-avatar">
            <CameraAltIcon />
            <input type="file" accept="image/*" id="file-avatar" onChange={handlePreviewAvatar} />
          </label>
          {avatar !== currentUser?.avatar && (
            <Close
              onClick={() => {
                setAvatar(currentUser?.avatar);
                setAvatarPick();
              }}
            />
          )}
        </div>
        <div className="information">
          <div className="information-item">
            <h5>Số điện thoại</h5>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="information-group">
            <div className="information-item">
              <h5>Tên đầy đủ</h5>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="information-item">
              <h5>Email</h5>
              <input type="email" value={currentUser?.email} disabled />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="customer-address">
        <div className="information-item">
          <h5>Địa chỉ</h5>
          <input type="text" onClick={() => setOpen(true)} value={location?.address || ''} />
          <LocationPickDialog onClose={handleClose} open={open} handleSetLocation={handleSetLocation} />
        </div>
        <span className="address-icon">
          <LocationOn />
        </span>
      </div>
      <div className="btn-flex">
        <button
          className="save-btn"
          onClick={handleSaveProfile}
          disabled={
            (phoneNumber === currentUser?.phone_number &&
              fullName === currentUser?.full_name &&
              location.address === currentUser?.location?.[0].address &&
              avatar === currentUser?.avatar) ||
            loading
          }
        >
          {loading && <CircularProgress size={16} sx={{ color: 'white' }} />}
          Lưu
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
