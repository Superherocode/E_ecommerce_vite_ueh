import React, { useContext, useEffect } from 'react'
import './CSS/Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url} = useContext(ShopContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
      const response = await axios.post(url+"/api/order/verify", {success, orderId});
      if (response.data.success) {
          navigate("/myorders");
      }
      else {
        console.log("false");
        navigate("/")
      }
  }

  useEffect(()=>{
    verifyPayment();
  },[])


  return (
    <div className='verify'>
      <div className="spinner">
      </div>
      
    </div>
  )
}

export default Verify