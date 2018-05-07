var pgp = require("pg-promise")(/*options*/);
var db = pgp('postgres://a2skoleni:a2skoleni@localhost:5432/a2skoleni');
var exports = module.exports = {};

exports.getUsersFromDb = function () {
    return db.any('SELECT * FROM users');
};

exports.insertUser = function(user) {
    return db.query('INSERT INTO users (firstname, lastname, birthdate, phonenumber, ' +
        'email, accountBalance, personalIdentificationNumber) ' +
        'VALUES($1, $2, $3, $4, $5, $6, $7)', [
            user.body.firstname,
            user.body.lastname,
            user.body.birthdate,
            user.body.phoneNumber,
            user.body.email,
            user.body.accountBalance,
            user.body.personalIdentificationNumber
        ]
    );
};