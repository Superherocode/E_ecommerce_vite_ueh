import React, { createContext, useEffect, useState } from "react";
import axios from "axios"

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart())
  const url = "http://localhost:4000"

  const [all_product, setProductList] = useState([])

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    console.log(cartItems);
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    console.log(cartItems);
  }

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product._id === Number(item))
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const fetchProductList = async () => {
    try {
      const response = await axios.get(url + "/api/product/list");
      console.log(response.data.data);  // Kiểm tra dữ liệu nhận được
      setProductList(response.data.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  }

  useEffect(() => {
    console.log("Fetching product list...");
    async function loadData() {
      await fetchProductList();
    }
    loadData();
  }, [])

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  }

  const contextValue = { all_product, url, cartItems, addToCart, removeFromCart, getTotalAmount, getTotalCartItems };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;