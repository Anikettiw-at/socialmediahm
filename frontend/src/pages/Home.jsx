import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import PostSkeleton from "../components/PostSkeleton";
import RightSidebar from "../components/RightSidebar";
import { PostData } from "../context/PostContext";
import { FaRegNewspaper } from "react-icons/fa6";

const Home = () => {
  const { posts, loading } = PostData();

  return (
    <div className="px-3 sm:px-4 py-5 sm:py-8">
      <div className="flex justify-center gap-8">
        <div className="w-full max-w-xl flex flex-col gap-5">
          <AddPost type="post" />

          <div className="flex items-center gap-3 px-1 pt-2">
            <h2 className="text-sm font-bold text-slate-900">Latest posts</h2>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {loading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : posts && posts.length > 0 ? (
            posts.map((e) => <PostCard key={e._id} value={e} type={"post"} />)
          ) : (
            <div className="card border-dashed py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
                <FaRegNewspaper className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No posts yet</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto mt-1">
                Be the first to share a moment using the box above.
              </p>
            </div>
          )}
        </div>

        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
