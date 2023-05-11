import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState } from 'react';
import './PackageItem.scss';
import { Star } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Popover } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import FeedbackItem from '../../../../../components/Common/FeedbackItem';
import SendIcon from '@mui/icons-material/Send';

const PackageItem = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
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

  const navigate = useNavigate();

  const handleClickPackageItem = () => {
    setOpenDetailDialog(true);
  };

  const handleRemoveClick = () => {
    setOpenDialogRemove(true);
  };

  const handleRemovePackage = () => {};
  return (
    <div className="package-item">
      <div className="item-left">
        <h4 onClick={handleClickPackageItem}>Đi dây điện âm tường</h4>
        {/* check star */}
        <div className="star">
          <Star sx={{ color: '#ffbe17' }} />
          <span>5/5</span>
        </div>
        {/* <span>Chưa có đánh giá</span> */}
        <p>Cần gì cứ alo tôi</p>
        <strong>150.000 đ</strong>
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
            <NavLink to="/provider/packages/1">Chỉnh sửa</NavLink>
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
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Chi tiết Báo giá</DialogTitle>
        <DialogContent>
          <div className="package-detail-dialog">
            <h3>Sửa xe máy, xe honda</h3>
            <div className="rate-price">
              <strong>200.000đ</strong>
              <span></span>
              <div className="star">
                <Star sx={{ color: '#ffbe17' }} />
                <span>5/5</span>
              </div>
            </div>
            <hr />
            <div className="desc">
              <h4>Thêm chi tiết</h4>
              <div>Gọi đâu có đó, có thể thương lượng giá tùy trường hợp</div>
            </div>
            <hr />
            <div className="feedback">
              <h4>Đánh giá</h4>
              <div className="feedback-content">
                <div className="content-up">
                  <FeedbackItem />
                </div>
                <div className="content-down">
                  {/* check provider đã trả lời hay chưa */}
                  <p>Phản hồi của nhà cung cấp</p>
                  <>
                    <div className="reply">
                      <input type="text" name="" id="" placeholder="Nhập câu trả lời" />
                      <SendIcon color="" />
                    </div>
                    <span>Bạn chỉ được phản hồi đánh giá một lần</span>
                  </>
                  <>
                    {/* <div className="content">Cảm ơn ông nha</div>
                    <div className="date">06/02/2023</div> */}
                  </>
                </div>
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
