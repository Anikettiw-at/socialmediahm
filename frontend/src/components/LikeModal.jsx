import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoadingAnimation } from "./Loading";

const LikeModal = ({ isOpen, onClose, id }) => {
  if (!isOpen) return null;

  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLikes() {
    try {
      const { data } = await axios.get("/api/post/" + id);
      // Agar direct array aa raha hai to data, nahi to data.likes check kar lena
      setValue(data.likes || data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLikes();
  }, [id]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 w-[340px] max-h-[400px] overflow-hidden flex flex-col relative">
        
        {/* HEADER */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">Likes</h1>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 w-8 h-8 rounded-xl flex items-center justify-center transition-all text-2xl absolute top-3 right-3"
          >
            &times;
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto space-y-2 mt-4 pr-1 flex flex-col">
          {loading ? (
            <div className="flex justify-center items-center flex-1 py-10">
              <LoadingAnimation />
            </div>
          ) : value && value.length > 0 ? (
            value.map((e, i) => (
              <Link
                className="w-full bg-slate-50 hover:bg-blue-50/50 border border-slate-100 p-3 rounded-xl flex items-center gap-3 transition-all active:scale-[0.99]"
                to={`/user/${e?._id}`}
                key={e?._id || i}
                onClick={onClose}
              >
                <span className="text-xs font-bold text-slate-400 w-4 text-center">{i + 1}</span>
                <img
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100/80"
                  src={e?.profilePic?.url}
                  alt=""
                />
                <span className="text-sm font-semibold text-slate-700 truncate">{e?.name}</span>
              </Link>
            ))
          ) : (
            <div className="text-center py-10 my-auto">
              <p className="text-sm font-medium text-slate-400">No likes yet</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LikeModal;