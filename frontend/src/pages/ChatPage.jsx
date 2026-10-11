import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatData } from "../context/ChatContext";
import axios from "axios";
import { IoSearchOutline, IoClose, IoCreateOutline, IoChatbubblesOutline } from "react-icons/io5";
import Chat from "../components/chat/Chat";
import MessageContainer from "../components/chat/MessageContainer";
import { SocketData } from "../context/SocketContext";

const ChatPage = ({ user }) => {
  const { createChat, selectedChat, setSelectedChat, chats, setChats } =
    ChatData();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const location = useLocation();

  async function fetchAllUsers() {
    try {
      const { data } = await axios.get("/api/user/all?search=" + query);

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    if (search) fetchAllUsers();
  }, [query, search]);

  async function createNewChat(id) {
    const existing = chats.find((c) => c.users?.[0]?._id === id);
    if (existing) {
      setSelectedChat(existing);
      setSearch(false);
      return;
    }
    await createChat(id);
    setSearch(false);
    const data = await getAllChats();
    const created = data.find((c) => c.users?.[0]?._id === id);
    if (created) setSelectedChat(created);
  }

  useEffect(() => {
    (async () => {
      const data = await getAllChats();
      // Opened from a profile's "Message" button
      const targetId = location.state?.userId;
      if (!targetId) return;
      const existing = data.find((c) => c.users?.[0]?._id === targetId);
      if (existing) setSelectedChat(existing);
      else await createNewChat(targetId);
    })();
  }, []);

  const { onlineUsers } = SocketData();

  return (
    <div className="md:p-4 lg:p-6">
      <div className="card rounded-none md:rounded-2xl border-x-0 md:border-x overflow-hidden flex h-[calc(100dvh-8.5rem)] md:h-[calc(100dvh-2rem)] lg:h-[calc(100dvh-3rem)] max-w-5xl mx-auto">
        {/* CONVERSATIONS LIST */}
        <aside
          className={`w-full md:w-80 shrink-0 border-r border-slate-100 flex-col ${
            selectedChat ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="px-4 pt-4 pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-extrabold text-slate-900">Messages</h1>
              <button
                onClick={() => {
                  setSearch(!search);
                  setQuery("");
                }}
                aria-label={search ? "Close search" : "New message"}
                className="w-9 h-9 rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100 flex items-center justify-center transition-colors"
              >
                {search ? <IoClose className="w-5 h-5" /> : <IoCreateOutline className="w-5 h-5" />}
              </button>
            </div>
            {search && (
              <div className="relative animate-fadeIn">
                <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  className="input py-2.5 pl-10"
                  placeholder="Search people…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="scroll-thin flex-1 overflow-y-auto p-2">
            {search ? (
              users && users.length > 0 ? (
                users.map((e) => (
                  <button
                    key={e._id}
                    onClick={() => createNewChat(e._id)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <img src={e.profilePic?.url} className="w-11 h-11 rounded-full object-cover" alt="" />
                    <span className="text-sm font-semibold text-slate-800 truncate">{e.name}</span>
                  </button>
                ))
              ) : (
                <p className="text-center text-sm text-slate-400 py-10">No users found</p>
              )
            ) : chats.length > 0 ? (
              chats.map((e) => (
                <Chat
                  key={e._id}
                  chat={e}
                  setSelectedChat={setSelectedChat}
                  isSelected={selectedChat?._id === e._id}
                  isOnline={onlineUsers.includes(e.users[0]?._id)}
                />
              ))
            ) : (
              <div className="text-center py-12 px-6">
                <p className="text-sm font-semibold text-slate-700">No conversations yet</p>
                <p className="text-xs text-slate-400 mt-1">Tap the pencil icon to start chatting.</p>
              </div>
            )}
          </div>
        </aside>

        {/* CONVERSATION */}
        <section className={`flex-1 min-w-0 ${selectedChat ? "flex" : "hidden md:flex"} flex-col`}>
          {selectedChat === null ? (
            <div className="m-auto text-center px-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30">
                <IoChatbubblesOutline className="w-9 h-9" />
              </div>
              <h2 className="mt-5 text-xl font-extrabold text-slate-900">Hello, {user.name?.split(" ")[0]} 👋</h2>
              <p className="mt-1 text-sm text-slate-500">Select a conversation to start messaging.</p>
            </div>
          ) : (
            <MessageContainer
              selectedChat={selectedChat}
              setChats={setChats}
              isOnline={onlineUsers.includes(selectedChat.users[0]?._id)}
              onBack={() => setSelectedChat(null)}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default ChatPage;
