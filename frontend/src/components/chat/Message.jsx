import React from "react";

const Message = ({ ownMessage, message }) => {
  return (
    <div className={`flex w-full mb-1 ${ownMessage ? "justify-end" : "justify-start"}`}>
      <span
        className={`max-w-[75%] px-4 py-2.5 text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)] break-words ${
          ownMessage 
            ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm" 
            : "bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm"
        }`}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;