module.exports = (app) => {

    app.use('/post', require('../controllers/posts'))
};