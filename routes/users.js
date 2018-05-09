var express = require('express');
var router = express.Router();
var validate = require('express-jsonschema').validate;
var db = require('../db/pg-interface.js');
var requests = 0;

var userSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "id": {
            "type": "number",
            "description": "The user unique id",
            "required": false
        },
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
        "phonenumber": {
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
        "accountbalance": {
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
        },
        "personalidentificationnumber": {
            "type": "string",
            "description": "The real-world identificator",
            "required": "false"
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
    }
});

router.get('/:id/details', function (req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    db.getUser(req.params.id).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(404).send({"error": "User not found"});
    });
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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',"PUT");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.send("");
});

router.options("/:id/update", function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',"PUT");
    res.header("Access-Control-Allow-Headers","Content-Type");
    res.send("");
});

/* PUT new users listing. */
router.put('/:id/update', validate({body: userSchema}), function (req, res) {
    res.set({'Access-Control-Allow-Origin': '*'});
    db.getUser(req.params.id).then(() =>
        db.updateUser(req.params.id, req).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(500).send({"error": error});
        })
    ).catch(error => {
        res.status(404).send({"error": "record not found, use POST instead"})
    })
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
