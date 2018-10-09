const Joi = require('joi');

//These are common specs
const img_size = Joi.number().greater(Joi.ref('cropped_img')).positive().required();
const cropped_img = Joi.number().positive().required();
const time = Joi.date().max('now').iso().required();
/*
We will have a few different Schemas.

For right now, all we are concerned about is POST or PUT data,
either to tesseract to get something back, OR to LDP to store
the data.  Only what we need validated will be in here.

For example, in the data structure, we are have a few items
not listed here.  That is because we are not doing anything to
them as far as using them to get to Tesseract, OR using them to
send to the LDP.
*/

const tesseract_get_schema = Joi.object().keys({
    image_path : Joi.string().required(),
    cropped_image_width : cropped_img,
    cropped_image_height : cropped_img,
    rotations_angle : Joi.number().min(0).max(359).required()
    //TODO we need to figure out what to coordinates look like so I can place them in here (x height x widht y height y width?)
});

const ldp_post_schema = Joi.object().keys({
    user : Joi.string().required(),
    image_path : Joi.string().required(),
    image_file_type : Joi.any().valid(['jpeg', 'jpg', 'gif', 'pdf', 'png']),
    img_height : img_size,
    img_width : img_size,
    cropped_image_width : cropped_img,
    cropped_image_height : cropped_img,
    rotation_angle : Joi.number().min(0).max(359).required(),
    //const auth token?
    create_time_stamp : time,
    last_updated_time_stamp : time,
    original_data : Joi.string(),
    corrected_data : Joi.string()
    //TODO do we also put the height and width in here as well?  And how?
});

module.exports = {
    '/tesseract': tesseract_get_schema,
    '/ldp': ldp_post_schema
};