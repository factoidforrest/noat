
const catchErr = require('../services/errorhandler').catchErr;

module.exports = (app) => {

    app.post('/user/register', catchErr(async function (req, res) {
        logger.log('debug', 'register request body is: ', req.body);
        let result = await User.register(req.body);
       // logger.log('debug', 'User Register Model returned ', result);
        res.status(result.code).send(result);
    }));

    app.post('/user/login', catchErr(async function (req, res) {
        let result = await User.login(req.body.username, req.body.password);
        //logger.log('debug', 'User Login Model returned ', result);
        res.status(result.code).send(result);
    }));

};
