import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { IoChatbubbles, IoImages } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import Logo from "./Logo";

const features = [
  { icon: IoImages, text: "Share photos & short reels" },
  { icon: IoChatbubbles, text: "Real-time messaging with online status" },
  { icon: FaUserFriends, text: "Follow friends and grow your circle" },
  { icon: HiSparkles, text: "Write captions instantly with AI" },
];

const AuthLayout = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* BRAND PANEL */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-fuchsia-500 p-12 flex-col justify-between text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-fuchsia-300/20 blur-3xl pointer-events-none" />

        <div className="relative">
          <Logo light />
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
            Share moments.
            <br />
            Stay connected.
          </h2>
          <p className="mt-4 text-brand-100 text-base leading-relaxed">
            A modern social space to post, watch reels and chat with the people you care about.
          </p>

          <ul className="mt-10 space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium text-white/90">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/60">© {new Date().getFullYear()} SocialHM</p>
      </div>

      {/* FORM PANEL */}
      <div className="flex flex-col items-center justify-center px-5 py-10 sm:px-10 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="card lg:border-0 lg:shadow-none p-6 sm:p-8 lg:p-0 animate-popIn">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
            <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>

          {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
