import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import {assets} from "../../assets/assets"

const Orders = ({url}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(url+"/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status: event.target.value,
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className='order add'>
      <h3>Trang sản phẩm</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return ( // Thêm return để trả về phần tử JSX
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quanity;
                    } else {
                      return item.name + " x " + item.quanity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.Name}</p>
                <p className="order-item-name">{order.address.email}</p>
                <div className='order-item-address'>
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+", "+order.address.country+", "+order.address.zipcode+", "+order.address.state}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Số lượng: {order.items.length}</p>
              <p>{order.amount},000 VNĐ</p>
              <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} >
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
              </select>
            </div>
          );
        })}
      </div>
      
    </div>
  )
}

export default Orders