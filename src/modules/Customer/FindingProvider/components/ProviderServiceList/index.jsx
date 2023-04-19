import React from 'react';
import ProviderCard from '../../../../../components/Common/ProviderCard';
import ServiceCard from '../../../../../components/Common/ServiceCard';
import './ProviderServiceList.scss';

const ProviderServiceList = ({ type, list }) => {
  let show;
  if (type === 'provider') {
    show = <ProviderList />;
  } else {
    show = <ServiceList />;
  }
  return <div className="list-show-content">{show}</div>;
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

export default ProviderServiceList;
