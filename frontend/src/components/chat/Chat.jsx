import React from "react";
import { UserData } from "../../context/UserContext";

const Chat = ({ chat, setSelectedChat, isOnline, isSelected }) => {
  const { user: loggedInUser } = UserData();

  if (!chat || !chat.users || chat.users.length === 0) return null;
  const user = chat.users[0];

  const latestText = chat.latestMessage?.text || "";
  const isOwnLatest = loggedInUser?._id === chat.latestMessage?.sender;

  return (
    <button
      onClick={() => setSelectedChat(chat)}
      className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors ${
        isSelected ? "bg-brand-50" : "hover:bg-slate-50"
      }`}
    >
      <div className="relative shrink-0">
        <img src={user.profilePic?.url} alt="" className="w-12 h-12 rounded-full object-cover" />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className={`text-sm font-bold truncate ${isSelected ? "text-brand-700" : "text-slate-900"}`}>
          {user.name}
        </p>
        <p className="text-xs text-slate-500 truncate">
          {isOwnLatest && <span className="text-slate-400">You: </span>}
          {latestText || "No messages yet"}
        </p>
      </div>
    </button>
  );
};

export default Chat;
