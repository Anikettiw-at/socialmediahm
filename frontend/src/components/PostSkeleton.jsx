import React from "react";

// Placeholder card shown while the feed is loading
const PostSkeleton = () => {
  return (
    <div className="card w-full overflow-hidden animate-pulse">
      <div className="flex items-center gap-3 px-5 pt-4">
        <div className="w-10 h-10 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-32 rounded bg-slate-200" />
          <div className="h-2.5 w-20 rounded bg-slate-100" />
        </div>
      </div>
      <div className="px-5 py-4 space-y-2">
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-2/3 rounded bg-slate-100" />
      </div>
      <div className="h-72 bg-slate-200" />
      <div className="flex gap-3 px-5 py-4">
        <div className="h-6 w-6 rounded-full bg-slate-200" />
        <div className="h-6 w-6 rounded-full bg-slate-200" />
      </div>
    </div>
  );
};

export default PostSkeleton;
