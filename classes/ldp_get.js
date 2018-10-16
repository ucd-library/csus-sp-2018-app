// todo: Correct this class for use in getting from ldp
// todo: Change this to match Google Vision format

class image_object_class {
    //Pass an object of the fields instead of fields
    constructor(user, image_path, image_file, img_height, img_width, rotation_angle,
                auth_token, create_time_stamp, last_updated_time_stamp, box_list) {
        this._user = user;
        this._image_path = image_path;
        this._image_file = image_file;
        this._img_height = img_height;
        this._img_width = img_width;
        this._rotation_angle = rotation_angle;
        // this._auth_token = auth_token;
        this._create_time_stamp = create_time_stamp;
        this._last_updated_time_stamp = last_updated_time_stamp;
        this._box_list = box_list;
    //
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get image_path() {
        return this._image_path;
    }

    set image_path(value) {
        this._image_path = value;
    }

    get image_file() {
        return this._image_file;
    }

    set image_file(value) {
        this._image_file = value;
    }

    get img_height() {
        return this._img_height;
    }

    set img_height(value) {
        this._img_height = value;
    }

    get img_width() {
        return this._img_width;
    }

    set img_width(value) {
        this._img_width = value;
    }

    get rotation_angle() {
        return this._rotation_angle;
    }

    set rotation_angle(value) {
        this._rotation_angle = value;
    }

    get auth_token() {
        return this._auth_token;
    }

    set auth_token(value) {
        this._auth_token = value;
    }

    get create_time_stamp() {
        return this._create_time_stamp;
    }

    set create_time_stamp(value) {
        this._create_time_stamp = value;
    }

    get last_updated_time_stamp() {
        return this._last_updated_time_stamp;
    }

    set last_updated_time_stamp(value) {
        this._last_updated_time_stamp = value;
    }

    add_box_to_box_list(box){
        this._box_list
    }
}

