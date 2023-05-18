import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { InputField, RadioGroupField, DatePickerField, LocationPickField } from '../../components/Common';
import './Auth.scss';
import { Box, CircularProgress } from '@mui/material';
import authApi from '../../api/authApi';
import { toast } from 'react-toastify';
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object({
    email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(20, 'Mật khẩu không vượt quá 20 ký tự')
      .required('Vui lòng nhập mật khẩu'),
    full_name: yup.string().required('Vui lòng nhập Họ và tên'),
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
  })
  .required();

const RegisterPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
    full_name: '',
    birthday: '',
    gender: 'male',
    phone_number: '',
    is_valid: true,
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleRegister = async (formValues) => {
    // console.log('formValues', formValues);
    const res = await authApi.register(formValues);
    console.log('res register', res);
    if (res.statusCode && res.statusCode == 201) {
      toast.success('Đăng ký thành công!');
      navigate('/login');
    } else {
      toast.error('Email này đã tồn tại, vui lòng nhập email khác!');
      return;
    }
  };
  return (
    <div className="register-page">
      <div className="register-logo">ONLINE SERVICE MARKET</div>
      <div className="register-content">
        <div className="register-header">Tạo mới tài khoản</div>
        <div className="register-slogan">Nhanh chóng và dễ dàng</div>
        <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
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
