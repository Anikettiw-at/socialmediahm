import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="flex flex-col space-y-5 text-center max-w-sm w-full bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="text-blue-600 text-sm font-bold tracking-wider uppercase">404 Error</div>
        <div className="text-3xl font-extrabold text-slate-800 tracking-tight">Page not found</div>
        <div className="text-slate-400 text-sm leading-relaxed">
          Sorry, the page you are looking for isn't available or has been moved.
        </div>
        <div className="flex items-center justify-center pt-2">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all text-sm"
          >
            Visit Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;