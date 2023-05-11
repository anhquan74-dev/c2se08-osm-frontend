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
import { useState } from 'react';
import { Breadcrumbs, Stack, Typography, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// const schema = yup
// .object({
//   email: yup.string().required('Vui lòng nhập email'),
//   full_name: yup.string().required('Vui lòng nhập Họ và tên'),
//   birthday: yup.string().required('Vui lòng nhập ngày sinh'),
//   gender: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn giới tính').required(),
//   phone_number: yup.number().positive().integer().required('Vui lòng nhập số điện thoại'),
//   // avatar: yup.string().required(),
//   // is_valid: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn trạng thái tài khoản').required(),
//   // introduction: yup.string().required(),
// })
// .required();

const EditProfile = () => {
  // lấy provider từ redux
  const initialValues = {
    email: '',
    full_name: '',
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
    // ...provider,
  };
  const [location, setLocation] = useState();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    // resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const handleSetLocation = (location) => {
    console.log(location);
    setLocation(location);
  };
  const handleFormSubmit = (formValues) => {
    console.log(formValues);
  };
  const handleClickBreadCrum = (event) => {
    console.log(event.target.href);
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };
  return (
    <div className="provider-edit-profile container">
      <div className="break-crum">
        <Stack spacing={2}>
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
          name="location[0].address"
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
            disabled={isSubmitting}
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
