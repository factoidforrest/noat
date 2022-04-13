const eventEmitter = require('events').EventEmitter;

class PostStore extends eventEmitter {

    constructor() {
        super();
        this.posts = [
            {title: 'testpost1'},
            {title: 'testpost2'}
        ]
    }

    getAll(){
        return this.posts;
    }

}