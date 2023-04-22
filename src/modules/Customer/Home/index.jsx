import React from 'react';
import { categoryList } from './categoryList';
import { Category } from '../../../components/Common';
import './Home.scss';
import HomeContent from '../../../components/Common/HomeContent';
import SearchBar from '../../../components/Common/SearchBar';
import banner1 from '../../../assets/images/banner1.jpg';
import banner2 from '../../../assets/images/banner2.png';
import dangkytho from '../../../assets/images/dangkytho.jpeg';

const Home = () => {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  function showPosition(position) {
    console.log('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
  }
  getLocation();
  const contentArr = [
    {
      title: 'Nhà cung cấp dịch vụ dành cho bạn',
      type: 'provider',
    },
    {
      title: 'Dịch vụ dành cho bạn',
      type: 'service',
    },
  ];
  return (
    <div className="home-container container">
      <SearchBar />
      <div className="banner">
        <div>
          <img src={banner1} alt="" />
        </div>
        <div>
          <img src={banner2} alt="" />
        </div>
        <div>
          <img src={dangkytho} alt="" />
        </div>
      </div>
      <div className="home-category">
        <h3>Danh mục dịch vụ OSM System</h3>
        <div className="category-content">
          {categoryList.map((item, index) => {
            return <Category key={index} icon={item.icon} title={item.title} />;
          })}
        </div>
      </div>
      {contentArr.map((item, index) => {
        return <HomeContent key={index} title={item.title} type={item.type} />;
      })}
    </div>
  );
};

export default Home;
