import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "./UserContext";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { user } = UserData();

  // Logout ya account switch pe pichle user ki chats/open conversation na dikhe
  useEffect(() => {
    setChats([]);
    setSelectedChat(null);
  }, [user?._id]);

  async function createChat(id) {
    try {
      const { data } = await axios.post("/api/messages", {
        recieverId: id,
        message: "hii",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  }
  return (
    <ChatContext.Provider
      value={{ createChat, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
