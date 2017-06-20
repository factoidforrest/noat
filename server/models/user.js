const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
    let Post = global.Post = bookshelf.Model.extend({
        tableName: 'user',
        hasTimestamps: true,
        /*
         constructor: function() {
         bookshelf.Model.apply(this, arguments);
         this.on('saving', function(model, attrs, options) {

         });
         }
         */

        setPassword: async function(password) {
            let hash = await bcrypt.hash(password, null, null);
            this.set('password', hash);
            return Promise.resolve(hash);
        },

        checkPassword: function(passwordToCheck) {
            return bcrypt.compare(passwordToCheck, this.get('password'));
        }


        //RELATIONS



    });
};