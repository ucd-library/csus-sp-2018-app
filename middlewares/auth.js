const request = require('request-promise');
const local_host = require('../config').local_host;

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

exports.get_user_info = function (username) {
    let query = 'http://' + local_host + '/auth/basic/user/' + username;

    return request.get(query)
}