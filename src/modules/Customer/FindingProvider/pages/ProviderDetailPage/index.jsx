import { LocationOn, Search } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, FormControl, InputLabel, Link, OutlinedInput, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import FeedbackDialog from '../../../../../components/Common/FeedbackDialog';
import { categoryList } from '../../../Home/categoryList';
import ProviderPackage from '../../components/ProviderPackage';
import './ProviderDetailPage.scss';
import Rating from '../../../../../components/Common/Rating';
import providerApi from '../../../../../api/providerApi';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getProviderById } from '../../providerCustomerSlice';
import feedbackApi from '../../../../../api/feedbackApi';
import Chat from '../../../Chat/Chat';

const ProviderDetailPage = () => {
  const starArr = [1, 2, 3, 4, 5];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  const { providerId } = useParams();
  const [open, setOpen] = useState(false);
  const [totalFeedback, setTotalFeedback] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { provider, loading, services } = useSelector((state) => state.providerCustomer);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    if (!providerId) return;
    console.log('vaof ddaay');
    dispatch(getProviderById(providerId));
    (async () => {
      const res = await feedbackApi.getTotalFeedbackByProviderId(providerId);
      console.log(res);

      setTotalFeedback(res.data);
    })();
  }, [providerId]);

  console.log(totalFeedback);

  const handleClick = (event) => {
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };

  const handleOpenFeedbackDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };
  return (
    <div className="provider-detail-wrapper container">
      <div className="search-bar">
        <span className="search-map-btn">
          <LocationOn fontSize="medium" /> Bản đồ
        </span>
        <div>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel color="primary" htmlFor="searchByName">
              Tìm kiếm theo tên
            </InputLabel>
            <OutlinedInput
              color="primary"
              id="searchByName"
              endAdornment={<Search position="start"></Search>}
              label="Tìm kiểm theo tên"
            />
          </FormControl>
        </div>
      </div>
      <div className="break-crum">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
              Trang chủ
            </Link>
            <Link underline="hover" key="2" color="inherit" href="/finding-provider" onClick={handleClick}>
              Tìm thợ
            </Link>
            <Typography key="3" color="text.primary">
              {provider?.full_name}
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <div className="provider-detail-content">
        <div className="pd-left">
          <div className="avatar-rate pd-left-item">
            <div>
              {loading && <Skeleton width={205} height={205} />}
              {!loading && <img src={provider?.avatar?.url} alt="avatar" />}
            </div>
            {loading && <Skeleton width={140} height={24} />}

            {!loading &&
              (provider?.avg_star ? (
                <Rating starNumber={Math.round(provider?.avg_star)} size="large" />
              ) : (
                <small>Chưa có đánh giá</small>
              ))}
            {loading && <Skeleton width={80} height={30} />}
            {!loading && <div onClick={handleOpenFeedbackDialog}>{totalFeedback} phản hồi</div>}
            <FeedbackDialog
              type="provider"
              open={open}
              onClose={handleClose}
              services={services}
              star={provider?.avg_star}
              provider={provider}
            />
          </div>
          <div className="pd-left-item">
            <h3>Địa điểm</h3>
            <div>
              <h4>
                {!loading && provider?.location?.[0].province_name}
                {loading && <Skeleton width={100} height={20} />}
              </h4>
              <ul>
                <li>
                  {!loading && provider?.location?.[0].district_name}
                  {loading && <Skeleton width={80} height={16} />}
                </li>
              </ul>
            </div>
          </div>
          <div className="pd-left-item">
            <h3>Liên hệ</h3>
            <div>
              <h4>Số điện thoại</h4>
              <ul>
                <li>
                  {!loading && <>(+84){provider?.phone_number}</>}
                  {loading && <Skeleton width={80} height={16} />}
                </li>
              </ul>
            </div>
            <div>
              <h4>Email</h4>
              <ul>
                <li>
                  {!loading && provider?.email}
                  {loading && <Skeleton width={80} height={16} />}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pd-right">
          <div className="provider-name">
            <span>
              {!loading && provider?.full_name}
              {loading && <Skeleton width={250} height={30} />}
              {!loading && !provider?.is_working && (
                <strong className="no-working">(Thợ hiện chưa sẵn sàng làm việc)</strong>
              )}
            </span>
            <span onClick={handleShowChat}>
              <ChatIcon fontSize="small" />
              Chat
            </span>
          </div>
          <div className="provider-desc">
            {!loading && provider?.introduction}
            {loading && <Skeleton width={890} height={70} />}
          </div>
          <div className="provider-slick">
            {!loading && (
              <Slider {...settings}>
                {provider?.banner?.map((item, index) => {
                  return (
                    <>
                      <img key={index} src={item?.url} alt="image" />
                    </>
                  );
                })}
              </Slider>
            )}
            {loading && <Skeleton width={890} height={180} />}
          </div>
          <div className="provider-package">
            <ProviderPackage />
          </div>
        </div>
      </div>
      {openChat && <Chat currentProvider={provider} openChat={openChat} handleCloseChat={handleCloseChat} />}
    </div>
  );
};

export default ProviderDetailPage;
