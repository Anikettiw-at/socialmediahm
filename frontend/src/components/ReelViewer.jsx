import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import PostCard from "./PostCard";

// One reel at a time with up/down controls (used on Reels + profile pages)
const ReelViewer = ({ reels }) => {
  const [index, setIndex] = useState(0);

  if (!reels || reels.length === 0) return null;

  const current = Math.min(index, reels.length - 1);
  const isFirst = current === 0;
  const isLast = current === reels.length - 1;

  const navBtn =
    "w-11 h-11 rounded-full flex items-center justify-center shadow-soft transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white text-slate-700 hover:bg-brand-600 hover:text-white disabled:hover:bg-white disabled:hover:text-slate-700";

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
      <div className="w-full max-w-sm">
        <PostCard key={reels[current]._id} value={reels[current]} type={"reel"} />
      </div>

      <div className="flex flex-col items-center gap-3">
        <button disabled={isFirst} onClick={() => setIndex(current - 1)} className={navBtn} aria-label="Previous reel">
          <FaChevronUp />
        </button>
        <span className="text-xs font-semibold text-slate-400">
          {current + 1}/{reels.length}
        </span>
        <button disabled={isLast} onClick={() => setIndex(current + 1)} className={navBtn} aria-label="Next reel">
          <FaChevronDown />
        </button>
      </div>
    </div>
  );
};

export default ReelViewer;
