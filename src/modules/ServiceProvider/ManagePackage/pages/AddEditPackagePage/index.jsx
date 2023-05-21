import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './AddEditPackagePage.scss';
import packageApi from '../../../../../api/packageApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Breadcrumbs, Stack, Typography, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

const AddEditPackagePage = () => {
  const { package_id } = useParams();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const navigate = useNavigate();
  const isEdit = Boolean(package_id);
  const service_id = useSelector((state) => state.manageService.currentServiceId);
  const [providerPackage, setProviderPackage] = useState({
    name: null,
    description: '',
    price: '',
    is_negotiable: true,
  });

  // call API
  useEffect(() => {
    if (!package_id) return;
    (async () => {
      try {
        const res = await packageApi.get(package_id);
        setProviderPackage(res?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { name, description, price, is_negotiable } = providerPackage;
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(serviceId);
    let formValue = { ...providerPackage, service_id: serviceId };
    if (is_negotiable) {
      formValue = { ...formValue, price: 0, is_negotiable: 1 };
      if (isEdit) {
        await packageApi.update(package_id, formValue);
        toast.success('Cập nhật thành công!');
      } else {
        await packageApi.create(formValue);
        toast.success('Thêm mới thành công!');
      }
      navigate('/provider/services/' + serviceId);
    } else {
      formValue = { ...formValue, is_negotiable: 0 };
      if (isEdit) {
        await packageApi.update(package_id, formValue);
        toast.success('Cập nhật thành công!');
      } else {
        toast.success('Thêm mới thành công!');
        await packageApi.create(formValue);
      }
      navigate('/provider/services/' + serviceId);
    }
  };

  const handleChangePackage = (e) => {
    let { name, value } = e.target;
    if (name === 'is_negotiable') {
      value = e.target.checked;
    }

    setProviderPackage({
      ...providerPackage,
      [name]: value,
    });
  };

  const handleClickBreadCrum = (event) => {
    event.preventDefault();
    navigate(event.target.href.slice(21));
  };

  return (
    <div className="add-edit-package container">
      <Stack spacing={2} marginTop={3}>
        <Breadcrumbs separator={<NavigateNext fontSize="medium" />} aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/provider" onClick={handleClickBreadCrum}>
            Trang chủ
          </Link>
          <Link underline="hover" key="1" color="inherit" href="/provider/services" onClick={handleClickBreadCrum}>
            Dịch vụ
          </Link>
          <Typography key="3" color="text.primary">
            {isEdit ? <>Sửa</> : <>Thêm</>} báo giá
          </Typography>
        </Breadcrumbs>
      </Stack>
      <h2>{isEdit ? <>Sửa</> : <>Thêm</>} báo giá</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên dịch vụ</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name || ''}
            onChange={handleChangePackage}
            placeholder="Nhập tên dịch vụ"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Đơn giá</label>
          <input
            id="price"
            type="text"
            name="price"
            value={price || ''}
            onChange={handleChangePackage}
            disabled={is_negotiable}
            placeholder="Nhập đơn giá"
          />
        </div>
        <div className="form-group1">
          <input
            id="is_negotiable"
            type="checkbox"
            name="is_negotiable"
            checked={is_negotiable}
            onChange={handleChangePackage}
          />
          <label htmlFor="is_negotiable">Thương lượng</label>
        </div>
        <div className="form-group">
          <label htmlFor="description">Thêm chi tiết (không bắt buộc)</label>
          <textarea value={description || ''} name="description" onChange={handleChangePackage} rows="7" />
        </div>
        <button type="submit" onClick={handleFormSubmit}>
          <NavLink to="">Lưu</NavLink>
        </button>
      </form>
    </div>
  );
};

export default AddEditPackagePage;
