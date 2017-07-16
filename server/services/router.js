module.exports = (app) => {
    //app.use('/post', require('../controllers/posts')) express router wasnt working for me
    require('../controllers/posts')(app);
};