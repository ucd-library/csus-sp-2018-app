const express = require('express');
const request = require('request')
const router = express.Router();

const tesseract_model = require('../models/tesseract_model')


const config = require('../config')



/**
 * On route https://localhost:5000/tesseract
 * Validate the passed data against tesseract_schema, see middlewares/validation/tesseract_schema.js.
 * On successful validation, instantiate an instance of the class tesseract_data
 */
router.post('/',
    function (req, res) {

        instance = tesseract_model.tesseract_request_object(req.body);

        query = instance.generate_tesseract_query(config.local_host);

        console.log("Query to Tesseract:", query)

        options = {
                method: 'GET',
                headers:{
                        Accept: 'application/hocr+xml'
                }
        }
        request(query, options, function (error, response, body) {
            if (error){
                    throw error;
            } else {

                let response_instance = tesseract_model.tesseract_response_object(body, 'parsed_data', instance.options);

                res.send(response_instance.options)
            }
        })



});


module.exports = router

