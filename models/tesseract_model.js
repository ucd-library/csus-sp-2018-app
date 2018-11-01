const tesseract_request = require('../classes/tesseract_request').class;
const box_data = require('../classes/box_data').class;

exports.tesseract_request_object = function(body){

    let options = {
        'image_path': body['image_path'],
        'box_x_loc': body['box_x_loc'],
        'box_y_loc': body['box_y_loc'],
        'box_width': body['box_width'],
        'box_height': body['box_height'],
        'rotation_angle': body['rotation_angle']
    };

    return new tesseract_request(options);
};

exports.box_data_object = function (o_data, t_request_data) {
    return new box_data(o_data, t_request_data);
};