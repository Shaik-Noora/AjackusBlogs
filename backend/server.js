require("dotenv").config();
const express=require("express");
const cors=require("cors");

require("./db/database");

const blogRoutes=require("./routes/blogRoutes");
const aiRoutes=require("./routes/aiRoutes");

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs",blogRoutes);
app.use("/api/ai-suggestions",aiRoutes);

app.listen(process.env.PORT,
()=>console.log("Server running"));