import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import R from 'ramda'
import RequireAuth from './RequireAuth'
import RequireSelf from './RequireSelf'
import { Logout, App, Layout, UserProfile, UserIndex, UserSettings } from '../components'

const Dummy = (props)=>{
  return(
    <div>This is a Dummy component</div>
  )
}

const reqAuthSelf = R.compose(RequireAuth,RequireSelf)

const routes =(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}/>
      <Route path="noway" component={RequireAuth(Dummy)} />
      <Route path="dummy" component={Dummy} />
      <Route path="users">
        <IndexRoute component={UserIndex} />
        <Route path=":user_id(\\d+)/profile" component={RequireAuth(UserProfile)} />
        <Route path=":user_id(\\d+)/settings" component={reqAuthSelf(UserSettings)} />
      </Route>
      <Route path="logout" component={Logout} />
    </Route>
  </Router>
)


export default routes
