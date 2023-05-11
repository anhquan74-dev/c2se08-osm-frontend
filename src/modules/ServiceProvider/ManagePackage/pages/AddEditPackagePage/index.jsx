import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './AddEditPackagePage.scss';

const AddEditPackagePage = () => {
  const { package_id } = useParams();
  const isEdit = Boolean(package_id);

  const [providerPackage, setProviderPackage] = useState({
    name: '',
    description: '',
    price: '',
    is_negotiable: true,
  });

  // call API
  useEffect(() => {
    if (!package_id) return;
    (async () => {
      try {
        // const res = await packageApi.get(package_id);
        // setProviderPackage(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { name, description, price, is_negotiable } = providerPackage;
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formValue = { ...providerPackage };
    if (providerPackage.is_negotiable) {
      formValue = { ...formValue, price: 0 };
    }
    console.log('Submit: ', formValue);
  };

  const handleChangePackage = (e) => {
    let { name, value } = e.target;
    if (name === 'is_negotiable') {
      value = e.target.checked;
    }

    setProviderPackage({
      ...providerPackage,
      [name]: value,
    });
    console.log(providerPackage);
  };

  return (
    <div className="add-edit-package container">
      <h2>{isEdit ? <>Sửa</> : <>Thêm</>} báo giá</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên dịch vụ</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleChangePackage}
            placeholder="Nhập tên dịch vụ"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Đơn giá</label>
          <input
            id="price"
            type="text"
            name="price"
            value={price}
            onChange={handleChangePackage}
            disabled={is_negotiable}
            placeholder="Nhập đơn giá"
          />
        </div>
        <div className="form-group1">
          <input
            id="is_negotiable"
            type="checkbox"
            name="is_negotiable"
            checked={is_negotiable}
            onChange={handleChangePackage}
          />
          <label htmlFor="is_negotiable">Thương lượng</label>
        </div>
        <div className="form-group">
          <label htmlFor="description">Thêm chi tiết (không bắt buộc)</label>
          <textarea value={description} name="description" onChange={handleChangePackage} rows="7" />
        </div>
        <button type="submit">
          <NavLink to="">Lưu</NavLink>
        </button>
      </form>
    </div>
  );
};

export default AddEditPackagePage;
