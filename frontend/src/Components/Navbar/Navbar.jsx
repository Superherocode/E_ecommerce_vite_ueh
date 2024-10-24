import React, { useContext, useState } from "react";
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";


import logo from '../Assets/Logo_UEH_xanh.png'
import vector1 from '../Assets/Vector_1.png'
import vector2 from '../Assets/Vector_2.png'
import vector3 from '../Assets/Vector_3.png'
import vector4 from '../Assets/Vector_4.png'
import vector5 from '../Assets/Vector_5.png'
import vector from '../Assets/Vector.png'
import { ShopContext } from "../../Context/ShopContext";
import { assets } from "../Assets/Assets_food/assets";



const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems, token, setToken} = useContext(ShopContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
  return (
    <div className="navbar">
    <div className="navbar1">
      <div className="navbar1-contact">
        <div>
          <img src={vector} alt="" />
          <span>Hotline: 028 7306 1976</span>
        </div>
        <div>
          <img src={vector1} alt="" />
          <span>Email: shop@ueh.edu.vn</span>
        </div>
      </div>
      <div>
        <span>Khuyến Mãi Mùa Thu Giảm Giá</span>
        <span> 50%.</span>
      </div>
      <div className="navbar1-3">
        <img src={vector5} alt="" />
        <span>Tiếng Việt</span>
      </div>
    </div>

    <div className="navbar2">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <div className="nav-tong">
        <ul className="nav-menu">
          <li onClick={() => setMenu("shop")} className={menu === "shop" ? "active" : ""}><Link to="/">Trang chủ</Link></li>
          <li onClick={() => setMenu("gioithieu")} className={menu === "gioithieu" ? "active" : ""}><Link to='/gioithieu'>Giới thiệu</Link></li>
          <li onClick={() => setMenu("sanpham")} className={menu === "sanpham" ? "active" : ""}>
            <div>
              <Link to='/sanpham'><span>Sản phẩm </span></Link>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </li>
          <li onClick={() => setMenu("khuyenmai")} className={menu === "khuyenmai" ? "active" : ""}><Link to='/khuyenmai'>Khuyễn mãi</Link></li>
          <li onClick={() => setMenu("tintuc")} className={menu === "tintuc" ? "active" : ""}><Link to='/tintuc'>Tin tức</Link></li>
          
          {/* <li onClick={() => setMenu("taikhoan")} className={menu === "taikhoan" ? "active" : ""}><Link to='/taikhoan'>Tài khoản</Link></li> */}
          {!token?<li onClick={() => setShowLogin(true)} className="px-3 py-2 text-xs font-medium text-center text-black bg-[#D36F31] rounded-lg hover:bg-[#8c4b23] ">Sign in</li>
          :<div className="navbar-profile">
             <img src={assets.profile_icon} alt="" />
             <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><span>Đơn hàng</span></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" />Đăng xuất</li>
             </ul>
            </div>}
          
        </ul>
        <div className="nav-icon">
          <button ></button>
          <img src={vector2} alt="" />
          <img src={vector3} alt="" />
          <div className="nav-count1">0</div>
          <Link to='/cart'><img src={vector4} alt="" /></Link>
          <div className="nav-count2">{getTotalCartItems()}</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Navbar