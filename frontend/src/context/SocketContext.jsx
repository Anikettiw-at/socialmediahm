import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserData } from "./UserContext";

// Agar Vercel me VITE_BACKEND_URL set hai toh wo uthayega, nahi toh local localhost:7000 le lega
const EndPoint = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = UserData();

  useEffect(() => {
    // Agar user logged in nahi hai toh socket connect karne ki zaroorat nahi hai
    if (!user?._id) return;

    const socketInstance = io(EndPoint, {
      query: {
        userId: user._id,
      },
    });

    setSocket(socketInstance);

    socketInstance.on("getOnlineUser", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      if (socketInstance) {
        socketInstance.close();
      }
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const SocketData = () => useContext(SocketContext);