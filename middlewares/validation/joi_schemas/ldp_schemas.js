const Joi = require('joi');
const pos_num = Joi.number().positive().required();
const our_string = Joi.string().required();

const ldp_schema = Joi.object().keys({
    user: our_string,
    image_path: our_string,
    image_file: our_string,
    image_height: pos_num,
    image_width: pos_num,
    time_stamp: our_string
});

/*

TODO: box_list needs to be added to the schema with the value being the validation schema for box list.
I still don't understand how we are going to be validating the box list.
Are we going to be making sure that the boxes exist?  I thought that the boxes
are inside of the tesseract objects?

*/

module.exports = {
    ldp_schema : ldp_schema
};