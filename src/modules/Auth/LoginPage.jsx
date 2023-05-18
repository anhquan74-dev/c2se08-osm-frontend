import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '../../components/Common';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from './authSlice';
import { Button, CircularProgress } from '@mui/material';

const schema = yup
  .object({
    email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
      .max(20, 'Mật khẩu không được vượt quá 20 kí tự')
      .required('Vui lòng nhập mật khẩu'),
  })
  .required();

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
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  console.log(currentUser?.roles?.[0]?.name);
  console.log(isSubmitting);
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
    console.log('Submit: ', formValues, isSubmitting);
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <>
                <CircularProgress size={16} color="primary" />
                &nbsp;
              </>
            )}
            Đăng nhập
          </Button>
          <NavLink>Quên mật khẩu?</NavLink>
          <span> · </span>
          <NavLink to="/register">Đăng ký</NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
