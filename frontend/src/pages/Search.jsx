import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import { FaSearch, FaUserPlus } from "react-icons/fa";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    if (!search.trim()) return; // Khali search rokne ke liye
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + search);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        
        {/* Modern Clean Search Input Box */}
        <div className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 p-4 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              placeholder="Search users by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchUsers()} // Enter dabane par bhi search chalega
            />
            <FaSearch className="absolute left-3.5 top-3.5 text-slate-400 text-xs" />
          </div>
          <button
            onClick={fetchUsers}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all"
          >
            Search
          </button>
        </div>

        {/* Dynamic Display Panel */}
        <div className="w-full flex flex-col gap-2">
          {loading ? (
            <div className="flex justify-center py-10">
              <LoadingAnimation />
            </div>
          ) : (
            <>
              {users && users.length > 0 ? (
                users.map((e) => (
                  <Link
                    key={e._id}
                    className="w-full bg-white hover:bg-slate-50/80 border border-slate-100 p-3 rounded-xl flex justify-between items-center gap-3 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:scale-[1.01] active:scale-[0.99]"
                    to={`/user/${e._id}`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={e.profilePic.url}
                        alt={e.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <span className="text-sm font-semibold text-slate-700">{e.name}</span>
                    </div>
                    {/* View Profile Subtle Indicator */}
                    <span className="text-[11px] font-medium text-blue-500 bg-blue-50 px-2.5 py-1 rounded-md">
                      View Profile
                    </span>
                  </Link>
                ))
              ) : (
                /* Minimal Empty State */
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
                  <FaUserPlus className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-400">
                    {search ? "No users match your search criteria" : "Type a name above to discover new connections"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Search;