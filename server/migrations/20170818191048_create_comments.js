
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', (t) => {

        t.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary(); //index automatic with primary key
        t.uuid('user_id').index();
        t.uuid('parent_id');
        t.text('body');
        t.timestamps();

        //relations


    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments');
};
