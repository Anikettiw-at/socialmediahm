import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowUp, FaArrowDownLong, FaFilm } from "react-icons/fa6";
import { Loading } from "../components/Loading";

const Reels = () => {
  const { reels, loading } = PostData();
  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index === 0) return null;
    setIndex(index - 1);
  };
  
  const nextReel = () => {
    if (index === reels.length - 1) return null;
    setIndex(index + 1);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-slate-50 py-6 px-4 flex flex-col gap-6 items-center">
          
          {/* Top Creation Box - Wrapped in modern glass container */}
          <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
            <AddPost type="reel" />
          </div>

          {/* Reels Main Display Window */}
          <div className="flex items-center justify-center gap-4 w-full max-w-xl mt-2">
            {reels && reels.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-3">
                <PostCard
                  key={reels[index]._id}
                  value={reels[index]}
                  type={"reel"}
                />
              </div>
            ) : (
              /* Minimal Empty State */
              <div className="w-full max-w-md bg-white rounded-2xl border border-dashed border-slate-200 py-16 text-center">
                <FaFilm className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-600">No reels yet</p>
                <p className="text-xs text-slate-400 mt-0.5">Be the first to upload a video!</p>
              </div>
            )}

            {/* Sidebar Navigation Buttons Stack */}
            {reels && reels.length > 0 && (
              <div className="flex flex-col justify-center items-center gap-4">
                <button
                  disabled={index === 0}
                  className={`p-4 rounded-full shadow-md transition-all ${
                    index === 0 
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50" 
                      : "bg-slate-800 text-white hover:bg-slate-950 hover:scale-105"
                  }`}
                  onClick={prevReel}
                >
                  <FaArrowUp className="w-4 h-4" />
                </button>

                <button
                  disabled={index === reels.length - 1}
                  className={`p-4 rounded-full shadow-md transition-all ${
                    index === reels.length - 1 
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50" 
                      : "bg-slate-800 text-white hover:bg-slate-950 hover:scale-105"
                  }`}
                  onClick={nextReel}
                >
                  <FaArrowDownLong className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </>
  );
};

export default Reels;