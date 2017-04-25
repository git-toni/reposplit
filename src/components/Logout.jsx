import React, {Component} from 'react';  
import generalActions from '../actions/general'
import notiActions from '../actions/notifications'
import { browserHistory } from 'react-router'

class Logout extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    generalActions.logOut()
    notiActions.addNotification('info','Logged out correctly')
    browserHistory.push('/')
  }
  render(){
    return null
  }
}

export default Logout
