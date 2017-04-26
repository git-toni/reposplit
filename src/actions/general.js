import { action } from 'mobx';


const actions ={
  @action changeWorkAttrib(attr,v){
    work[attr] = v.target.value
  },
}

export default actions
