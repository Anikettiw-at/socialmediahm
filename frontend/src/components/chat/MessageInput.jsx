import React, { useState } from "react";
import { ChatData } from "../../context/ChatContext";
import toast from "react-hot-toast";
import axios from "axios";
import { IoSend } from "react-icons/io5";

const MessageInput = ({ setMessages, selectedChat }) => {
  const [textMsg, setTextMsg] = useState("");
  const { setChats } = ChatData();

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!textMsg.trim()) return;

    try {
      const { data } = await axios.post("/api/messages", {
        message: textMsg,
        recieverId: selectedChat.users[0]._id,
      });

      setMessages((message) => [...message, data]);
      setTextMsg("");
      setChats((prev) => {
        const updatedChat = prev.map((chat) => {
          if (chat._id === selectedChat._id) {
            return {
              ...chat,
              latestMessage: {
                text: textMsg,
                sender: data.sender,
              },
            };
          }
          return chat;
        });
        return updatedChat;
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-100">
      <form onSubmit={handleMessage} className="flex items-center gap-3 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
          value={textMsg}
          onChange={(e) => setTextMsg(e.target.value)}
          required
        />
        <button 
          type="submit" 
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center justify-center shrink-0 active:scale-95"
        >
          <IoSend className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;