
 Written by Ehsan


  documentations:

  chai: https://www.chaijs.com/
  mocha: https://mochajs.org/

  https://www.youtube.com/watch?v=MLTRHc5dk6s
  https://medium.com/@madhanganesh/how-to-mock-es6-class-749da63268fc
  https://medium.com/the-web-tub/mocha-chai-js-unit-testing-for-es6-with-istanbul-code-coverage-11b2a141a446
  https://stackoverflow.com/questions/21396524/what-is-the-difference-between-assert-expect-and-should-in-chai


 ----------------------------------------------------------------
  to install:

  npm install mocha
  npm install chai

  ----------------------------------------------------------------

  Added "test": "mocha"  in pachage.json
  to run: npm test or npm run test -s  ()-s hides unnecessary errors)

  ----------------------------------------------------------------

 1. `describe()` is merely for grouping, which you can nest as deep

 2. `it()` is a test case

 3. `before()`, `beforeEach()`, `after()`, `afterEach()` are hooks to run
    before/after first/each it() or describe().

    Which means, `before()` is run before first it()/describe()

  ----------------------------------------------------------------

 Example:

 var assert = require('assert');
 describe('Array', function() {
   describe('#indexOf()', function() {
     it('should return -1 when the value is not present', function() {
       assert.equal([1,2,3].indexOf(4), -1);
     });
   });
 });
