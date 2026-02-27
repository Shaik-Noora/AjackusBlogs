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
  const [ai, setAi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const typingTimer = useRef(null);
  const lastRequestRef = useRef("");

  /* ================= LOAD BLOG ================= */
  useEffect(() => {
    if (!id) return;

    api.get(`/blogs/${id}`).then(res => {
      setAuthor(res.data.author || "");
      setTitle(res.data.title || "");
      setContent(res.data.content || "");
    });
  }, [id]);

  /* ================= AI GENERATE ================= */
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

    } catch (err) {

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

  /* ================= AUTO AI ================= */
  const handleContentChange = (value) => {
    setContent(value);

    if (typingTimer.current) clearTimeout(typingTimer.current);

    typingTimer.current = setTimeout(generate, 1500);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    if (!author.trim()) return alert("Enter author");
    if (!title.trim()) return alert("Enter title");

    setSaving(true);

    try {
      const payload = { author, title, content };

      if (id) {
        await api.put(`/blogs/${id}`, payload);
      } else {
        await api.post("/blogs", payload);
      }

      navigate("/");
    } finally {
      setSaving(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="h-screen bg-[#faf9f6] pt-20 overflow-hidden flex flex-col">

      {/* MAIN WORKSPACE */}
      <div className="flex-1 overflow-hidden max-w-6xl w-full mx-auto px-6 md:px-10 pb-6">

        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 h-full">

          {/* ================= EDITOR ================= */}
          <div className="
            bg-white rounded-xl
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            flex flex-col h-full overflow-hidden
          ">

            {/* AUTHOR */}
            <input
              value={author}
              onChange={(e)=>setAuthor(e.target.value)}
              placeholder="Author name"
              className="px-8 pt-8 pb-3 outline-none text-sm text-[#666]"
            />

            <div className="mx-8 h-px bg-[#eee]" />

            {/* TITLE */}
            <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Your story title..."
              className="px-8 py-6 font-serif text-3xl outline-none"
            />

            <div className="mx-8 h-px bg-[#eee]" />

            {/* CONTENT (SCROLLABLE) */}
            <textarea
              value={content}
              onChange={(e)=>handleContentChange(e.target.value)}
              placeholder="Start writing your story..."
              className="
                flex-1
                overflow-y-auto
                resize-none
                px-8 py-8
                outline-none
                leading-8
              "
            />

            {/* ACTION BAR */}
            <div className="flex justify-end gap-4 px-8 py-4 border-t bg-[#fafafa]">

              <button
                onClick={generate}
                disabled={loading}
                className="
                  flex items-center gap-2
                  px-5 py-2.5
                  rounded-full
                  bg-blue-600 text-white text-sm font-medium
                  transition-all duration-200
                  hover:bg-blue-700 hover:shadow-md
                  active:scale-[0.98]
                  disabled:opacity-50
                "
              >
                <FiZap size={15} />
                {loading ? "Generating..." : "Get AI Ideas"}
              </button>

              <button
                onClick={save}
                disabled={saving}
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
                  disabled:opacity-50
                "
              >
                <FiSend size={15} />
                {saving ? "Publishing..." : "Publish"}
              </button>

            </div>
          </div>

          {/* ================= AI PANEL ================= */}
          <div className="h-full overflow-hidden">
            <AiPanel text={ai} loading={loading} regen={generate} />
          </div>

        </div>
      </div>
    </div>
  );
}