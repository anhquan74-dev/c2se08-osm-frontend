import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import App from './App';
import { store } from './app/store';
import './index.scss';
import axiosSetupInterceptors from './api/axiosSetupInterceptors';
import { SkeletonTheme } from 'react-loading-skeleton';
import ScrollToTop from 'react-scroll-to-top';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <SkeletonTheme baseColor="#202020" highlightColor="#444">
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ScrollToTop smooth style={{ backgroundColor: '#ffbe17' }} />
    </BrowserRouter>
  </Provider>
  // </SkeletonTheme>
  // </React.StrictMode>
);

axiosSetupInterceptors(store);
