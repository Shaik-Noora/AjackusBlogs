import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import api from "../api/api";

export default function Detail() {

  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blogs/${id}`).then(r => setBlog(r.data));
  }, []);

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <p className="animate-pulse text-lg tracking-wide">Loading article...</p>
      </div>
    );

  
  return (
  <div className="min-h-screen bg-[#faf9f6] px-4 py-16">

    <article className="
      max-w-3xl mx-auto
      bg-white
      rounded-xl
      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      p-8 md:p-14
    ">

      {/* TITLE */}
      <h1 className="
        font-serif
        text-[clamp(2.2rem,4vw,3.2rem)]
        leading-tight
        text-[#1c1c1c]
        mb-6
      ">
        {blog.title}
      </h1>

      {/* AUTHOR */}
      <div className="flex items-center gap-3 mb-10">

        <div className="
  w-11 h-11
  rounded-full
  bg-gradient-to-br from-blue-500 to-indigo-600
  text-white
  flex items-center justify-center
  shadow-sm
  relative
">

  <FiUser size={14} className="absolute opacity-30" />

  <span className="font-semibold text-sm z-10">
    {blog.author?.charAt(0).toUpperCase()}
  </span>

</div>

        <p className="text-sm text-[#6b6b6b]">
          Written by{" "}
          <span className="text-[#1c1c1c] font-medium">
            {blog.author}
          </span>
        </p>
      </div>

      {/* CONTENT */}
      <div className="
        prose
        prose-lg
        max-w-none
        text-[#333]
        leading-relaxed
      ">
        <p>{blog.content}</p>
      </div>

    </article>
  </div>
);
}