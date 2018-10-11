

class box_data {

    constructor(box_id, box_label, box_x_loc, box_y_loc, box_height, box_width, original_data, corrected_data){
        this._box_id = box_id;
        this._box_label = box_label;
        this._box_x_loc = box_x_loc;
        this._box_y_loc = box_y_loc;
        this._box_height = box_height;
        this._box_width = box_width;
        this._original_data = original_data;
        this._corrected_data = corrected_data;
    }

    get box_id() {
        return this._box_id;
    }

    set box_id(value) {
        this._box_id = value;
    }

    get box_label() {
        return this._box_label;
    }

    set box_label(value) {
        this._box_label = value;
    }

    get box_x_loc() {
        return this._box_x_loc;
    }

    set box_x_loc(value) {
        this._box_x_loc = value;
    }

    get box_y_loc() {
        return this._box_y_loc;
    }

    set box_y_loc(value) {
        this._box_y_loc = value;
    }

    get box_height() {
        return this._box_height;
    }

    set box_height(value) {
        this._box_height = value;
    }

    get box_width() {
        return this._box_width;
    }

    set box_width(value) {
        this._box_width = value;
    }

    get original_data() {
        return this._original_data;
    }

    set original_data(value) {
        this._original_data = value;
    }

    get corrected_data() {
        return this._corrected_data;
    }

    set corrected_data(value) {
        this._corrected_data = value;
    }
}

console.log(new box_data(1, 'sample', 100.0, 200.0, 300.0, 400.0, 'Original Data', 'Corrected Data'))