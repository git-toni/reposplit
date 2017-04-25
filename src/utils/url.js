import {session} from '../stores'

function getUrlPath(url){
  let pattern = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/gi

  return pattern.exec(url)[3]
}
function pathUserProfile(userId){
  return `/users/${userId}/profile`
}
function pathSelfProfile(){
  return session.userData
         ? pathUserProfile(session.userData.id)
         : null
}
function pathSelfSettings(){
  return session.userData
         ? `/users/${session.userData.id}/settings`
         : null
}

export {
  getUrlPath,
  pathUserProfile,
  pathSelfProfile,
  pathSelfSettings,
}
export default {
  getUrlPath,
  pathUserProfile,
  pathSelfProfile,
  pathSelfSettings,
}
