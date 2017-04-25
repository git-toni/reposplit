import { action } from 'mobx';

const attrChanger =(store)=>{
  let changer = (attr,v)=>{
      store[attr] = v.target.value
  }
  return action(changer)
}
const attrChangerValue =(store)=>{
  let changer = (attr,v)=>{
      store[attr] = v
  }
  return action(changer)
}
const attrChangerArray =(store)=>{
  let changer = (attr, index, v)=>{
      store[attr][index] = v.target.value
  }
  return action(changer)
}
export default {
  attrChanger,
  attrChangerValue,
  attrChangerArray,
}
export {
  attrChanger,
  attrChangerValue,
  attrChangerArray,
}
