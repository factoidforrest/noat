
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (t) => {
        t.primary().uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).notNull(); //index automatic with primary key
        t.text('title').index(); //this could be slow eventually i guess
        t.text('body');
        t.timestamps();
        
        //relations
        t.uuid('sub_id').index();
        t.uuid('owner_id').index();

    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
