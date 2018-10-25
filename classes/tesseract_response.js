const Joi = require('joi')
const tesseract_request = require('./tesseract_request').class
const tesseract_response_schema = require('../middlewares/validation/joi_schemas/tesseract_schemas').tesseract_response_schema

class tesseract_response {

    /**
     * @class tesseract_response
     * @description Object representation of the data received from tesseract after it processes an image. Immutable
     * @property {json} parsed_data Data parsed from ocr_data (xml) into json
     * @property {xml} ocr_data The textual interpretation response from tesseract.
     * It will come back as hocr data and then be overrided with the parsed textual version of it
     * @property {tesseract_request} tesseract_request The instance of the tesseract_request class
     * that made the call intially.
     */

    constructor(options){
        const validation_result = Joi.validate(options, tesseract_response_schema);

        if (validation_result.error){
            throw new TypeError(validation_result.error);
        } else {
            this.parsed_data = options.parsed_data;
            this.ocr_data = options.ocr_data;
            this.tesseract_request = options.tesseract_request;
        }

        Object.freeze(this)

        // parameters that are objects have to be frozen
        Object.freeze(this.tesseract_request);
    }

    get options(){
        let options = {
            'parsed_data': this.parsed_data,
            'ocr_data': this.ocr_data,
            'tesseract_request': this.tesseract_request
        }

        return options
    }
}

module.exports = {
    class : tesseract_response
};

