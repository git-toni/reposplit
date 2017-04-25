import React,{Component} from 'react';  
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import {reqUserIndex} from '../requests/Users'
import {pathUserProfile} from '../utils/url'
import notiActions from '../actions/notifications'

class UserIndex extends Component{
  constructor(props){
    super(props)
    this.state={
      users: null
    }
    this.renderUserList = this.renderUserList.bind(this)
  }
  componentWillMount(){
    notiActions.removeLoading()
    notiActions.addLoading('Retrieving User list')
    reqUserIndex()
    .then(res=>{
      this.setState({users:res})
    })
  }
  componentDidMount(){
    notiActions.removeLoading()
  }
  renderUserItem(i){
    return(
      <li key={`User${i.id}`} className='box'> <Link to={pathUserProfile(i.id)} className="nav-item">{i.name}</Link></li>
    )
  }
  renderUserList(){
    if(!!this.state.users){
      return this.state.users.map(this.renderUserItem)
    }
    else{
      return <li> Empty </li>
    }
  }
  render(){
    return(
      <div id='user-profile'>
        <span className='title is-3'>Users Index</span>
        <br/>
        {}
        <ul className="user-list container has-margin-top-2">
          {this.renderUserList()}
        </ul>
      </div>
      )
  }
}

export default UserIndex
