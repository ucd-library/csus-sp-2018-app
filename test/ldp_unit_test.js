//Determine testing types:
let chai = require('chai').should();
let expect = require('chai').expect;

const ldp_schema = require('../middlewares/validation/joi_schemas/ldp_schemas').ldp_schema;
const ldp_class = require('../classes/ldp').class;
const Joi = require('joi');

let  image_path = 'myPath/path1';
let  image_height = 20;
let  image_width = 100;
let  box_list = [1, 2, 3];
let  time_stamp = '9/28/2018 2:23:15 PM';
let  user = 'TestUser';

let  ldp_new;
let  box = 8; //make sure this is correct

let add_to_box_list_output = [1, 2, 3, 5];
let get_box_output = 2;
let deleted_box_output = [1, 2];
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
  let options = {
      'user' : user,
      'image_path': image_path,
      'image_height': image_height,
      'image_width': image_width,
      'time_stamp' : time_stamp,
      'box_list': box_list
  };
  const validation_request = Joi.validate(options, ldp_schema);
  ldp_new = new ldp_class(options);

});

describe('ldp_class', () => {

  describe('#options()', () => {
     //Test case 1
     it('make sure options are correct', () => {
         expect(ldp_new.options).to.eql(options_output);
     });
  });


   describe('#add_to_box_list()', () => {
      //Test case 2
      it('add to box_list by passing box_data', () => {
          console.log(ldp_new.options)
          expect(ldp_new.add_to_box_list(5)).to.eql(add_to_box_list_output);
      });
   });

   describe('#delete_box()', () => {
     //Test case 3
     it('Delete box by passing the id', () => {
        expect(ldp_new.delete_box(3)).to.eql(deleted_box_output);
      });
   });

    describe('#get_box()', () => {
      //Test case 4
      it('Get box by passing the id', () => {
          expect(ldp_new.get_box(2)).to.eql(get_box_output);
      });

    });

})
