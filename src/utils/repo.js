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
function treerizeResponse(resp){
  let root = {type:'tree', path: [], name:'',children:[]}
  let pt, br, node, name, newPath

  const typeMap ={
    tree: 'tree',
    blob: 'leaf'
  }
  resp.forEach(e =>{
    pt = e.path.split('/').slice(0,-1)
    name = e.path.split('/').slice(-1)[0]
    br = getBranch(root, pt)
    newPath = !!br.name ? br.path.concat(br.name) : br.path
    node = {type: typeMap[e.type], path: newPath, name: name, url: e.url, size: e.size, uuid: e.sha}
    if(e.type==='tree') node = Object.assign(node, {children: []})
    br.children.push(node)
  })
  return root
}
function getBranch(root,pt){
  let branch = root
  let progress = []
  let fp, newBr
  pt.forEach(p =>{
    fp = findPath(branch, p)
    if(fp){
      branch = fp
    }
    else{
      newBr = {type: 'tree', path: progress.slice(), name: p, children: []}
      branch.children.push(newBr)
      branch = newBr
    }
    progress.push(p)
  })
  return branch
}

function findPath(br, p){
  for(let c of br.children){
    if(c.name === p && c.type==='tree'){
      return c
    }
  }
  return false
}

export {
  filePresent,
  treerizeResponse,
}
