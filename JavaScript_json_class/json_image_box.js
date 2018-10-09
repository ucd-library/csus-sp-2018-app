
function image_json_object(image_box_object) {

  img_data_structure : {

      'user' : image_box_object.user() ,
      'image_path' : image_box_object.image_path() ,
      'image_file' : image_box_object.image_file() ,
      'img_height' : image_box_object.img_height() ,
      'img_width' : image_box_object.img_width() ,
      'rotation_angle' : image_box_object.rotation_angle() ,
      'auth_token' : image_box_object.auth_token() ,
      'create_time_stamp' : image_box_object.create_time_stamp() ,
      'last_updated_time_stamp' : image_box_object.last_updated_time_stamp() ,

       // array of json objects
      'existing_boxes' : [
          {
             'box_id' : image_box_object.box_id() ,
             'box_label' : image_box_object.box_label() ,
             'box_x_loc' : image_box_object.box_x_loc() ,
             'box_y_loc' : image_box_object.box_y_loc() ,
             'box_height' : image_box_object.box_height() ,
             'box_width' : image_box_object.box_width() ,
             'original_data' : image_box_object.original_data() ,
             'corrected_data' : image_box_object.corrected_data()
          }
       ]
    }

    return img_data_structure;
}
