// import userModel from "../models/userMobel.js";

// // add items to user cart
// const addToCart = async (req, res) => {
//   try {
    


//     // Tìm người dùng dựa trên ID
//     let userData = await userModel.findOne({ _id: req.body.userId });
//     console.log("User data:", userData); // Kiểm tra kết quả truy vấn
//     // Kiểm tra nếu không tìm thấy người dùng
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     let cartData = userData.cartData;
//     if (!cartData[req.body.itemId]) {
//       cartData[req.body.itemId] = 1;
//     }
//     else {
//       cartData[req.body.itemId] += 1;
//     }
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" })
//   }
// }

// // remove items from user cart 
// const removeFromCart = async (req, res) => {

// }

// // fetch user cart data 
// const getCart = async (req, res) => {

// }

// export { addToCart, removeFromCart, getCart }

import userModel from "../models/userMobel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const userId = req.user.id; // Lấy userId từ req.user được middleware gán vào
    const itemId = req.body.itemId; // Lấy itemId từ request body

    // Kiểm tra nếu không có itemId
    if (!itemId) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    // Tìm người dùng dựa trên userId
    let userData = await userModel.findById(userId);
    console.log("User data:", userData); // Kiểm tra kết quả truy vấn

    // Kiểm tra nếu không tìm thấy người dùng
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Lấy giỏ hàng của người dùng
    let cartData = userData.cartData || {}; // Đảm bảo cartData là một object

    // Kiểm tra nếu itemId đã tồn tại trong giỏ hàng
    if (!cartData[itemId]) {
      cartData[itemId] = 1; // Nếu không tồn tại thì thêm sản phẩm với số lượng 1
    } else {
      cartData[itemId] += 1; // Nếu đã tồn tại thì tăng số lượng
    }

    // Cập nhật giỏ hàng của người dùng
    await userModel.findByIdAndUpdate(userId, { cartData });

    // Trả về phản hồi thành công
    res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// remove items from user cart 
const removeFromCart = async (req, res) => {
  // Xử lý logic để xóa sản phẩm khỏi giỏ hàng
};

// fetch user cart data 
const getCart = async (req, res) => {
  // Xử lý logic để lấy dữ liệu giỏ hàng của người dùng
};

export { addToCart, removeFromCart, getCart };
