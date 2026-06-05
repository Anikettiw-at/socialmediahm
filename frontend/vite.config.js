import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // Agar local run kar rahe ho toh localhost, nahi toh production me ye bypass ho jayega
        target: "http://localhost:7000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});