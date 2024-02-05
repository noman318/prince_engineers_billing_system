import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  // console.log("token", token);
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded);
    req.user = await User.findById(decoded.userId).select("-password");
    // console.log("req.userInMiddleware", req.user);
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized as an Admin" });
  }
};

export { protect, admin };
