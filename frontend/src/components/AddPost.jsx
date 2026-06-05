import React, { useState } from "react";
import { PostData } from "../context/PostContext";
import { LoadingAnimation } from "./Loading";
import { FaImage, FaFilm } from "react-icons/fa6";

const AddPost = ({ type }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { addPost, addLoading } = PostData();

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

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("caption", caption);
    formdata.append("file", file);
    addPost(formdata, setFile, setCaption, setFilePrev, type);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-100">
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        
        {/* Caption Field */}
        <div className="w-full">
          <input
            type="text"
            className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
            placeholder={type === "post" ? "What's on your mind? Add a caption..." : "Write a caption for your reel..."}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* Media Preview Window */}
        {filePrev && (
          <div className="w-full overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center max-h-[350px] border border-slate-100">
            {type === "post" ? (
              <img src={filePrev} alt="Preview" className="w-full h-full object-contain max-h-[300px]" />
            ) : (
              <video
                controlsList="nodownload"
                controls
                src={filePrev}
                className="w-full h-full object-contain aspect-[9/16] max-h-[350px]"
              />
            )}
          </div>
        )}

        {/* File Picker & Submit Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-slate-50 mt-1">
          
          {/* Styled Hidden File Input */}
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 cursor-pointer text-xs font-semibold border border-slate-100 transition-all w-full sm:w-auto justify-center">
            {type === "post" ? (
              <>
                <FaImage className="w-4 h-4 text-emerald-500" />
                <span>{file ? "Change Image" : "Choose Image"}</span>
              </>
            ) : (
              <>
                <FaFilm className="w-4 h-4 text-rose-500" />
                <span>{file ? "Change Video" : "Choose Video"}</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept={type === "post" ? "image/*" : "video/*"}
              onChange={changeFileHandler}
              required={!filePrev}
            />
          </label>

          {/* Share Button */}
          <button
            disabled={addLoading || !file}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center min-w-[120px] ${
              addLoading || !file
                ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200/60"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10 hover:shadow-blue-500/20"
            }`}
          >
            {addLoading ? (
              <LoadingAnimation />
            ) : (
              <span>{type === "post" ? "Share Post" : "Share Reel"}</span>
            )}
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AddPost;