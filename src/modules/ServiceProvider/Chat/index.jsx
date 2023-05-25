import React from 'react';
import './Chat.css';
import Nav from './Nav';
import ChatBody from './ChatBody/ChatBody';
import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
export default function Chat() {
  const navigate = useNavigate();
  const handleClickBreadCrum = (event) => {
    console.log(event.target.href);
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };
  return (
    <div className="__main container">
      <div className="break-crum">
        <Stack spacing={2} marginTop={3}>
          <Breadcrumbs separator={<NavigateNext fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/provider" onClick={handleClickBreadCrum}>
              Trang chủ
            </Link>
            <Typography key="3" color="text.primary">
              Hỗ trợ khách hàng
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>
      <h3>Hỗ trợ khách hàng</h3>
      {/* <Nav /> */}
      <ChatBody />
    </div>
  );
}
