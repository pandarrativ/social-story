// 导入相关模块和控制器
const express = require("express");
const router = express.Router();
const puppeteer = require('puppeteer');


router.post("/cvt", async (req, res) => {
    const htmlContent = req.body.html;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set content to the HTML received from the frontend
        await page.setContent(htmlContent);

        // Generate PDF from the page content
        const pdfBuffer = await page.pdf();

        // Close the browser
        await browser.close();

        // Send the PDF buffer as response
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

module.exports = router;