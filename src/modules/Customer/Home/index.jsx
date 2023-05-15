import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import banner1 from '../../../assets/images/banner1.jpg';
import banner2 from '../../../assets/images/banner2.png';
import dangkytho from '../../../assets/images/dangkytho.jpeg';
import { Category } from '../../../components/Common';
import HomeContent from '../../../components/Common/HomeContent';
import SearchBar from '../../../components/Common/SearchBar';
import { getCategories } from '../../Admin/Category/categorySlice';
import './Home.scss';

const Home = () => {
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
  // const [categoryList, setCategoryList] = useState([]);
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.category);

  useEffect(() => {
    if (list.length === 0) dispatch(getCategories());
  }, []);
  console.log(list);
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
          {loading &&
            Array(8)
              .fill(0)
              .map((_, index) => {
                return <Category.Loading key={index} />;
              })}
          {!loading &&
            list?.map((item, index) => {
              return <Category key={index} icon={item.logo} title={item.name} />;
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
