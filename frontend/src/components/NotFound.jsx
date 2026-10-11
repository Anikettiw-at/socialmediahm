import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="card text-center max-w-sm w-full p-8 animate-popIn">
        <p className="text-7xl font-extrabold text-gradient tracking-tight">404</p>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight">Page not found</h1>
        <p className="mt-2 text-slate-500 text-sm leading-relaxed">
          Sorry, the page you are looking for isn't available or has been moved.
        </p>
        <button onClick={() => navigate("/")} className="btn-primary w-full mt-6 py-3">
          Back to home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
