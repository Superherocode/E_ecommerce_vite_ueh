import React, { createContext, useEffect, useState } from "react";
import axios from "axios"

// Tạo một context để chia sẻ thông tin liên quan đến giỏ hàng và sản phẩm trong toàn bộ ứng dụng.
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [favItems, setFavItems] = useState([]); // State lưu danh sách yêu thích

  // State lưu trữ số lượng sản phẩm trong giỏ hàng, ban đầu lấy từ hàm getDefaultCart.
  const [cartItems, setCartItems] = useState({})

  // URL của API backend
  const url = "http://localhost:4000"

  // State lưu trữ token (nếu có) của người dùng, dùng để xác thực với server.
  const [token, setToken] = useState("")

  // State lưu danh sách sản phẩm, lấy từ API khi tải trang.
  const [all_product, setProductList] = useState([])

  // Hàm thêm sản phẩm vào danh sách yêu thích
  const addToFavorites = async (itemId) => {
    if (!favItems[itemId]) {
      setFavItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setFavItems((prev) => ({ ...prev, [itemId]: 0 }))  // Cập nhật số lượng sản phẩm trong giỏ
    }
    console.log(favItems);  // In ra giỏ hàng hiện tại (có thể không phản ánh giá trị mới ngay do bất đồng bộ)
    console.log(favItems[itemId]);
    if (token) {
      await axios.post(url + "/api/product/addfavorite", { itemId }, { headers: { token } });
    }
  };

  const loadFavData = async (token) => {
    const response = await axios.post(url + "/api/product/getfavorite", {}, { headers: { token } })
    setFavItems(response.data.favData)
  }


  // Hàm thêm sản phẩm vào giỏ hàng dựa trên ID sản phẩm (itemId).
  const addToCart = async (itemId) => {

    if (!itemId) {
      console.error("Item ID is undefined or null");
      return;
    }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))  // Cập nhật số lượng sản phẩm trong giỏ

    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))  // Cập nhật số lượng sản phẩm trong giỏ
    }
    console.log(cartItems);  // In ra giỏ hàng hiện tại (có thể không phản ánh giá trị mới ngay do bất đồng bộ)
    console.log(cartItems[itemId]);
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  }

  // Hàm xóa bớt sản phẩm khỏi giỏ hàng dựa trên ID sản phẩm (itemId).
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))  // Giảm số lượng sản phẩm trong giỏ
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
    }
    console.log(cartItems);  // In ra giỏ hàng hiện tại
  }

  // Hàm tính tổng số tiền của các sản phẩm có trong giỏ hàng.
  const getTotalAmount = () => {
    let totalAmount = 0;
    // Duyệt qua từng sản phẩm trong giỏ hàng
    for (const item in cartItems) {
      if (cartItems[item] > 0) {  // Nếu số lượng sản phẩm > 0
        let itemInfo = all_product.find((product) => product._id === item)  // Tìm sản phẩm tương ứng trong danh sách
        // Kiểm tra nếu sản phẩm tồn tại
        totalAmount += itemInfo.new_price * cartItems[item];  // Cộng dồn giá sản phẩm vào tổng số tiền

      }
    }
    return totalAmount;  // Trả về tổng số tiền của giỏ hàng
  }

  // Hàm lấy danh sách sản phẩm từ API và cập nhật state all_product.
  const fetchProductList = async () => {
    try {
      const response = await axios.get(url + "/api/product/list");
      setProductList(response.data.data);  // Cập nhật danh sách sản phẩm vào state
    } catch (error) {
      console.error("Error fetching product list:", error);  // Xử lý lỗi nếu việc lấy sản phẩm thất bại
    }
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
    setCartItems(response.data.cartData)
  }

  // useEffect dùng để tải danh sách sản phẩm và token khi component này được render lần đầu tiên.
  useEffect(() => {
    console.log("Fetching product list...");
    async function loadData() {
      await fetchProductList();  // Lấy danh sách sản phẩm
      if (localStorage.getItem("token")) {  // Kiểm tra xem token có lưu trong localStorage không
        setToken(localStorage.getItem("token"));  // Cập nhật token nếu có
        await loadCartData(localStorage.getItem("token"));
        await loadFavData(localStorage.getItem("token"));
      }
    }
    loadData();  // Gọi hàm loadData khi component được mount
  }, [])  // useEffect chỉ chạy một lần khi component được render lần đầu

  // Hàm tính tổng số lượng sản phẩm có trong giỏ hàng.
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {  // Nếu sản phẩm có số lượng lớn hơn 0
        totalItem += cartItems[item];  // Cộng dồn số lượng sản phẩm vào tổng
      }
    }
    return totalItem;  // Trả về tổng số sản phẩm trong giỏ
  }

  // Tạo một object chứa tất cả các state và hàm cần thiết để chia sẻ với các component khác trong ứng dụng.
  const contextValue = {
    all_product,  // Danh sách sản phẩm
    url,  // URL của API
    cartItems,  // Danh sách sản phẩm trong giỏ hàng
    addToFavorites, // Hàm thêm vào danh sách yêu thích
    addToCart,  // Hàm thêm sản phẩm vào giỏ
    removeFromCart,  // Hàm xóa sản phẩm khỏi giỏ
    getTotalAmount,  // Hàm tính tổng số tiền giỏ hàng
    getTotalCartItems,  // Hàm tính tổng số sản phẩm trong giỏ hàng
    favItems, // Danh sách yêu thích
    token,  // Token của người dùng
    setToken  // Hàm để cập nhật token
  };

  // Trả về ShopContext.Provider để chia sẻ giá trị của contextValue với các component con.
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;




// // Hàm khởi tạo giỏ hàng mặc định với 10 sản phẩm, mỗi sản phẩm có số lượng ban đầu là 0.
// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < 10; index++) {
//     cart[index] = 0;  // Khởi tạo mỗi sản phẩm với số lượng 0
//   }
//   return cart;
// }