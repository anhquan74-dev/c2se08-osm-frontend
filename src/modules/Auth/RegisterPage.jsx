import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { InputField, RadioGroupField, DatePickerField, LocationPickField } from '../../components/Common';
import './Auth.scss';
import { Box, CircularProgress } from '@mui/material';

const schema = yup
  .object({
    email: yup.string().required('Vui lòng nhập email'),
    full_name: yup.string().required('Vui lòng nhập Họ và tên'),
    birthday: yup.string().required('Vui lòng nhập ngày sinh'),
    gender: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn giới tính').required(),
    phone_number: yup.number().positive().integer().required('Vui lòng nhập số điện thoại'),
    // avatar: yup.string().required(),
    // is_valid: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn trạng thái tài khoản').required(),
    // introduction: yup.string().required(),
  })
  .required();

const RegisterPage = () => {
  const initialValues = {
    email: '',
    password: '',
    full_name: '',
    birthday: '',
    gender: 'male',
    phone_number: '',
    avatar: '',
    is_valid: '',
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  return (
    <div className="register-page">
      <div className="register-logo">ONLINE SERVICE MARKET</div>
      <div className="register-content">
        <div className="register-header">Tạo mới tài khoản</div>
        <div className="register-slogan">Nhanh chóng và dễ dàng</div>
        <form className="register-form">
          <InputField name="email" control={control} label="Email" />
          <InputField name="password" control={control} label="Mật khẩu" type="password" />
          <InputField name="full_name" control={control} label="Họ và tên" />
          <DatePickerField name="birthday" control={control} label="Ngày sinh" />
          <InputField name="phone_number" control={control} label="Số điện thoại" />
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
          <LocationPickField
            name="location[0].address"
            control={control}
            // handleSetLocation={handleSetLocation}
            // location={location}
          />
          <button type="submit">
            {isSubmitting && (
              <>
                <CircularProgress size={16} color="primary" />
                &nbsp;
              </>
            )}
            Đăng ký
          </button>
          <NavLink to="/login">Bạn đã có tài khoản?</NavLink>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
