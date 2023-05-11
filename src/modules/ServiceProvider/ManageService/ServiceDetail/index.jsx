import React from 'react';
import './ServiceDetail.scss';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import PackageItem from '../../ManagePackage/components/PackageItem';
import { Breadcrumbs, Stack, Typography, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

const ServiceDetail = () => {
  const { service_id } = useParams();
  const navigate = useNavigate();
  console.log(service_id);
  const handleClickBreadCrum = (event) => {
    event.preventDefault();
    console.log(event.target.href.slice(21));
    navigate(event.target.href.slice(21));
  };
  return (
    <div className="all-packages container">
      <div className="break-crum">
        <Stack spacing={2}>
          <Breadcrumbs separator={<NavigateNext fontSize="medium" />} aria-label="breadcrumb">
            <Link underline="hover" key="1" color="inherit" href="/provider" onClick={handleClickBreadCrum}>
              Trang chủ
            </Link>
            <Link underline="hover" key="1" color="inherit" href="/provider/services" onClick={handleClickBreadCrum}>
              Dịch vụ
            </Link>
            <Typography key="3" color="text.primary">
              Báo giá
            </Typography>
          </Breadcrumbs>
        </Stack>
      </div>

      <h3>Sửa điện & nước</h3>
      <h4>Danh mục báo giá</h4>
      <div className="packages-content">
        <PackageItem />
        <PackageItem />
        <PackageItem />
      </div>
      <div className="add-package">
        <button>
          <NavLink to="/provider/packages/add">Thêm báo giá</NavLink>
        </button>
      </div>
    </div>
  );
};

export default ServiceDetail;
