
module.exports.middleware = (app) => {
    app.use((err, req, res, next) => {
        logger.log('error',
            'Error thrown on request. Route:',
            req.originalUrl,
            ' Error body: ',
            err,
            ' FROM REQUEST ',
            req.body
        );
        res.status(err.responseCode || 500).send(err.toString());
    })
};

module.exports.catchErr = (fn) => {

    return function (req, res, next) {
        //run the request handler and stick the result in a promise
        let promise = fn(req, res, next);
        if (!promise.catch) return;
        promise.catch(function (err) {
            console.log('error caught and thrown down the express middleware chain');
            return next(err);
        });
    }
};