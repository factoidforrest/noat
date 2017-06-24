const React = require('react');
const ReactDOM = require('react-dom');
const r = require('r-dom')
const $ = global.jQuery = require('jquery');
//bootstrap = require('bootstrap')
const rbs = require('react-bootstrap');
//const mobx = require('mobx-react');
import {observer} from 'mobx-react';
const mobx = require('mobx');



class incrementStore {
    @observable number = 0;

    constructor() {
        mobx.autorun(() => console.log(this.report));
    }
    get getNumber() {
        return number;
    }

    increment() {
        number += 1;
    }
}

@observer
class Incrementer extends React.Component {
    store = new incrementStore();

    constructor(){
        super();
    }
    //@observer
    render() {

        return(r.div([
            r.h1("#{this.props.count}"),
            r(rbs.Button, {bsStyle: 'info', onClick:store.increment}[r.span('Increment')])
        ]))
    }
}



let mainElement = r(Incrementer);

$(document).ready(()=> {
    ReactDOM.render(mainElement, $('#react-container')[0]);
});

/*
 ###


 GreetBox = React.createClass
 displayName: 'GreetBox'

 render: ->
 div null,
 r.h1('Hello ' + @props.name)


 #React.render(GreetBox(name: "World", "Lorem ipsum"), realNode) # Error!
 element = React.createElement(GreetBox, name: "World", "Loremddsum", "is this a child?")
 $(document).ready ->
 React.render(element, document.getElementById('react-container'))

 ###
 */
console.log('Main Loaded');