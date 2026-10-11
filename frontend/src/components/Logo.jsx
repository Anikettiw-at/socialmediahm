import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ compact = false, light = false }) => {
  return (
    <Link to="/" className="flex items-center gap-2.5 select-none">
      <span className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 shadow-md shadow-brand-500/30 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
          <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
        </svg>
      </span>
      {!compact && (
        <span
          className={`text-xl font-extrabold tracking-tight ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          Social<span className={light ? "" : "text-gradient"}>HM</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
