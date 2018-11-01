const Joi = require('joi');
const pos_num = Joi.number().positive().required();

const tesseract_request_schema = Joi.object().keys({
    image_path : Joi.string().required(),
    box_x_loc : pos_num,
    box_y_loc : pos_num,
    box_width : pos_num,
    box_height : pos_num,
    rotation_angle : Joi.number().min(0).max(359).required()
});

const box_data = Joi.object().keys({

    _tesseract_request   : tesseract_request_schema.keys(),
    _corrected_data      : Joi.string().allow(null),
    _ocr_data            : Joi.string().required(),
    _parsed_data         : Joi.string().required(),
    _box_id              : Joi.number().required()
});

module.exports = {
    tesseract_request_schema : tesseract_request_schema,
    box_data: box_data
}
