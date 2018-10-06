// Import express package
const express = require('express')

// Instantiate an express object
const app = express()
const port = 5000

// All static files will be coming from the public folder
app.use(express.static('public'))

// Routing files
var tesseract = require('./controllers/tesseract_controller')
var ldp = require('./controllers/ldp_controller')

// When we first load the server it will send index.html
app.get('/', function(req, res){
    res.sendFile("index.html", {root: '.'})
})

// localhost:3000/ocr or /ldp implementation
app.use('/tesseract', tesseract)
app.use('/ldp', ldp)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
