const Joi = require('joi');
const pos_num = Joi.number().positive().required();
const our_string = Joi.string().required();

const ldp_schema = Joi.object().keys({
    user: our_string,
    image_path: our_string,
    image_height: Joi.number().positive().allow(null),
    image_width: Joi.number().positive().allow(null),
    time_stamp: our_string,
    box_list: Joi.any()
});

module.exports = {
    ldp_schema : ldp_schema
};