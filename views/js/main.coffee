React = require('react')
r = require('r-dom')
$ = global.jQuery = require('jquery')
#bootstrap = require('bootstrap')
rbs = require 'react-bootstrap'

class ParentComponent extends React.Component
  displayName: 'HelloComponent'
  constructor: ->
    this.state = {count: 0}
  

    
  increment: =>
    this.setState({ count: @state.count + Math.random() });
  
  render: ->
    return r.div [
      r.h1("#{this.state.count}")
      r(rbs.Button, {bsStyle: 'info', onClick:@increment}, [
        r.span 'Incriment'
      ])
    ]



element = r(ParentComponent)

$(document).ready ->
  React.render(element, $('#react-container')[0])
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
console.log('Main Loaded')