var express = require('express');
var router = express.Router();
var ldp = require('../models/ldp_model')
var fs = require('fs')


router.get('/', function(req, res){
    ldp.get()
});
router.post('/', function(req, res){
    res.send('Posting to ldp');
});

//export this router to use in our index.js
module.exports = router;