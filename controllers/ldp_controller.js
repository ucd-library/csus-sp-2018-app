/* ldp_controller.js */

// todo: write logic for getting and posting to LDP

const express = require('express');
const request = require('request');
const router = express.Router();

const ldp_model = require('../models/ldp_model');

const config = require('../config');

/*
 *
 * On route localhost:$port/ldp
 * Validate!
 * Success? CLASS!
 *
 */

//TODO Get/Post?

router.post('/',
    function (req, res) {
        instance = ldp_model.ldp_class_object(req.body);

        //TODO create generate ldp query in ldp_class
        query = instance.generate_ldp_query(config.local_host);

        console.log("Query to LDP: ", query);

        options = {
            method: 'GET'//Post?

        };
        request(query, options, function (error, response, body){
            if (error)
                throw error;
            else {
                let response_instance = ldp_model.ldp_class_object(body, instance.options);

                res.send(response_instance.options)
            }
        })

});

module.exports = router;