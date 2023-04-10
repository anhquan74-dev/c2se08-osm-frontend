import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  sliderClasses,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';

export default function PostTable({ postList, onEdit, onRemove }) {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Tiêu đề</TableCell>
              <TableCell align="left">Danh mục</TableCell>
              <TableCell align="left">Ngày đăng</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="left">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postList.map((post) => (
              <TableRow key={post.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {post.id}
                </TableCell>
                <TableCell align="left">{post.title}</TableCell>
                <TableCell align="left">{post.category_id}</TableCell>
                <TableCell align="left">{post.date}</TableCell>
                <TableCell align="left">{post.valid_flag}</TableCell>
                <TableCell align="left">
                  <Button
                    sx={{ mr: '8px' }}
                    size="small"
                    color="primary"
                    onClick={() => {
                      onEdit?.(post);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      handleRemoveClick(post);
                    }}
                  >
                    Xoá
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xoá khách hàng này?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xoá tài khoản này! <br />
            Hành động này không thể khôi phục
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="info">
            Huỷ
          </Button>
          <Button
            onClick={() => {
              onRemove?.(selectedPost);
              setOpen(false);
            }}
            color="success"
            variant="contained"
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
