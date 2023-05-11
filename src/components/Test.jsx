import React, { useEffect } from 'react';
import customerApi from '../api/customerApi';
import useAxios from '../hooks/useAxios';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Test() {
  const { currentUser } = useSelector((state) => state.auth);

  const api = useAxios();
  const dataSend = {
    id: 16,
    api,
  };
  useEffect(() => {
    getInfor();
  }, []);
  const getInfor = async () => {
    const res = await customerApi.get(dataSend);
    // axios.defaults.headers.common = { Authorization: `bearer ${currentUser?.refresh_token}` };
    // const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/refresh`);
  };
  return <div>Test</div>;
}
