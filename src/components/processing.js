import R from 'ramda'

function styleUnits(unit){
  return function(amount){
    return amount+unit
  }
}

const vw = styleUnits('vw')
const vh = styleUnits('vh')
const pc = styleUnits('%')
const px = styleUnits('px')


export {
  pc,
  px,
}
