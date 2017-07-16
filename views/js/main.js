const React = require('react');
const ReactDOM = require('react-dom');
const r = require('r-dom')
const $ = global.jQuery = require('jquery');
//bootstrap = require('bootstrap')
const rbs = require('react-bootstrap');
//const mobx = require('mobx-react');
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {computed} from 'mobx'
const mobx = require('mobx');



class incrementStore {
    @observable number = 0;

    constructor(number) {
        mobx.autorun(() => console.log(this.report));
        this.number = number;
    }
    /*
    @computed get getNumber() {
        return this.number;
    }
    */

    increment() {
        console.log('increment called');
        this.number += 1;
    }
}

@observer
class Incrementer extends React.Component {


    //constructor(){
    //    super();
    //}
    //@observer
    render() {
        console.log('render called and props.store is ', this.props.store);
        return(r.div([
            r.h1(null, `${this.props.store.number}`),
            r(rbs.Button, {bsStyle: 'info', onClick:this.props.store.increment},
                [r.span('Increment')])
        ]))
    }
}



let mainElement = r(Incrementer, {store: new incrementStore()});

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