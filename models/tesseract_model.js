const express = require('express');
const tesseract_request = require('../classes/tesseract_request').class;

exports.query_tesseract = function(body, host){

    options = {
        'image_path': body['image_path'],
        'box_x_loc': body['box_x_loc'],
        'box_y_loc': body['box_y_loc'],
        'box_width': body['box_width'],
        'box_height': body['box_height'],
        'rotation_angle': body['rotation_angle']
    }

    let data_instance = new tesseract_request(options)


    return data_instance.generate_tesseract_query(host)


}



