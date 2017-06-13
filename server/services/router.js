module.exports = (app) => {

    app.use('/posts', require('../controllers/posts'))
};