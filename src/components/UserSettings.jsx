import React,{Component} from 'react';  
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import notiActions from '../actions/notifications'
import {reqSettings} from '../requests/Users'
import {observer, inject} from 'mobx-react';
import R from 'ramda'

@inject('user','session') @observer
class UserSettings extends Component{
  constructor(props){
    super(props)
  }
  componentWillMount(){
    notiActions.removeLoading()
    notiActions.addLoading('Loading settings...')
    reqSettings(this.props.params.user_id)
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
    if(!!user.settings &&  !R.isEmpty(user.settings)){
      return(
        <div className='box' id='user-profile'>
          <span className="title is-3">
            Your settings
            &nbsp;
          </span>
            <br/>
            <br/>
          <div className="content-section">
            <span className="subtitle is-4">
              Display preferences
            </span>
            <br/>
            <span className='subtitle is-6'>
              Background color: {user.settings.display_preferences.background_color}
            </span>
            <br/>
          </div>
            <br/>
            <br/>
          <div className="content-section">
            <span className="subtitle is-4">
              Notification preferences
            </span>
            <span className='subtitle is-6'>
            </span>
            <br/>
          </div>
        </div>
        )

        //Background color: {user.settings.display_preferences.background_color}
    }
    else{
      return null
    }
  }
}

export default UserSettings
