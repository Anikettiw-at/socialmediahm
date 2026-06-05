import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ value, title, setShow }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 w-[340px] max-h-[400px] overflow-hidden flex flex-col relative">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h1>
          <button
            onClick={() => setShow(false)}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 w-8 h-8 rounded-xl flex items-center justify-center transition-all text-2xl absolute top-3 right-3"
          >
            &times;
          </button>
        </div>

        {/* LIST CONTAINER (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto space-y-2 mt-4 pr-1">
          {value && value.length > 0 ? (
            value.map((e, i) => (
              <Link
                className="w-full bg-slate-50 hover:bg-blue-50/50 border border-slate-100 p-3 rounded-xl flex items-center gap-3 transition-all active:scale-[0.99]"
                to={`/user/${e?._id}`}
                key={e?._id || i}
                onClick={() => setShow(false)}
              >
                <span className="text-xs font-bold text-slate-400 w-4 text-center">{i + 1}</span>
                <img
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100/80"
                  src={e?.profilePic?.url}
                  alt=""
                />
                <span className="text-sm font-semibold text-slate-700 truncate">{e?.name}</span>
              </Link>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-sm font-medium text-slate-400">No {title?.toLowerCase()} yet</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Modal;