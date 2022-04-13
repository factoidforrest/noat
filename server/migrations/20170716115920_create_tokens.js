
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tokens', (t) => {

        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary(); //index automatic with primary key
        t.uuid('tokenable_id').index();
        t.string('tokenable_type');
        t.string('random_key').index();
        t.string('type').index(); //maybe create a multi index off of key and type since it will be chained
        t.timestamps()
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tokens');
};
