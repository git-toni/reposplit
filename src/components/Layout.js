import React,{Component} from 'react';  
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'

import {Modal, Header, Notifications, Loading} from './index'

function printCoord(e){
  console.log('conatiner coordinates: ',e.clientX, e.pageX, e.screenX, e.clientY, e.pageY, e.screenY )
  console.log('all H W: ', document.documentElement.clientHeight, document.documentElement.clientWidth)
}
class Layout extends Component{
  constructor(props){
    super(props)
  }
  //<Loading />
  render(){
    return(
      <div id='app'>
        <Loading />
        <Notifications />
        <div id="container">
          {this.props.children}
        </div>
        <Modal />
      </div>
      )
  }
}

export default Layout
