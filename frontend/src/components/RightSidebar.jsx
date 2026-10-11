import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserData } from "../context/UserContext";
import { SocketData } from "../context/SocketContext";

// Desktop-only column next to the feed: who's online + people to follow
const RightSidebar = () => {
  const { user, followUser, fetchUser } = UserData();
  const { onlineUsers } = SocketData();
  const [people, setPeople] = useState([]);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    axios
      .get("/api/user/all?search=")
      .then(({ data }) => setPeople(data))
      .catch((error) => console.log(error));
  }, []);

  const followings = user?.followings || [];
  const suggestions = people.filter((p) => !followings.includes(p._id)).slice(0, 5);
  const online = people.filter((p) => onlineUsers?.includes(p._id)).slice(0, 8);

  const followHandler = async (id) => {
    setPending(id);
    await followUser(id, fetchUser);
    setPending(null);
  };

  return (
    <aside className="hidden xl:block w-80 shrink-0">
      <div className="sticky top-8 flex flex-col gap-5">
        {online.length > 0 && (
          <div className="card p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Active now</h3>
            <div className="flex flex-wrap gap-3">
              {online.map((p) => (
                <Link key={p._id} to={`/user/${p._id}`} title={p.name} className="relative">
                  <img src={p.profilePic?.url} alt={p.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-100" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Suggested for you</h3>
            <Link to="/search" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
              See all
            </Link>
          </div>

          {suggestions.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {suggestions.map((p) => (
                <li key={p._id} className="flex items-center justify-between gap-3 py-1.5">
                  <Link to={`/user/${p._id}`} className="flex items-center gap-3 min-w-0 group">
                    <img src={p.profilePic?.url} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-brand-600 transition-colors">
                        {p.name}
                      </p>
                      <p className="text-xs text-slate-400">{p.followers?.length || 0} {p.followers?.length === 1 ? "follower" : "followers"}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => followHandler(p._id)}
                    disabled={pending === p._id}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 disabled:opacity-50 shrink-0"
                  >
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400">You're following everyone 🎉</p>
          )}
        </div>

        <p className="px-2 text-xs text-slate-400">© {new Date().getFullYear()} SocialHM · Built with the MERN stack</p>
      </div>
    </aside>
  );
};

export default RightSidebar;
