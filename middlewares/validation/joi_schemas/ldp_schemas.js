const Joi = require('joi');
const pos_num = Joi.number().positive().required();
const our_string = Joi.string().required();
// todo: ldp_get_schema: Validation schema for image received from LDP to send to client
// todo: ldp_post_schema: Validation schema for finalized data from our app to be sent back to LDP
const google_vision_api_schema = null;

const ldp_schema = Joi.object().keys({
    user : our_string,
    image_path : our_string,
    image_file : our_string,
    image_height : pos_num,
    image_width : pos_num,
    time_stamp : our_string
    //We will want to figure out the time stamp format
});

module.exports = {
    ldp_schema : ldp_schema
};