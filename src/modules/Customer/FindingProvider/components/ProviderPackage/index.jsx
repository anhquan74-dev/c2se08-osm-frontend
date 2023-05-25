import React, { useEffect, useState } from 'react';
import './ProviderPackage.scss';
import { NavLink, useSearchParams } from 'react-router-dom';
import ServicePicker from '../../../../../components/Common/ServicePicker';
import Rating from '../../../../../components/Common/Rating';
import packageApi from '../../../../../api/packageApi';
import Empty from '../../../../../assets/images/wallet.png';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { avgStar } from '../../../../../utils/common';

const ProviderPackage = () => {
  const starArr = [1, 2, 3, 4, 5];
  const [packages, setPackages] = useState();
  const [serviceId, setServiceId] = useState();
  const [loading, setLoading] = useState(true);
  const { provider, services } = useSelector((state) => state.providerCustomer);
  const handleChangeService = (serviceId) => {
    setServiceId(serviceId);
    (async () => {
      setLoading(true);
      const res = await packageApi.getAllByServiceId(serviceId);
      setLoading(false);
      setPackages(res?.data);
    })();
  };

  return (
    <div className="provider-package-wrapper">
      <ServicePicker handleChangeService={handleChangeService} services={services} />
      {!loading && !packages && (
        <div className="empty">
          <img src={Empty} alt="" />
          Chưa có báo giá
          <span></span>
        </div>
      )}
      {loading && (
        <div className="content">
          {Array(2)
            .fill(0)
            .map(() => {
              return <Skeleton width={400} height={180} />;
            })}
        </div>
      )}
      {!loading && (
        <div className="content">
          {packages?.map((item) => {
            return (
              <div className="package-item" key={item?.package?.id}>
                <h3>{item?.package?.name}</h3>
                <div className="price">
                  {item?.package?.is_negotiable ? <span>Giá thương lượng </span> : <span>{item?.package?.price}</span>}
                </div>
                <div className="rating">
                  {/* <Rating starNumber={avgStar(item?.feedbacks)} size="small" /> */}
                  {item?.feedbacks.length !== 0 ? (
                    <Rating starNumber={item?.package?.avg_star} size="small" />
                  ) : (
                    <span>Chưa có đánh giá</span>
                  )}
                </div>
                <div className="desc">{item?.package?.description}</div>
                <NavLink
                  // className="quotation-btn"
                  className={`quotation-btn ${provider?.is_working ? '' : 'disabled'}`}
                  to={`/appointment-request-form?providerId=${provider?.id}&serviceId=${serviceId}&packageId=${item?.package?.id}`}
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
