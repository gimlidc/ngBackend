var express = require('express');
var router = express.Router();
var validate = require('express-jsonschema').validate;

var userSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "vokativ": {
            "type": "string",
            "description": "Call name of the user",
            "required": true
        },
        "email": {
            "type": "string",
            "format": "email",
            "description": "A users email - works also as a login",
            "required": true
        },
        "password": {
            "type": "string",
            "description": "A users password",
            "required": true
        }
    }
};

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* PUT new users listing. */
router.put('/new', validate({body: userSchema}), function (req, res) {
    res.send("user accepted");
});

module.exports = router;
