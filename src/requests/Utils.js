import R from 'ramda'

const ROOT_URL = 'http://localhost:3000/'


function buildUrl(paths){
  // Works with both array of strings and just string
  //if(Array.isArray(paths)){
  //  return ROOT_URL + R.join('/')(paths)
  //}
  //else if(!!paths){
  //  return ROOT
  //}
  return ROOT_URL + R.join('/')(R.flatten( Array([paths]) ))
}

export {
  ROOT_URL,
  buildUrl,
}
