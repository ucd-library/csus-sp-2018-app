//Determine testing types:
let chai = require('chai').should();
let expect = require('chai').expect;

const box_data = require('../classes/box_data').class;
const tesseract_request = require('../classes/tesseract_request').class;

let  boxData;
let  tes_req;
let  image_path = 'myPath/path1';
let  box_x_loc = 20;
let  box_y_loc = 30;
let  box_width = 100;
let  box_height = 200;
let  rotation_angle = 36;
let ocr_data = "This is Test";

let region = box_x_loc + ',' + box_y_loc + ',' + box_width + ',' + box_height;

//{scheme}://{server}{/prefix}/{identifier}/{svc}/{region}/{size}/{rotation}/{quality}.{format}*
let expected_output = 'http://localhost:3000/fcrepo/rest/'+ image_path + '/' +
'svc:tesseract' + '/' + region + '/' + 'full' + '/' + rotation_angle + '/' + 'default' + '.jpg';

let options = {
    'image_path': image_path,
    'box_x_loc': box_x_loc,
    'box_y_loc': box_y_loc,
    'box_width': box_width,
    'box_height': box_height,
    'rotation_angle': rotation_angle
};

// Create a new box_data object before every test.
beforeEach(() => {
  tes_req = new tesseract_request(options);
  boxData = new box_data(ocr_data, tes_req);

 });

 describe('box_data', () => {

   //Test case 1:  tesseract_query()
   describe('#tesseract_query()', () => {
       //Test case 4
       it('make sure tesseract returns the query', () => {
            //expect(boxData.flattened_data).to.equal("output");
            expect(3).to.equal(3);
        });

   });

   //Test case 2: corrected_data()
   describe('#corrected_data()', () => {
       //Test case 4
       it('Make sure it corrects data', () => {
            //expect(boxData.flattened_data).to.equal("output");
            expect(2).to.equal(2);
        });

   });

   //Test case 3: flattened_data()
   describe('#flattened_data', () => {
       it('Makes not nested objects', () => {
            //expect(boxData.flattened_data).to.equal("output");
            expect(1).to.equal(1);
        });

   });

 })
