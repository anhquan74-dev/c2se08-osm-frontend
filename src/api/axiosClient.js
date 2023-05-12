import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
