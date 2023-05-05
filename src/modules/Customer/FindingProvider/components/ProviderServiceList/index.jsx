import React, { useEffect, useState } from 'react';
import ProviderCard from '../../../../../components/Common/ProviderCard';
import ServiceCard from '../../../../../components/Common/ServiceCard';
import './ProviderServiceList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProviders } from '../../../../Admin/ManageServiceProvider/providerSlice';
import { PAGE_DEFAULT } from '../../../../../utils/constants';
import packageApi from '../../../../../api/packageApi';

const ProviderServiceList = ({ type, listResult }) => {
  // const dispatch = useDispatch();
  // const { list } = useSelector((state) => state.provider);
  // console.log(list);
  // const [servicePackageList, setServicePackageList] = useState([]);

  // useEffect(() => {
  //   if (type === 'provider') {
  //     dispatch(
  //       getProviders({
  //         sort: [
  //           {
  //             sort_by: 'avg_star',
  //             sort_dir: 'desc',
  //           },
  //         ],
  //         page: PAGE_DEFAULT,
  //         limit: 12,
  //       })
  //     );
  //   } else {
  //     (async () => {
  //       const res = await packageApi.getAll();
  //       setServicePackageList(res.data);
  //     })();
  //   }
  // }, [type]);

  let show;
  if (type === 'provider') {
    show = <ProviderList list={listResult} />;
  } else {
    show = <ServiceList list={listResult} />;
  }

  return <div className="list-show-content">{show}</div>;
};

const ProviderList = ({ list }) => {
  let providerList = [2, 3, 4, 6, 3, 6, 3, 6, 34, 6, 43, 6];
  providerList.length = 12;
  return (
    <>
      {list?.map((item, index) => {
        return <ProviderCard key={index} {...item} />;
      })}
    </>
  );
};

const ServiceList = ({ list }) => {
  let serviceList = [2, 3, 4, 6, 3, 6, 3, 6, 34, 6, 43, 6];
  serviceList.length = 12;
  return (
    <>
      {list?.map((item, index) => {
        return <ServiceCard key={index} {...item} />;
      })}
    </>
  );
};

export default ProviderServiceList;
