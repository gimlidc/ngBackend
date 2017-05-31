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
        "phoneNumber": {
            "type": "number",
            "description": "A czech phone number without country prefix",
            "required": true,
            "maximum": 999999999
        },
        "password": {
            "type": "string",
            "description": "A users password",
            "required": true
        }
    },
    "additionalProperties": false
};

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.set({'Access-Control-Allow-Origin': '*'});
    res.send('[{"name": "Pepa", "surname": "Novák", "birthYear": 1920},{"name": "Franta", "surname": "Liška", "birthYear": 2010}]');
});

/* PUT new users listing. */
router.put('/new', validate({body: userSchema}), function (req, res) {
    res.send("user accepted");
});

module.exports = router;
