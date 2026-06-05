import React from "react";

export const Loading = () => {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center bg-transparent gap-3">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-semibold text-xs tracking-wide animate-pulse uppercase">Loading Content...</p>
    </div>
  );
};

export const LoadingAnimation = () => {
  return (
    <div className="inline-block w-4 h-4 border-2 border-t-2 border-r-transparent border-current rounded-full animate-spin vertical-middle"></div>
  );
};