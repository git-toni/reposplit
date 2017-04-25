import Request from './Request'
import {buildUrl} from './Utils'
import {user} from '../stores'
import {notifications, common} from '../actions'

const chgUser = common.attrChangerValue(user)
function reqProfile(userId){
  return new Request('get', buildUrl(['users',userId,'profile'])) 
  .then(res=>{
    chgUser('info', res.data)
    chgUser('settings', {})
    return res
  })
  .catch(e =>{
    chgUser('info', null)
    notifications.addErrorNotification('Error accessing User Profile') 
  })
}
function reqUserIndex(){
  return new Request('get', buildUrl(['users'])) 
  .then(res=>{
    //console.log('user store info',user.info)
    return res.data
  })
  .catch(e =>{
    notifications.addErrorNotification('Error accessing All Users') 
    //console.log('userreq catch', e)
  })
}
function reqSettings(userId){
  return new Request('get', buildUrl(['users',userId,'settings'])) 
  .then(res=>{
    chgUser('settings', res.data)
    return res
  })
  .catch(e =>{
    chgUser('settings', {})
    notifications.addErrorNotification('Error accessing User Settings') 
    //console.log('userreq catch', e)
  })
}

export {
  reqProfile,
  reqSettings,
  reqUserIndex
}
