import React, { useState } from 'react';
import './ServicePicker.scss';

const ServicePicker = ({ services, handleChangeService }) => {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="service-picker-wrapper">
      {services.map((item, index) => {
        return (
          <span
            className={`service-item ${activeService === index ? 'active' : ''}`}
            onClick={() => {
              setActiveService(index);
              handleChangeService(index);
            }}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default ServicePicker;
