import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp, FaGrid3X3, FaFilm } from "react-icons/fa6";
import Modal from "../components/Modal";
import axios from "axios";
import { Loading } from "../components/Loading";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { logoutUser, updateProfilePic, updateProfileName } = UserData();
  const { posts, reels, loading } = PostData();

  let myPosts = posts ? posts.filter((post) => post.owner._id === user._id) : [];
  let myReels = reels ? reels.filter((reel) => reel.owner._id === user._id) : [];

  const [type, setType] = useState("post");
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [file, setFile] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.name ? user.name : "");
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const logoutHandler = () => {
    logoutUser(navigate);
  };

  const prevReel = () => {
    if (index === 0) return null;
    setIndex(index - 1);
  };

  const nextReel = () => {
    if (index === myReels.length - 1) return null;
    setIndex(index + 1);
  };

  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);
      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const changleImageHandler = () => {
    const formdata = new FormData();
    formdata.append("file", file);
    updateProfilePic(user._id, formdata, setFile);
  };

  useEffect(() => {
    followData();
  }, [user]);

  const UpdateName = () => {
    updateProfileName(user._id, name, setShowInput);
  };

  async function updatePassword(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/" + user._id, {
        oldPassword,
        newPassword,
      });
      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-6 pb-16 px-4">
      {loading ? (
        <Loading />
      ) : (
        user && (
          <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
            
            {/* MODAL WRAPPERS */}
            {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
            {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}

            {/* MAIN USER PROFILE CARD */}
            <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
              
              {/* LEFT CONTAINER: PICTURE AND UPLOAD */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative group w-32 h-32 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner">
                  <img src={user.profilePic.url} alt="Profile" className="w-full h-full object-cover" />
                </div>
                
                {/* Hidden File Picker Styled Button */}
                <div className="w-full text-center">
                  <label className="block text-xs font-semibold text-blue-500 hover:text-blue-600 cursor-pointer bg-blue-50 hover:bg-blue-100/70 px-3 py-1.5 rounded-lg transition-all">
                    Choose Image
                    <input type="file" className="hidden" onChange={changeFileHandler} required />
                  </label>
                  {file && (
                    <button 
                      onClick={changleImageHandler}
                      className="mt-2 text-[11px] font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-2 py-1 rounded-md transition-colors w-full"
                    >
                      Apply Changes
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT CONTAINER: CORE SPEC DETAILS & STATS */}
              <div className="flex-1 w-full sm:pl-4 flex flex-col gap-4 text-center sm:text-left">
                <div>
                  {showInput ? (
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <input
                        className="px-3 py-1 text-sm rounded-lg bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                        required
                      />
                      <button onClick={UpdateName} className="text-xs font-bold text-emerald-600 hover:underline">Save</button>
                      <button onClick={() => setShowInput(false)} className="text-xs font-bold text-red-500 hover:underline">Cancel</button>
                    </div>
                  ) : (
                    <h2 className="text-xl font-bold text-slate-800 flex items-center justify-center sm:justify-start gap-1.5">
                      {user.name}
                      <button onClick={() => setShowInput(true)} className="text-slate-400 hover:text-blue-500 transition-colors">
                        <CiEdit className="w-5 h-5" />
                      </button>
                    </h2>
                  )}
                  <p className="text-xs text-slate-400 mt-0.5">{user.email} • <span className="capitalize">{user.gender}</span></p>
                </div>

                {/* COUNTERS STRIP */}
                <div className="flex items-center justify-center sm:justify-start gap-6 border-y border-slate-100 py-3 my-1">
                  <div className="text-center sm:text-left">
                    <span className="block text-base font-bold text-slate-800">{myPosts.length}</span>
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Posts</span>
                  </div>
                  <div onClick={() => setShow(true)} className="text-center sm:text-left cursor-pointer group">
                    <span className="block text-base font-bold text-slate-800 group-hover:text-blue-500 transition-colors">{user.followers.length}</span>
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block group-hover:text-blue-500 transition-colors">Followers</span>
                  </div>
                  <div onClick={() => setShow1(true)} className="text-center sm:text-left cursor-pointer group">
                    <span className="block text-base font-bold text-slate-800 group-hover:text-blue-500 transition-colors">{user.followings.length}</span>
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block group-hover:text-blue-500 transition-colors">Following</span>
                  </div>
                </div>

                {/* LOGOUT STRIP */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowUpdatePass(!showUpdatePass)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 rounded-xl text-xs transition-all"
                  >
                    {showUpdatePass ? "Hide Security" : "Update Password"}
                  </button>
                  <button
                    onClick={logoutHandler}
                    className="px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2 rounded-xl text-xs transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>

            </div>

            {/* PASSWORD EXTENSION BLOCK */}
            {showUpdatePass && (
              <form
                onSubmit={updatePassword}
                className="w-full bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-5 rounded-2xl space-y-3 animate-fadeIn"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-xs"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-xs"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all"
                >
                  Save Secure Password
                </button>
              </form>
            )}

            {/* NAVIGATION TABS SECTION */}
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

            {/* CONTENT RENDER PANELS */}
            <div className="w-full flex flex-col gap-6 justify-center items-center">
              {type === "post" && (
                <>
                  {myPosts && myPosts.length > 0 ? (
                    myPosts.map((e) => (
                      <PostCard type={"post"} value={e} key={e._id} />
                    ))
                  ) : (
                    <div className="text-center py-10 text-slate-400 text-sm font-medium">No Posts Created Yet</div>
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
                        key={myReels[index]._id}
                      />
                      {/* Vertical control buttons stack for desktop, sticky strip for mobile */}
                      <div className="flex flex-row md:flex-col justify-center items-center gap-3">
                        {index !== 0 && (
                          <button
                            className="bg-slate-800 hover:bg-slate-900 text-white p-3.5 rounded-full shadow-lg transition-all hover:scale-105"
                            onClick={prevReel}
                          >
                            <FaArrowUp className="w-4 h-4" />
                          </button>
                        )}
                        {index !== myReels.length - 1 && (
                          <button
                            className="bg-slate-800 hover:bg-slate-900 text-white p-3.5 rounded-full shadow-lg transition-all hover:scale-105"
                            onClick={nextReel}
                          >
                            <FaArrowDownLong className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-slate-400 text-sm font-medium">No Reels Uploaded Yet</div>
                  )}
                </>
              )}
            </div>

          </div>
        )
      )}
    </div>
  );
};

export default Account;