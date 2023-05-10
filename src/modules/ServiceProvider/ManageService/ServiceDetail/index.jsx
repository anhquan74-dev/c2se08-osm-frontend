import React from 'react';
import './ServiceDetail.scss';
import { NavLink, useParams } from 'react-router-dom';
import PackageItem from '../../ManagePackage/components/PackageItem';

const ServiceDetail = () => {
  const { service_id } = useParams();
  console.log(service_id);
  return (
    <div className="all-packages container">
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
