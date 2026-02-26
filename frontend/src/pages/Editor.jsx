import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiZap, FiSend } from "react-icons/fi";
import api from "../api/api";
import AiPanel from "../components/AiPanel";

export default function Editor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ai, setAi] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const typingTimer = useRef(null);
  const lastRequestRef = useRef("");

  /* LOAD BLOG */
  useEffect(() => {
    if (!id) return;

    api.get(`/blogs/${id}`).then(res => {
      setAuthor(res.data.author || "");
      setTitle(res.data.title || "");
      setContent(res.data.content || "");
    });
  }, [id]);

  /* AI GENERATE */
  const generate = useCallback(async () => {
    if (!content.trim()) return;

    const signature = `${title}-${content}`;
    if (lastRequestRef.current === signature) return;

    lastRequestRef.current = signature;

    try {
      setLoading(true);

      const res = await api.post("/ai-suggestions", {
        title,
        content
      });

      setAi(res.data.suggestions || "");
    }catch (err) {

    // ✅ HANDLE RATE LIMIT
    if (err.response?.status === 429) {
      alert("⚠️ Too many AI requests. Please wait a few seconds and try again.");
    } else {
      alert("Something went wrong while generating AI ideas.");
    }

    console.error(err);

  } finally {
      setLoading(false);
    }
  }, [title, content]);

  /* AUTO AI */
  const handleContentChange = (value) => {
    setContent(value);

    if (typingTimer.current) clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(generate, 1500);
  };

  /* SAVE */
  const save = async () => {
    if (!author.trim()) return alert("Enter author");
    if (!title.trim()) return alert("Enter title");

    setSaving(true);

    const payload = { author, title, content };

    if (id) {
      await api.put(`/blogs/${id}`, payload);
    } else {
      await api.post("/blogs", payload);
    }

    navigate("/");
  };

  /* UI */
  return (
    <div className="min-h-screen bg-[#faf9f6] pt-20">

      <div className="
        max-w-6xl mx-auto
        px-6 md:px-10
        grid lg:grid-cols-[1fr_360px]
        gap-10
        pb-16
      ">

        {/* EDITOR */}
        <div className="
          bg-white rounded-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          flex flex-col overflow-hidden
        ">

          <input
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            placeholder="Author name"
            className="px-8 pt-8 pb-3 outline-none text-sm text-[#666]"
          />

          <div className="mx-8 h-px bg-[#eee]" />

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Your story title..."
            className="px-8 py-6 font-serif text-3xl outline-none"
          />

          <div className="mx-8 h-px bg-[#eee]" />

          <textarea
            value={content}
            onChange={(e)=>handleContentChange(e.target.value)}
            placeholder="Start writing your story..."
            className="flex-1 resize-none px-8 py-8 outline-none leading-8"
          />

          <div className="flex justify-end gap-4 px-8 py-4 border-t bg-[#fafafa]">

  {/* AI BUTTON */}
  <button
    onClick={generate}
    className="
      flex items-center gap-2
      px-5 py-2.5
      rounded-full
      bg-blue-600 text-white text-sm font-medium
      transition-all duration-200
      hover:bg-blue-700 hover:shadow-md
      active:scale-[0.98]
    "
  >
    <FiZap size={15} />
    {loading ? "Generating..." : "Get AI Ideas"}
  </button>

  {/* PUBLISH BUTTON */}
  <button
    onClick={save}
    className="
      flex items-center gap-2
      px-5 py-2.5
      rounded-full
      border border-[#ddd]
      text-sm font-medium
      text-[#333]
      transition-all duration-200
      hover:bg-white hover:shadow-sm
      active:scale-[0.98]
    "
  >
    <FiSend size={15} />
    {saving ? "Publishing..." : "Publish"}
  </button>

</div>
        </div>

        {/* AI PANEL */}
        <AiPanel text={ai} loading={loading} regen={generate} />

      </div>
    </div>
  );
}