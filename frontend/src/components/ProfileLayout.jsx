import React, { useState } from "react";
import { BsGrid3X3, BsCameraReels } from "react-icons/bs";
import PostCard from "./PostCard";
import ReelViewer from "./ReelViewer";

// Cover + avatar + stats card shared by own profile and other users' profiles
export const ProfileHeader = ({ user, avatarSlot, nameSlot, isOnline, postsCount, onFollowers, onFollowings, actions }) => {
  return (
    <div className="card overflow-hidden">
      <div className="h-28 sm:h-36 bg-gradient-to-r from-brand-600 via-brand-500 to-fuchsia-500 relative">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
      </div>

      <div className="px-5 sm:px-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
            {avatarSlot || (
              <img
                src={user.profilePic?.url}
                alt=""
                className="w-full h-full rounded-full object-cover ring-4 ring-surface shadow-lift bg-surface"
              />
            )}
            {isOnline && (
              <span className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-surface" />
            )}
          </div>

          <div className="flex-1 min-w-0 sm:pb-1">
            {nameSlot || (
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight truncate">{user.name}</h1>
            )}
            <p className="text-sm text-slate-500 truncate">
              {user.email}
              {user.gender && <span className="capitalize"> · {user.gender}</span>}
              {isOnline && <span className="text-emerald-600 font-semibold"> · Online</span>}
            </p>
          </div>

          {actions && <div className="flex gap-2 sm:pb-1">{actions}</div>}
        </div>

        <div className="mt-6 grid grid-cols-3 rounded-xl bg-slate-50 border border-slate-100 divide-x divide-slate-200/70">
          <Stat value={postsCount} label="Posts" />
          <Stat value={user.followers?.length || 0} label="Followers" onClick={onFollowers} />
          <Stat value={user.followings?.length || 0} label="Following" onClick={onFollowings} />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ value, label, onClick }) => {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`py-3 text-center ${onClick ? "hover:bg-surface transition-colors first:rounded-l-xl last:rounded-r-xl" : ""}`}
    >
      <p className="text-lg font-extrabold text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </Tag>
  );
};

// Posts / Reels tabs with content
export const ProfileContent = ({ posts, reels }) => {
  const [type, setType] = useState("post");

  const tabs = [
    { key: "post", label: "Posts", icon: BsGrid3X3, count: posts?.length || 0 },
    { key: "reel", label: "Reels", icon: BsCameraReels, count: reels?.length || 0 },
  ];

  return (
    <>
      <div className="card p-1.5 flex gap-1">
        {tabs.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setType(key)}
            className={`flex-1 btn py-2.5 ${
              type === key ? "bg-brand-600 text-white shadow-md shadow-brand-500/20" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
            <span className={`text-xs ${type === key ? "text-white/70" : "text-slate-400"}`}>{count}</span>
          </button>
        ))}
      </div>

      {type === "post" &&
        (posts && posts.length > 0 ? (
          posts.map((e) => <PostCard type={"post"} value={e} key={e._id} />)
        ) : (
          <EmptyState text="No posts yet" />
        ))}

      {type === "reel" &&
        (reels && reels.length > 0 ? <ReelViewer reels={reels} /> : <EmptyState text="No reels yet" />)}
    </>
  );
};

const EmptyState = ({ text }) => (
  <div className="card border-dashed py-14 text-center text-sm font-medium text-slate-400">{text}</div>
);
