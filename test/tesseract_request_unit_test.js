// TODO: Add actual expected and equal values

//Determine testing types:
let chai = require('chai').should();
let expect = require('chai').expect;

const tesseract_request = require('../classes/tesseract_request').class;


 describe('tesseract_resquest', () => {
/*
  describe('#tesseract_request()', () => {
       //Test case 1
      it('requires two numerical arguments', () => {
          (() => {
            new tesseract_request.constructor("ocr_data");
          }).should.not.throw(Error);
        });

        //Test case 2
        it('one argument error', () => {
           (() => {
             new tesseract_request('foo');
           }).should.throw(Error);
         });

        //Test case 3
        it('No argument error', () => {
            (() => {
              new tesseract_request();
            }).should.throw(Error);
          });

   });
*/

   let  tes_req;
   let  image_path = 'myPath/path1';
   let  box_x_loc = 20;
   let  box_y_loc = 30;
   let  box_width = 100;
   let  box_height = 200;
   let  rotation_angle = 36;

   let region = box_x_loc + ',' + box_y_loc + ',' + box_width + ',' + box_height;
   //{scheme}://{server}{/prefix}/{identifier}/{svc}/{region}/{size}/{rotation}/{quality}.{format}*
   let expected_output = 'http://localhost:3000/fcrepo/rest/'+ image_path + '/' +
    'svc:tesseract' + '/' + region + '/' + 'full' + '/' + rotation_angle + '/' + 'default' + '.jpg';

   console.log(expected_output);

   // Create a new tesseract_resquest object before every test.
   beforeEach(() => {

     let options = {
         'image_path': image_path,
         'box_x_loc': box_x_loc,
         'box_y_loc': box_y_loc,
         'box_width': box_width,
         'box_height': box_height,
         'rotation_angle': rotation_angle
   };
        tes_req = new tesseract_request(options);
   });

   describe('#generate_tesseract_query()', () => {

       //Test case 4
       it('Generates fully qualified query to send to tesseract', () => {
            expect(tes_req.generate_tesseract_query("localhost:3000")).to.equal(expected_output);
        });

   });

 })
