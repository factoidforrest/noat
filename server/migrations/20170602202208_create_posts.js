
exports.up = function(knex, Promise) {
    knex.schema.createTable('users', (t) => {
        t.increments().primary().index()
        t.text('title')


        //joins
        t.integer('sub_id').index()

    });
};

exports.down = function(knex, Promise) {
  
};
