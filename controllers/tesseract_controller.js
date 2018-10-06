var express = require('express');
var tesseract = require('../models/tesseract_model')
var router = express.Router();

// router.get('/', function(req, res){
//     res.send('Getting from tesseract.');
// });

router.post('/', function(req, res){
/*
    // Client is the requester. Get the data that was sent by them
    data_from_client = req.body()

    // Taking data_from_client and sending it to tesseract. Then storing tesseract response
    response_from_tesseract = tesseract.post(data)

    // Send data back to client for correction
    res.send(response_from_tesseract)

*/
});

//export this router to use in our index.js
module.exports = router;