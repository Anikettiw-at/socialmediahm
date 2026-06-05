import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading } = UserData();
  const { fetchPosts } = PostData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPosts);
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium text-sm animate-pulse">Verifying credentials...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden max-w-4xl w-full bg-white border border-slate-100 md:min-h-[500px]">
            
            {/* LEFT SIDE: FORM SECTION */}
            <div className="w-full md:w-3/5 p-6 sm:p-10 md:p-12 flex flex-col justify-center">
              <div className="mb-8 text-center md:text-left">
                <h1 className="font-bold text-2xl sm:text-3xl text-slate-800 tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-sm text-slate-400 mt-1">Hello again! Log in to see what your friends are up to</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all text-sm">
                    Log In
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT SIDE: GRADIENT CTA SIDEBAR */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
              {/* Background structural styling shapes */}
              <div className="absolute w-64 h-64 bg-white/5 rounded-full -bottom-20 -right-20 pointer-events-none"></div>
              <div className="absolute w-40 h-40 bg-white/5 rounded-full -top-10 -left-10 pointer-events-none"></div>

              <div className="relative z-10 max-w-xs space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight">New Here?</h2>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">
                  Join our social platform to share moments, chat instantly, and build your connection group.
                </p>
                <div className="pt-2">
                  <Link
                    to="/register"
                    className="inline-block bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-xl shadow-md hover:bg-blue-50 hover:scale-[1.02] transition-all text-sm"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Login;