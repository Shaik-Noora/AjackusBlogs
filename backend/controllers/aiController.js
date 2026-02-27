require("dotenv").config();
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = "https://generativelanguage.googleapis.com/v1";

// cache model
let cachedModel = null;

/* =====================================================
   AUTO DETECT WORKING GEMINI MODEL
===================================================== */
async function getValidGeminiModel() {
  if (cachedModel) return cachedModel;

  const res = await axios.get(
    `${BASE_URL}/models?key=${GEMINI_API_KEY}`
  );

  const models = res.data.models || [];

  const usableModel = models.find(m =>
    m.supportedGenerationMethods?.includes("generateContent")
  );

  if (!usableModel) {
    throw new Error("No usable Gemini model found");
  }

  console.log("✅ Using Gemini Model:", usableModel.name);

  cachedModel = usableModel.name;
  return cachedModel;
}

/* =====================================================
   AI BLOG SUGGESTIONS
===================================================== */
exports.generate = async (req, res) => {
  try {
    const { title = "", content = "" } = req.body;

    const modelName = await getValidGeminiModel();

    /* ---------- STRICT JSON PROMPT ---------- */
    const prompt = `
You are an AI writing assistant.

Generate blog topic ideas and introduction paragraphs.

Return ONLY valid JSON.
NO markdown.
NO explanation.
NO extra text.

Format EXACTLY:

{
  "ideas": [
    {
      "title": "Related topic title",
      "introduction": "Engaging intro paragraph (4-5 sentences)"
    },
    {
      "title": "Related topic title",
      "introduction": "Engaging intro paragraph (4-5 sentences)"
    },
    {
      "title": "Related topic title",
      "introduction": "Engaging intro paragraph (4-5 sentences)"
    }
  ]
}

User Title: ${title}
User Content: ${content}
`;

    /* ---------- GEMINI CALL ---------- */
    const response = await axios.post(
      `${BASE_URL}/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    let output =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    /* ---------- CLEAN MODEL OUTPUT ---------- */
    output = output
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    /* ---------- SAFE JSON PARSE ---------- */
    let parsed;

    try {
      parsed = JSON.parse(output);
    } catch (parseError) {
      console.error("❌ JSON PARSE FAILED:", output);

      return res.status(500).json({
        error: "AI returned invalid format"
      });
    }

    /* ---------- VALIDATE STRUCTURE ---------- */
    const ideas = Array.isArray(parsed.ideas)
      ? parsed.ideas
      : [];

    /* ---------- FINAL RESPONSE ---------- */
    return res.json({
      suggestions: ideas
    });

  } catch (error) {
    const apiError = error.response?.data;

    if (apiError?.error?.code === 429) {
      return res.status(429).json({
        error: "AI temporarily busy. Please wait a minute and try again."
      });
    }

    console.error(
      "❌ GEMINI BLOG ERROR:",
      apiError || error.message
    );

    res.status(500).json({
      error: "AI generation failed"
    });
  }
};