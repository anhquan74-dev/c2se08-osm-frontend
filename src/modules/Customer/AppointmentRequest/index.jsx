import { AccessTimeFilled, AddAPhoto, LocationOn } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import './AppointmentRequest.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import packageApi from '../../../api/packageApi';
import LocationPickDialog from '../../../components/Common/LocationPickDialog';
import moment from 'moment';
import { Fab, TextField, Typography } from '@mui/material';
import appointmentApi from '../../../api/appointmentApi';

const AppointmentRequest = () => {
  const [searchParams] = useSearchParams();
  const { currentUser } = useSelector((state) => state.auth);
  const providerId = searchParams.get('providerId');
  const serviceId = searchParams.get('serviceId');
  const packageId = searchParams.get('packageId');

  const [packages, setPackages] = useState();
  const [servicePick, setServicePick] = useState(serviceId);
  const [packagePick, setPackagePick] = useState(packageId);
  const [date, setDate] = useState();
  const [location, setLocation] = useState();
  const [attachPhoto, setAttachPhoto] = useState();
  const [noteForProvider, setNoteForProvider] = useState();
  const navigate = useNavigate();

  const { services } = useSelector((state) => state.providerCustomer);
  console.log(services);

  useEffect(() => {
    (async () => {
      const res = await packageApi.getAllByServiceId(serviceId);
      console.log(res);
      setPackages(res.data);
    })();
  }, [serviceId]);

  const handleChangeService = (e) => {
    console.log(e.target.value);
    setServicePick(e.target.value);
    (async () => {
      const res = await packageApi.getAllByServiceId(e.target.value);
      console.log(res);
      setPackages(res.data);
    })();
  };

  const handleChangePackage = (e) => {
    console.log(e.target.value);
    setPackagePick(e.target.value);
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSetLocation = (location) => {
    console.log(location);
    setLocation(location);
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    let formValues = {
      package_id: packagePick,
      customer_id: currentUser.id,
      location: location,
      date,
      attach_photos: attachPhoto,
      note_for_provider: noteForProvider,
      type: 'appointment',
      status: 'new',
    };
    console.log(formValues);

    const formData = new FormData();
    formData.append('package_id', formValues?.package_id);
    formData.append('customer_id', formValues?.customer_id);
    formData.append('date', formValues?.date);
    formData.append('type', formValues?.type);
    formData.append('status', formValues?.status);
    formData.append('note_for_provider', formValues?.note_for_provider);
    formData.append('location[address]', formValues?.location?.address);
    formData.append('location[province_name]', formValues?.location?.province_name);
    formData.append('location[district_name]', formValues?.location?.district_name);
    formData.append('location[country_name]', formValues?.location?.country_name);
    formData.append('location[coords_latitude]', formValues?.location?.coords_latitude);
    formData.append('location[coords_longitude]', formValues?.location?.coords_longitude);

    if (formValues?.attach_photos && formValues?.attach_photos instanceof File) {
      formData.append('attach_photos', formValues?.attach_photos);
    }

    // (async () => {
    //   const res = await appointmentApi.add(formData);
    //   console.log(res);
    // })();
    console.log(navigate);
    navigate('/me/appointment');
  };

  const [avatarPick, setAvatarPick] = useState();
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    setAttachPhoto(file);
    console.log('file: ', file, 'value: ', avatarPick);
    setAvatarPick(URL.createObjectURL(file));
  };
  useEffect(() => {
    return () => {
      avatarPick && URL.revokeObjectURL(avatarPick);
    };
  }, [avatarPick]);

  return (
    <div className="appointment-request container">
      <form className="request-form" onSubmit={handleSubmitAppointment}>
        <h3>Chi tiết công việc</h3>
        <div className="form-group">
          <label htmlFor="service">Dịch vụ</label>
          <select name="service" id="" value={servicePick} onChange={handleChangeService}>
            {services?.map((service, index) => {
              return (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quotation">Mục báo giá</label>
          <select name="quotation" id="" value={packagePick} onChange={handleChangePackage}>
            <option value="">Tất cả báo giá</option>
            {packages?.map((item, index) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
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
                  value={date}
                  onChange={(newValue) => setDate(moment(newValue.$d).format('YYYY-MM-DD HH:mm:ss'))}
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
            <input type="text" onClick={() => setOpen(true)} value={location?.address || ''} />
            <span className="request-form-icon">
              <LocationOn />
            </span>
            <LocationPickDialog onClose={handleClose} open={open} handleSetLocation={handleSetLocation} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="images">Hình ảnh</label>
          <div style={inputFileField}>
            <div style={inputFileLeft}>
              <Typography>Hình ảnh</Typography>
              <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="upload-photo">
                <TextField
                  sx={{ display: 'none' }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={handlePreviewAvatar}
                />
                <Fab color="default" size="small" component="span" aria-label="add" variant="extended">
                  <AddAPhoto /> Tải ảnh lên
                </Fab>
              </label>
            </div>
            <div style={inputFileRight}>
              {attachPhoto ? (
                <img
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  src={avatarPick}
                  alt="preview-avatar"
                />
              ) : (
                <span style={previewStyle}>Preview Image</span>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mark">
            Ghi chú cho Thợ <span>(không bắt buộc)</span>
          </label>
          <textarea
            rows="8"
            placeholder="Nhập ghi chú"
            value={noteForProvider}
            onChange={(e) => setNoteForProvider(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

const inputFileField = {
  display: 'flex',
  gap: '20px',
  width: '100%',
};
const inputFileLeft = {};
const inputFileRight = {
  width: '160px',
  height: '160px',
};
const previewStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px dashed #ccc',
  color: '#ccc',
};

export default AppointmentRequest;
