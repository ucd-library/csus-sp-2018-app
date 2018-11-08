const api = require('@ucd-lib/fin-node-api');
const jwt = require('jsonwebtoken')
const config = require('../config')

/*
     Not sure if this file is going to stay or not.
     I just want to get this process tracked by git before I forget how to do it.

     Created user 'csus' and set the as non-admin

     What is going to be done is the values JSON is going to be hashed with a secret that will be stored on
     our server and the UC Davis local instance. The result of this has is a JSON Web Token (jwt)

     This how we are going to provide user authentication.
*/

values = {
    username: 'csus',
    admin: true
}

// Want the token to be good for 7 weeks so that way I don't have to worry about reissuing it.
// We are specifying the issuer for fin to validate against.
options = {
    expiresIn: '7w',
    issuer: 'mylibrary.org'
}

let secret = 'lax';

token = jwt.sign(values, secret, options)

/*
    The required values to configure fin-node-api are host, basePath, and the jwt.

    Definitions:
        host: where the server is located at
        basePath: the path to the fin repo. (defaulted to /fcrepo/rest)
        jwt: your created JSON Web Token
*/

config_vals = {
    host:'http://localhost:3000',
    jwt: token,

}

api.setConfig(config_vals)

// Just specifying a path that I know exists
// path = 'collection/example_3-catalogs'



path = '/collection'



let response = api.get({path});

// Returns a promise. Have to wait for the promise to resolve to get the value
response.then(function (result) {
    console.log(result.data.body)
})
