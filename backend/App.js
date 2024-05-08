const express = require("express");
const morgan = require("morgan");
const storyRoutes = require("./routes/storyRoutes");
const vocabularyRoutes = require("./routes/vocabularyRoutes");
const storyCvtPDFRoutes=require("./routes/storyCvtPDFRoutes")
const app = express();

// 使用 JSON 解析器
app.use(express.json());

//中间件
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// 添加故事路由
app.use("/api/stories", storyRoutes)
app.use("/api/vocabularies", vocabularyRoutes)
app.use("/api/storyCvtPDF", storyCvtPDFRoutes)

module.exports = app;
