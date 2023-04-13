import React from 'react';
import './HomeContent.scss';
import ProviderCard from '../ProviderCard';
import ServiceCard from '../ServiceCard';

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
  let providerList = [2, 3, 4, 6, 3, 6, 3, 6, 34, 6, 43, 6];
  providerList.length = 12;
  return (
    <>
      {providerList?.map((item, index) => {
        return (
          <ProviderCard
            key={index}
            name="Provider name"
            avatar="https://icdn.dantri.com.vn/thumb_w/680/2023/04/01/afp-messi-1-167911043942020387261-75-0-625-881-crop-1679110702236160038944-1679118122610-1680330659064.jpeg"
            price="negotiate"
          />
        );
      })}
    </>
  );
};

const ServiceList = () => {
  let serviceList = [2, 3, 4, 6, 3, 6, 3, 6, 34, 6, 43, 6];
  serviceList.length = 12;
  return (
    <>
      {serviceList?.map((item, index) => {
        return (
          <ServiceCard key={index} name="Khắc phục sự cố chập điện" provider="Điện lạnh Hưng Thịnh" price="negotiate" />
        );
      })}
    </>
  );
};

export default HomeContent;
