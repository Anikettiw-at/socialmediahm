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
    <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
      <form onSubmit={handleMessage} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message…"
          className="input rounded-full py-3 px-5"
          value={textMsg}
          onChange={(e) => setTextMsg(e.target.value)}
          required
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!textMsg.trim()}
          className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-brand-600 to-fuchsia-500 text-white shadow-md shadow-brand-500/30 flex items-center justify-center transition-all hover:brightness-110 active:scale-90 disabled:opacity-40"
        >
          <IoSend className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;