/* tesseract_controller.js */

const express = require('express');
const router = express.Router();
const SchemaValidator = require('../middlewares/schema_validator');

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true);

// generic route handler
const genericHandler = (req, res, next) => {
    res.json({
        status: 'success',
        data: req.body
    });
};

// create a new teacher or student
router.post('/1', validateRequest, genericHandler);

module.exports = router;