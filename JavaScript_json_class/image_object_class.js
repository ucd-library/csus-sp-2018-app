/*
Structure of image Json object:

img_data_structure = {
    'user' = 'String'
    'image_path' = 'url',
    'image_file' = 'type of jpg/png',
    'img_height' = 'int',
    'img_width' = 'int',
    'rotation_angle' = 'int 0-359'
    'auth_token' = ?,
    'create_time_stamp' = 'datetime',
    'last_updated_time_stamp' = 'datetime',
     // array of json objects
    'existing_boxes' = [
        {
            box_id = 'incremented int'
            box_label = 'str'
            box_x_loc = 'int',
            box_y_loc = 'int',
            box_height = 'int',
            box_width = 'int'
            original_data = 'str',
            corrected_data = 'str
        }, ...
     ]
  }
*/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// https://googlechrome.github.io/samples/classes-es6/

class image_object_class {

  constructor(user, image_path, image_file, img_height, img_width, rotation_angle,
             auth_token, create_time_stamp, last_updated_time_stamp, box_id, box_label,
             box_x_loc, box_y_loc, box_height, box_width, original_data, corrected_data) {

             this.user = user;
             this.image_path = image_path;
             this.image_file = image_file;
             this.img_height = img_height;
             this.img_width = img_width;
             this.rotation_angle = rotation_angle;
             this.auth_token = auth_token;
             this.create_time_stamp = create_time_stamp;
             this.last_updated_time_stamp = last_updated_time_stamp;
             this.box_id = box_id;
             this.box_label = box_label;
             this.box_x_loc = box_x_loc;
             this.box_y_loc = box_y_loc;
             this.box_height = box_height;
             this.box_width = box_width;
             this.original_data = original_data;
             this.corrected_data = corrected_data;
  }

  get user() {
     return user;
  }

  set user(user) {
      this.user = user;
  }


  get image_path() {
      return image_path;
  }

  set image_path(image_path) {
      this.image_path = image_path;
  }


  get image_file() {
      return image_file;
  }

  set image_path(image_file) {
      this.image_file = image_file;
  }

  get img_height() {
      return img_height;
  }

  set img_height(img_height) {
      this.img_height = img_height;
  }

  get img_width() {
      return img_width;
  }

  set img_width(img_width) {
      this.img_width = img_width;
  }

  get rotation_angle() {
       return rotation_angle;
  }

  set rotation_angle(rotation_angle) {
      this.rotation_angle = rotation_angle;
  }

  get auth_token() {
      return auth_token;
  }

  set auth_token(auth_token) {
      this.auth_token = auth_token;
  }

  get create_time_stamp() {
      return create_time_stamp;
  }

  set create_time_stamp(create_time_stamp) {
      this.create_time_stamp = create_time_stamp;
  }

  get last_updated_time_stamp() {
      return last_updated_time_stamp;
  }

  set last_updated_time_stamp(last_updated_time_stamp) {
      this.last_updated_time_stamp = last_updated_time_stamp;
  }

  get box_id() {
      return box_id;
  }

  set box_id(box_id) {
      this.box_id = box_id;
  }

  get box_label() {
      return box_label;
  }

  set box_label(box_label) {
      this.box_label = box_label;
  }

  get box_x_loc() {
       return  box_x_loc;
  }

  set box_x_loc(box_x_loc) {
      this.box_x_loc = box_x_loc;
  }

  get box_y_loc() {
      return box_y_loc;
  }

  set box_y_loc(box_y_loc) {
      this.box_y_loc = box_y_loc;
  }

  get box_height() {
      return box_height;
  }

  set box_height(box_height) {
      this.box_height = box_height;
  }

  get box_width() {
      return box_width;
  }

  set box_width(box_width) {
      this.box_width = box_width;
  }

  get original_data() {
      return original_data;
  }

  set original_data(original_data) {
      this.original_data = original_data;
  }

  get corrected_data() {
      return corrected_data;
  }

  set corrected_data(corrected_data) {
      this.corrected_data = corrected_data;
  }

}
