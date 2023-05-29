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
    show = <ProviderList />;
  } else {
    show = <ServiceList />;
  }

  return <div className="list-show-content">{show}</div>;
};

const ProviderList = () => {
  const { providerList, packageList, conditions, loading } = useSelector((state) => state.providerCustomer);
  return (
    <>
      {loading &&
        Array(12)
          .fill(0)
          .map((_, index) => {
            return <ProviderCard.Loading key={index} />;
          })}
      {!loading &&
        (providerList?.data?.length !== 0 ? (
          providerList?.data?.map((item, index) => {
            return <ProviderCard key={index} {...item} />;
          })
        ) : (
          <i>Không có kết quả tìm kiếm</i>
        ))}
    </>
  );
};

const ServiceList = () => {
  const { providerList, packageList, conditions, loading } = useSelector((state) => state.providerCustomer);

  return (
    <>
      {loading &&
        Array(12)
          .fill(0)
          .map((_, index) => {
            return <ServiceCard.Loading key={index} />;
          })}
      {!loading &&
        (packageList?.data?.length !== 0 ? (
          packageList.data?.map((item, index) => {
            /* if (index < 12) {
          } */
            return <ServiceCard key={index} {...item} />;
          })
        ) : (
          <i>Không có kết quả tìm kiếm</i>
        ))}
    </>
  );
};

export default ProviderServiceList;
