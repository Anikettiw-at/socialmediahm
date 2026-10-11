import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import { IoSearchOutline, IoChevronForward } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function fetchUsers(e) {
    e?.preventDefault();
    if (!search.trim()) return; // Khali search rokne ke liye
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + encodeURIComponent(search));
      setUsers(data);
      setSearched(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="px-3 sm:px-4 py-5 sm:py-8">
      <div className="max-w-xl mx-auto flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Discover people</h1>
          <p className="text-sm text-slate-500 mt-0.5">Find friends and creators to follow.</p>
        </div>

        <form onSubmit={fetchUsers} className="card p-2 flex items-center gap-2">
          <div className="relative flex-1">
            <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-11 pr-3 py-2.5 text-sm bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
              placeholder="Search by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary px-5">
            Search
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center py-10 text-brand-600">
            <LoadingAnimation />
          </div>
        ) : users && users.length > 0 ? (
          <div className="card divide-y divide-slate-100 overflow-hidden">
            {users.map((e) => (
              <Link
                key={e._id}
                className="flex items-center justify-between gap-3 p-3.5 hover:bg-slate-50 transition-colors group"
                to={`/user/${e._id}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={e.profilePic?.url} alt={e.name} className="w-11 h-11 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{e.name}</p>
                    <p className="text-xs text-slate-400">
                      {e.followers?.length || 0} followers
                    </p>
                  </div>
                </div>
                <IoChevronForward className="text-slate-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="card border-dashed py-16 text-center px-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
              <FaUserFriends className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              {searched ? "No users match your search" : "Search for people by name"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {searched ? "Try a different name." : "Type a name above and press Enter."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
