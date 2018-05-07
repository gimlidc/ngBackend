var express = require('express');
var router = express.Router();
var validate = require('express-jsonschema').validate;
var db = require('../db/pg-interface.js');
var requests = 0;

var userSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "firstname": {
            "type": "string",
            "description": "The first name of the user",
            "required": true
        },
        "lastname": {
            "type": "string",
            "description": "the last name of the user",
            "required": true
        },
        "birthdate": {
            "type:": "string",
            "description": "The date of birth of the user",
            "required": true
        },
        "vokativ": {
            "type": "string",
            "description": "Call name of the user",
            "required": false
        },
        "email": {
            "type": "string",
            "format": "email",
            "description": "A users email - works also as a login",
            "required": false
        },
        "phoneNumber": {
            "type": "number",
            "description": "A czech phone number without country prefix",
            "required": false,
            "maximum": 999999999
        },
        "password": {
            "type": "string",
            "description": "A users password",
            "required": false
        },
        "accountBalance": {
            "type": "number",
            "description": "it is all about the money",
            "required": false
        },
        "address": {
            "type": "object",
            "properties": {
                "street": {
                    "type": "string",
                    "city": "string"
                }
            },
            "required": false
        }
    },
    "additionalProperties": false
};

/* GET users listing. */
router.get('/', function (req, res, next) {
    requests++;
    res.set({'Access-Control-Allow-Origin': '*'});

    if (requests % 2 === 0) {
        res.status(500).send({"error": "Service unavailable."});
    } else {
        db.getUsersFromDb().then((data) => {
            console.log(data);
            res.send(JSON.stringify(data));
        }).catch((error) => {
            console.log(error);
            res.status(500).send({"error": "Database connection failed."});
        });
        /**
        res.send([{
            "id": 1,
            "firstname": "Pepa",
            "lastname": "Novák",
            "birthdate": "1920-01-27"
        }, {
            "id": 2,
            "firstname": "Franta",
            "lastname": "Liška",
            "birthdate": "2010-05-31"
        }, {
            "id": 3,
            "firstname": "Pan",
            "lastname": "Někdo",
            "birthdate": "1980-10-21"
        }]);
         */
    }
});

router.get('/:id/details', function (req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    switch (parseInt(req.params.id)) {
        case 1:
            res.send({
                "firstname": "Pepa",
                "lastname": "Novák",
                "birthdate": "1920-01-27",
                "accountBalance": 789409.4783789478
            });
            break;
        case 2:
            res.send({
                "firstname": "Franta",
                "lastname": "Liška",
                "birthdate": "2010-05-31",
                "accountBalance": 85.7493747389,
                "address": {
                    "street": "Jehovova",
                    "streetNumber": "1250b",
                    "city": "Praha",
                    "zipCode": "11000",
                    "country": "Czech Republic"
                },
                "email": "franta.liska@gmail.com",
                "phoneNumber": "+420777189999",
                "personalIdentificationNumber": "101010/0300",
                "type": "admin"
            });
            break;
        case 3:
            res.send({
                "name": "Pan",
                "surname": "Někdo",
                "birthYear": 1980,
                "accountBalance": 78593.894073097232,
                "address": {
                    "street": "VŘSR",
                    "streetNumber": "1711",
                    "city": "Praha",
                    "zipCode": "16000",
                    "country": "Czech Republic"
                },
                "email": "pan.nekdo@gmail.com",
                "phoneNumber": "+420777777111",
                "personalIdentificationNumber": "801010/1000"
            });
            break;
        default:
            res.status(404).send({"error": "User not found"});
    }
});

router.get("/:id/adminRoles", function(req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    if (req.params.id === "2") {
        res.send({"roles": ["vládce světa", "matka draků", "správce terária"]});
    } else {
        res.status(404).send({"error": "User not found"});
    }
});

router.options("/new", function(req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    res.set({'Access-Control-Allow-Methods': "POST, PUT",
    "Access-Control-Allow-Headers": "Content-Type"});
    res.send("");
});

/* PUT new users listing. */
router.put('/:id/update', validate({body: userSchema}), function (req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    res.send("user accepted");
});

/* PUT new users listing. */
router.post('/new', validate({body: userSchema}), function (req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    db.insertUser(req).then(data => {
        res.send(data);
    }).catch(error => {
        console.log(error);
        res.status(500).send({"error": "DB entry failed"});
    });
});

module.exports = router;
