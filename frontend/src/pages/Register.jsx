import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { registerUser, loading } = UserData();
  const { fetchPosts } = PostData();
  const navigate = useNavigate();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
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

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("file", file);

    registerUser(formdata, navigate, fetchPosts);
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium text-sm animate-pulse">Creating your account...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="flex flex-col-reverse md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden max-w-4xl w-full bg-white border border-slate-100">
            
            {/* LEFT SIDE: FORM SECTION */}
            <div className="w-full md:w-3/5 p-6 sm:p-10 md:p-12">
              <div className="mb-8 text-center md:text-left">
                <h1 className="font-bold text-2xl sm:text-3xl text-slate-800 tracking-tight">
                  Get Started
                </h1>
                <p className="text-sm text-slate-400 mt-1">Create your profile and connect with everyone</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-5">
                
                {/* Profile Picture Upload Circle */}
                <div className="flex flex-col items-center justify-center mb-4">
                  <div className="relative group w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 hover:border-blue-500 transition-all flex items-center justify-center cursor-pointer">
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={changeFileHandler}
                      accept="image/*"
                      required={!filePrev}
                    />
                    {filePrev ? (
                      <img src={filePrev} className="w-full h-full object-cover" alt="Avatar Preview" />
                    ) : (
                      <div className="text-center p-2 text-slate-400 group-hover:text-blue-500 transition-colors">
                        <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-[10px] font-semibold block">Add Photo</span>
                      </div>
                    )}
                  </div>
                  {filePrev && <span className="text-[11px] text-blue-500 font-medium mt-1.5">Change photo</span>}
                </div>

                {/* Input Fields Stack */}
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                      placeholder="Username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 focus:text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-sm appearance-none cursor-pointer"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all text-sm">
                    Create Account
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT SIDE: GRADIENT CTA SIDEBAR */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
              {/* Background abstract circles for styling */}
              <div className="absolute w-64 h-64 bg-white/5 rounded-full -top-20 -right-20 pointer-events-none"></div>
              <div className="absolute w-40 h-40 bg-white/5 rounded-full -bottom-10 -left-10 pointer-events-none"></div>

              <div className="relative z-10 max-w-xs space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight">Have Account?</h2>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">
                  Log in to check your dynamic feed and chat with your connections seamlessly.
                </p>
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-block bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-xl shadow-md hover:bg-blue-50 hover:scale-[1.02] transition-all text-sm"
                  >
                    Log In Instead
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

export default Register;