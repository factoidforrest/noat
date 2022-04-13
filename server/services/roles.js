let ConnectRoles, POS, loggedIn;

ConnectRoles = require('connect-roles');

module.exports = function(app) {
    global.roles = new ConnectRoles({
        failureHandler: function(req, res, action) {
            console.log('accesing a role failed who is active', (!!req.user) && req.user.get('active'));

            if ((!!req.user) && !req.user.get('active')) {
                return res.send(403, {
                    name: 'authErr',
                    message: 'Account Disabled',
                    token: 'Account Disabled'
                });
            } else {
                return res.send(403, {
                    name: 'permErr',
                    message: 'Access Denied - You don\'t have permission for: ' + action,
                    token: 'Insufficient Roles'
                });
            }
        }
    });
    app.use(roles.middleware());
    roles.use('logged in', loggedIn);
    return roles.use('admin', function(req) {
        if ((!!req.user) && req.user.get('admin') === true) {
            return true;
        }
    });
};

loggedIn = function(req) {
    console.log('checking for logged in user ', req.user);
    return (!!req.user) && req.user.get('active');
};

POS = function(req) {
    return req.body.pos_secret === (process.env.POS_SECRET || '123abc');
};
