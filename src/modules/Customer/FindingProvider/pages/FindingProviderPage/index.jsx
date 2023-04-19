import React, { useState } from 'react';
import ProviderFilter from '../../components/ProviderFilter';
import ProviderSort from '../../components/ProviderSort';
import './FindingProviderPage.scss';
import { LocationOn, FormatListBulleted } from '@mui/icons-material';
import ProviderServiceList from '../../components/ProviderServiceList';

const FindingProviderPage = () => {
  const [type, setType] = useState('service');
  const [searchMap, setSearchMap] = useState(false);

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
        <ProviderSort />
      </div>
      <div className="provider-filter">
        <ProviderFilter />
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
          <ProviderServiceList type={type} />
        </div>
      </div>
    </div>
  );
};

export default FindingProviderPage;
