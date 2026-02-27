require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./db/database");

const blogRoutes = require("./routes/blogRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/blogs", blogRoutes);
app.use("/api/ai-suggestions", aiRoutes);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});