const React = require('react')
const ReactDOM = require('react-dom')
const r = require('r-dom')
const $ = global.jQuery = require('jquery')
//bootstrap = require('bootstrap')
const rbs = require('react-bootstrap')
import {observer} from 'mobx-react';

@observer
class Incrementer extends React.Component {
    displayName= 'HelloComponent';
    constructor=()=> {
        @observable let count = 0;
    };



    @computed get incrementedNumber() {
        counterStore.count += Math.Random()
    }

    //@observer
    render=()=> {
        return(r.div([
            r.h1("#{this.props.count}"),
            r(rbs.Button, {bsStyle: 'info', onClick:Incrementer.increment}[r.span('Increment')])
        ]))
    }
}


let element = r(Incrementer);

$(document).ready(()=> {
    ReactDOM.render(element, $('#react-container')[0]);
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