import React, { useEffect, useState } from "react";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import SimpleModal from "./SimpleModal";
import { LoadingAnimation } from "./Loading";
import toast from "react-hot-toast";
import axios from "axios";
import LikeModal from "./LikeModal";
import { SocketData } from "../context/SocketContext";

const PostCard = ({ type, value }) => {
  const [isLike, setIsLike] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = UserData();
  const { likePost, addComment, deletePost, loading, fetchPosts } = PostData();

  const formatDate = value?.createdAt ? format(new Date(value.createdAt), "MMMM do") : "";

  useEffect(() => {
    if (value?.likes && user?._id) {
      setIsLike(value.likes.includes(user._id));
    }
  }, [value, user?._id]);

  const likeHandler = () => {
    setIsLike(!isLike);
    likePost(value._id);
  };

  const [comment, setComment] = useState("");

  const addCommentHandler = (e) => {
    e.preventDefault();
    addComment(value._id, comment, setComment, setShow);
  };

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteHandler = () => {
    deletePost(value._id);
  };

  const [showInput, setShowInput] = useState(false);
  const editHandler = () => {
    setShowModal(false);
    setShowInput(true);
  };

  const [caption, setCaption] = useState(value?.caption ? value.caption : "");
  const [captionLoading, setCaptionLoading] = useState(false);

  async function updateCaption() {
    setCaptionLoading(true);
    try {
      const { data } = await axios.put("/api/post/" + value._id, { caption });
      toast.success(data.message);
      fetchPosts();
      setShowInput(false);
      setCaptionLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setCaptionLoading(false);
    }
  }

  const [open, setOpen] = useState(false);

  const oncloseLIke = () => {
    setOpen(false);
  };

  const { onlineUsers } = SocketData();

  if (!value || !user) return null;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 transition-all">
      <SimpleModal isOpen={showModal} onClose={closeModal}>
        <LikeModal isOpen={open} onClose={oncloseLIke} id={value._id} />
        <div className="flex flex-col gap-2 p-2 min-w-[120px]">
          <button
            onClick={editHandler}
            className="w-full py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            Edit Post
          </button>
          <button
            onClick={deleteHandler}
            className="w-full py-2 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-xs transition-colors"
            disabled={loading}
          >
            {loading ? <LoadingAnimation /> : "Delete Post"}
          </button>
        </div>
      </SimpleModal>

      <div className="flex items-center justify-between mb-4">
        <Link className="flex items-center gap-3 group" to={`/user/${value.owner?._id}`}>
          <div className="relative">
            <img
              src={value.owner?.profilePic?.url}
              alt=""
              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
            />
            {onlineUsers?.includes(value.owner?._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{value.owner?.name}</p>
            <p className="text-[11px] text-slate-400 font-medium">{formatDate}</p>
          </div>
        </Link>

        {value.owner?._id === user._id && (
          <button
            onClick={() => setShowModal(true)}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl p-2 transition-all"
          >
            <BsThreeDotsVertical className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mb-3 px-1">
        {showInput ? (
          <div className="flex items-center gap-2">
            <input
              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Enter Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
            <button
              onClick={updateCaption}
              className="text-[11px] bg-blue-600 hover:bg-blue-700 font-semibold text-white px-3 py-1.5 rounded-xl transition-colors"
              disabled={captionLoading}
            >
              {captionLoading ? <LoadingAnimation /> : "Save"}
            </button>
            <button
              className="text-[11px] bg-slate-100 hover:bg-slate-200 font-semibold text-slate-600 px-3 py-1.5 rounded-xl transition-colors"
              onClick={() => setShowInput(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-700 leading-relaxed font-medium">{value.caption}</p>
        )}
      </div>

      <div className="mb-4 overflow-hidden rounded-xl bg-slate-900 border border-slate-100/60 flex items-center justify-center">
        {type === "post" ? (
          <img
            src={value.post?.url}
            alt=""
            className="w-full max-h-[450px] object-contain"
          />
        ) : (
          <video
            src={value.post?.url}
            className="w-full max-h-[550px] object-contain aspect-[9/16]"
            autoPlay
            controls
          />
        )}
      </div>

      <div className="flex items-center justify-between text-slate-500 text-xs font-semibold px-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={likeHandler}
              className={`text-2xl transition-transform active:scale-90 ${isLike ? "text-rose-500" : "text-slate-400 hover:text-rose-500"}`}
            >
              {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
            </button>
            <button
              className="hover:text-slate-700 transition-colors"
              onClick={() => setOpen(true)}
            >
              {value.likes?.length || 0} likes
            </button>
          </div>

          <button
            className="flex items-center gap-1.5 hover:text-slate-700 transition-colors"
            onClick={() => setShow(!show)}
          >
            <BsChatFill className="w-4 h-4 text-slate-400" />
            <span>{value.comments?.length || 0} comments</span>
          </button>
        </div>
      </div>

      {show && (
        <form onSubmit={addCommentHandler} className="flex gap-2 mt-4 px-1">
          <input
            type="text"
            className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-blue-500/10 transition-all" type="submit">
            Add
          </button>
        </form>
      )}

      <div className="mt-4 border-t border-slate-100/80 pt-3">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Comments</p>
        <div className="comments max-h-[180px] overflow-y-auto space-y-3 pr-1">
          {value.comments && value.comments.length > 0 ? (
            value.comments.map((e) => (
              <Comment
                value={e}
                key={e._id}
                user={user}
                owner={value.owner?._id}
                id={value._id}
              />
            ))
          ) : (
            <p className="text-xs text-slate-400 font-medium px-1 py-2">No comments yet. Start the conversation!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

export const Comment = ({ value, user, owner, id }) => {
  const { deleteComment } = PostData();

  const deleteCommentHandler = () => {
    deleteComment(id, value._id);
  };

  if (!value || !user) return null;

  return (
    <div className="flex items-start justify-between gap-2 bg-slate-50/60 hover:bg-slate-50 p-2 rounded-xl transition-colors">
      <div className="flex items-start gap-2.5">
        <Link to={`/user/${value.user?._id}`} className="shrink-0 mt-0.5">
          <img
            src={value.user?.profilePic?.url}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-100"
            alt=""
          />
        </Link>
        <div>
          <Link to={`/user/${value.user?._id}`} className="text-xs font-bold text-slate-800 hover:underline">{value.user?.name}</Link>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{value.comment}</p>
        </div>
      </div>

      {((owner === user._id) || (value.user?._id === user._id)) && (
        <button 
          onClick={deleteCommentHandler} 
          className="text-slate-400 hover:text-rose-500 p-1 rounded-lg hover:bg-white transition-all shrink-0 self-center"
        >
          <MdDelete className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};