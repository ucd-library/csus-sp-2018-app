const Joi = require('joi');
const ldp_schema = require('../middlewares/validation/joi_schemas/ldp_schema').ldp_schema

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

        Object.freeze(this);
    }

    get options(){
        let options = {
            'user': this.user,
            'image_path': this.image_path,
            'image_file': this.image_file,
            'image_height': this.image_height,
            'image_width': this.image_width,
            'time_stamp': this.time_stamp,
            'box_list': this.box_list
        }

        //TODO need to configure box list to be a LIST and not just a variable

        return options;
    }

        /*
        TODO need to figure out the LDP URL call to
        match the query so we can call it

        generate_ldp_query(server){

        let schema = 'http'
         */
}

module.exports = {
    class : ldp_class
};