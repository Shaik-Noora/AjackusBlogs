import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
  <div className="min-h-screen bg-[#faf9f6] text-[#1a1a1a] font-sans">

    {/* HERO */}
    <div className="
      max-w-6xl mx-auto
      px-6 md:px-10
      pt-28 pb-20
      text-center
    ">

      <p className="uppercase tracking-[0.3em] text-xs text-[#8b8b8b] mb-6">
        GenAI Blog Studio
      </p>

      <h1 className="
        font-serif
        text-[clamp(2.8rem,6vw,4.5rem)]
        leading-tight
        text-[#111]
        max-w-3xl mx-auto
      ">
        Stories that blend
        <span className="text-[#6b8afd]"> creativity</span>
        {" "}and intelligence
      </h1>

      <p className="mt-6 text-[#6b6b6b] max-w-xl mx-auto text-lg leading-relaxed">
        A modern space where ideas meet AI assistance —
        thoughtful writing, clean reading, and meaningful stories.
      </p>

      <Link
        to="/write"
        className="
          inline-block mt-10
          px-8 py-3
          rounded-full
          bg-blue-600
          text-white text-sm font-medium
          transition-all
          hover:scale-105
          hover:shadow-lg
        "
      >
        Start Writing
      </Link>
    </div>

    {/* POSTS SECTION */}
    <div className="max-w-5xl mx-auto px-6 md:px-10 pb-28">

      {!loaded ? null : blogs.length === 0 ? (

        <div className="text-center py-24">

          <div className="text-6xl mb-6">✍️</div>

          <p className="text-[#777] mb-8">
            No stories yet. Your first post starts the journey.
          </p>

          <Link
            to="/write"
            className="
              px-7 py-3 rounded-full
              bg-blue-600
              text-white text-sm
              hover:bg-black transition
            "
          >
            Write First Story
          </Link>
        </div>

      ) : (
        <>
          {/* SECTION TITLE */}
          <div className="mb-14 text-center">
            <h2 className="font-serif text-3xl mb-2">
              Latest Stories
            </h2>
            <div className="w-16 h-[2px] bg-[#6b8afd] mx-auto" />
          </div>

          {/* BLOG LIST */}
          <div className="space-y-16">
            {blogs.map((blog, i) => (
              <div
                key={blog.id}
                style={{ animationDelay: `${i * 0.05}s` }}
                className="animate-fadeInUp"
              >
                <BlogCard blog={blog} refresh={loadBlogs} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);
}