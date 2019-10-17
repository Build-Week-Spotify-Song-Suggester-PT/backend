
exports.up = function(knex) {
    return knex.schema.createTable('accounts', account => {
        account.increments('id');
        account.string('name')
            .notNullable();
        account.string('email')
            .notNullable()
            .unique();
        account.string('password')
            .notNullable();
    })
};

exports.down = function(knex) {
    knex.schema
        .dropTableIfExists('accounts');
};
