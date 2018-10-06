var express = require('express');
var router = express.Router();
var ldp = require('../models/ldp_model')
var fs = require('fs')


router.get('/', function(req, res){
/*
    data = ldp_get()
    if(!unit_test(data)){
        package error in receiving from UC Davis LDP
        Reget package
        retest
    }
*/

});
router.post('/', function(req, res){
    res.send('Posting to ldp');
});

//export this router to use in our index.js
module.exports = router;