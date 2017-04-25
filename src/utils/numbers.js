//const roundDecimals =(digits=2)=>{
//  let di = Math.pow(10,digits)
//  return (x)=> Math.round(x*di)/di
//}
import R from 'ramda'
import CryptoJS from 'crypto-js'
const roundDecimals =(digits=2)=>{
  let doRound = (x, di) =>{
    let digi = Math.pow(10,di)
    return Math.round(x*digi)/digi
  }
  return (x)=> {
    let res = doRound(x,digits)
    return res.toString().length > 5 ? doRound(x,0) : res
  }
}

const moneyNum = roundDecimals(2)
const hourRound = roundDecimals(1)
const roundedNum = (x) => Math.round(x)

// FRIENDLY number
function m(n,d=0){
  let p=Math.pow
  d=p(10,d)
  let i=7
  let s
  //while(i)(s=p(10,i--*3))<=n&&(n=Math.round(n*d/s)/d+"kMGTPE"[i])
  while(i)(s=p(10,i--*3))<=n&&(n=Math.round(n*d/s)/d+"kMBTPE"[i])
  return n
}

function mWrapper(n, d=1){
  let emed = m(n,d)
  //console.log('mwrapper n d emed',n, d, emed)
  let len = emed.toString().length
  if(len > 4){
    return m(n,0)
  }
  else{
    return emed
  }
}
//ramdom GUID
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const friendlyMoneyNum = R.compose(mWrapper,moneyNum)
function base64url(source) {
  // Encode in classical base64
  let encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
}
function movedDate(days){
  return Math.floor( ( (+new Date())+864e5*(days) )/1000.0 )
}
export{
  roundDecimals,
  moneyNum,
  hourRound,
  roundedNum,
  guid,
  friendlyMoneyNum,
  //m as friendlyNum,
  mWrapper as friendlyNum,
  base64url,
  movedDate,
}
