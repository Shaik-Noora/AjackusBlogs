import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiFeather, FiPlus } from "react-icons/fi";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
  ${
    scrolled
      ? "bg-white/90 backdrop-blur border-b border-[#ececec]"
      : "bg-transparent"
  }`}
>
  <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

    {/* BRAND */}
    <Link
  to="/"
  className="flex items-center gap-2 font-serif text-xl text-[#222]"
>
  <FiFeather className="text-blue-600" />
  Blog AI
</Link>

    {/* LINKS */}
    <div className="flex items-center gap-6 text-sm">

      <Link
        to="/"
        className={`transition-colors ${
          location.pathname === "/"
            ? "text-[#1c1c1c]"
            : "text-[#777]"
        } hover:text-black`}
      >
        Home
      </Link>

      <Link
  to="/write"
  className="ml-3 px-5 py-2 flex items-center gap-2
  text-xs uppercase tracking-[0.12em]
  bg-blue-600 text-white rounded-full
  hover:bg-blue-700 transition"
>
  <FiPlus size={14} />
  New Post
</Link>

    </div>
  </div>
</nav>
    
  );
}