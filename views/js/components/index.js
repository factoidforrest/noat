const r = require('r-dom');
const ReactDOM = require('react-dom');
const Posts = require('./posts');
const $ = require('jquery');

let mainElement = r(Posts);

$(document).ready(()=> {
    ReactDOM.render(mainElement, $('#react-container')[0]);
});

