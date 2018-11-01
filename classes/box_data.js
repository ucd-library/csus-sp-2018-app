const Joi = require('joi');

const config = require('../config')
const parsing = require('../middlewares/parsing')
const box_data_schema = require('../middlewares/validation/joi_schemas/tesseract_schemas').box_data;

let box_id = 0;

class box_data {
    /**
     * @class box_data
     * @description Object that contains parsed tesseract response and functionality for correcting that data.
     * It also generates a unique ID for every call and contains all data sent to Tesseract.
     *
     * @property {string} tesseract_request - The object representation of the data sent to us by client to query Tesseract with.
     * @property {string} corrected_data - The corrections (if any) to what Tesseract thought the selected text said
     * @property {xml} ocr_data - The raw unparsed response from Tesseract
     * @property {number} box_id - Static, unique identifier for box object.
     */

    constructor(ocr_data, tesseract_request) {
        this._tesseract_request = tesseract_request;
        this._corrected_data = null;
        this._ocr_data = ocr_data;
        this._parsed_data = parsing.hocrParser(ocr_data);
        this._box_id = box_id++;

        Object.freeze(this._box_id);
        Object.freeze(this._ocr_data);
        Object.freeze(this._parsed_data);
        Object.freeze(this._tesseract_request);

        let validation_result = Joi.validate(this, box_data_schema);  // Object must meet standards set by box_data_schema
        if (validation_result.error){
            throw new TypeError(validation_result.error);
        }

    }

    get box_id() {return this._box_id}

    get parsed_data(){return this._parsed_data;}

    get ocr_data(){return this._ocr_data;}

    get box_location_information(){
        /**
         * @method box_location_information
         * @description - Return the x and y coordinates and width and height of the box object.
         * @returns {{box_y_loc: number,box_width: number, box_height: number, image_path: string, box_x_loc: number, rotation_angle: number}}
         */
        let data = this._tesseract_request.options;

        delete data.image_path;

        return data;
    }

    get tesseract_query(){
        return this._tesseract_request.generate_tesseract_query(config.local_host);
    }

    get corrected_data() {return this._corrected_data;}

    set corrected_data(value){
        if (typeof value != 'string' && value != null){
            throw Error('value passed to corrected_data must be of type String');
        } else {
            this._corrected_data = value;
        }
    }

    get flattened_data(){
        let tesseract_request = this._tesseract_request;
        let request_data = tesseract_request.options;

        let data = {
            box_id              : this._box_id,
            corrected_data      : this._corrected_data,
            parsed_data         : this._parsed_data,
            ocr_data            : this._ocr_data,
            image_path          : request_data.image_path,
            box_x_loc           : request_data.box_x_loc,
            box_y_loc           : request_data.box_y_loc,
            box_width           : request_data.box_width,
            box_height          : request_data.box_height,
            rotation_angle      : request_data.rotation_angle,
            query               : tesseract_request.generate_tesseract_query(config.local_host)
        }

        return data;
    }

}

module.exports = {
    class : box_data
}