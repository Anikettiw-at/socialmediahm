import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

// Shared modal for followers / followings / likes lists
const UserListModal = ({ title, users, onClose, emptyText, children }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-surface w-full sm:w-[380px] rounded-t-3xl sm:rounded-2xl shadow-lift max-h-[75vh] sm:max-h-[460px] flex flex-col animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-all"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        <div className="scroll-thin flex-1 overflow-y-auto p-2">
          {children ||
            (users && users.length > 0 ? (
              users.map((e, i) => (
                <Link
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                  to={`/user/${e?._id}`}
                  key={e?._id || i}
                  onClick={onClose}
                >
                  <img className="w-10 h-10 rounded-full object-cover" src={e?.profilePic?.url} alt="" />
                  <span className="text-sm font-semibold text-slate-800 truncate">{e?.name}</span>
                </Link>
              ))
            ) : (
              <p className="text-center text-sm text-slate-400 py-10">{emptyText}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
