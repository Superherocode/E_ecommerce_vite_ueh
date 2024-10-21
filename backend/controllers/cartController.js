import userModel from "../models/userMobel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    // Tìm người dùng dựa trên ID
    let userData = await userModel.findOne({ _id: req.body.userId });

    // Kiểm tra nếu không tìm thấy người dùng
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    }
    else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// remove items from user cart 
const removeFromCart = async (req, res) => {

}

// fetch user cart data 
const getCart = async (req, res) => {

}

export { addToCart, removeFromCart, getCart }