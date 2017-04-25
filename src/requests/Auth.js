import Request from './Request'
import {buildUrl} from './Utils'
import {session} from '../stores'
import {common} from '../actions'
import {guid, base64url, movedDate} from '../utils/numbers'
import {fakeJWT} from '../utils/auth'
import notiActions from '../actions/notifications'

let GOODJWT='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXNlciI6IntcIm5hbWVcIjpcIkpvaG55XCIsXCJpZFwiOlwiMjNcIixcImVtYWlsXCI6XCJob2xhQGhvbGEuY29tXCJ9IiwiYWRtaW4iOnRydWUsImV4cCI6IjE1MjAwMDQwMTUifQ.ftzvi1_3C0etJaDjVqC3hFoTLV9iRzKi8PfHb-mbigQ'

const chgSession = common.attrChangerValue(session)
function reqLogin(email, password){
  //mockLogin(email, password)
  return new Request('post', buildUrl('login'),{auth:{email, password}}, false) 
  .then(res =>{
    chgSession('token',res.data.jwt)
    notiActions.removeModal() 
    return res
  })
  .catch(res =>{
    chgSession('token',null)
    notiActions.addErrorNotification('Wrong Login') 
    notiActions.removeModal() 
  })
}

function mockLogin(email, pass){
  let payload = {
    jit: guid(),
    exp: movedDate(+800),
    user: {name:'John', email: email, id: 333}
  }
  //let fakeJwt = `fakeheader.${base64url(JSON.stringify(u))}.fakeenc`
  let fakejwt = fakeJWT(payload)
  //let fakeJwt = `fakeheader.hoooooooola.fakeenc`
  let p = new Promise((resolve,rej)=>{
    setTimeout(()=>{
      resolve({data:{jwt: fakejwt} })
    }, 2000)
  })
  return p
}

//function login(email, pass){
//  let chgSession = common.attrChangerValue(session)
//  returnLogin()
//  .then((res)=>{
//    chgSession('token',res.jwt)
//    console.log('returnlogic', res)
//  })
//  .catch((e)=>{
//    console.log(e.message)
//  })
//}
export {
  reqLogin,
}
export default {
  reqLogin,
}
