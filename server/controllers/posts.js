
const catchErr = require( 'async-error-catcher');
const express = require('express');
const router = express.Router();

router.get('posts', catchErr(async function(req, res){
    let posts = await Post.fetchAll()
    res.send


}));

module.exports = router;