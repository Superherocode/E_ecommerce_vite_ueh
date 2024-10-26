// import jwt from "jsonwebtoken"

// const authMiddleware = async (req,res,next) => {
//   const {token} = req.headers;
//   if (!token) {
//     return res.json({success:false, message: "Not Authorized Login Agin"})
//   }
//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id;
//     console.log(req.body.userId); // Kiểm tra giá trị userId
    
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({success:false, message:"Error"})
//   }

// }

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Lấy token từ Authorization header với định dạng "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Tách token khỏi từ "Bearer"

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode); // Log thông tin đã giải mã token
    
    // Kiểm tra nếu token không có id
    if (!token_decode || !token_decode.id) {
      return res.status(403).json({ success: false, message: "Invalid Token" });
    }

    req.user = { id: token_decode.id }; // Gán userId vào req.user thay vì req.body
    console.log("UserId from token:", req.user.id); // Kiểm tra giá trị userId
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    return res.status(403).json({ success: false, message: "Invalid or Expired Token" });
  }
};

export default authMiddleware;

