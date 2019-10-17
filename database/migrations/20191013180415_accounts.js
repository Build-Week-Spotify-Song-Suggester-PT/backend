
exports.up = function(knex) {
    return knex.schema.createTable('accounts', account => {
        account.increments('id');
        account.string('name', 255)
            .notNullable();
        account.string('email', 255)
            .notNullable()
            .unique();
        account.string('password', 255)
            .notNullable();
    })
};

exports.down = function(knex) {
    knex.schema
        .dropTableIfExists('accounts');
};
