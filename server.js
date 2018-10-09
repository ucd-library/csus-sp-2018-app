// Import express package
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Instantiate an express object
const app = express();
const port = 5000;

app.set('port', port);

// All static files will be coming from the public folder
app.use(express.static('public'));

// Routing files
var tesseract = require('./controllers/tesseract_controller');
var ldp = require('./controllers/ldp_controller');

// When we first load the server it will send index.html
app.get('/', function(req, res){
    res.sendFile("index.html", {root: '.'})
});

// localhost:3000/tesseract or /ldp implementation
//app.use('/tesseract', tesseract);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/tesseract', tesseract);
app.use('/ldp', ldp);

app.listen(port, () => console.log(`App running on port ${port}!`));
