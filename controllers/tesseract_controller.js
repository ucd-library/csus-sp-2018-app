const express = require('express');
const router = express.Router();
const tesseract_model = require('../models/tesseract_model');
const auth = require('../middlewares/auth')
const ldp_model = require('../models/ldp_model');
let ldp_object = null;

router.post('/user/login', function(req, res){

    let request = auth.login(
        req.body['username'],
        req.body['password'],
    );

    request.then(function (response) {
        if(response.statusCode == '302'){  //This is the code Davis responds with on successful login for some reason
            res.send(response.headers);
        } else {
            // If any errors just forward them on
            res.status(response.statusCode).send(response.body)
        }

    }).catch(function(error){
        throw error;
    })
});

router.post('/user/create', function(req, res){

    let request = auth.create_user(
        req.body['username'],
        req.body['password'],
        req.body['email']
    );

    request.then(function (response) {
        res.send(response)
    }).catch(function(error){
        throw error;
    })
});

// router.post('/user/delete', function(req, res){
//     auth.delete_user
// });

// todo: need to figure out how to get admin privledges to user
router.post('/user/info', function(req, res){
    let request = auth.get_user_info(req.body['username']);

    request.then(function (response) {
        res.send(response);
    }).catch(function (error) {
        throw error;
    })
});



router.get('/init', function (req, res) {
    let query_string = req.query;

    let options = {
        'user': null,
        'image_path': query_string.image_path,
        'image_height': null,
        'image_width': null,
        'time_stamp': new Date().toDateString(),
        'box_list': []
    };

    ldp_object = ldp_model.ldp_object(options);

    res.redirect('/');
});

// Get existing ldp instance
router.get('/tesseract',
    function (req, res) {
        res.send(ldp_object);
    });

// Add a box_data to the ldp instance
router.post('/tesseract', function (req, res) {

    let data = tesseract_model.query_tesseract(req.body);

    let req_obj = data['obj'];
    let query = data['request'];

    query.then(function (ocr_data) {

        let box_obj = tesseract_model.create_box_data(ocr_data, req_obj);

        ldp_object.add_to_box_list(box_obj);

        res.send(ldp_object);
    });
});

// Delete a box data from the ldp instance
router.delete('/tesseract', function (req, res) {

    ldp_object.delete_box(req.body['box_id']);
    res.send(ldp_object);
});

// Edit a tesseract box data on the ldp instance
router.put('/tesseract', function (req, res) {
    ldp_object.delete_box(req.body['box_id']);

    let data = tesseract_model.query_tesseract(req.body['tesseract_data']);

    let req_obj = data['obj'];
    let query = data['request'];

    query.then(function (ocr_data) {

        let box_obj = tesseract_model.create_box_data(ocr_data, req_obj);

        ldp_object.add_to_box_list(box_obj);

        res.send(ldp_object);
    });
});

module.exports = router;