import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp, FaGrid3X3, FaFilm } from "react-icons/fa6";
import axios from "axios";
import { Loading } from "../components/Loading";
import { UserData } from "../context/UserContext";
import Modal from "../components/Modal";
import { SocketData } from "../context/SocketContext";

const UserAccount = ({ user: loggedInUser }) => {
  const navigate = useNavigate();
  const { posts, reels } = PostData();
  const [user, setUser] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("post");
  const [index, setIndex] = useState(0);
  const [followed, setFollowed] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  const { followUser } = UserData();
  const { onlineUsers } = SocketData();

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/" + params.id);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  let myPosts = posts && user?._id ? posts.filter((post) => post.owner?._id === user._id) : [];
  let myReels = reels && user?._id ? reels.filter((reel) => reel.owner?._id === user._id) : [];

  const prevReel = () => {
    if (index === 0) return null;
    setIndex(index - 1);
  };

  const nextReel = () => {
    if (index === myReels.length - 1) return null;
    setIndex(index + 1);
  };

  const followHandler = () => {
    setFollowed(!followed);
    followUser(user?._id, fetchUser);
  };

  useEffect(() => {
    if (user?.followers && loggedInUser?._id) {
      setFollowed(user.followers.includes(loggedInUser._id));
    }
  }, [user, loggedInUser]);

  async function followData() {
    if (!user?._id) return;
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);
      setFollowersData(data.followers || []);
      setFollowingsData(data.followings || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user?._id) {
      followData();
    }
  }, [user?._id]);

  const isOnline = user?._id ? onlineUsers?.includes(user._id) : false;

  return (
    <div className="bg-slate-50 min-h-screen pt-6 pb-16 px-4">
      {loading || !user ? (
        <Loading />
      ) : (
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          
          {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
          {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}

          {/* User Profile Card */}
          <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
            
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner shrink-0">
              <img src={user.profilePic?.url} alt={user.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 w-full flex flex-col gap-4 text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">{user.name}</h2>
                  {isOnline && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full ring-1 ring-emerald-500/20">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Online
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{user.email} • <span className="capitalize">{user.gender}</span></p>
              </div>

              {/* Stats Strip */}
              <div className="flex items-center justify-center sm:justify-start gap-6 border-y border-slate-100 py-3 my-1">
                <div>
                  <span className="block text-base font-bold text-slate-800">{myPosts.length}</span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Posts</span>
                </div>
                <div onClick={() => setShow(true)} className="cursor-pointer group">
                  <span className="block text-base font-bold text-slate-800 group-hover:text-blue-500 transition-colors">{user.followers?.length || 0}</span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block group-hover:text-blue-500 transition-colors">Followers</span>
                </div>
                <div onClick={() => setShow1(true)} className="cursor-pointer group">
                  <span className="block text-base font-bold text-slate-800 group-hover:text-blue-500 transition-colors">{user.followings?.length || 0}</span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block group-hover:text-blue-500 transition-colors">Following</span>
                </div>
              </div>

              {/* Follow Button Action */}
              {loggedInUser && user._id !== loggedInUser._id && (
                <div className="w-full sm:max-w-xs">
                  <button
                    onClick={followHandler}
                    className={`w-full font-semibold py-2.5 rounded-xl text-xs transition-all shadow-sm border ${
                      followed
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-transparent shadow-blue-500/10"
                    }`}
                  >
                    {followed ? "Following" : "Follow"}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="w-full flex border-b border-slate-200">
            <button 
              onClick={() => setType("post")}
              className={`flex-1 py-3 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 border-b-2 transition-all ${type === "post" ? "border-slate-800 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}
            >
              <FaGrid3X3 className="w-3.5 h-3.5" /> Posts
            </button>
            <button 
              onClick={() => setType("reel")}
              className={`flex-1 py-3 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 border-b-2 transition-all ${type === "reel" ? "border-slate-800 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}
            >
              <FaFilm className="w-3.5 h-3.5" /> Reels
            </button>
          </div>

          {/* Content Render Grid Container */}
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            {type === "post" && (
              <>
                {myPosts && myPosts.length > 0 ? (
                  myPosts.map((e) => (
                    <PostCard type={"post"} value={e} key={e._id} />
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400 text-sm font-medium">No Posts Yet</div>
                )}
              </>
            )}

            {type === "reel" && (
              <>
                {myReels && myReels.length > 0 ? (
                  <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
                    <PostCard
                      type={"reel"}
                      value={myReels[index]}
                      key={myReels[index]?._id}
                    />
                    <div className="flex flex-row md:flex-col justify-center items-center gap-3">
                      <button
                        disabled={index === 0}
                        className={`p-3.5 rounded-full shadow-md transition-all ${
                          index === 0 
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50" 
                            : "bg-slate-800 text-white hover:bg-slate-950 hover:scale-105"
                        }`}
                        onClick={prevReel}
                      >
                        <FaArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        disabled={index === myReels.length - 1}
                        className={`p-3.5 rounded-full shadow-md transition-all ${
                          index === myReels.length - 1 
                            ? "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50" 
                            : "bg-slate-800 text-white hover:bg-slate-950 hover:scale-105"
                        }`}
                        onClick={nextReel}
                      >
                        <FaArrowDownLong className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-sm font-medium">No Reels Yet</div>
                )}
              </>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default UserAccount;