import React, { useEffect, useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

// The initial theme is applied by the inline script in index.html (avoids a light flash).
const isDarkNow = () => document.documentElement.classList.contains("dark");

const applyTheme = (dark) => {
  document.documentElement.classList.toggle("dark", dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#111827" : "#6326f2");
  window.dispatchEvent(new Event("themechange"));
};

const ThemeToggle = ({ withLabel = false, className = "" }) => {
  const [dark, setDark] = useState(isDarkNow);

  useEffect(() => {
    const sync = () => setDark(isDarkNow());
    window.addEventListener("themechange", sync);

    // Follow the OS setting until the user picks a theme themselves
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e) => {
      let saved = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {}
      if (!saved) applyTheme(e.matches);
    };
    media.addEventListener("change", onSystemChange);

    return () => {
      window.removeEventListener("themechange", sync);
      media.removeEventListener("change", onSystemChange);
    };
  }, []);

  const toggle = () => {
    const next = !dark;
    applyTheme(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const label = dark ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`flex items-center gap-3.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all ${className}`}
    >
      <span className="text-[22px]">{dark ? <IoSunnyOutline /> : <IoMoonOutline />}</span>
      {withLabel && <span className="hidden lg:inline text-sm font-semibold">{label}</span>}
    </button>
  );
};

export default ThemeToggle;
