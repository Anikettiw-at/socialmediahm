import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import AuthLayout from "../components/AuthLayout";
import { LoadingAnimation } from "../components/Loading";
import { IoCamera } from "react-icons/io5";

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

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("file", file);

    registerUser(formdata, navigate, fetchPosts);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join the community in less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={submitHandler} className="space-y-4">
        {/* Avatar picker */}
        <div className="flex items-center gap-4 pb-2">
          <label className="relative group w-20 h-20 shrink-0 rounded-full overflow-hidden bg-brand-50 border-2 border-dashed border-brand-200 hover:border-brand-500 transition-all flex items-center justify-center cursor-pointer">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={changeFileHandler}
              accept="image/*"
              required={!filePrev}
            />
            {filePrev ? (
              <img src={filePrev} className="w-full h-full object-cover" alt="Avatar preview" />
            ) : (
              <IoCamera className="w-7 h-7 text-brand-400 group-hover:text-brand-600 transition-colors" />
            )}
          </label>
          <div>
            <p className="text-sm font-semibold text-slate-800">Profile photo</p>
            <p className="text-xs text-slate-500">{filePrev ? "Tap to change" : "Tap the circle to upload"}</p>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="input"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="input cursor-pointer"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-3 !mt-6">
          {loading ? <LoadingAnimation /> : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
