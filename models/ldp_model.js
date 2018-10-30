
const joi = require('joi')
const request = require('request')
const fs = require('fs')

exports.get = function () {
    const options = {
        url: 'http://localhost:3000/fcrepo/rest/collection/example_3-catalogs/catalogs/199/media/images/199-3/svc:iiif/full/full/0/default.jpg',
        method: 'GET',
        headers: {
            'Accept': 'image/jpeg',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'Chrome/67.0.3396.99'
        }
    }

    request(options, function(err, res, body) {
        //todo Transform body of request into a usable image.
         image = body

    })

}

//todo sending data back to ldp from client