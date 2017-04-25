import R from 'ramda'

function filePresent(ui, file){
  let positions = ['TL','TR', 'BL','BR']
  let pname
  //let present = R.pipe(R.isNil, R.not)
  //let filt = R.filter(present)([ui.panelTL, ui.panelTR, ui.panelBL, ui.panelBR])
  //return R.find(R.propEq('uuid',file.uuid))(filt)
  for(let p of positions){
    pname = `panel${p}`
    if(!!ui[pname] && R.propEq('uuid',file.uuid)(ui[pname])){
      return p
    }
  }
  return undefined
}

export {
  filePresent,
}
