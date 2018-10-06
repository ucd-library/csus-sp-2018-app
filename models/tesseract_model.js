const joi = require('joi')
const request = require('request')

exports.get = function(user, text, cb) {
    const options = {
        url: 'http://localhost:3000/fcrepo/rest/collection/example_3-catalogs/catalogs/199/media/images/199-3/svc:tesseract/full/full/0/default.jpg',
        method: 'POST',
        headers: {
            'Accept': 'application/hocr+xml',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'Chrome/67.0.3396.99'
        }
    };

    // Call request api. Pass the options variable.
    // The return of the function is going be
    //  err: if true, there was an error
    //  res: headers, other metadata
    //  body: the body of the HTTP request
    request(options, function(err, res, body) {
        tesseract_data = body

        //todo create data parser function called parse_tesseract_data(data) ---> parsed_data

        parsed_data = parse_tesseract_data(tesseract_data)

        return parsed_data
    });
}

function parse_tesseract_data(data) {
    //parse data with package
    return parsed_data
}