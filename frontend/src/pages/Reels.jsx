import React from "react";
import AddPost from "../components/AddPost";
import { PostData } from "../context/PostContext";
import ReelViewer from "../components/ReelViewer";
import { FaFilm } from "react-icons/fa6";
import { Loading } from "../components/Loading";

const Reels = () => {
  const { reels, loading } = PostData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="px-3 sm:px-4 py-5 sm:py-8 flex flex-col gap-6 items-center">
          <div className="w-full max-w-xl">
            <AddPost type="reel" />
          </div>

          {reels && reels.length > 0 ? (
            <ReelViewer reels={reels} />
          ) : (
            <div className="card w-full max-w-xl border-dashed py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <FaFilm className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No reels yet</h3>
              <p className="text-sm text-slate-500 mt-1">Be the first to upload a video!</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Reels;
