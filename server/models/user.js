const bcrypt = require('bcrypt');

module.exports = (bookshelf) => {
    let User = global.User = bookshelf.Model.extend({
        tableName: 'users',
        hasTimestamps: true,
        hidden: ['password', 'confirmation_token'],
        virtuals: {},
        /*
         constructor: function() {
         bookshelf.Model.apply(this, arguments);
         this.on('saving', function(model, attrs, options) {

         });
         }
         */


        setPassword: async function(password) {
            let hash = await bcrypt.hash(password, 12, null);
            this.set('password', hash);
            return Promise.resolve(hash);
        },

        checkPassword: function(passwordToCheck) {
            return bcrypt.compare(passwordToCheck, this.get('password'));
        },

        generateLoginToken: async function(){
             return this.related('tokens').create({type:'login'}) //returns a promise you can await
        },



        //RELATIONS
        tokens: function() {
            return this.morphMany(Token, 'tokenable');
        },

        posts: function(){
            return this.hasMany(Posts) //might need to specify that foreign key is "owner_id", not sure
        }


    }, {
        //Class Methods
        login: async function (username, password) {
            let user = await User.where({username: username.toLowerCase()}).fetch();
            if (!user) {
                return {code: 404, errName: 'UserNotFound'};
            } else if (!await user.checkPassword(password)) {
                return {code: 401, errName: 'PasswordIncorrect'};
            } else {
                let token = await user.generateLoginToken();
                return {code: 200, user: user, token: token};
            }
        },


        register: async function (userAttrs) {
            if (userAttrs.password.length < 6) return {code: 422, errName: 'passwordTooShort'}; //validate best practices on the client
            let forgedUser = User.forge({username:userAttrs.username.toLowerCase()});
            if (await forgedUser.fetch()) return {code:400, errName: 'usernameTaken'};
            await forgedUser.setPassword(userAttrs.password);
            return {code:200, user: await forgedUser.save(), success: true};
        }
    });
};