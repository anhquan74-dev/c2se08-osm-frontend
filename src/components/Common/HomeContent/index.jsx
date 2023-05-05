import React, { useEffect, useState } from 'react';
import './HomeContent.scss';
import ProviderCard from '../ProviderCard';
import ServiceCard from '../ServiceCard';
import providerApi from '../../../api/providerApi.js';
import { PAGE_DEFAULT } from '../../../utils/constants';
import packageApi from '../../../api/packageApi';

const HomeContent = ({ ...props }) => {
  const { title, type } = props;

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
        <p>Xem tất cả</p>
      </div>
      <div className="main-content">{list}</div>
    </div>
  );
};

const ProviderList = () => {
  const [providerList, setProviderList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await providerApi.getAll({
        sort: [
          {
            sort_by: 'avg_star',
            sort_dir: 'desc',
          },
        ],
        page: PAGE_DEFAULT,
        limit: 12,
      });
      setProviderList(res.data);
    })();
  }, []);

  return (
    <>
      {providerList?.map((item, index) => {
        return <ProviderCard key={index} {...item} />;
      })}
    </>
  );
};

const ServiceList = () => {
  const [servicePackageList, setServicePackageList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await packageApi.getAll();
      setServicePackageList(res.data);
    })();
  }, []);

  return (
    <>
      {servicePackageList?.map((item, index) => {
        if (index < 12) {
          return <ServiceCard key={index} {...item} />;
        }
      })}
    </>
  );
};

export default HomeContent;
