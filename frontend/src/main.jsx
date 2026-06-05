import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/UserContext.jsx";
import { PostContextProvider } from "./context/PostContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import axios from "axios"; // 1. Axios import kiya

// 2. Yeh line automatic check karegi ki aap local chala rahe ho ya deployed web par.
// Deployed version me VITE_BACKEND_URL kaam karega jo hum Vercel me daalenge.
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";
axios.defaults.withCredentials = true; // Taaki cookies sahi se pass ho sakein

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <PostContextProvider>
        <ChatContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ChatContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);