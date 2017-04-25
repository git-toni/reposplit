import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import { browserHistory } from 'react-router'
import {session} from '../stores'
import {isAuthenticated} from '../utils/auth'
import notiActions from '../actions/notifications'

const RequireAuth = (ToBeComposed)=>{
  class Decorated extends Component{
    constructor(props){
      super(props)
    }
    componentWillMount(){
      this.isValid=this.checkAuth()
    }
    componentWillReceiveProps(nextProps){
      //this.checkAuth()
      this.isValid=this.checkAuth()
    }
    checkAuth(){
      if (!isAuthenticated()){
        //console.log('WRONG OR EXPIRED')
        notiActions.addErrorNotification('Not Authenticated') 
        browserHistory.push('/dummy')
        return false
      }
      return true
    }
    render(){
      if(this.isValid){
        return (<ToBeComposed {...this.props} />)
      }
      else{
        return ( null )
      }
    }
  }
  return Decorated
}

export default RequireAuth

//const RequireAuth = (ToBeComposed)=>{
//  //if(session.token.name !== 'LOLI'){
//  //  console.log('HEY THS IS NOT LOLI GUEY')
//  //  //browserHistory.push('/dummy')
//  //}
//  const Authed = (props) =>{
//    if(session.token.name !== 'LOLI'){
//      console.log('HEY THS IS NOT LOLI GUEY')
//      //browserHistory.push('/dummy')
//    }
//    return(
//      <ToBeComposed {...props} />
//    )
//  }
//  //return inject('session','user')(observer(Authed))
//  return Authed
//}
//export default inject('session','user')(observer(RequireAuth))
