

module.exports = async function(req, res, next) {

    let key = req.body.token;
    if (!key) return next();
    let token = await Token.forge({
        random_key: key,
        type: 'login'
    }).fetch({
        withRelated: ['tokenable']
    });

    let user;
    if (token === null) {
        logger.info('token invalid');
        return res.send(401, {
            name: 'authErr',
            message: 'Token Invalid',
            token: 'Invalid'
        });
    } else if (token.expired(app.get('token_expiry'))) {
        logger.info('token expired');
        return res.send(401, {
            name: 'authErr',
            message: 'Token Expired',
            token: 'Expired'
        });
    } else {
        user = token.related('tokenable');
        if (user.get('active')) {
            logger.info('logged in user:', JSON.stringify(user));
            req.user = user;
            return next();
        } else {
            return res.send(403, {
                name: 'authErr',
                message: "Account disabled."
            });
        }
    }

};