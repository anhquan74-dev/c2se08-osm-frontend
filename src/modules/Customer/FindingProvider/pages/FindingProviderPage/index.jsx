import { FormatListBulleted, LocationOn } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import packageApi from '../../../../../api/packageApi';
import ProvidersOnMap from '../../../../../components/Common/ProvidersOnMap';
import ProviderFilter from '../../components/ProviderFilter';
import ProviderServiceList from '../../components/ProviderServiceList';
import ProviderSort from '../../components/ProviderSort';
import { getPackages, getProviders, providerCustomerActions } from '../../providerCustomerSlice';
import './FindingProviderPage.scss';

const FindingProviderPage = () => {
  const [type, setType] = useState('service');
  const [searchMap, setSearchMap] = useState(false);
  const dispatch = useDispatch();
  const { providerList, packageList, conditions, loading } = useSelector((state) => state.providerCustomer);
  const [list, setList] = useState([]);
  // useEffect(() => {
  //   dispatch(getProviders(conditions));
  // }, [dispatch, conditions]);

  const handleFilterChange = (conditions) => {
    dispatch(providerCustomerActions.setConditions(conditions));
  };

  useEffect(() => {
    if (type === 'provider') {
      dispatch(getProviders(conditions));
    } else {
      dispatch(getPackages(conditions));
    }
  }, [type, conditions]);

  useEffect(() => {
    setList(providerList.data);
  }, [providerList]);

  useEffect(() => {
    setList(packageList.data);
  }, [packageList]);
  return (
    <div className="finding-provider container">
      <div className="provider-sort">
        <span
          className="search-map-btn"
          onClick={() => {
            setSearchMap(!searchMap);
            setType('provider');
          }}
        >
          {searchMap ? (
            <>
              <FormatListBulleted fontSize="medium" /> Danh sách
            </>
          ) : (
            <>
              <LocationOn fontSize="medium" /> Bản đồ
            </>
          )}
        </span>
        <ProviderSort onChange={handleFilterChange} conditions={conditions} />
      </div>
      <div className="provider-filter">
        <ProviderFilter onChange={handleFilterChange} conditions={conditions} />
      </div>
      <div className="provider-main">
        <div className="type-pick">
          <button
            className={`${type === 'service' ? 'active' : ''}`}
            onClick={() => setType('service')}
            disabled={searchMap === true}
          >
            Dịch vụ
          </button>
          <button className={`${type === 'provider' ? 'active' : ''}`} onClick={() => setType('provider')}>
            Nhà cung cấp dịch vụ
          </button>
        </div>
        <div className="list-show">
          {searchMap ? <ProvidersOnMap providerList={[]} /> : <ProviderServiceList type={type} listResult={list} />}
        </div>
      </div>
    </div>
  );
};

export default FindingProviderPage;
