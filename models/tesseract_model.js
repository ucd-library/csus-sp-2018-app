const express = require('express');
const router = express.Router();
const tesseract_request = require('../classes/tesseract_request').class;
const request = require('request')

exports.query_tesseract = function(body, host){
    let data_instance = new tesseract_request(
        body['image_path'],
        body['box_x_loc'],
        body['box_y_loc'],
        body['box_width'],
        body['box_height'],
        body['rotation_angle']
    )

    return data_instance.generate_tesseract_query(host)

}

// todo: get_response. Getting and parsing response from tesseract to send back to client


