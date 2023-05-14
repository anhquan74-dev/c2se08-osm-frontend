import React, { useEffect, useState } from 'react';
import './ServicePicker.scss';

const ServicePicker = ({ services, handleChangeService }) => {
  const [activeService, setActiveService] = useState(0);
  useEffect(() => {
    if (services) handleChangeService(services?.[0]?.id);
  }, [services]);
  return (
    <div className="service-picker-wrapper">
      {services?.map((item, index) => {
        return (
          <span
            key={index}
            className={`service-item ${activeService === index ? 'active' : ''}`}
            onClick={() => {
              setActiveService(index);
              handleChangeService(item?.id);
            }}
          >
            {item?.name}
          </span>
        );
      })}
    </div>
  );
};

export default ServicePicker;
