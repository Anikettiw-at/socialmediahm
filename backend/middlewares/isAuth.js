import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Please Login" });

  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SEC);
  } catch (error) {
    // Invalid ya expired token client ki problem hai, server error nahi
    return res.status(401).json({ message: "Session expired, please login" });
  }

  try {
    req.user = await User.findById(decodedData.id);

    if (!req.user) return res.status(401).json({ message: "Please Login" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
