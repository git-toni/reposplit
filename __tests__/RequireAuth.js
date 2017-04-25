import React from 'react';  
import {mount} from 'enzyme';
import {RequireAuth} from '../src/routing/hoc';
import {ui, session} from '../src/stores'
import notiActions from '../src/actions/notifications'
import { fakeJWT } from '../src/utils/auth'
import { movedDate } from '../src/utils/numbers'
import {attrChangerValue} from '../src/actions/common'

const sessionChg = attrChangerValue(session)
const App = (props)=> <div>Hello</div>

beforeEach(()=>{
  notiActions.removeAllNotifications()
  sessionChg('token',null)
})
test('RequireAuth renders when Authed and not expired', () => {
  let payload = {
    exp: movedDate(+30)
  }
  let myjwt = fakeJWT(payload)
  sessionChg('token',myjwt)
  let Decorated = RequireAuth(App)

  let app = mount(
    <Decorated />
  );

  expect(app.html()).toMatch('Hello')
  expect(ui.notifications.slice().length).toEqual(0)
});

test('RequireAuth doesnt render when token empty', () => {
  let Decorated = RequireAuth(App)

  let app = mount(
    <Decorated />
    );
  expect(app.html()).toEqual(null)
  expect(ui.notifications.slice().length).toEqual(1)
  expect(ui.notifications.slice()[0].type).toEqual('error')
  expect(ui.notifications.slice()[0].content).toEqual('Not Authenticated')
});

test('RequireAuth renders when token expired', () => {
  let payload = {
    exp: movedDate(-30) // expired 30 days ago
  }
  let myjwt = fakeJWT(payload)
  sessionChg('token',myjwt)
  let Decorated = RequireAuth(App)

  let app = mount(
    <Decorated />
  );

  expect(app.html()).toEqual(null)
  expect(ui.notifications.slice().length).toEqual(1)
  expect(ui.notifications.slice()[0].type).toEqual('error')
  expect(ui.notifications.slice()[0].content).toEqual('Not Authenticated')
});
