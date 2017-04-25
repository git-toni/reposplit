import React,{Component} from 'react';  
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import notiActions from '../actions/notifications'
import {reqProfile} from '../requests/Users'
import {observer, inject} from 'mobx-react';

@inject('user','session') @observer
class UserProfile extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    notiActions.removeLoading()
    notiActions.addLoading('Loading profile...')
    reqProfile(this.props.params.user_id)
  }
  componentDidMount(){
    notiActions.removeLoading()
  }
  isSelf(){
    return this.props.user.info.id === this.props.session.userId
  }
  renderOwner(){
    if(this.isSelf()){
      return <span className='tag is-info'>Owner</span>
    }
    else{
      return null
    }
  }
  render(){
    const {user} = this.props
    if(!!user.info){
      return(
        <div className='box' id='user-profile'>
          <span className="title is-3">
            <b>{user.info.name}</b>'s Profile
            &nbsp;
            {this.renderOwner()}
          </span>
          <p className='has-margin-top-2'>
            <span className='subtitle is-4'>
              Email: {user.info.email}
            </span>
            <br/>
            <span className='subtitle is-4'>
              Id: {user.info.id}
            </span>
          </p>
        </div>
        )
    }
    else{
      return null
    }
  }
}

export default UserProfile
