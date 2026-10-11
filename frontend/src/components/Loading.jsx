import React from "react";

export const Loading = () => {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-brand-100" />
        <div className="absolute inset-0 rounded-full border-4 border-brand-600 border-t-transparent animate-spin" />
      </div>
      <p className="text-slate-400 font-medium text-sm animate-pulse">Loading…</p>
    </div>
  );
};

export const LoadingAnimation = () => {
  return (
    <div className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin align-middle"></div>
  );
};
