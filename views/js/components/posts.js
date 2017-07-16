import React from 'react';
const Post = require('./post');
const PostStore = require('../stores/postStore');
const r = require('r-dom');

export default class Posts extends React.Component {

    constructor(){
        super()
        this.state = {
            posts: postStore.getAll()
        }
    }

    //listen to poststore change event in componentDidMount

    postComponents(){
        this.state.posts.map((post)=>{
            return r(Post, {postData:post})
        })
    }

    render() {
        r.div({class:'postContainer'},
            postComponents()
        );
    };


}