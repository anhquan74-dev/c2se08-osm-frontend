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

export default function CategoryTable({ categoryList, onEdit, onRemove }) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Tên danh mục</TableCell>
              <TableCell align="left">Logo</TableCell>
              <TableCell align="left">Tổng số thợ</TableCell>
              <TableCell align="left">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryList?.map((category) => (
              <TableRow key={category.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {category.id}
                </TableCell>
                <TableCell align="left">{category.name}</TableCell>
                <TableCell align="left">
                  <img
                    style={{
                      width: '80px',
                    }}
                    src={category?.logo?.url}
                    alt=""
                  />
                </TableCell>
                <TableCell align="left">{category.total_provider}</TableCell>
                <TableCell align="left">
                  <Button
                    sx={{ mr: '8px' }}
                    size="small"
                    color="primary"
                    onClick={() => {
                      onEdit?.(category);
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      handleRemoveClick(category);
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
              onRemove?.(selectedCategory);
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
