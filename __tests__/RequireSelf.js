//import { createMemoryHistory, IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import React from 'react';  
//import sinon from 'sinon'
import {mount} from 'enzyme';
import RequireSelf from '../src/routing/RequireSelf';
import {ui, session} from '../src/stores'
import notiActions from '../src/actions/notifications'
import { fakeJWT } from '../src/utils/auth'
import {attrChangerValue} from '../src/actions/common'

const sessionChg = attrChangerValue(session)
const App = (props)=> <div>Hello</div>

beforeEach(()=>{
  notiActions.removeAllNotifications()
  sessionChg('token',null)
})
test('RequireSelf renders when self matched payload', () => {
  let payload = {
    user:{
      id: 12,
      name: 'Joe',
      email:'joe@joe.com'
    }
  }
  let myjwt = fakeJWT(payload)
  sessionChg('token',myjwt)
  let params = { user_id: payload.user.id }
  let Decorated = RequireSelf(App)

  let app = mount(
    <Decorated params={params} />
    );
  expect(app.html()).toMatch('Hello')
  expect(ui.notifications.slice().length).toEqual(0)
  //expect(ui.notifications.slice()[0].type).toEqual('info')
});

test('RequireSelf renders NULL when self not matching payload', () => {
  let payload = {
    user:{
      id: 12,
      name: 'Joe',
      email:'joe@joe.com'
    }
  }
  let myjwt = fakeJWT(payload)
  sessionChg('token',myjwt)
  let params = { user_id: 99 }
  let Decorated = RequireSelf(App)

  let app = mount(
    <Decorated params={params} />
    );
  expect(app.html()).toEqual(null)
  expect(ui.notifications.slice().length).toEqual(1)
  expect(ui.notifications.slice()[0].type).toEqual('error')
});

test('RequireSelf renders NULL when empty session token', () => {
  let params = { user_id: 99 }
  let Decorated = RequireSelf(App)

  let app = mount(
    <Decorated params={params} />
    );
  expect(app.html()).toEqual(null)
  expect(ui.notifications.slice().length).toEqual(1)
  expect(ui.notifications.slice()[0].type).toEqual('error')
});

