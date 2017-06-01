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

router.get('/:id/details', function (req, res) {
    switch(parseInt(req.params.id)) {
        case 1:
            res.send({"name": "Pepa", "surname": "Novák", "birthYear": 1920});
            break;
        case 2:
            res.send({
                "name": "Franta",
                "surname": "Liška",
                "birthYear": 2010,
                "address": {
                    "street": "Jehovova",
                    "streetNumber": "1250b",
                    "city": "Praha",
                    "zipCode": "11000",
                    "country": "Czech Republic"
                },
                "email": "franta.liska@gmail.com",
                "phoneNumber": "+420777189999",
                "personalIdentificationNumber": "101010/0300"
            });
            break;
        case 3:
            res.send({"name": "Pan", "surname": "Někdo", "birthYear": 1980});
            break;
        default:
            res.status(404).send({"error": "User not found"});
    }
});

/* PUT new users listing. */
router.put('/new', validate({body: userSchema}), function (req, res) {
    res.send("user accepted");
});

module.exports = router;
