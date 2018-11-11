// Import express package
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Instantiate an express object
const app = express();
const port = 5000;

app.set('port', port);

// All static files will be coming from the public folder
app.use(express.static('client/public/'));

// Routing files
let routes = require('./controllers/tesseract_controller');

// localhost:3000/tesseract

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// localhost:5000/
app.use('/', routes);



app.listen(port, () => console.log(`App running on port ${port}!`));

