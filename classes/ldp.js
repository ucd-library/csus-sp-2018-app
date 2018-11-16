const Joi = require('joi');
const ldp_schema = require('../middlewares/validation/joi_schemas/ldp_schemas').ldp_schema;

//this should be the LDP that we use.

class ldp_class {

    constructor(options) {
        const validation_request = Joi.validate(options, ldp_schema);

        if (validation_request.error) {
            throw new TypeError(validation_request.error);
        } else {
            this.user = options.user;
            this.image_path = options.image_path;
            this.image_height = options.image_height;
            this.image_width = options.image_width;
            this.time_stamp = options.time_stamp;
            this.box_list = options.box_list;
        }

        Object.freeze(this.image_path);
        Object.freeze(this.image_height);
        Object.freeze(this.image_width);
    };

    get options(){
        return {
            'user': this.user,
            'image_path': this.image_path,
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

    add_to_box_list(box_data){
         return this.box_list.push(box_data);
    }

    delete_box(id_to_delete) {
        for (let i in this.box_list){

            let box = this.box_list[i];

            if(box['box_id'] ===  id_to_delete){

                this.box_list.splice(i, 1);
            }
        };
        return this.box_list
    }

    get_box_ids(){
        let id_array = [];

        for(let i in this.box_list){
            let box = this.box_list[i];
            id_array.push(box['box_id']);
        }
        return id_array;
    }
}

module.exports = {
    class : ldp_class
};
