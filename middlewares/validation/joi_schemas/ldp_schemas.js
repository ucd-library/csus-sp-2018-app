// todo: ldp_get_schema: Validation schema for image received from LDP to send to client


// todo: ldp_post_schema: Validation schema for finalized data from our app to be sent back to LDP

const ldp_post_schema = Joi.object().keys({
    user : Joi.string().required(),
    image_path : Joi.string().required(),
    image_file_type : Joi.any().valid(['jpeg', 'jpg', 'gif', 'pdf', 'png']),
    img_height : img_size,
    img_width : img_size,
    rotation_angle : Joi.number().min(0).max(359).required(),
    //const auth token?
    create_time_stamp : time,
    last_updated_time_stamp : time,
    original_data : Joi.string(),
    corrected_data : Joi.string()
    //TODO do we also put the height and width in here as well?  And how?
});