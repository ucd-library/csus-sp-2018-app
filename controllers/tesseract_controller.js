var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Getting from tesseract.');
});
router.post('/', function(req, res){
    res.send('Posting to tesseract.');
});

//export this router to use in our index.js
module.exports = router;