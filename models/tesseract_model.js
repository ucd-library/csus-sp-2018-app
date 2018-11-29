const tesseract_request = require('../classes/tesseract_request').class;
const box_data = require('../classes/box_data').class;
const tesseract_model = require('../models/tesseract_model');
const request = require('request-promise');

const config = require('../config');
const query_options = {
    method: 'GET',
    headers:{
        Accept: 'application/hocr+xml'
    }
};

exports.query_tesseract = function(body){
    let tess_options = {
        'image_path': body['image_path'],
        'box_x_loc': body['box_x_loc'],
        'box_y_loc': body['box_y_loc'],
        'box_width': body['box_width'],
        'box_height': body['box_height'],
        'rotation_angle': body['rotation_angle']
    };

    let tess_obj = new tesseract_request(tess_options);

    let query = tess_obj.generate_tesseract_query(config.uc_davis_domain);

    console.log(query);

    let my_req = request(query, query_options);

    return {
        "request": my_req,
        "obj": tess_obj
    }
};

exports.create_box_data = function (o_data, t_request_data) {
    return new box_data(o_data, t_request_data);
};