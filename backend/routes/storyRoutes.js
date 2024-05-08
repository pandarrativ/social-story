// 导入相关模块和控制器
const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");

// 生成故事路由
router.post("/createByUser", storyController.createStoryByUser);

router.post("/createByChatGpt",storyController.createStoryByChatGPT)

// 获取所有故事
router.get("/", storyController.getAllStories);

// 根据ID获取某个故事
router.get("/:id", storyController.getStory);

// // 根据ID删除故事
router.delete("/:id", storyController.deleteStory);

router.patch("/:id",storyController.updateStory)

module.exports = router;
