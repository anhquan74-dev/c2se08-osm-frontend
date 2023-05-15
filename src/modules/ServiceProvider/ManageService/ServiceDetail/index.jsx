import React, { useEffect, useState } from 'react';
import './ServiceDetail.scss';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import PackageItem from '../../ManagePackage/components/PackageItem';
import { Breadcrumbs, Stack, Typography, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import packageApi from '../../../../api/packageApi';
import { setCurrentCategoryId, setCurrentServiceId } from '../manageServiceSlice';

const ServiceDetail = () => {
  const { service_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState(null);
  const currentUserId = useSelector((state) => state.auth.currentUser.id);
  const serviceList = useSelector((state) => state.manageService.serviceList);
  const [packageList, setPackageList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      serviceList.map((item) => {
        if (item.dataCategory[0].id == service_id) {
          setCurrentCategory(item.dataCategory[0]);
        }
      });
      const res = await packageApi.getAllPackageByProviderCategory({
        provider_id: currentUserId,
        category_id: service_id,
      });
      if (res.statusCode === 200) {
        setPackageList(res.data[0].package);
      }
    };
    loadData();
    dispatch(setCurrentCategoryId(service_id));
  }, []);

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

      <h3>{currentCategory?.name}</h3>
      <h4>Danh mục báo giá</h4>
      <div className="packages-content">
        {packageList &&
          packageList.map((item, index) => {
            return <PackageItem key={index} packageInfo={item} />;
          })}
      </div>
      <div className="add-package">
        <button
          onClick={() => {
            dispatch(setCurrentServiceId(packageList[0].service_id));
          }}
        >
          <NavLink to="/provider/packages/add">Thêm báo giá</NavLink>
          {/* <NavLink to="/provider/services/id">Thêm báo giá</NavLink> */}
        </button>
      </div>
    </div>
  );
};

export default ServiceDetail;
