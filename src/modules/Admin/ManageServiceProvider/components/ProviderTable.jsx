import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import { capitalizeString, formatBirthDay, getShortLocation } from '../../../../utils/common';

export default function ProviderTable({ providerList, onEdit, onRemove }) {
  const [open, setOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (provider) => {
    setSelectedProvider(provider);
    setOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Họ và tên</TableCell>
              <TableCell align="left">Ngày sinh</TableCell>
              <TableCell align="left">Giới tính</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="left">Địa chỉ</TableCell>
              <TableCell align="left">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {providerList?.map((provider) => {
              return (
                <TableRow key={provider.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {provider.id}
                  </TableCell>
                  <TableCell align="left">{provider.email}</TableCell>
                  <TableCell align="left">{provider.full_name}</TableCell>
                  <TableCell align="left">{formatBirthDay(provider.birthday)}</TableCell>
                  <TableCell align="left">{capitalizeString(provider.gender)}</TableCell>
                  <TableCell align="left">{provider.phone_number}</TableCell>
                  <TableCell align="left">{getShortLocation(provider.location)}</TableCell>
                  <TableCell align="left">
                    <Button
                      sx={{ mr: '8px' }}
                      size="small"
                      color="primary"
                      onClick={() => {
                        onEdit?.(provider);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleRemoveClick(provider);
                      }}
                    >
                      Xoá
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
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
              onRemove?.(selectedProvider);
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
