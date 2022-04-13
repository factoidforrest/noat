

module.exports = (bookshelf) => {
    let Comment = global.Comment = bookshelf.Model.extend({
        tableName: 'comments',
        hasTimestamps: true,
        /*
         constructor: function() {
         bookshelf.Model.apply(this, arguments);
         this.on('saving', function(model, attrs, options) {

         });
         }
         */


        //RELATIONS
        user: function () {
            return this.belongsTo(User);
        }




    });
    return Post;
}