const express = require('express');
const router = express.Router();

const request = require('request');

const tesseract_model = require('../models/tesseract_model');
const config = require('../config');

/**
 * On route https://localhost:5000/tesseract
 */
router.post('/',
    function (req, res) {

        let tesseract_request_instance = tesseract_model.tesseract_request_object(req.body);  // Validation for params done in constructor

        let query = tesseract_request_instance.generate_tesseract_query(config.local_host);

        console.log("Query to Tesseract:", query);

        let options = {
                method: 'GET',
                headers:{
                        Accept: 'application/hocr+xml'
                }
        };
        request(query, options, function (error, response, body) {
            if (error){
                    throw error;
            } else {
                let box_data = tesseract_model.box_data_object(body, tesseract_request_instance);
                res.send(box_data);
            }
        });
});

module.exports = router;

