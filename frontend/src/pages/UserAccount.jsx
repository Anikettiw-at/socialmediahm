import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostData } from "../context/PostContext";
import axios from "axios";
import { Loading } from "../components/Loading";
import { UserData } from "../context/UserContext";
import Modal from "../components/Modal";
import { SocketData } from "../context/SocketContext";
import { ProfileHeader, ProfileContent } from "../components/ProfileLayout";
import { IoChatbubbleEllipsesOutline, IoPersonAdd, IoPersonRemove } from "react-icons/io5";

const UserAccount = ({ user: loggedInUser }) => {
  const navigate = useNavigate();

  const { posts, reels } = PostData();

  const [user, setUser] = useState(null);

  const params = useParams();

  const [loading, setLoading] = useState(true);

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

  const myPosts = posts && user ? posts.filter((post) => post.owner._id === user._id) : [];
  const myReels = reels && user ? reels.filter((reel) => reel.owner._id === user._id) : [];

  const [followed, setFollowed] = useState(false);

  const { followUser } = UserData();

  const followHandler = () => {
    setFollowed(!followed);
    followUser(user._id, fetchUser);
  };

  useEffect(() => {
    if (user && user.followers && loggedInUser) {
      if (user.followers.includes(loggedInUser._id)) setFollowed(true);
      else setFollowed(false);
    }
  }, [user, loggedInUser]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  async function followData() {
    if (!user?._id) return;
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);

      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      followData();
    }
  }, [user]);

  const messageHandler = () => {
    navigate("/chat", { state: { userId: user._id } });
  };

  const { onlineUsers } = SocketData();

  if (loading || !user) return <Loading />;

  const isMe = loggedInUser && user._id === loggedInUser._id;

  return (
    <div className="px-3 sm:px-4 py-5 sm:py-8">
      {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
      {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}

      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <ProfileHeader
          user={user}
          isOnline={onlineUsers?.includes(user._id)}
          postsCount={myPosts.length + myReels.length}
          onFollowers={() => setShow(true)}
          onFollowings={() => setShow1(true)}
          actions={
            !isMe && (
              <>
                <button onClick={followHandler} className={followed ? "btn-outline" : "btn-primary"}>
                  {followed ? <IoPersonRemove className="w-4 h-4" /> : <IoPersonAdd className="w-4 h-4" />}
                  {followed ? "Unfollow" : "Follow"}
                </button>
                <button onClick={messageHandler} className="btn-secondary" aria-label="Message">
                  <IoChatbubbleEllipsesOutline className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </>
            )
          }
        />

        <ProfileContent posts={myPosts} reels={myReels} />
      </div>
    </div>
  );
};

export default UserAccount;
