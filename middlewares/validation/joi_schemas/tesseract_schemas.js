const Joi = require('joi');
const pos_num = Joi.number().positive().required();
//todo create google vision api schema for validation of parsed data
const google_vision_api_schema = null;

const tesseract_request_schema = Joi.object().keys({
    image_path : Joi.string().required(),
    box_x_loc : pos_num,
    box_y_loc : pos_num,
    box_width : pos_num,
    box_height : pos_num,
    rotation_angle : Joi.number().min(0).max(359).required()
});

const tesseract_response_schema = Joi.object().keys({

    ocr_data: Joi.string().required(),
    parsed_data: Joi.string().required(), // todo change this to Joi.object().type(google_vision_api_schema) once it is created

    /*
        Passing the keys of the schema so we are not trying to look for
        tesseract_request: tesseract_request {
                                                options
                                             }
        And instead look for
        tesseract_request : {
            options
        }

    */
    tesseract_request: tesseract_request_schema.keys()
})


module.exports = {
    tesseract_request_schema : tesseract_request_schema,
    tesseract_response_schema: tesseract_response_schema

}
