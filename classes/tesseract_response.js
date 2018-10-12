const tesseract_request = require('./tesseract_request').class

class tesseract_response {

    /**
     * @class tesseract_response
     * @description Object representation of the data received from tesseract after it processes an image
     * @property {string} ocr_data The textual interpretation response from tesseract.
     * It will come back as hocr data and then be overrided with the parsed textual version of it
     * @property {tesseract_request} tesseract_request The instance of the tesseract_request class
     * that made the call intially.
     */

    constructor(ocr_data, tesseract_request){

        this._ocr_data = ocr_data;
        this._tesseract_request = tesseract_request;
    }

    get ocr_data() {
        return this._ocr_data;
    }

    set ocr_data(value) {
        this._ocr_data = value;
    }

    get tesseract_request() {
        return this._tesseract_request;
    }

    set tesseract_request(value) {
        this._tesseract_request = value;
    }
}