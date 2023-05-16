import SettingsIcon from '@mui/icons-material/Settings';
import React, { useEffect, useState } from 'react';
import './PackageItem.scss';
import { Star } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Popover,
} from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import FeedbackItem from '../../../../../components/Common/FeedbackItem';
import SendIcon from '@mui/icons-material/Send';
import packageApi from '../../../../../api/packageApi';
import feedbackApi from '../../../../../api/feedbackApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  getAllFeedbackByPackage,
  getAllPackageByProviderCategory,
  getAllPackagesByServiceId,
} from '../../../ManageService/manageServiceSlice';
import { avgStar } from '../../../../../utils/common.js';

const PackageItem = (props) => {
  // const navigate = useNavigate();
  const { service_id } = useParams();
  const dispatch = useDispatch();
  const { packageInfo, provider_id, category_id } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [feedbackList, setFeedbackList] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  const [providerReply, setProviderReply] = useState('');
  const [loading, setLoading] = useState(true);

  const handleClickSetting = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };
  const handleCloseDialogRemove = () => {
    setOpenDialogRemove(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClickPackageItem = () => {
    setOpenDetailDialog(true);
    (async () => {
      setLoading(true);
      const res = await feedbackApi.getAllFeedbackByPackage(packageInfo?.package?.id);
      setLoading(false);
      setFeedbackList(res.feedbackList);
    })();
  };

  const handleRemoveClick = () => {
    setOpenDialogRemove(true);
  };

  const handleRemovePackage = async () => {
    const res = await packageApi.delete(packageInfo?.package?.id);
    if (res.statusCode == 200) {
      setAnchorEl(null);
      toast.success('Xóa báo giá thành công!');
      dispatch(getAllPackagesByServiceId(service_id));
    }
  };

  const handleSubmitProviderReply = async (feedbackReply) => {
    const dataSend = {
      reply: providerReply,
      reply_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    };
    const feedback_id = feedbackReply.feedback.id;
    const res = await feedbackApi.update(feedback_id, dataSend);
    if (res.statusCode == 200) {
      dispatch(getAllFeedbackByPackage(packageInfo.id));
      toast.success('Phản hồi của bạn đã được gửi!');
    }
  };
  return (
    <div className="pro-package-item">
      <div className="item-left">
        <h4 onClick={handleClickPackageItem}>{packageInfo?.package?.name}</h4>
        <div className="star">
          <Star sx={{ color: '#ffbe17' }} />
          {packageInfo?.feedbacks.length === 0 ? (
            <small>Chưa có đánh giá</small>
          ) : (
            <span>{avgStar(packageInfo?.feedbacks)}/5</span>
          )}
        </div>
        <p>{packageInfo?.package?.description}</p>
        <strong>
          {packageInfo?.package?.is_negotiable === 1 ? (
            <span>Giá thương lượng </span>
          ) : (
            <span>{packageInfo?.package?.price} đ</span>
          )}
        </strong>
      </div>
      <div className="item-right" onClick={handleClickSetting}>
        <SettingsIcon />
      </div>
      <Popover
        sx={{
          borderRadius: '20px !important',
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ul className="profile-popover">
          <li>
            <NavLink to={`/provider/packages/${packageInfo?.package?.id}`}>Chỉnh sửa</NavLink>
          </li>
          <li>
            <NavLink to="" onClick={handleRemoveClick}>
              Xóa báo giá
            </NavLink>
          </li>
        </ul>
      </Popover>
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Chi tiết Báo giá</DialogTitle>
        <DialogContent>
          <div className="package-detail-dialog">
            <h3>{packageInfo?.package?.name}</h3>
            <div className="rate-price">
              <strong>
                {packageInfo?.package?.is_negotiable === 1 ? (
                  <span>Giá thương lượng </span>
                ) : (
                  <span>{packageInfo?.package?.price} đ</span>
                )}
              </strong>
              <span></span>
              <div className="star">
                <Star sx={{ color: '#ffbe17' }} />
                <span>{avgStar(packageInfo?.feedbacks)}/5</span>
              </div>
            </div>
            <hr />
            <div className="desc">
              <h4>Thêm chi tiết</h4>
              <div>{packageInfo?.package?.description}</div>
            </div>
            <hr />
            <div className="feedback">
              <h4>Đánh giá</h4>
              <div className="feedback-container">
                {loading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '220px', alignItems: 'center' }}>
                    <CircularProgress />
                  </Box>
                )}
                {!loading &&
                  feedbackList &&
                  (feedbackList?.length > 0 ? (
                    feedbackList?.map((item, index) => {
                      return (
                        <div className="feedback-content">
                          <div className="content-up">
                            <FeedbackItem key={index} feedbackInfo={item} />
                          </div>
                          <div className="content-down">
                            {item?.reply ? (
                              <>
                                <div className="content">{item?.reply}</div>
                                <div className="date">{moment(item?.reply_at).format('DD/MM/YYYY')}</div>
                              </>
                            ) : (
                              <>
                                <p>Phản hồi của nhà cung cấp</p>
                                <div className="reply">
                                  <input
                                    type="text"
                                    name=""
                                    onChange={(e) => {
                                      setProviderReply(e.target.value);
                                    }}
                                    id=""
                                    placeholder="Nhập câu trả lời"
                                  />
                                  <SendIcon color="" onClick={() => handleSubmitProviderReply(item)} />
                                </div>
                                <span>Bạn chỉ được phản hồi đánh giá một lần</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>Chưa có đánh giá</p>
                  ))}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialogRemove}
        onClose={handleCloseDialogRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xoá báo giá dịch vụ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có thực sự muốn xóa Báo giá này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogRemove} variant="text" color="info">
            Huỷ
          </Button>
          <Button
            onClick={() => {
              handleRemovePackage();
              setOpenDialogRemove(false);
            }}
            color="error"
            variant="text"
            autoFocus
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PackageItem;
