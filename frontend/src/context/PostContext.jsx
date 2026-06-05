import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    try {
      const { data } = await axios.get("/api/post/all");

      setPosts(data.posts);
      setReels(data.reels);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [addLoading, setAddLoading] = useState(false);

  // 🛠️ Parameters ka order main components ke sequence ke sath sync kar diya hai
  async function addPost(formdata, setFile, setCaption, setFilePrev, type) {
    setAddLoading(true);
    try {
      const { data } = await axios.post("/api/post/new?type=" + type, formdata, {
        headers: {
          "Content-Type": "multipart/form-data", // 👈 File uploads ke liye zaroori hai
        },
        withCredentials: true, // 👈 403 Forbidden/Unauthorized se bachne ke liye cookies enforce ki hain
      });

      toast.success(data.message);
      fetchPosts();
      setFile("");
      setFilePrev("");
      setCaption("");
      setAddLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setAddLoading(false);
    }
  }

  async function likePost(id) {
    try {
      const { data } = await axios.post("/api/post/like/" + id);

      toast.success(data.message);
      fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error liking post");
    }
  }

  async function addComment(id, comment, setComment, setShow) {
    try {
      const { data } = await axios.post("/api/post/comment/" + id, {
        comment,
      });
      toast.success(data.message);
      fetchPosts();
      setComment("");
      setShow(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding comment");
    }
  }

  async function deletePost(id) {
    setLoading(true);
    try {
      const { data } = await axios.delete("/api/post/" + id);

      toast.success(data.message);
      fetchPosts();
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting post");
      setLoading(false);
    }
  }

  async function deleteComment(id, commentId) {
    try {
      const { data } = await axios.delete(
        `/api/post/comment/${id}?commentId=${commentId}`
      );

      toast.success(data.message);
      fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting comment");
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        reels,
        posts,
        addPost,
        likePost,
        addComment,
        loading,
        addLoading,
        fetchPosts,
        deletePost,
        deleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const PostData = () => useContext(PostContext);