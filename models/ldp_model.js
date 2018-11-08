const ldp_request = require('../classes/ldp').class;
const request = require('request-promise');
const api = require('@ucd-lib/fin-node-api');
const jwt = require('jsonwebtoken')
const config = require('../config')

const query_options = {
    method: 'GET',
    headers:{
        Accept: 'image/jpeg'
    }
};



exports.ldp_object = function (body){

    let options = {
        'user': body['user'],
        'image_path': body['image_path'],
        'image_height': body['image_height'],
        'image_width': body['image_width'],
        'time_stamp': body['time_stamp'],
        'box_list': body['box_list']
    };

    return new ldp_request(options);
};

// exports.init_ldp = function (user, image_path) {
//
//     values = {
//         username: user,
//         admin: true
//     }
//
//     options = {
//         expiresIn: '7w',
//         issuer: 'mylibrary.org'
//     }
//
//     let secret = 'lax';
//
//     token = jwt.sign(values, secret, options)
//
//     config_vals = {
//         host:'http://localhost:3000',
//         jwt: token,
//
//     }
//
//     api.setConfig(config_vals)
//
//     let path = image_path +
//
//     console.log(path)
//
//     return api.get({path});
//
//
//
//
//
// }

