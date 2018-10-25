class box_data {

    id_set = false;
    tesseract_response_set = false;

    constructor(tesseract_response, corrected_data, box_id) {
        this._box_id = box_id;
        this._tesseract_response = tesseract_response;
        this._corrected_data = corrected_data;
    }

    get box_id() {return this._box_id}

    get tesseract_response() {return this._tesseract_response}

    get corrected_data() {return this._corrected_data}

}