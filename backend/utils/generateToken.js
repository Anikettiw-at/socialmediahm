import jwt from "jsonwebtoken";

// Same options set karne aur clear karne dono me use honge,
// warna browser purani cookie delete nahi karta (secure + sameSite match hona chahiye)
export const cookieOptions = {
  httpOnly: true, // XSS attack se safe rakhne ke liye
  secure: true, // Render HTTPS use karta hai, sameSite "none" ke saath secure zaroori hai
  sameSite: "none", // Cross-origin (Vercel se Render) cookie allow karne ke liye
};

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    ...cookieOptions,
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 din
  });
};

export default generateToken;
