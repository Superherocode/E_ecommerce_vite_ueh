
import productModel from "../models/productModel.js";
import fs from 'fs'
import userModel from "../models/userMobel.js";

// Admin
// add product item
const addProduct = async (req, res) => {

  // Kiểm tra nếu file không được upload
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  let image_filename = `${req.file.filename}`;

  const product = new productModel({
    name: req.body.name,
    description: req.body.description,
    image: image_filename,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price
  })
  try {
    await product.save();
    res.json({ success: true, message: "Product Added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

// all product list
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Errot" })
  }
}

// remove product item
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);
    fs.unlink(`uploads/${product.image}`, () => { })

    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Remove" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// User
const addFavorite = async (req, res) => {
  try {
    // Tìm người dùng theo ID
    let userData = await userModel.findById(req.body.userId);
    let favData = userData.favData;

    // Kiểm tra nếu sản phẩm đã có trong danh sách yêu thích
    if (!favData[req.body.itemId]) {
      favData[req.body.itemId] = 1;
    }
    else {
      favData[req.body.itemId] = 0;
      
    }
    
    // Gửi phản hồi thành công sau khi cập nhật xong
    res.json({
      success: true,
      message: favData[req.body.itemId] === 1
        ? "Product added to favorites"
        : "Product removed from favorites"
    });

    await userModel.findByIdAndUpdate(req.body.userId, { favData });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding to favorites" });
  }
};

// fetch user Favorite 
const getFav = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let favData = await userData.favData;
    res.json({success: true, favData})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}


export { addProduct, listProduct, removeProduct, addFavorite, getFav }