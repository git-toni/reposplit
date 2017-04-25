import React,{Component} from 'react';  
import { IndexLink, IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import {observer, inject} from 'mobx-react';
import notiActions from '../actions/notifications'
import {pathSelfProfile,pathSelfSettings} from '../utils/url'
import {isAuthenticated} from '../utils/auth'

@inject('session') @observer
class Header extends Component{
  constructor(props){
    super(props)
  }
  //<img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
  renderUserName(){
    let {session} = this.props
    //console.log('renderusername ',session.token)
    if(!!session.userName){
      //return session.userName
      return (
        <label htmlFor='bottom-profile' className='dropdown-container'>
          <span className='bbutton is-primary is-outlined'>
            {session.userName}
            &#9660;
          </span>
          <input type='checkbox' className='dropdown-checkbox'  id='bottom-profile'/>
          <div className='dropdown-content box dropdown-bottom'>
            <ul className="menu-list">
              <li><Link to={pathSelfProfile()} className=''>Profile</Link></li>
              <li><Link to={pathSelfSettings()} className=''>Settings</Link></li>
              <li><Link to='/logout' className=''>Log Out</Link></li>
            </ul>
          </div>
        </label>
        )
    }
    else{
      return <a onClick={notiActions.addModal.bind(null, 'login')}>Log In</a>
      }
}
renderAuthedRoutes(){
  if(isAuthenticated()){
    return([
      <Link key='route-users#index' to='/users' className="nav-item is-tab is-hidden-mobile">All Users</Link>
    ])
  }
  else{
    return null
  }
}
render(){
  //<IndexLink to='/' className="nav-item is-tab is-hidden-mobile is-active">Home</IndexLink>
  return(
    <nav className="nav has-shadow">
      <div className="container">
        <div className="nav-left">
          <IndexLink to='/' className="nav-item">
            <img src="https://img.clipartfest.com/ee9fb7dfa0462c94cb407796b587cfae_mountain-clip-art-4-clipart-mountain-png_984-428.png" alt="Bulma logo" />
          </IndexLink>
          <Link to='/dummy' className="nav-item is-tab is-hidden-mobile">Dummy URL</Link>
          {this.renderAuthedRoutes()}
        </div>
        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="nav-right nav-menu">
          <a className="nav-item is-tab is-hidden-tablet is-active">Home</a>
          <a className="nav-item is-tab is-hidden-tablet">Features</a>
          <a className="nav-item is-tab is-hidden-tablet">Pricing</a>
          <a className="nav-item is-tab is-hidden-tablet">About</a>
          <span className="nav-item is-tab">
            {this.renderUserName()}
          </span>
        </div>
      </div>
    </nav>
    )
}
}
export default Header
