import React, { useEffect, useRef, useState } from "react";
import { UserData } from "../../context/UserContext";
import axios from "axios";
import { LoadingAnimation } from "../Loading";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { SocketData } from "../../context/SocketContext";

const MessageContainer = ({ selectedChat, setChats }) => {
  const [messages, setMessages] = useState([]);
  const { user } = UserData();
  const [loading, setLoading] = useState(false);
  const { socket } = SocketData();
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      if (selectedChat?._id === message.chatId) {
        setMessages((prev) => [...prev, message]);
      }

      setChats((prev) => {
        return prev.map((chat) => {
          if (chat._id === message.chatId) {
            return {
              ...chat,
              latestMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return chat;
        });
      });
    });

    return () => socket.off("newMessage");
  }, [socket, selectedChat?._id, setChats]);

  async function fetchMessages() {
    if (!selectedChat?.users?.[0]?._id) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        "/api/messages/" + selectedChat.users[0]._id
      );
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat?._id]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedChat) return null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex w-full h-16 items-center gap-3 px-4 border-b border-slate-100 bg-white shrink-0">
        <img
          src={selectedChat.users[0]?.profilePic?.url}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50"
          alt=""
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-800">{selectedChat.users[0]?.name}</span>
          <span className="text-[11px] text-slate-400 font-medium">Direct Message</span>
        </div>
      </div>

      {/* Messages Stream Wrapper */}
      <div className="flex-1 relative flex flex-col bg-slate-50/40 min-h-0">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10">
            <LoadingAnimation />
          </div>
        ) : (
          <div
            ref={messageContainerRef}
            className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto"
          >
            {messages && messages.length > 0 ? (
              messages.map((e) => (
                <Message
                  key={e._id}
                  message={e.text}
                  ownMessage={e.sender === user?._id}
                />
              ))
            ) : (
              <div className="my-auto text-center py-8">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">No Messages Yet</p>
                <p className="text-xs text-slate-400 mt-1">Say hello to start the conversation!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Tray Anchor */}
      <div className="shrink-0">
        <MessageInput
          setMessages={setMessages}
          selectedChat={selectedChat}
        />
      </div>
    </div>
  );
};

export default MessageContainer;