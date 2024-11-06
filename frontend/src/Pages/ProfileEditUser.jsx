import React, { useContext, useEffect, useState } from 'react';
import './CSS/ProfileEditUser.css';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProfileEditUser = () => {
  const { url, token } = useContext(ShopContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/profile`, {
        headers: { token },
      });
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.log('Failed to fetch user data:', response.data.message);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/user/update`,
        {
          id: user._id,
          ...user,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        alert('Cập nhật thông tin thành công');
        navigate('/profile');
      } else {
        alert('Cập nhật thất bại: ' + response.data.message);
      }
    } catch (error) {
      console.log('Error updating user:', error);
      alert('Đã xảy ra lỗi khi cập nhật thông tin');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Chỉnh sửa thông tin cá nhân</h2>
      <form onSubmit={saveChanges} className="edit-profile-form">
        <label>
          Họ và tên:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label>
          Số điện thoại:
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label>
          Ngày sinh:
          <input
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label>
          Giới tính:
          <select
            name="gender"
            value={user.gender}
            onChange={onChangeHandler}
            required
          >
            <option value="nam">Nam</option>
            <option value="nữ">Nữ</option>
            <option value="khác">Khác</option>
          </select>
        </label>
        <button type="submit" className="save-button">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default ProfileEditUser;
