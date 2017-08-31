module.exports = (app) => {
    //app.use('/post', require('../controllers/posts')) express router wasnt working for me
    require('../controllers/postController')(app);
    require('../controllers/userController')(app);
    require('../controllers/commentController')(app);
};