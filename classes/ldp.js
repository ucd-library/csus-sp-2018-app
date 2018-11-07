const Joi = require('joi');
const ldp_schema = require('../middlewares/validation/joi_schemas/ldp_schema').ldp_schema

//this should be the LDP that we use.

class ldp_class {

    constructor(options) {
        const validation_request = Joi.validate(options, ldp_schema);

        if (validation_result.error) {
            throw new TypeError(validation_result.error);
        } else {
            this.user = options.user;
            this.image_path = options.image_path;
            this.image_file = options.image_file;
            this.image_height = options.image_height;
            this.image_width = options.image_width;
            this.time_stamp = options.time_stamp;
            this.box_list = options.box_list;
        }

        Object.freeze(this.user);
        Object.freeze(this.image_path);
        Object.freeze(this.image_file);
        Object.freeze(this.image_height);
        Object.freeze(this.image_width);
    };

    get options(){
        return {
            'user': this.user,
            'image_path': this.image_path,
            'image_file': this.image_file,
            'image_height': this.image_height,
            'image_width': this.image_width,
            'time_stamp': this.time_stamp,
            'box_list': this.box_list
        }
    };

    generate_ldp_call(server){
        let schema = 'http';

        //I still have no Idea what the LDP call actually looks like
    }
}

module.exports = {
    class : ldp
};