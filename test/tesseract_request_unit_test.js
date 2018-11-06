// TODO: Add actual expected and equal values

//Determine testing types:
let chai = require('chai').should();
let expect = require('chai').expect;

const tesseract_request = require('../classes/tesseract_request.js')

/*
 describe('tesseract_resquest', () => {

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


   let tes_req;

   // Create a new tesseract_resquest object before every test.
   afterEach(() => {
        tes_req = new tesseract_request.constructor("options");
   });

   describe('#generate_tesseract_query()', () => {

       //Test case 4
       it('Generates fully qualified query to send to tesseract', () => {
            expect(tes_req.generate_tesseract_query).to.equal("output");
        });

   });

 })
 */
