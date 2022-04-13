

module.exports = (bookshelf) => {
    let Post = global.Post = bookshelf.Model.extend({
        tableName: 'posts',
        hasTimestamps: true,
        /*
         constructor: function() {
         bookshelf.Model.apply(this, arguments);
         this.on('saving', function(model, attrs, options) {

         });
         }
         */


        //RELATIONS
        owner: function () {
            return this.belongsTo(User, 'owner_id');
        },

        sub: function () {
            return this.belongsTo(Sub)
        }


    });
    return Post;
}