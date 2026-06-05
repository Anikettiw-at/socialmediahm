import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

const NavigationBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname);

  useEffect(() => {
    setTab(location.pathname);
  }, [location.pathname]);

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-t md:border-t-0 md:border-b border-slate-100 py-3 px-4 transition-all">
      <div className="max-w-md mx-auto flex justify-between items-center">
        
        {/* HOME LINK */}
        <Link
          to={"/"}
          onClick={() => setTab("/")}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
            tab === "/" ? "text-blue-600 scale-110" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="text-2xl">{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
        </Link>

        {/* REELS LINK */}
        <Link
          to={"/reels"}
          onClick={() => setTab("/reels")}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
            tab === "/reels" ? "text-blue-600 scale-110" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="text-2xl">{tab === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}</span>
        </Link>

        {/* SEARCH LINK */}
        <Link
          to={"/search"}
          onClick={() => setTab("/search")}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
            tab === "/search" ? "text-blue-600 scale-110" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="text-2xl">{tab === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}</span>
        </Link>

        {/* CHAT LINK */}
        <Link
          to={"/chat"}
          onClick={() => setTab("/chat")}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
            tab === "/chat" ? "text-blue-600 scale-110" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="text-2xl">
            {tab === "/chat" ? <IoChatbubbleEllipses /> : <IoChatbubbleEllipsesOutline />}
          </span>
        </Link>

        {/* ACCOUNT LINK */}
        <Link
          to={"/account"}
          onClick={() => setTab("/account")}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
            tab === "/account" ? "text-blue-600 scale-110" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="text-2xl">
            {tab === "/account" ? <RiAccountCircleFill /> : <RiAccountCircleLine />}
          </span>
        </Link>

      </div>
    </div>
  );
};

export default NavigationBar;