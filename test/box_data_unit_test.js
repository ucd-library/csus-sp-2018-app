//Determine testing types:
let chai = require('chai').should();
let expect = require('chai').expect;
const fs = require('fs'); // read files

const config = require('../config');
const box_data = require('../classes/box_data').class;
const tesseract_request = require('../classes/tesseract_request').class;

let  boxData;
let  tes_req;
let  request_data;
let  image_path = 'myPath/path1';
let  box_x_loc = 20;
let  box_y_loc = 30;
let  box_width = 100;
let  box_height = 200;
let  rotation_angle = 36;

//Read Sample data files
let sample_Parsed_Data = fs.readFileSync('test/Sample_Parsed_Data.txt', 'utf8').match(/([^\\(\\n)"\s]).*([^\\(\\n)"\s])/g)[0];
let ocr_data = fs.readFileSync('test/Sample_OCR_Data.txt', 'utf8');

let region = box_x_loc + ',' + box_y_loc + ',' + box_width + ',' + box_height;
let expected_output = 'http://digital.ucdavis.edu/fcrepo/rest/'+ image_path + '/' +
'svc:tesseract' + '/' + region + '/' + 'full' + '/' + rotation_angle + '/' + 'default' + '.jpg';


let tesseract_query_output = 'http://digital.ucdavis.edu/fcrepo/rest/myPath/path1/svc:tesseract/20,30,100,200/full/36/default.jpg';
let corrected_data_output = "This is Test";
let corrected_data_value = "This is Test";
let flattened_data_output = { box_id: 5,
                              corrected_data: null,
                              parsed_data: sample_Parsed_Data,
                              ocr_data: ocr_data,
                              image_path: image_path,
                              box_x_loc: box_x_loc,
                              box_y_loc: box_y_loc,
                              box_width: box_width,
                              box_height: box_height,
                              rotation_angle: rotation_angle,
                              query: tesseract_query_output };


// Create a new box_data object before every test.
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
  request_data = tes_req.options;
  boxData = new box_data(ocr_data, tes_req);

  let data = {
      box_id              : boxData._box_id,
      corrected_data      : boxData._corrected_data,
      parsed_data         : boxData._parsed_data,
      ocr_data            : boxData._ocr_data,
      image_path          : request_data.image_path,
      box_x_loc           : request_data.box_x_loc,
      box_y_loc           : request_data.box_y_loc,
      box_width           : request_data.box_width,
      box_height          : request_data.box_height,
      rotation_angle      : request_data.rotation_angle,
      query               : tes_req.generate_tesseract_query(config.local_host)
  }

 });

 describe('box_data', () => {

   //Test case 1:  tesseract_query()
   describe('#tesseract_query()(happy case)', () => {

       it('make sure tesseract returns the correct query (happy case)', () => {
            expect(boxData.tesseract_query).to.equal(tesseract_query_output);
        });

   });

   //Test case 2: corrected_data()
   describe('#corrected_data()(happy case)', () => {

       it('Make sure it corrects data(happy case)', () => {

            boxData.corrected_data = corrected_data_value;
            expect(boxData.corrected_data).to.equal(corrected_data_output);
        });

   });


   //Parse Data does not match.
   //Test case 3: flattened_data()
   describe('#flattened_data(happy case)', () => {

       it('Verify recieving correct flattened output(happpy case)', () => {
           //console.log(boxData.flattened_data);
           expect(boxData.flattened_data).to.eql(flattened_data_output);
        });

   });

 })
