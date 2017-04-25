import jwtDecode from 'jwt-decode'
import CryptoJS from 'crypto-js'

import { session } from '../stores'
import { common } from '../actions'
import {base64url} from './numbers'

//import jwt from 'jsonwebtoken'

let BADJWT='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXNlciI6IntcIm5hbWVcIjpcIkpvaG55XCIsXCJpZFwiOlwiMjNcIixcImVtYWlsXCI6XCJob2xhQGhvbGEuY29tXCJ9IiwiYWRtaW4iOnRydWUsImV4cCI6IjE0NTY5MzIxNDgifQ.neTM6mTxWojrcfVU6sX9sXmsnZQUgMMIiQuSrWwm5UA'

function decodeToken(tokenin){
  try{
    return jwtDecode(tokenin)
    //return jwt.decode(tokenin)
  }
  catch(e){}
}
function isAuthenticated(){
  let isValid = false
  if(!!session.token){
    let decoded = decodeToken(session.token)
    let now = Math.floor(+ new Date() / 1000)
    isValid = (+ now) < (+ decoded.exp)
  }
  //console.log('decoded exp and NOW',decoded.exp,now,isSmaller)
  return isValid
}
function isSelf(userId){
  let isValid = false
  if(!!session.token){
    let decoded = decodeToken(session.token)
    //console.log('decoded',decoded, decoded.user.id)
    let user = typeof(decoded.user) === 'object'
      ? decoded.user
      : JSON.parse(decoded.user)
    isValid = (+ userId) === (+ user.id)
  }
  //console.log('decoded exp and NOW',decoded.exp,now,isSmaller)
  return isValid
}
function fakeJWT(payload){
  let wordArray= CryptoJS.enc.Utf8.parse(JSON.stringify(payload))
  return `fakeHeader${Math.floor(Math.random()*2e5)}.${base64url(wordArray)}.fakeTail`
}
function currentUser(){
  return isAuthenticated() 
    ? session.userName
    : null
}

export {
  isAuthenticated,
  decodeToken,
  isSelf,
  fakeJWT,
}
