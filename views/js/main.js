let React = require('react')
let ReactDOM = require('react-dom')
let r = require('r-dom')
let $ = global.jQuery = require('jquery')
//bootstrap = require('bootstrap')
let rbs = require('react-bootstrap')
import {observer} from 'mobx-react';

@observer
class Incrementer extends React.Component {
  displayName: 'HelloComponent'
  constructor: ->
    #@observable count = 0
  
  let counterStore = obervable ({
    count:0
  })
  
  @computed get incrementedNumber() {
    counterStore.count += Math.Random() 
  }
  
  @observer
  render: =>
    return r.div [
      r.h1("#{this.props.count}")
      r(rbs.Button, {bsStyle: 'info', onClick:@increment}, [
        r.span 'Incriment'
      ])
    ]
}


let element = r(Incrementer)

$(document).ready ->
  ReactDOM.render(element, $('#react-container')[0])

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
console.log('Main Loaded')