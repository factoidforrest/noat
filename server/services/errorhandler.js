
module.exports = (app) => {
    app.use((err, req, res, next) => {
        logger.log('error',
            'Error thrown on request. Route:',
            req.route,
            ' Error body: ',
            err,
            ' FROM REQUEST ',
            req.body
        );
        res.status(err.responseCode || 500).send(err.toString());
    })
};