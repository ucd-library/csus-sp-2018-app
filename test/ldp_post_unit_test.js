//Determine testing types:
let chai = require('chai').should();
let expect = require('chai').expect;

const ldp_post = require('../classes/ldp_post').class;

let  image_path = 'myPath/path1';
let  overall_height = 20;
let  overall_width = 100;
let  box_list = [1,2,3,4,5,6,7];
let  ldp_post_new;
let  box = 8; //make sure this is correct

let get_box_output = 2;
let delete_box_output = [1, 2, 4, 5, 6, 7];
let append_box_output = [ 1, 2, 4, 5, 6, 7, 8 ];
let override_box_output = [ 1, 2, 4, 5, 6, 7 ];

// Create before every test.
before(() => {
  let options = {
      'image_path': image_path,
      'overall_height': overall_height,
      'overall_width': overall_width,
      'box_list': box_list
  };

  ldp_post_new = new ldp_post(options);

});

describe('ldp_post', () => {

    //Fix this test case
    describe('#get_box()', () => {
      //Test case 1
      it('Get box by passing the id', () => {
          expect(ldp_post_new.get_box(2)).to.equal(get_box_output);
          //box is undefined
      });

    });

    describe('#delete_box()', () => {
      //Test case 2
      it('Delete box by passing the id', () => {
         expect(ldp_post_new.delete_box(3)).to.eql(delete_box_output);
       });
    });


    describe('#append_box()', () => {
      //Test case 3
      it('Append the new box to the box list', () => {
          expect(ldp_post_new.append_box(box)).to.eql(append_box_output);
       });
    });

    describe('#override_box()', () => {
      //Test case 4
      it('Override box by passing id and box', () => {
          expect(ldp_post_new.override_box(6,22)).to.eql(override_box_output);
      });
    });
})
