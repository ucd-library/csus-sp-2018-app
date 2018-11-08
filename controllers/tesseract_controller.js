const express = require('express');
const router = express.Router();
const request = require('request-promise');
const config = require('../config');

const tesseract_model = require('../models/tesseract_model');
const ldp_model = require('../models/ldp_model');

const test_options = {
    'user': 'sample user',
    'image_path': 'collection/example_3-catalogs/catalogs/199/media/images/199-3',
    'image_file': '199-3.jpg',
    'image_height': 1000,
    'image_width': 2000,
    'time_stamp': new Date().toDateString(),
    'box_list': []
}

let ldp_object = ldp_model.ldp_object(test_options)




// Get existing ldp instance
router.get('/',
    function (req, res) {
        res.send(ldp_object);
    });

// Add a box_data to the ldp instance
router.post('/', function (req, res) {

    let data = tesseract_model.query_tesseract(req.body);

    let req_obj = data['obj'];
    let query = data['request'];

    query.then(function (ocr_data) {

        let box_obj = tesseract_model.create_box_data(ocr_data, req_obj);

        ldp_object.add_to_box_list(box_obj);

        res.send(ldp_object)
    })

});

// Delete a box data from the ldp instance
router.delete('/', function (req, res) {

    ldp_object.delete_box(req.body['box_id']);
    res.send(ldp_object);
});

// Edit a box data on the ldp instance
router.put('/', function (req, res) {
    ldp_object.delete_box(req.body['box_id']);

    let data = tesseract_model.query_tesseract(req.body['tesseract_data']);

    let req_obj = data['obj'];
    let query = data['request'];

    query.then(function (ocr_data) {

        let box_obj = tesseract_model.create_box_data(ocr_data, req_obj);

        ldp_object.add_to_box_list(box_obj);

        res.send(ldp_object)
    })
});

module.exports = router;

