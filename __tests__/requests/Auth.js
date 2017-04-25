import {reqLogin} from '../../src/requests/Auth';
import {attrChangerValue} from '../../src/actions/common'
import { session, ui} from '../../src/stores'
import {goodEmail, badEmail,goodPassword} from '../../__mocks__/fakeResponses'
import notiActions from '../../src/actions/notifications'
import axios from 'axios'
import path from 'path'

const sessionChg = attrChangerValue(session)

jest.mock('axios')
//jest.unmock('axios')

const email = 'lol@hola.la'
const pass = 3333
const wrongemail = 'asjdlkasd@asd.la'

beforeEach(()=>{
  sessionChg('token',null)
  notiActions.removeAllNotifications()
})

test('reqLogin correctly', () => {
  return reqLogin(goodEmail,goodPassword)
  .then((res)=>{
    expect(res.data).toHaveProperty('jwt')
    expect(session.token).toEqual(res.data.jwt)
    //console.log(session.userData)
  })
});
test('reqLogin badly', () => {
  return reqLogin(goodEmail,444)
  .catch((res)=>{
    expect(res.response.status).toEqual(401)
    expect(ui.notifications.slice().length).toEqual(1)
    expect(ui.notifications.slice()[0].type).toEqual('error')
    expect(ui.notifications.slice()[0].content).toEqual('Wrong Login')
  })
});
