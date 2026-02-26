import { Link } from "react-router-dom";
import { FiArrowRight, FiEdit2, FiTrash2, FiCalendar, FiUser } from "react-icons/fi";
import api from "../api/api";

export default function BlogCard({ blog, refresh }) {
  const del = async () => {
    if (!confirm("Delete this post?")) return;
    await api.delete(`/blogs/${blog.id}`);
    refresh();
  };

  const date = new Date(blog.created_at);
  const formatted = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="
  group
  py-12
  border-b border-[#ececec]
  transition-all duration-300
">

  <div className="grid md:grid-cols-[1fr_auto] gap-8">

    {/* LEFT */}
    <div>

      {/* META */}
      {/* META */}
<div className="flex items-center gap-4 mb-3 text-xs text-[#777]">

  <div className="flex items-center gap-1">
    <FiUser size={14} />
    <span>{blog.author}</span>
  </div>

  <span className="text-[#ccc]">•</span>

  <div className="flex items-center gap-1">
    <FiCalendar size={14} />
    <span>{formatted}</span>
  </div>

</div>

      {/* TITLE */}
      <Link
        to={`/blog/${blog.id}`}
        className="
          block mb-3
          font-serif text-2xl
          text-[#1c1c1c]
          leading-snug
          transition-colors
          group-hover:text-[#5b7cfa]
        "
      >
        {blog.title}
      </Link>

      {/* EXCERPT */}
      <p className="text-[#555] leading-7 text-[0.95rem] max-w-xl">
        {blog.content.slice(0, 150)}…
      </p>
    </div>

    {/* RIGHT */}
    <div className="flex flex-col items-end gap-4">

      <Link
  to={`/blog/${blog.id}`}
  className="flex items-center gap-2 text-blue-600 text-sm hover:gap-3 transition-all"
>
  Read Article
  <FiArrowRight />
</Link>

      <div className="flex gap-4">
  <Link to={`/edit/${blog.id}`} className="flex items-center gap-1 text-sm text-[#666] hover:text-black">
    <FiEdit2 size={14}/>
    Edit
  </Link>

  <button onClick={del} className="flex items-center gap-1 text-sm text-red-500">
    <FiTrash2 size={14}/>
    Delete
  </button>
</div>
    </div>

  </div>
</article>
  );
}