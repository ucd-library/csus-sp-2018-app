const Joi = require('joi')
const tesseract_schema = require('../middlewares/validation/joi_schemas/tesseract_schemas').tesseract_request_schema


class tesseract_request {

    /**
     * @class tesseract_request
     * @description Object representation of data needed for a tesseract call. Immutable
     * @property {string} options.image_path - LDP path to image
     * @property {number} options.box_x_loc The horizontal location of the the top left point of the bounding box (in pixels).
     * @property {number} options.box_y_loc The vertical location of the the top left point of the bounding box (in pixels).
     * @property {number} options.box_width The width of the bounding box (in pixels).
     * @property {number} options.box_height The height of the bounding box (in pixels).
     * @property {number} options.rotation_angle The angle that the image should be rotated at. (0-359)
     */
    constructor(options){

        const validation_result = Joi.validate(options, tesseract_schema);
        
        if (validation_result.error){
            throw new TypeError(validation_result.error);
        } else {
            this.image_path = options.image_path;
            this.box_x_loc = options.box_x_loc;
            this.box_y_loc = options.box_y_loc;
            this.box_width = options.box_width;
            this.box_height = options.box_height;
            this.rotation_angle = options.rotation_angle;
        }

        Object.freeze(this);

    }

    get options(){
        let options = {
            'image_path': this.image_path,
            'box_x_loc': this.box_x_loc,
            'box_y_loc': this.box_y_loc,
            'box_width': this.box_width,
            'box_height': this.box_height,
            'rotation_angle': this.rotation_angle
        }

        return options;
    }


    generate_tesseract_query(server){
        // todo: document function
        // {scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
        let schema = 'http'

        let prefix = 'fcrepo/rest'
        let identifier = this.image_path;

        let svc = 'svc:tesseract'

        let box_dims_to_delmit = [this.box_x_loc, this.box_y_loc, this.box_width, this.box_height]
        let region = box_dims_to_delmit.join(',')

        let size = 'full'
        let rotation = this.rotation_angle;
        let quality = 'default'

        let url_params_to_delimit = [server, prefix, identifier, svc, region, size, rotation, quality]

        let url_params = url_params_to_delimit.join('/')

        let format = 'jpg'

        let tesseract_query =   schema + '://' + url_params + '.' + format

        return tesseract_query
    }

}


module.exports = {
    class : tesseract_request
};
