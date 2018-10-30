const joi = require('joi');
const ldp_class = require('../classes/ldp_class').class;

exports.ldp_class_object = function (body) {
    let options = {
        'user': body['user'],
        'image_path': body['image_path'],
        'image_file': body['image_file'],
        'image_height': body['image_height'],
        'image_width': body['image_width'],
        'time_stamp': body['time_stamp'],
        'box_list': body['box_list']
    };

    return new ldp_class(options);
};