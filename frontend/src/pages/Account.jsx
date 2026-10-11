import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import Modal from "../components/Modal";
import axios from "axios";
import { Loading, LoadingAnimation } from "../components/Loading";
import { ProfileHeader, ProfileContent } from "../components/ProfileLayout";
import { MdEdit, MdLogout, MdLockOutline } from "react-icons/md";
import { IoCamera, IoCheckmark, IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const Account = ({ user }) => {
  const navigate = useNavigate();

  const { logoutUser, updateProfilePic, updateProfileName } = UserData();

  const { posts, reels, loading } = PostData();

  const myPosts = posts ? posts.filter((post) => post.owner._id === user._id) : [];
  const myReels = reels ? reels.filter((reel) => reel.owner._id === user._id) : [];

  const logoutHandler = () => {
    logoutUser(navigate);
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);

      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    followData();
  }, [user]);

  // Selecting a photo uploads it straight away
  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formdata = new FormData();
    formdata.append("file", file);
    updateProfilePic(user._id, formdata, () => {});
    e.target.value = "";
  };

  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.name ? user.name : "");

  const UpdateName = () => {
    updateProfileName(user._id, name, setShowInput);
  };

  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  async function updatePassword(e) {
    e.preventDefault();
    setPassLoading(true);
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
      toast.error(error.response.data.message);
    } finally {
      setPassLoading(false);
    }
  }

  if (loading || !user) return <Loading />;

  return (
    <div className="px-3 sm:px-4 py-5 sm:py-8">
      {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
      {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}

      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <ProfileHeader
          user={user}
          postsCount={myPosts.length + myReels.length}
          onFollowers={() => setShow(true)}
          onFollowings={() => setShow1(true)}
          avatarSlot={
            <label className="group block w-full h-full cursor-pointer" title="Change profile photo">
              <img
                src={user.profilePic?.url}
                alt=""
                className="w-full h-full rounded-full object-cover ring-4 ring-white shadow-lift bg-white"
              />
              <span className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <IoCamera className="w-7 h-7" />
              </span>
              <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-600 text-white border-[3px] border-white flex items-center justify-center sm:hidden">
                <IoCamera className="w-4 h-4" />
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={changeFileHandler} />
            </label>
          }
          nameSlot={
            showInput ? (
              <div className="flex items-center gap-2 mb-1">
                <input
                  className="input py-2 max-w-[220px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  autoFocus
                  required
                />
                <button onClick={UpdateName} className="btn-primary p-2.5" aria-label="Save name">
                  <IoCheckmark className="w-4 h-4" />
                </button>
                <button onClick={() => setShowInput(false)} className="btn-secondary p-2.5" aria-label="Cancel">
                  <IoClose className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <h1 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 tracking-tight">
                <span className="truncate">{user.name}</span>
                <button
                  onClick={() => setShowInput(true)}
                  aria-label="Edit name"
                  className="text-slate-400 hover:text-brand-600 hover:bg-brand-50 p-1.5 rounded-lg transition-colors"
                >
                  <MdEdit className="w-4 h-4" />
                </button>
              </h1>
            )
          }
          actions={
            <>
              <button onClick={() => setShowUpdatePass(!showUpdatePass)} className="btn-outline">
                <MdLockOutline className="w-4 h-4" />
                <span>Password</span>
              </button>
              <button onClick={logoutHandler} className="btn-danger">
                <MdLogout className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          }
        />

        {showUpdatePass && (
          <form onSubmit={updatePassword} className="card p-5 sm:p-6 animate-popIn">
            <h2 className="text-base font-bold text-slate-900">Change password</h2>
            <p className="text-sm text-slate-500 mt-0.5 mb-4">Use a strong password you don't use elsewhere.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="password"
                className="input"
                placeholder="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setShowUpdatePass(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={passLoading} className="btn-primary">
                {passLoading ? <LoadingAnimation /> : "Update password"}
              </button>
            </div>
          </form>
        )}

        <ProfileContent posts={myPosts} reels={myReels} />
      </div>
    </div>
  );
};

export default Account;
