
const joi = require('joi')
const request = require('request')


exports.get = function(user, text, cb) {
    const options = {
        url: 'http://localhost:3000/fcrepo/rest/collection/example_3-catalogs/catalogs/199/media/images/199-3/svc:tesseract/full/full/0/default.jpg',
        method: 'GET',
        headers: {
            'Accept': 'application/hocr+xml',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'Chrome/67.0.3396.99'
        }
    };

    request(options, function(err, res, body) {
        console.log(res)
    });
}