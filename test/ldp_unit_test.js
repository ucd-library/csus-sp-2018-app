//Determine testing types:
let chai = require('chai').should();
let expect = require('chai').expect;

const ldp_schema = require('../middlewares/validation/joi_schemas/ldp_schemas').ldp_schema;
const ldp_class = require('../classes/ldp').class;
const Joi = require('joi');
const box_data = require('../classes/box_data').class;
const fs = require('fs'); // read files
const tesseract_request = require('../classes/tesseract_request').class;

let  image_path = 'myPath/path1';
let  image_height = 20;
let  image_width = 100;
let  time_stamp = '9/28/2018 2:23:15 PM';
let  user = 'TestUser';
let  box_x_loc = 20;
let  box_y_loc = 30;
let  box_width = 100;
let  box_height = 200;
let  rotation_angle = 36;

let  ldp_new;



let tes_options = {
  'image_path': image_path,
  'box_x_loc': box_x_loc,
  'box_y_loc': box_y_loc,
  'box_width': box_width,
  'box_height': box_height,
  'rotation_angle': rotation_angle
};

tes_req = new tesseract_request(tes_options);

let sample_Parsed_Data = fs.readFileSync('test/Sample_Parsed_Data.txt', 'utf8').match(/([^\\(\\n)"\s]).*([^\\(\\n)"\s])/g)[0];
let ocr_data = fs.readFileSync('test/Sample_OCR_Data.txt', 'utf8');

let box0 = new box_data(ocr_data, tes_req);
let box1 = new box_data(ocr_data, tes_req);
let box2 = new box_data(ocr_data, tes_req);

let box_list = [box0, box1];
let add_to_box_list_output = [box0, box1, box2];
let get_box_output = [0, 1];
let deleted_box_output = [box0];

let options_output = {
                        'user': user,
                        'image_path': image_path,
                        'image_height': image_height,
                        'image_width': image_width,
                        'time_stamp': time_stamp,
                        'box_list': box_list
                     }

// Create before every test.
beforeEach(() => {
  let box_test_list = [box0, box1];
  let before_options = {
      'user' : user,
      'image_path': image_path,
      'image_height': image_height,
      'image_width': image_width,
      'time_stamp' : time_stamp,
      'box_list': box_test_list
  };
  const validation_request = Joi.validate(before_options, ldp_schema);
  ldp_new = new ldp_class(before_options);
});

describe('ldp_class(happy case)', () => {

  describe('#options()', () => {
     //Test case 1
     it('make sure options are correct', () => {
         expect(ldp_new.options).to.eql(options_output);
     });
  });


   describe('#add_to_box_list()(happy case)', () => {
      //Test case 2
      it('add to box_list by passing box_data', () => {
          ldp_new.add_to_box_list(box2)
          expect(ldp_new.box_list).to.eql(add_to_box_list_output);
      });
   });

   describe('#delete_box()(happy case)', () => {
     //Test case 3
     it('Delete box by passing the id', () => {
        ldp_new.delete_box(1);
        ldp_new.delete_box(2);
        expect(ldp_new.box_list).to.eql(deleted_box_output);
      });
   });

    describe('#get_box_ids()(happy case)', () => {
      //Test case 4
      it('Get box by passing the id', () => {
          expect(ldp_new.get_box_ids()).to.eql(get_box_output);
      });

    });

})
