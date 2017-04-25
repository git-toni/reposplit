import {observable,  computed} from 'mobx';
import {decodeToken} from '../utils/auth'

class SessionStore{
  //valid token  in 1year
  //@observable token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXNlciI6IntcIm5hbWVcIjpcIkpvaG55XCIsXCJpZFwiOlwiMjNcIixcImVtYWlsXCI6XCJob2xhQGhvbGEuY29tXCJ9IiwiYWRtaW4iOnRydWUsImV4cCI6IjE1MjAwMDQwMTUifQ.ftzvi1_3C0etJaDjVqC3hFoTLV9iRzKi8PfHb-mbigQ'
  
  //INvalid token  in 1year
  //@observable token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXNlciI6IntcIm5hbWVcIjpcIkpvaG55XCIsXCJpZFwiOlwiMjNcIixcImVtYWlsXCI6XCJob2xhQGhvbGEuY29tXCJ9IiwiYWRtaW4iOnRydWUsImV4cCI6IjE0NTY5MzIxNDgifQ.neTM6mTxWojrcfVU6sX9sXmsnZQUgMMIiQuSrWwm5UA'
  
  //@observable token  = null
  @observable token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqaXQiOiIzYzNkYzA3Nzk3ZGYzYWM3ZjNlZWEyZTEyZGEzOTc5YyIsImV4cCI6MTYxNTM5NjE4NSwidXNlciI6eyJpZCI6MSwibmFtZSI6IkdyZWVuIE9yYW5nZSIsImVtYWlsIjoidXNlcjFAdGVzdC5jb20ifX0.r8JnxO7dhxk-yfODSio8_QpKidbnWLYJnXOtqqxe-3c'
  @observable status=''


  @computed get userData(){ 
    if(!!this.token){
      let deco = decodeToken(this.token)
      return typeof(deco) === 'object' ? deco.user : JSON.parse(deco).user
      //return JSON.parse(decodeToken( this.token ).user) // return the payload info
    }
    else{
      return null

    }
  }

  @computed get userName(){
    if(!!this.userData){
      return this.userData.name
    }
    else{
      return null
    }
  }
  @computed get userId(){
    if(!!this.userData){
      return this.userData.id
    }
    else{
      return null
    }

  }

  get asJS(){
    return { 
      token: this.token, 
      status: this.status,
    }
  }

}
const session = new SessionStore()

export default session
