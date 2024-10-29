import React, { useContext, useEffect, useState } from 'react';
import './CSS/ProfileUser.css';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext';

const ProfileUser = () => {
  const { url, token } = useContext(ShopContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
  });

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

  const formattedDateOfBirth = new Date(user.dateOfBirth).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="user-profile">
      <div className="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <p>Khách hàng</p>
                      <h6 className="f-w-600">{user.name}</h6>
                      <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Thông tin cá nhân</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">{user.email}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Số điện thoại</p>
                          <h6 className="text-muted f-w-400">{user.phone}</h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Giới tính</p>
                          <h6 className="text-muted f-w-400">{user.gender}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Ngày sinh</p>
                          <h6 className="text-muted f-w-400">{formattedDateOfBirth}</h6>
                        </div>
                      </div>
                      <div className="user-actions m-t-20">
                        <button
                          className="btn btn-primary"
                          onClick={() => alert('Chức năng cập nhật thông tin đang phát triển')}
                        >
                          Cập nhật thông tin
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => alert('Chức năng xem lịch sử giỏ hàng đang phát triển')}
                        >
                          Xem lịch sử giỏ hàng
                        </button>
                      </div>
                      <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a href="#!" className="facebook">
                            <i className="mdi mdi-facebook feather icon-facebook" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!" className="twitter">
                            <i className="mdi mdi-twitter feather icon-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!" className="instagram">
                            <i className="mdi mdi-instagram feather icon-instagram" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;




// import React, { useContext, useEffect, useState } from 'react';
// import './CSS/ProfileUser.css';
// import axios from 'axios';
// import { ShopContext } from '../Context/ShopContext';


// const ProfileUser = () => {
//   const { url, token } = useContext(ShopContext);
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     dateOfBirth: '',
//     gender: '',
//   });

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`${url}/api/user/profile`, {
//         headers: { token }
//       });
//       if (response.data.success) {
//         setUser(response.data.data);
//       } else {
//         console.log('Failed to fetch user data:', response.data.message);
//       }
//     } catch (error) {
//       console.log('Error fetching user data:', error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchUserData();
//     }
//   }, [token]);

//   const formattedDateOfBirth = new Date(user.dateOfBirth).toLocaleDateString('vi-VN', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit'
//   });

//   return (
//     <div className="user-profile">
//       <div className="user-card">
//         <div className="user-avatar">
//           <img src="https://via.placeholder.com/150" alt="User Avatar" />
//         </div>
//         <div className="user-details">
//           <h2>{user.name}</h2>
//           <p><strong>Giới tính:</strong> {user.gender}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Số điện thoại:</strong> {user.phone}</p>
//           <p><strong>Ngày sinh:</strong> {formattedDateOfBirth}</p>
//         </div>
//         <div className="user-actions">
//           <button className="edit-button" onClick={() => alert('Chức năng đang phát triển')}>
//              Cập nhật thông tin
//           </button>
//           <button className="history-button" onClick={() => alert('Chức năng đang phát triển')}>
//             Xem lịch sử đơn hàng
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileUser;
