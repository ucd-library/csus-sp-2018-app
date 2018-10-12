const express = require('express');
const router = express.Router();
const { celebrate, Joi, errors } = require('celebrate');
const tesseract_request_schema = require('../middlewares/validation/joi_schemas/tesseract_schemas').tesseract_request_schema;
const tesseract_model = require('../models/tesseract_model')

const request = require('request')

/**
 * On route https://localhost:3000/tesseract
 * Validate the passed data against tesseract_schema, see middlewares/validation/tesseract_schema.js.
 * On successful validation, instantiate an instance of the class tesseract_data
 */
router.post('/',
    celebrate({body : tesseract_request_schema}),

    function (req, res) {
        query = tesseract_model.query_tesseract(req.body)
        console.log(query)

        request.get(query, {accept: 'application/hocr+xml'}, function (error, response, body) {
                if (error) {
                        throw error
                }
                res.send(body)
        })
});


module.exports = router