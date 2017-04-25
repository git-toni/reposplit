import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import { browserHistory } from 'react-router'
import {session} from '../stores'
import {isSelf} from '../utils/auth'
import notiActions from '../actions/notifications'

const RequireSelf = (ToBeComposed)=>{
  class Decorated extends Component{
    constructor(props){
      super(props)
    }
    componentWillMount(){
      this.isValid=this.check()
    }
    componentWillReceiveProps(nextProps){
      this.isValid=this.check()
    }
    check(){
      //console.log('CHECKINGSLEFFFFFF',this.props)
      //isSelf(this.props.params.user_id)
      if(!isSelf(this.props.params.user_id)){
        notiActions.addErrorNotification('ITS NOT SELF') 
        browserHistory.push('/dummy')
        //this.props.router.push('/dummy')
        return false 
      }
      //notiActions.addInfoNotification('ITS ME YAY!') 
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

//export default inject('session','user')(observer(RequireAuth))
export default RequireSelf
