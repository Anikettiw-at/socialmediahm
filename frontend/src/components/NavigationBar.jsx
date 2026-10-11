import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";
import { UserData } from "../context/UserContext";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home", icon: AiOutlineHome, activeIcon: AiFillHome },
  { to: "/reels", label: "Reels", icon: BsCameraReels, activeIcon: BsCameraReelsFill },
  { to: "/search", label: "Search", icon: IoSearchOutline, activeIcon: IoSearch },
  { to: "/chat", label: "Messages", icon: IoChatbubbleEllipsesOutline, activeIcon: IoChatbubbleEllipses },
  { to: "/account", label: "Profile", icon: RiAccountCircleLine, activeIcon: RiAccountCircleFill },
];

const NavigationBar = () => {
  const { user } = UserData();

  return (
    <>
      {/* DESKTOP / TABLET SIDEBAR */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-20 lg:w-64 flex-col border-r border-slate-200/70 bg-surface/90 backdrop-blur-xl px-3 lg:px-4 py-6">
        <div className="px-2 mb-8">
          <span className="lg:hidden">
            <Logo compact />
          </span>
          <span className="hidden lg:block">
            <Logo />
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon, activeIcon: ActiveIcon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              title={label}
              className={({ isActive }) =>
                `group flex items-center justify-center lg:justify-start gap-3.5 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-[22px] transition-transform group-hover:scale-110">
                    {isActive ? <ActiveIcon /> : <Icon />}
                  </span>
                  <span className="hidden lg:inline">{label}</span>
                </>
              )}
            </NavLink>
          ))}
          <ThemeToggle withLabel className="justify-center lg:justify-start px-3 py-3" />
        </nav>

        {user && (
          <NavLink
            to="/account"
            className="mt-auto flex items-center justify-center lg:justify-start gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <img
              src={user.profilePic?.url}
              alt=""
              className="w-10 h-10 rounded-full object-cover ring-2 ring-surface shadow"
            />
            <div className="hidden lg:block min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </NavLink>
        )}
      </aside>

      {/* MOBILE TOP BAR */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-surface/85 backdrop-blur-xl border-b border-slate-200/70">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle className="p-2 rounded-full" />
          {user && (
            <NavLink to="/account">
              <img
                src={user.profilePic?.url}
                alt=""
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-100"
              />
            </NavLink>
          )}
        </div>
      </header>

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl border-t border-slate-200/70 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16">
          {links.map(({ to, label, icon: Icon, activeIcon: ActiveIcon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              aria-label={label}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                  isActive ? "text-brand-600" : "text-slate-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`text-2xl transition-transform ${isActive ? "scale-110" : ""}`}>
                    {isActive ? <ActiveIcon /> : <Icon />}
                  </span>
                  <span className={`h-1 w-1 rounded-full ${isActive ? "bg-brand-600" : "bg-transparent"}`} />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
