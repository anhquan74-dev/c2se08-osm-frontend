import React, { useEffect, useState } from 'react';
import './HomeContent.scss';
import ProviderCard from '../ProviderCard';
import ServiceCard from '../ServiceCard';
import providerApi from '../../../api/providerApi.js';
import { PAGE_DEFAULT } from '../../../utils/constants';
import packageApi from '../../../api/packageApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPackages, getProviders } from '../../../modules/Customer/FindingProvider/providerCustomerSlice';

const HomeContent = ({ ...props }) => {
  const { title, type } = props;
  const navigate = useNavigate();

  let list;
  if (type === 'provider') {
    list = <ProviderList />;
  } else {
    list = <ServiceList />;
  }

  return (
    <div className="home-content container">
      <div className="title-content">
        <h3>{title}</h3>
        <p
          onClick={() => {
            navigate('/finding-provider');
          }}
        >
          Xem tất cả
        </p>
      </div>
      <div className="main-content">{list}</div>
    </div>
  );
};

const ProviderList = () => {
  const dispatch = useDispatch();
  const { loading, providerList } = useSelector((state) => state.providerCustomer);

  useEffect(() => {
    dispatch(
      getProviders({
        sort: [
          {
            sort_by: 'avg_star',
            sort_dir: 'desc',
          },
        ],
        page: PAGE_DEFAULT,
        limit: 12,
      })
    );
  }, []);

  return (
    <>
      {loading &&
        Array(12)
          .fill(0)
          .map((_, index) => {
            return <ProviderCard.Loading key={index} />;
          })}
      {!loading &&
        providerList.data?.map((item, index) => {
          return <ProviderCard key={index} {...item} />;
        })}
    </>
  );
};

const ServiceList = () => {
  const dispatch = useDispatch();
  const { loading, packageList } = useSelector((state) => state.providerCustomer);
  console.log(packageList);
  useEffect(() => {
    dispatch(
      getPackages({
        sort: [
          {
            sort_by: 'avg_star',
            sort_dir: 'desc',
          },
        ],
        page: PAGE_DEFAULT,
        limit: 12,
      })
    );
  }, []);

  return (
    <>
      {loading &&
        Array(12)
          .fill(0)
          .map((_, index) => {
            return <ServiceCard.Loading key={index} />;
          })}
      {!loading &&
        packageList.data?.map((item, index) => {
          /* if (index < 12) {
          } */
          return <ServiceCard key={index} {...item} />;
        })}
    </>
  );
};

export default HomeContent;
