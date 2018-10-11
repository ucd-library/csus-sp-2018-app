const {celebrate, Joi, errors} = require('celebrate');
const pos_num = Joi.number().positive().required();

const tesseract_request_schema = Joi.object().keys({
    image_path : Joi.string().required(),
    box_x_loc : pos_num,
    box_y_loc : pos_num,
    box_width : pos_num,
    box_height : pos_num,
    rotation_angle : Joi.number().min(0).max(359).required()
});

module.exports = {
    tesseract_request_schema : tesseract_request_schema
}

//todo tesseract_response_schema. Validation schema for data received from tesseract