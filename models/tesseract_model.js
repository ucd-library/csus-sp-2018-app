const express = require('express');
const tesseract_request = require('../classes/tesseract_request').class;
const tesseract_response = require('../classes/tesseract_response').class;

exports.tesseract_request_object = function(body){

    let options = {
        'image_path': body['image_path'],
        'box_x_loc': body['box_x_loc'],
        'box_y_loc': body['box_y_loc'],
        'box_width': body['box_width'],
        'box_height': body['box_height'],
        'rotation_angle': body['rotation_angle']
    }

    return new tesseract_request(options)
}

exports.tesseract_response_object = function(ocr_data, parsed_data, tesseract_request){
    options = {
        'ocr_data': ocr_data,
        'parsed_data': parsed_data,
        'tesseract_request': tesseract_request
    }

    return new tesseract_response(options)
}
