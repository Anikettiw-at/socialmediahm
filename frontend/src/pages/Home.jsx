import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";
import { FaRegNewspaper } from "react-icons/fa6";

const Home = () => {
  const { posts, loading } = PostData();
  
  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      {loading ? (
        <Loading />
      ) : (
        /* Responsive Grid Setup: Centered feed with subtle bounds */
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          
          {/* TOP SECTION: Add Post Box Wrapping */}
          <div className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
            <AddPost type="post" />
          </div>

          {/* DYNAMIC TIMELINE FEED HEADER */}
          <div className="flex items-center gap-2 px-1 mt-2">
            <FaRegNewspaper className="w-4 h-4 text-slate-500" />
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Feed</h2>
            <div className="flex-1 h-[1px] bg-slate-200/60 ml-2"></div>
          </div>

          {/* MAIN POSTS STREAM */}
          <div className="w-full flex flex-col gap-6 items-center">
            {posts && posts.length > 0 ? (
              posts.map((e) => (
                <div key={e._id} className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
                  <PostCard value={e} type={"post"} />
                </div>
              ))
            ) : (
              /* Premium Empty State Box */
              <div className="w-full bg-white rounded-2xl border border-slate-100 border-dashed py-16 text-center select-none">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-100">
                  <FaRegNewspaper className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-700 tracking-tight">No Posts Yet</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                  Be the first one to share a moment! Use the creation box above to post images or thoughts.
                </p>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;