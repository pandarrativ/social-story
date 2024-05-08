// 导入相关模块和控制器
const express = require("express");
const router = express.Router();
const vocabularyController = require("../controllers/vocabularyController");

router.get("/", vocabularyController.lookupDictionary);

module.exports = router;

