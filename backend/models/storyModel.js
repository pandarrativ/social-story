// 导入mongoose模块
const mongoose = require("mongoose");

// 定义故事数据模型
const generateStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// 创建故事模型
const Story = mongoose.model("Story", generateStorySchema);
module.exports = Story;
