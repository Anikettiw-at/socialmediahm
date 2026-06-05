import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 din
    httpOnly: true,                  // XSS attack se safe rakhne ke liye
    secure: true,                    // 🔥 MUST HAI: Render HTTPS use karta hai, toh ise true hona hi chahiye
    sameSite: "none",                // 🔥 MUST HAI: Cross-origin (Vercel se Render) cookie allow karne ke liye
  });
};

export default generateToken;