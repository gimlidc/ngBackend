var pgp = require("pg-promise")(/*options*/);
var db = pgp('postgres://a2skoleni:a2skoleni@localhost:5432/a2skoleni');
var exports = module.exports = {};

exports.getUser = function(id) {
    return db.one('SELECT * FROM users WHERE id=$1', id);
};

exports.getUsersFromDb = function () {
    return db.any('SELECT id, firstname, lastname, birthdate FROM users');
};

exports.insertUser = function(user) {
    return db.query('INSERT INTO users (firstname, lastname, birthdate, phonenumber, ' +
        'email, accountBalance, personalIdentificationNumber) ' +
        'VALUES($1, $2, $3, $4, $5, $6, $7)', [
            user.body.firstname,
            user.body.lastname,
            user.body.birthdate,
            user.body.phonenumber,
            user.body.email,
            user.body.accountbalance,
            user.body.personalidentificationnumber
        ]
    );
};

exports.updateUser = function(id, user) {
    return db.query('UPDATE users SET firstname = $1, lastname = $2, birthdate = $3, phonenumber = $4, ' +
        'email = $5, accountBalance = $6, personalIdentificationNumber = $7' +
        ' WHERE id=$8', [
            user.body.firstname,
            user.body.lastname,
            user.body.birthdate,
            user.body.phonenumber,
            user.body.email,
            user.body.accountbalance,
            user.body.personalidentificationnumber,
            id
    ])
};

exports.deleteUser = function(id) {
    return db.query('DELETE users WHERE id=$1', [id]);
};