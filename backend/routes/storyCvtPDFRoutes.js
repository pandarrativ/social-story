// 导入相关模块和控制器
const express = require("express");
const router = express.Router();
const storyCvtPDFController=require("../controllers/storyCvtPDFController")


router.post("/",storyCvtPDFController.storyConvertPDF);

module.exports = router;