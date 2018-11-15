const express = require('express');
const router = express.Router();

const request = require('request');

const ldp_model = require('../models/ldp_model');

const config = require('../config');

router.post('/',
    function(req, res) {

        let ldp_request_instance = ldp_model.ldp_request_object(req.body);

        let query = ldp_request_instance.generate_ldp_call(config.uc_davis_domain)

        console.log("Query to LDP: ", query);

        let options = {
            method: 'POST'
        };
        //Post call?
        /*
        request(query, options, function (error, response, body) {
            if (error){
                throw error;
            } else {

            }
        })*/
    }
)

module.exports = router;