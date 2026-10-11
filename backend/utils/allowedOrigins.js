// Sirf in frontends ko cookies ke saath API aur socket use karne ki permission hai.
// Naya domain add karna ho toh CLIENT_URL env me comma-separated daal do.
const defaultOrigins = [
  "http://localhost:5173", // local vite frontend
  "http://localhost:3000",
  "https://socialmediahm.vercel.app",
];

// Function hai (constant nahi) kyunki ES module imports dotenv.config() se pehle chal jate hain
const getAllowedOrigins = () => [
  ...defaultOrigins,
  ...(process.env.CLIENT_URL || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),
];

export const corsOrigin = (origin, callback) => {
  // origin undefined hota hai same-origin, curl/Postman aur server-to-server requests me
  if (!origin || getAllowedOrigins().includes(origin)) return callback(null, true);
  callback(new Error("Not allowed by CORS"));
};
