import React, { useContext, useEffect, useState } from 'react';
import './CSS/ProfileUser.css';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
  const { url, token } = useContext(ShopContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const changePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }
    try {
      const response = await axios.put(
        `${url}/api/user/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        alert('Đổi mật khẩu thành công');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowChangePassword(false);
      } else {
        alert('Đổi mật khẩu thất bại: ' + response.data.message);
      }
    } catch (error) {
      console.log('Error changing password:', error);
      alert('Đã xảy ra lỗi khi đổi mật khẩu');
    }
  };

  const formattedDateOfBirth = new Date(user.dateOfBirth).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="user-profile-container">
      <div className="user-card-full">
        <div className="user-profile">
          <img
            src="https://img.icons8.com/bubbles/100/000000/user.png"
            className="profile-image"
            alt="User Profile"
          />
          <p>Khách hàng</p>
          <h6 className="profile-name">{user.name}</h6>
        </div>
        <div className="card-content">
          <h6 className="section-title">Thông tin cá nhân</h6>
          <div className="info-row">
            <div className="info-item">
              <p className="info-label">Email</p>
              <p className="info-value">{user.email}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Số điện thoại</p>
              <p className="info-value">{user.phone}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Giới tính</p>
              <p className="info-value">{user.gender}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Ngày sinh</p>
              <p className="info-value">{formattedDateOfBirth}</p>
            </div>
          </div>
          <div className="user-actions">
            <button
              className="action-button primary-button"
              onClick={() => navigate('/edit-profile')}
            >
              Cập nhật thông tin
            </button>
            <button
              className="action-button secondary-button"
              onClick={() => navigate('/myorders')}
            >
              Xem lịch sử giỏ hàng
            </button>
            <button
              className="action-button change-password-button"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              Đổi mật khẩu
            </button>
          </div>
          {showChangePassword && (
            <form onSubmit={changePassword} className={`change-password-form ${showChangePassword ? 'show-change-password' : ''}`}>
              <h3>Đổi mật khẩu</h3>
              <label>Mật khẩu hiện tại:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label>Xác nhận mật khẩu mới:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="save-button-pass">Xác nhận đổi mật khẩu</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
