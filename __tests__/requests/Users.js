import {reqProfile} from '../../src/requests/Users';
import {attrChangerValue} from '../../src/actions/common'
import { session} from '../../src/stores'
import {userProfile} from '../../__mocks__/fakeResponses'
import axios from 'axios'
import path from 'path'

const sessionChg = attrChangerValue(session)
let GOODJWT='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqaXQiOiI4YWYyYjBjOGU2NTdhNDY3NmExNjc0ZDFlM2UzYzlhMCIsImV4cCI6MTYxNTIxODUzNiwidXNlciI6eyJpZCI6NCwibmFtZSI6ImxvbCIsImVtYWlsIjoibG9sQGhvbGEubGEifX0.xs8xuBLeYNyDee3t8Sw2DPt3ay2Bgl1xm4vy_9gtqbA'

jest.mock('axios')
//jest.unmock('axios')


beforeEach(()=>{
  //notiActions.removeAllNotifications()
  sessionChg('token',null)
})
/*
test('reqProfile', () => {
  sessionChg('token',GOODJWT)
  //return axios.get('http://localhost:3000/users/4/profile',{headers:{authorization:`Bearer ${GOODJWT}`}})
  //return axios.get('http://localhost:3000/users/4/profile')
  //return axios.get('http://api.fixer.io/latest')
  let lib=path.join(path.dirname(require.resolve('axios')),'lib/adapters/http');
  var http=require(lib);
  //return axios.get('http://localhost:3000/users/4/profile',{headers:{authorization:`Bearer ${GOODJWT}`},adapter: http})
  return axios.get('http://localhost:3000/users/4/profile',{headers:{authorization:`Bearer ${GOODJWT}`}})
        .then( res => console.log(res) )
        .then( () =>{ console.log('reeeeeee') } )
});
*/

test('reqProfile', () => {
  return reqProfile(4)
  .then((res)=>{
    //console.log('res',res)
    expect(res.data).toEqual(userProfile)
  })
});
test('reqProfile to wrong userID', () => {
  return reqProfile('lol')
  .catch((res)=>{
    expect(res.response.status).toEqual(404)
  })
});


