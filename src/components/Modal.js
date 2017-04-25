import React, {Component} from 'react';  
import {observer, inject} from 'mobx-react';
import LoginModal from './modals/LoginModal'

@inject('ui') @observer
class Modal extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const {ui} = this.props
    if(!!ui.modal){
      if(ui.modal ==='login'){
        return <LoginModal/>
      }
      else{
        return null
      }
    }
    else{
      return null
    }
  }
}

export default Modal
