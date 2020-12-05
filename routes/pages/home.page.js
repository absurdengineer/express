const express = require('express')

const router = express.Router()

router.get("/",(req,res) => {
    objectToTemplate = {
        title : "Homepage",
        message : "Hello Programmer"
    }
    res.render('index.pug',objectToTemplate)
});

module.exports = router