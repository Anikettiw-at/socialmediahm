import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PostData } from "../context/PostContext";
import { UserData } from "../context/UserContext";
import { LoadingAnimation } from "./Loading";
import { FaImage, FaFilm } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [aiTopic, setAiTopic] = useState("");
  const [showAi, setShowAi] = useState(false);
  const [generating, setGenerating] = useState(false);

  const { user } = UserData();
  const { addPost, addLoading } = PostData();

  const handleGenerateWithAI = async () => {
    if (!aiTopic.trim()) return toast.error("Pehle topic likho, e.g. 'my DSA journey'");

    setGenerating(true);
    try {
      // Relative URL: axios.defaults.baseURL (main.jsx) local aur production dono handle karta hai
      const res = await axios.post("/api/ai/generate-post", {
        topic: aiTopic,
      });

      // Direct caption state me AI post fill ho jayegi
      setCaption(res.data.post);
      toast.success("Caption generated ✨");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "AI generation failed, check backend server");
    } finally {
      setGenerating(false);
    }
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const clearFile = () => {
    setFile("");
    setFilePrev("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("caption", caption);
    formdata.append("file", file);
    addPost(formdata, setFile, setCaption, setFilePrev, type);
  };

  const isPost = type === "post";

  return (
    <div className="card w-full p-4 sm:p-5">
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="flex gap-3">
          <img
            src={user?.profilePic?.url}
            alt=""
            className="w-10 h-10 rounded-full object-cover shrink-0 hidden sm:block"
          />
          <textarea
            rows="2"
            className="input resize-none sm:min-h-[84px] text-[15px] bg-transparent border-transparent focus:bg-slate-50 focus:border-slate-200 focus:ring-0 px-2 sm:px-3"
            placeholder={isPost ? `What's on your mind, ${user?.name?.split(" ")[0] || "friend"}?` : "Write a caption for your reel…"}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* AI caption generator */}
        {showAi && (
          <div className="flex flex-col sm:flex-row gap-2 p-2.5 rounded-xl bg-gradient-to-r from-brand-50 to-fuchsia-50 border border-brand-100 animate-fadeIn">
            <input
              type="text"
              className="input py-2 bg-white"
              placeholder="Topic, e.g. 'My new MERN project'"
              value={aiTopic}
              maxLength={200}
              onChange={(e) => setAiTopic(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleGenerateWithAI();
                }
              }}
            />
            <button
              type="button"
              onClick={handleGenerateWithAI}
              disabled={generating}
              className="btn-primary py-2 shrink-0"
            >
              {generating ? <LoadingAnimation /> : <HiSparkles className="w-4 h-4" />}
              <span>{generating ? "Writing…" : "Generate"}</span>
            </button>
          </div>
        )}

        {/* Media preview */}
        {filePrev && (
          <div className="relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
            {isPost ? (
              <img src={filePrev} alt="Preview" className="w-full object-contain max-h-[320px]" />
            ) : (
              <video
                controlsList="nodownload"
                controls
                src={filePrev}
                className="w-full object-contain max-h-[360px]"
              />
            )}
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove media"
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <label className="btn px-3 py-2 text-slate-600 hover:bg-slate-100 cursor-pointer">
              {isPost ? (
                <FaImage className="w-4 h-4 text-emerald-500" />
              ) : (
                <FaFilm className="w-4 h-4 text-rose-500" />
              )}
              <span className="hidden sm:inline">{isPost ? "Photo" : "Video"}</span>
              <input
                type="file"
                className="hidden"
                accept={isPost ? "image/*" : "video/*"}
                onChange={changeFileHandler}
              />
            </label>
            <button
              type="button"
              onClick={() => setShowAi(!showAi)}
              className={`btn px-3 py-2 ${showAi ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <HiSparkles className="w-4 h-4 text-brand-500" />
              <span className="hidden sm:inline">AI caption</span>
            </button>
          </div>

          <button type="submit" disabled={addLoading || !file} className="btn-primary px-6">
            {addLoading ? <LoadingAnimation /> : isPost ? "Post" : "Share reel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
