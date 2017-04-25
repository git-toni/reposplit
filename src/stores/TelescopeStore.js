import {observable,  computed} from 'mobx';

class TelescopeStore{
  @observable data = null 
  @observable posts = []

  get asJS(){
    return { 
      //data: this.data, 
    }
  }

}
const telescope = new TelescopeStore()

export default telescope
