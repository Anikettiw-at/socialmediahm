import React from "react";
import { format } from "date-fns";

const Message = ({ ownMessage, message, time }) => {
  return (
    <div className={`flex flex-col w-full ${ownMessage ? "items-end" : "items-start"}`}>
      <span
        className={`max-w-[78%] px-4 py-2.5 text-[15px] leading-snug break-words whitespace-pre-wrap ${
          ownMessage
            ? "bg-gradient-to-br from-brand-600 to-fuchsia-500 text-white rounded-2xl rounded-br-md shadow-sm shadow-brand-500/20"
            : "bg-white text-slate-800 border border-slate-200/70 rounded-2xl rounded-bl-md"
        }`}
      >
        {message}
      </span>
      {time && (
        <span className="mt-1 px-1 text-[11px] text-slate-400">{format(new Date(time), "h:mm a")}</span>
      )}
    </div>
  );
};

export default Message;
