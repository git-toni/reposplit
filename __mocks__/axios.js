import {getUrlPath} from '../src/utils/url'
import fakeResp,{goodEmail, badEmail, goodPassword, userProfile, goodLogin, badLogin} from './fakeResponses'

function responses(method,path,data){
  switch(method){
    case 'post':
      if(!!(/login$/.exec(path))){
        if(data.auth.email === goodEmail && data.auth.password === goodPassword){
          return {status: 200, data: goodLogin}
        }
        else{
          return {status: 401, data: {msg: 'Incorrect Login'}}
        }
      }
    case 'get':
      if(!!(/users\/\d+\/profile/.exec(path))){
        return {status: 200, data: userProfile}
      }
      if(!!(/users/.exec(path))){
        //console.log('entering axios fake')
        return {status: 200, data: fakeResp.userIndex}
      }
    default:
      let r = { status: 404, statusText: 'Not found', data:{msg:'Some error description'}}
      //return { status: 404, statusText: 'Not found', data:{msg:'Some error description'}}
      return r
    //throw Error(JSON.stringify(r))
    //throw Error(r)
  }
}
function axios({method, url, data, headers}){
  return new Promise((resolve,reject)=>{
    try{
      let path = getUrlPath(url)
      let resp = responses(method, url, data)
      //console.log('path', url,resp)
      //resolve(resp)
      if(resp.status <= 300 && resp.status >= 200){
        resolve(resp)
      }
      else{
        reject({message: 'Just for the lols', response:resp})
      }
    }catch(e){
      console.log('err',e)
      //reject({message: err.data.msg, response: err})
    }
  })
}

export default axios
