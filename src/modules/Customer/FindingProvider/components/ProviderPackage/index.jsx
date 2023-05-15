import React, { useEffect, useState } from 'react';
import './ProviderPackage.scss';
import { NavLink, useSearchParams } from 'react-router-dom';
import ServicePicker from '../../../../../components/Common/ServicePicker';
import Rating from '../../../../../components/Common/Rating';
import packageApi from '../../../../../api/packageApi';
import Empty from '../../../../../assets/images/wallet.png';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

const ProviderPackage = () => {
  const starArr = [1, 2, 3, 4, 5];
  const [packages, setPackages] = useState();
  const [serviceId, setServiceId] = useState();
  const [loading, setLoading] = useState(true);
  const { provider, services } = useSelector((state) => state.providerCustomer);
  const handleChangeService = (serviceId) => {
    setServiceId(serviceId);
    (async () => {
      const res = await packageApi.getAllByServiceId(serviceId);
      setLoading(false);
      setPackages(res?.data);
    })();
  };
  console.log(packages);

  return (
    <div className="provider-package-wrapper">
      <ServicePicker handleChangeService={handleChangeService} services={services} />
      {!packages && (
        <div className="empty">
          <img src={Empty} alt="" />
          Chưa có báo giá
          <span></span>
        </div>
      )}
      {loading && <Skeleton width={840} height={250} />}
      {!loading && (
        <div className="content">
          {packages?.map((item) => {
            return (
              <div className="package-item" key={item?.id}>
                <h3>{item?.name}</h3>
                <div className="price">
                  {item?.is_negotiable ? <span>Giá thương lượng </span> : <span>{item.price}</span>}
                </div>
                <div className="rating">
                  {item?.avg_star ? <Rating starNumber={item?.avg_star} size="small" /> : <span>Chưa có đánh giá</span>}
                </div>
                <div className="desc">{item?.description}</div>
                <NavLink
                  className="quotation-btn"
                  to={`/appointment-request-form?providerId=${provider?.id}&serviceId=${serviceId}&packageId=${item?.id}`}
                >
                  Lấy báo giá
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProviderPackage;
