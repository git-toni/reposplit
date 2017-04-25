import {observable,  computed} from 'mobx';

class SessionStore{
  @observable token=null 
  @observable status=''


  @computed get userData(){ 
    return {name:'Johnny'} // return the payload info

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
