const db = require('../../database/dbConfig.js');


module.exports = {
    createAccount,
    findById,
    findByEmail,
    deleteAccount
};

// DATABASE FUNCTIONS BELOW

function createAccount(account) {
    return db('accounts')
        .insert(account)
        .returning("id")
        .then(ids => findById(ids[0]))
}

function findById(id) {
    return db('accounts')
        .where('id', id)
        .first();
}

function findByEmail(email) {
    return db('accounts')
        .where(email)
        .first();
}

// function getAccountInfo(id) {
//     const accountQuery = db('accounts')
//         .where({ id })
//         .first();
//     return Promise.all([accountQuery, ])
// }

function deleteAccount (id) {
    return db('accounts')
        .where({ id })
        .del();
}