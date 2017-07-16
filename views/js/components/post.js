import React from 'react';
const r = require('r-dom');

export default class Posts extends React.Component {
    /*
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
    */
    render() {
        r.div({class: 'post'}, [
            r.span(this.props.postData.title)
        ]);
    };


}