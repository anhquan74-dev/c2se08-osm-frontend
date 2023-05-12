import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '../../components/Common';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from './authSlice';

// const schema = yup
//   .object({
//     email: yup.string().required('Vui lòng nhập email'),
//     full_name: yup.string().required('Vui lòng nhập Họ và tên'),
//     birthday: yup.string().required('Vui lòng nhập ngày sinh'),
//     gender: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn giới tính').required(),
//     phone_number: yup.number().positive().integer().required('Vui lòng nhập số điện thoại'),
//     // avatar: yup.string().required(),
//     // is_valid: yup.string().oneOf(['male', 'female'], 'Vui lòng chọn trạng thái tài khoản').required(),
//     // introduction: yup.string().required(),
//   })
//   .required();

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    // resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  console.log(currentUser?.roles?.[0]?.name);

  switch (currentUser?.roles?.[0]?.name) {
    case 'customer':
      return <Navigate to="/" />;
    case 'provider':
      return <Navigate to="/provider" />;
    case 'admin':
      return <Navigate to="/admin" />;
    default:
      break;
  }

  const handleLogin = (formValues) => {
    console.log('Submit: ', formValues);
    dispatch(logIn(formValues));
  };
  return (
    <div className="login-page">
      <div className="login-logo">ONLINE SERVICE MARKET</div>
      <div className="login-content">
        <div className="login-header">Đăng nhập vào OSM System</div>
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <InputField name="email" control={control} label="Email" />
          <InputField name="password" control={control} label="Mật khẩu" type="password" />
          <button type="submit">Đăng nhập</button>
          <NavLink>Quên mật khẩu?</NavLink>
          <span> · </span>
          <NavLink to="/register">Đăng ký</NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
