
const catchErr = require('../services/errorhandler').catchErr;

module.exports = (app) => {

    app.post('/user/register', catchErr(async function (req, res) {
        console.log('register request body is: ', req.body);
        let result = await User.register(req.body);
        logger.log('debug', 'User Register Model returned ', result);
        res.status(result.code).send(result);
    }));

};
