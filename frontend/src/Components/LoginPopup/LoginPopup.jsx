import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import cart_cross_icon from "../Assets/cart_cross_icon.png"
import { ShopContext } from '../../Context/ShopContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    const {url} = useContext(ShopContext)

    const [currState, setCurrState] = useState("Login")
    const [data,setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const onLogin = async (event) => {
        event.prevenDefault()
        let newUrl = url;
        if (currState==="Login") {
            newUrl += "/api/user/login"
        }else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if (reponsive.data.success) {
            
        }
    }

    useEffect(()=>{
        console.log(data);
    },[data])

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={cart_cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input onChange={onChangHandler} name='name' value={data.name} type="text" placeholder="Your name" required />}
                    <input name="email" type="email" onChange={onChangHandler} value={data.email} placeholder="Your email" required className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>
                    <input name="password" type="password" onChange={onChangHandler} value={data.password} placeholder="Password" required className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>
                </div>
                <button type='submit' >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>

    )
}

export default LoginPopup