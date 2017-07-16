
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (t) => {

        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary(); //index automatic with primary key

        t.string('email').index();
        t.string('username').unique();
        t.string('password');
        t.string('confirmation_token').index();
        t.boolean('admin').defaultTo(false);
        t.boolean('active').notNull().defaultTo(true);
        //relations

        t.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
