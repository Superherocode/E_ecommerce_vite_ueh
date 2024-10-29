import React, { useContext, useEffect, useState } from 'react';
import './CSS/PlaceOrder.css';
import { ShopContext } from "../Context/ShopContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalAmount, token, all_product, cartItems, url } = useContext(ShopContext);
  const navigate = useNavigate();

  // Đọc finalAmount từ localStorage hoặc sử dụng giá trị mặc định
  const [finalAmount, setFinalAmount] = useState(localStorage.getItem('finalAmount') || getTotalAmount() + 2);
  
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    all_product.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: finalAmount,
    };
  
    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        // Điều hướng về trang myorders
        navigate('/myorders');
        
        // Reload lại trang sau khi điều hướng thành công
        window.location.reload();
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      alert("Không thể hoàn tất đơn hàng");
    }
  };
  

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className="title">Thông tin vận chuyển</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Họ' />
          <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Tên' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Địa chỉ Email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Đường' />
        <div className="multi-fields">
          <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='Tỉnh / Thành phố' />
          <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='Phương thức giao hàng' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Quận' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại' />
      </div>
      <div className="place-order-right">
        <div className="cartitems-total">
          <h1>Tổng</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>${2}</p>
            </div>
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>${finalAmount}</p>
            </div>
          </div>
          <button type='submit'>Xác nhận thanh toán</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;



// import React, { useContext, useEffect, useState } from 'react'
// import './CSS/PlaceOrder.css'
// import { ShopContext } from "../Context/ShopContext"
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const PlaceOrder = () => {
//   const { getTotalAmount, token, all_product, cartItems, url } = useContext(ShopContext)

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   })

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({ ...data, [name]: value }))
//   }

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     all_product.map((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];

//         // Sử dụng new_price thay vì price
//         if (!item.new_price || isNaN(item.new_price)) {
//           console.error("Invalid price for item:", item);
//           return;
//         }

//         orderItems.push(itemInfo);
//       }
//     })
//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalAmount()+2,
//     }
//     console.log(getTotalAmount()+2);

//     let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
//     if (response.data.success) {
//       const { session_url } = response.data;
//       window.location.replace(session_url);
//     }
//     else {
//       console.log(response.data); // Xem chi tiết phản hồi lỗi
//       alert("Error");
//     }
//   }

//   const navigate = useNavigate()

//   useEffect(()=>{
//     if (!token) {
      
//       navigate('/cart')
//     }
//     else if(getTotalAmount()===0) {
      
//       navigate('/cart')
//     }
//   },[token])

//   return (
//     <form onSubmit={placeOrder} className='place-order'>
//       <div className='place-order-left'>
//         <p className="title">Thông tin vận chuyển</p>
//         <div className="multi-fields">
//           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Họ' />
//           <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Tên' />
//         </div>
//         <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Địa chỉ Email' />
//         <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Đường' />
//         <div className="multi-fields">
//           <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='Tỉnh / Thành phố' />
//           <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='Phương thức giao hàng' />
//         </div>
//         <div className="multi-fields">
//           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
//           <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Quận' />
//         </div>
//         <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại' />
//       </div>
//       <div className="place-order-right">
//         <div className="cartitems-total">
//           <h1>Tổng</h1>
//           <div>
//             <div className="cartitems-total-item">
//               <p>Subtotal</p>
//               <p>${getTotalAmount()}</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <p>Shipping Fee</p>
//               <p>{2}</p>
//             </div>
//             <div className="cartitems-total-item">
//               <p>Total</p>
//               <p>${getTotalAmount()}</p>
//             </div>
//           </div>
//           <button type='submit'>Xác nhận thanh toán</button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder
