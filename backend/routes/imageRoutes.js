const express = require("express");
const fs=require("fs")
const router = express.Router();
const path = require('path');

router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname,`../IMG/${imageName}`);
    console.log(__dirname,)
    // Check if the image file exists
    if (fs.existsSync(imagePath)) {
        // If the image exists, send it
        res.sendFile(imagePath);
    } else {
        // If the image does not exist, send a 404 Not Found response
        res.status(404).send("Image Not Found");
    }
});

module.exports = router;
