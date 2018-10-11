class tesseract_request {

    /**
     *
     * @class tesseract_request
     * @description Object representation of data needed for a tesseract call
     * @property {string} image_path - LDP path to image
     * @property {number} box_x_loc The horizontal location of the the top left point of the bounding box (in pixels).
     * @property {number} box_y_loc The vertical location of the the top left point of the bounding box (in pixels).
     * @property {number} box_width The width of the bounding box (in pixels).
     * @property {number} box_height The height of the bounding box (in pixels).
     * @property {number} rotation_angle The angle that the image should be rotated at. (0-359)
     */
    constructor(image_path, box_x_loc, box_y_loc, box_width, box_height, rotation_angle){
        this._image_path = image_path;
        this._box_x_loc = box_x_loc;
        this._box_y_loc = box_y_loc;
        this._box_width = box_width;
        this._box_height = box_height;
        this._rotation_angle = rotation_angle;
    }


    get image_path() {
        return this._image_path;
    }

    set image_path(value) {
        this._image_path = value;
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

    get box_width() {
        return this._box_width;
    }

    set box_width(value) {
        this._box_width = value;
    }

    get box_height() {
        return this._box_height;
    }

    set box_height(value) {
        this._box_height = value;
    }

    get rotation_angle() {
        return this._rotation_angle;
    }

    set rotation_angle(value) {
        this._rotaettion_angle = value;
    }

    generate_tesseract_query(server){
        // todo: document function
        // {scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}
        let schema = 'https'

        let prefix = 'fcrepo/rest'
        let identifier = this.image_path

        let box_dims_to_delmit = [this.box_x_loc, this.box_y_loc, this.box_width, this.box_height]
        let region = box_dims_to_delmit.join(',')

        let size = 'full'
        let rotation = this.rotation_angle
        let quality = 'full'

        let url_params_to_delimit = [prefix, identifier, region, size, rotation, quality]
        let url_params = url_params_to_delimit.join('/')

        let format = 'jpg'

        let tesseract_query =   schema + '://' + url_params + '.' + format

        return tesseract_query
    }

}

module.exports = {
    class : tesseract_request
};
