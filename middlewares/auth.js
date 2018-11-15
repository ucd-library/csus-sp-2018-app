const request = require('request-promise');
const local_host = require('../config').local_host;

// Simple username, password, email user creation
exports.create_user = function (username, password, email) {
    let query = 'http://' + local_host + '/auth/basic/user';

    let options = {
        json: true,
        body: {
            username:   username,
            password:   password,
            email:      email
        }
    }

    return request.post(query, options);
}

// Had to throw some weird options here to deal with the 302 response Davis sends
exports.login = function (username, password) {
    let query = 'http://' + local_host + '/auth/basic/login';

    let options = {
        json: true,
        body: {
            username: username,
            password: password
        },
        resolveWithFullResponse: true,
        simple: false
    }

    return request.post(query, options)
}

// See to do in tesseract_controller
exports.get_user_info = function (username) {
    let query = 'http://' + local_host + '/auth/basic/user/' + username;

    return request.get(query)
}