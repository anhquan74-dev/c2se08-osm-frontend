import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './EditProfile.scss';
import {
  DatePickerField,
  InputField,
  InputMultipleFile,
  LocationPickField,
  RadioGroupField,
} from '../../../components/Common';
import InputFileField from '../../../components/Common/InputFileField';
import SelectField from '../../../components/Common/SelectField';
import { useEffect, useState } from 'react';
import { Breadcrumbs, Stack, Typography, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import providerApi from '../../../api/providerApi';
import { toast } from 'react-toastify';
import { getMe } from '../../Auth/authSlice';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng!'),
    full_name: yup.string().required('Vui lòng nhập Họ và tên'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
      .max(20, 'Mật khẩu không được vượt quá 20 kí tự')
      .required('Vui lòng nhập mật khẩu'),
    birthday: yup
      .date()
      .typeError('Vui lòng chọn đúng ngày sinh')
      // .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years')
      .max(new Date(Date.now() - 86400000), 'Ngày sinh không được chọn từ ngày hiện tại trở đi')
      .required('Vui lòng nhập ngày sinh'),
    gender: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn giới tính').required(),
    phone_number: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Vui lòng nhập đúng định dạng số!')
      .max(11, 'Số điện thoại không vượt quá 11 số!'),
    is_valid: yup.string().required('Vui lòng chọn trạng thái tài khoản'),
  })
  .required();

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const initialValues = {
    email: '',
    full_name: '',
    password: undefined,
    birthday: '',
    gender: 'male',
    phone_number: '',
    avatar: '',
    introduction: '',
    is_valid: '',
    is_favorite: '',
    is_working: '',
    total_rate: '',
    total_star: '',
    avg_star: '',
    clicks: '',
    views: '',
    click_rate: '',
    ...currentUser,
  };
  const [location, setLocation] = useState();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLocation(initialValues?.location?.[0]);
  }, []);

  useEffect(() => {
    const subscription = watch((data) => {
      console.log(data);
      console.log('initialValues: ', initialValues);
      console.log(JSON.stringify(initialValues) !== JSON.stringify(data));
      setIsDirty(JSON.stringify(initialValues) !== JSON.stringify(data));
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const handleSetLocation = (location) => {
    console.log(location);
    setLocation(location);
  };
  const handleFormSubmit = (formValues) => {
    console.log('formValues: ', formValues);
    let user = {
      ...formValues,
      location: { ...location, is_primary: 1 },
    };
    console.log(formValues);
    const formData = new FormData();
    formData.append('phone_number', user.phone_number);
    formData.append('gender', user.gender);
    formData.append('birthday', moment(user.birthday).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('full_name', user.full_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('is_valid', user.is_valid);
    formData.append('introduction', user.introduction);
    formData.append('location[address]', user.location.address);
    formData.append('location[province_name]', user.location.province_name);
    formData.append('location[district_name]', user.location.district_name);
    formData.append('location[country_name]', user.location.country_name);
    formData.append('location[coords_latitude]', user.location.coords_latitude);
    formData.append('location[coords_longitude]', user.location.coords_longitude);
    formData.append('location[is_primary]', user.location.is_primary);
    formData.append('is_favorite', user.is_favorite);
    formData.append('is_working', user.is_working);
    formData.append('total_rate', user.total_rate);
    formData.append('total_star', user.total_star);
    formData.append('avg_star', user.avg_star);
    formData.append('clicks', user.clicks);
    formData.append('views', user.views);
    formData.append('click_rate', user.click_rate);
    // Thêm avatar vào formData nếu có
    if (user.avatar && user.avatar instanceof File) {
      formData.append('avatar', user.avatar);
    }

    if (user.banner) {
      for (let i = 0; i < user.banner.length; i++) {
        formData.append('banner[]', user.banner[i]);
      }
    }

    formData.append('id', user.id);
    (async () => {
      const res = await providerApi.update(formData);
      toast.success('Cập nhật thành công!');
      let access_token = localStorage.getItem('access_token');
      let decoded = jwt_decode(access_token);
      dispatch(getMe(decoded));
      navigate('/provider/information');
    })();
  };
  const handleClickBreadCrum = (event) => {
    console.log(event.target.href);
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };
  return (
    <div className="provider-edit-profile container">
      <div className="break-crum">
        <Stack spacing={2} marginTop={3}>
          <Breadcrumbs separator={<NavigateNext fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/provider" onClick={handleClickBreadCrum}>
              Trang chủ
            </Link>
            <Link underline="hover" key="1" color="inherit" href="/provider/information" onClick={handleClickBreadCrum}>
              Thông tin hiển thị
            </Link>
            <Typography key="3" color="text.primary">
              Chỉnh sửa
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <h2>Chỉnh sửa thông tin hiển thị</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="email" control={control} label="Email" />
        <InputField name="password" control={control} label="Mật khẩu" type="password" />
        <InputField name="full_name" control={control} label="Họ và tên" />
        <DatePickerField name="birthday" control={control} label="Ngày sinh" />
        <InputField name="phone_number" control={control} label="Số điện thoại" />
        <Box sx={{ display: 'flex', gap: '120px', width: '100%' }}>
          <RadioGroupField
            sx={{ width: '30%' }}
            name="gender"
            control={control}
            label="Giới tính"
            options={[
              { label: 'Nam', value: 'male' },
              { label: 'Nữ', value: 'female' },
            ]}
          />
          <InputFileField name="avatar" control={control} label="Ảnh đại diện" />
        </Box>
        <LocationPickField
          // name="location[0].address"
          name="location"
          control={control}
          handleSetLocation={handleSetLocation}
          location={location}
        />
        <InputMultipleFile name="banner" control={control} label="Ảnh bìa" />
        <InputField
          name="introduction"
          control={control}
          label="Giới thiệu"
          multiline
          rows={4}
          defaultValue="Default Value"
        />

        <Box>
          <Button
            sx={{ marginLeft: '20px' }}
            mt={3}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting && (
              <>
                <CircularProgress size={16} color="primary" />
                &nbsp;
              </>
            )}
            Lưu
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditProfile;
