import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp, IoChatbubbleOutline, IoSend } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
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

  const timeAgo = value?.createdAt
    ? formatDistanceToNow(new Date(value.createdAt), { addSuffix: true })
    : "";

  useEffect(() => {
    if (value?.likes && user?._id) {
      setIsLike(value.likes.includes(user._id));
    }
  }, [value, user?._id]);

  const likeHandler = () => {
    setIsLike(!isLike);
    likePost(value._id);
  };

  // Instagram-style double tap: only likes, never unlikes
  const [burst, setBurst] = useState(false);
  const doubleTapHandler = () => {
    if (!isLike) likeHandler();
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
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

  const likesCount = value.likes?.length || 0;
  const commentsCount = value.comments?.length || 0;

  return (
    <article className="card w-full overflow-hidden animate-fadeIn">
      <SimpleModal isOpen={showModal} onClose={closeModal} title="Post options">
        <div className="flex flex-col gap-2">
          <button onClick={editHandler} className="btn-secondary w-full justify-start">
            <MdEdit className="w-4 h-4" /> Edit caption
          </button>
          <button onClick={deleteHandler} className="btn-danger w-full justify-start" disabled={loading}>
            {loading ? (
              <LoadingAnimation />
            ) : (
              <>
                <MdDelete className="w-4 h-4" /> Delete post
              </>
            )}
          </button>
        </div>
      </SimpleModal>

      {open && <LikeModal onClose={oncloseLIke} id={value._id} />}

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 sm:px-5 pt-4">
        <Link className="flex items-center gap-3 group min-w-0" to={`/user/${value.owner?._id}`}>
          <div className="relative shrink-0">
            <img
              src={value.owner?.profilePic?.url}
              alt=""
              className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-100"
            />
            {onlineUsers?.includes(value.owner?._id) && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-surface"></span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors truncate">
              {value.owner?.name}
            </p>
            <p className="text-xs text-slate-400">{timeAgo}</p>
          </div>
        </Link>

        {value.owner?._id === user._id && (
          <button
            onClick={() => setShowModal(true)}
            aria-label="Post options"
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full p-2 transition-all"
          >
            <BsThreeDots className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* CAPTION */}
      <div className="px-4 sm:px-5 pt-3 pb-3">
        {showInput ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <input
              className="input py-2"
              type="text"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            />
            <div className="flex gap-2 shrink-0">
              <button onClick={updateCaption} className="btn-primary py-2" disabled={captionLoading}>
                {captionLoading ? <LoadingAnimation /> : "Save"}
              </button>
              <button className="btn-secondary py-2" onClick={() => setShowInput(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          value.caption && (
            <p className="text-[15px] text-slate-700 leading-relaxed whitespace-pre-line break-words">
              {value.caption}
            </p>
          )
        )}
      </div>

      {/* MEDIA */}
      <div className="relative bg-black flex items-center justify-center">
        {type === "post" ? (
          <img
            src={value.post?.url}
            alt=""
            loading="lazy"
            onDoubleClick={doubleTapHandler}
            className="w-full max-h-[560px] object-contain select-none cursor-pointer"
          />
        ) : (
          <video
            src={value.post?.url}
            className="w-full max-h-[70vh] object-contain aspect-[9/16]"
            autoPlay
            loop
            playsInline
            controls
          />
        )}
        {burst && (
          <IoHeartSharp className="pointer-events-none absolute w-24 h-24 text-white drop-shadow-xl animate-heartBurst" />
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-1 px-2 sm:px-3 pt-2">
        <button
          onClick={likeHandler}
          aria-label={isLike ? "Unlike" : "Like"}
          className={`p-2 rounded-full text-2xl transition-all active:scale-75 hover:bg-rose-50 ${
            isLike ? "text-rose-500" : "text-slate-600 hover:text-rose-500"
          }`}
        >
          {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
        </button>
        <button
          onClick={() => setShow(!show)}
          aria-label="Comment"
          className="p-2 rounded-full text-2xl text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-all"
        >
          <IoChatbubbleOutline />
        </button>
      </div>

      <div className="px-4 sm:px-5 flex items-center gap-3 text-sm">
        <button className="font-bold text-slate-900 hover:underline" onClick={() => setOpen(true)}>
          {likesCount} {likesCount === 1 ? "like" : "likes"}
        </button>
        <span className="text-slate-300">•</span>
        <button className="text-slate-500 hover:text-slate-800" onClick={() => setShow(!show)}>
          {commentsCount} {commentsCount === 1 ? "comment" : "comments"}
        </button>
      </div>

      {/* COMMENTS */}
      <div className="px-4 sm:px-5 pb-4 pt-3">
        {commentsCount > 0 && (
          <div className="scroll-thin max-h-[200px] overflow-y-auto space-y-1 pr-1">
            {value.comments.map((e) => (
              <Comment
                value={e}
                key={e._id}
                user={user}
                owner={value.owner?._id}
                id={value._id}
              />
            ))}
          </div>
        )}

        {show && (
          <form onSubmit={addCommentHandler} className="flex items-center gap-2 mt-3">
            <img src={user.profilePic?.url} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                className="input py-2.5 pr-11 rounded-full"
                placeholder="Add a comment…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button
                type="submit"
                aria-label="Post comment"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center transition-colors"
              >
                <IoSend className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </article>
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
    <div className="group flex items-start justify-between gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="flex items-start gap-2.5 min-w-0">
        <Link to={`/user/${value.user?._id}`} className="shrink-0">
          <img
            src={value.user?.profilePic?.url}
            className="w-7 h-7 rounded-full object-cover"
            alt=""
          />
        </Link>
        <p className="text-sm text-slate-700 leading-snug break-words min-w-0">
          <Link to={`/user/${value.user?._id}`} className="font-bold text-slate-900 hover:underline mr-1.5">
            {value.user?.name}
          </Link>
          {value.comment}
        </p>
      </div>

      {(owner === user._id || value.user?._id === user._id) && (
        <button
          onClick={deleteCommentHandler}
          aria-label="Delete comment"
          className="text-slate-300 hover:text-rose-500 p-1 rounded-lg md:opacity-0 group-hover:opacity-100 transition-all shrink-0"
        >
          <MdDelete className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
