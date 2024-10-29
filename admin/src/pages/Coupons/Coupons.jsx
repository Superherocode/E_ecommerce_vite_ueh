import React, { useEffect, useState } from 'react';
import './Coupons.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Coupons = ({ url }) => {

  const [coupons, setListCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
    discountType: "percent",
    expiryDate: "",
    minPurchase: 0,
    usageLimit: 1,
  });

  const fetchListCoupon = async () => {
    try {
      const response = await axios.get(`${url}/api/coupons/list`);
      if (response.data.success) {
        setListCoupons(response.data.data);
      } else {
        toast.error('Không lấy mã giảm giá được');
      }
    } catch (error) {
      toast.error(`Lỗi kết nối: ${error.message}`);
    }
  };

  const handleAddCoupon = async () => {
    try {
      const response = await axios.post(`${url}/api/coupons/add`, newCoupon);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchListCoupon();
        setNewCoupon({
          code: "",
          discount: 0,
          discountType: "percent",
          expiryDate: "",
          minPurchase: 0,
          usageLimit: 1,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(`Lỗi khi thêm mã giảm giá: ${error.message}`);
    }
  };

  const handleRemoveCoupon = async (couponId) => {
    try {
      const response = await axios.delete(`${url}/api/coupons/remove/${couponId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchListCoupon();
      } else {
        toast.error('Không thể xóa mã giảm giá');
      }
    } catch (error) {
      toast.error(`Lỗi khi xóa mã giảm giá: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({ ...newCoupon, [name]: value });
  };

  useEffect(() => {
    fetchListCoupon();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="coupons">
      <div className="coupon-manager">
        <h1>Quản Lý Mã Giảm Giá</h1>
        
        {/* Form Thêm mã giảm giá */}
        <div className="add-coupon-form">
          <h2>Thêm Mã Giảm Giá Mới</h2>
          <p>Nhập mã code</p>
          <input type="text" name="code" placeholder="Mã" value={newCoupon.code} onChange={handleInputChange} />
          <p>Nhập giá trị giảm giá</p>
          <input type="number" name="discount" placeholder="Giá trị giảm" value={newCoupon.discount} onChange={handleInputChange} />
          <p>Đơn vị giảm giá</p>
          <select name="discountType" value={newCoupon.discountType} onChange={handleInputChange}>
            <option value="percent">Phần trăm</option>
            <option value="fixed">Số tiền cố định</option>
          </select>
          <p>Ngày hết hạn</p>
          <input type="date" name="expiryDate" value={newCoupon.expiryDate} onChange={handleInputChange} />
          <p>Mức chi tiêu tối thiểu</p>
          <input type="number" name="minPurchase" placeholder="Mức chi tiêu tối thiểu" value={newCoupon.minPurchase} onChange={handleInputChange} />
          <p>Số lần sử dụng</p>
          <input type="number" name="usageLimit" placeholder="Số lần sử dụng" value={newCoupon.usageLimit} onChange={handleInputChange} />
          <button onClick={handleAddCoupon}>Thêm Mã</button>
        </div>

        {/* Danh sách mã giảm giá */}
        <div className="coupon-list">
          <h2>Danh Sách Mã Giảm Giá</h2>
          <table>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Giá trị</th>
                <th>Loại</th>
                <th>Ngày hết hạn</th>
                <th>Chi tiêu tối thiểu</th>
                <th>Số lần sử dụng</th>
                <th>Số lượng đã dùng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon._id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}</td>
                  <td>{coupon.discountType === "percent" ? "%" : "VND"}</td>
                  <td>{formatDate(coupon.expiryDate)}</td>
                  <td>{coupon.minPurchase}</td>
                  <td>{coupon.usageLimit}</td>
                  <td>{coupon.usedCount}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleRemoveCoupon(coupon._id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
