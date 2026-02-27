import { FiCpu } from "react-icons/fi";

export default function AiPanel({ text, loading, regen }) {

  /* ---------- PARSE AI RESPONSE ---------- */
  const parseSuggestions = (raw) => {
  if (!raw) return [];

  // ✅ If backend already sends array
  if (Array.isArray(raw)) {
    return raw.map((item, i) => ({
      title: item.title || `Idea ${i + 1}`,
      content: item.introduction || item.content || ""
    }));
  }

  // ✅ If backend sends string
  if (typeof raw === "string") {
    return raw
      .split(/\n{2,}/)
      .map(t => t.trim())
      .filter(Boolean)
      .map((content, i) => ({
        title: `Idea ${i + 1}`,
        content
      }));
  }

  // fallback safety
  return [];
};
  const suggestions = parseSuggestions(text);

  /* ---------- UI ---------- */
  return (
    <div className="
      h-full
      bg-white
      rounded-xl
      border border-[#eee]
      shadow-[0_8px_30px_rgba(0,0,0,0.05)]
      flex flex-col
      overflow-hidden
    ">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-[#fafafa]">
        <div className="flex items-center gap-2">
  <FiCpu className="text-blue-600"/>
  <span>AI Suggestions</span>
</div>

        <button
          onClick={regen}
          className="
            text-xs px-3 py-1 rounded-full
            border border-[#ddd]
            hover:bg-[#f3f3f3]
          "
        >
          Regenerate
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto">

        {loading ? (
          <div className="p-6 text-sm text-[#777]">
            Generating ideas...
          </div>
        ) : suggestions.length > 0 ? (

          suggestions.map((s, i) => (
            <div key={i} className="px-6 py-5 border-b last:border-none">

              <div className="text-xs text-[#999] mb-2">
                {s.title}
              </div>

              <p className="text-sm text-[#444] leading-relaxed">
                {s.content}
              </p>

            </div>
          ))

        ) : (
          <div className="p-8 text-center text-sm text-[#999]">
            Start Typing...AI ideas will appear here.
          </div>
        )}

      </div>
    </div>
  );
}