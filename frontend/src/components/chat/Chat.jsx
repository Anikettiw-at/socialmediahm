import React from "react";
import { UserData } from "../../context/UserContext";
import { BsSendCheck } from "react-icons/bs";

const Chat = ({ chat, setSelectedChat, isOnline }) => {
  const { user: loggedInUser } = UserData();
  
  if (!chat || !chat.users || chat.users.length === 0) return null;
  const user = chat.users[0];

  const latestText = chat.latestMessage?.text || "";
  const isOwnLatest = loggedInUser?._id === chat.latestMessage?.sender;

  return (
    <div
      onClick={() => setSelectedChat(chat)}
      className="w-full bg-white hover:bg-slate-50 border border-slate-100 p-3 rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-all active:scale-[0.99] group shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar with absolute pulse badge for online status */}
        <div className="relative shrink-0">
          <img
            src={user.profilePic?.url}
            alt=""
            className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </div>

        {/* User identification meta & message preview context */}
        <div className="min-w-0 flex flex-col gap-0.5">
          <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
            {user.name}
          </span>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
            {isOwnLatest && (
              <BsSendCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            )}
            <span className="truncate max-w-[150px]">
              {latestText ? (latestText.length > 18 ? `${latestText.slice(0, 18)}...` : latestText) : "No messages yet"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;