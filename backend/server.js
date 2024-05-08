const mongoose = require("mongoose");
require('dotenv').config()
const app = require("./App");

// 连接到 MongoDB 数据库
mongoose
  .connect(
    process.env.DATABASE
    // {
    // useNewUrlParser: true,
    //useUnifiedTopology: true,
    //}
  )
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));


