import axios from 'axios'
import R from 'ramda'
import { action } from 'mobx';
import { ui } from '../stores'
import common from './common'
import {filePresent, initTreerizeResponse, treerizeResponse} from '../utils/repo'
import {repoUrl} from '../utils/url'

const uiChangerValue = common.attrChangerValue(ui)
const uiArrayChanger = common.attrChangerArray(ui)
const uiObjFieldChanger = common.attrChangerObjField(ui)

function toggler(el){
  let f = findFolder(ui.repo, el.uuid)
  let openFolders = ui.openFolders
  let fo = R.findIndex(R.propEq('uuid',el.uuid))(openFolders)
  if(f){
    //f._isOpen = !f._isOpen
    if(fo > -1){
      openFolders.splice(fo,1)
    }
    else{
      openFolders.push(f)
    }
    uiChangerValue('openFolders',openFolders)
  }
}
const toggleFolder = action(toggler)

function findFolder(root, id){
  for( let c of root.children ){
    if(c.type==='tree'){
      if(c.uuid===id){
        return c
      }
      else{
        let son = findFolder(c,id)
        if(!!son){
          return son
          break
        }
      }
    }
  }
  //return
}

function hasPanelLeft(){
  return !!ui.panelTL || !!ui.panelBL
}
function hasPanelRight(){
  return !!ui.panelTR || !!ui.panelBR
}
function hasPanelTop(){
  return !!ui.panelTR || !!ui.panelTL
}
function hasPanelBottom(){
  return !!ui.panelBR || !!ui.panelBL
}
function recalcDividers(){
  //if((ui.panelTL || ui.panelTR) && (ui.panelBL || ui.panelBR) && !ui.divVertical){
  if(hasPanelLeft() && hasPanelRight() && !ui.divVertical){
    uiChangerValue('divVertical',50)
  }
  if(!!ui.panelTL && !!ui.panelBL && !ui.divLeft){
    uiChangerValue('divLeft',50)
  }
  if(!!ui.panelTR && !!ui.panelBR && !ui.divRight){
    uiChangerValue('divRight',50)
  }

  if(!!ui.panelTL && !ui.panelBL && ui.divLeft){
    uiChangerValue('divLeft',null)
  }
  if(!ui.panelTL && !!ui.panelBL && ui.divLeft){
    uiChangerValue('divLeft',null)
  }
  if(!!ui.panelTR && !ui.panelBR && ui.divRight){
    uiChangerValue('divRight',null)
  }
  if(!ui.panelTR && ui.panelBR && ui.divRight){
    uiChangerValue('divRight',null)
  }
  if((hasPanelLeft() && !hasPanelRight() && !!ui.divVertical) 
     ||
     (!hasPanelLeft() && hasPanelRight() && !!ui.divVertical)
    ){
    uiChangerValue('divVertical',null)
  }
}
function openFile(el){
  let order = ['TL','TR','BL','BR']
  let choice = null
  for(let pos of order){
    if(!ui[`panel${pos}`]){
      choice=pos
      break
    }
  }
  choice = !!choice 
    ? choice 
    : (
      ui.activePanel ? ui.activePanel : 'TL'
    )
  let fileOpen = filePresent(ui,el)
  if(!fileOpen){
    uiChangerValue(`panel${choice}`,el)
    recalcDividers()
    if(!el.content){
      uiObjFieldChanger(`panel${choice}`,'status','loading')
      getFileContent(el, choice)
    }
  }
}
function setField(field, value){
  return function(el){
    el[field] = value
  }
}

//function getFileContent(el, pos){
function getFileUrl(el){
  //console.log('getFileUrl',el)
  let {repoProvider, repoUser, repoName, repoBranch} = ui
  switch(repoProvider){
    case 'github':
      return el.url
    case 'gitlab':
      let fpath = el.path.slice().join('%2F')//.replace('/','%2F').replace('.','%2E')
      fpath = el.path.slice().length > 0 ? fpath.concat('%2F') : fpath
      fpath = fpath.concat(el.name.replace('.','%2E'))
      return `https://gitlab.com/api/v4/projects/${repoUser}%2F${repoName}/repository/files/${fpath}?ref=${repoBranch}`
    default:
      return ''
  }
}
let getFileContent = (el, pos)=>{
  let fileUrl = getFileUrl(el)
  axios.get(fileUrl)
  .then((r)=>{
    //console.log('response content',r)
    //el.content = r.data.content
    //el.state = 'loaded'
    //ui[`panel${pos}`].content = r.data.content
    uiObjFieldChanger(`panel${pos}`,'content',r.data.content)
    uiObjFieldChanger(`panel${pos}`,'status','done')
    //recalcDividers()
  })
}


let actionGetFileContent = action(getFileContent)

let changeLeaf = action( (uid, value)=>{
  let setValue = action( setField('isOpen',value) )
  ui.applyToUUID(uid, setValue)
}
)

function treeFromResponse(r, provider){
  switch(provider){
    case 'github':
      return r.data.tree

    case 'gitlab':
      return r.data

    default:
      return r
  }
}
function retrieveRestOfTree(root, resp, url){
  let rr = resp
  let myurl
  let progress
  let headers = rr.headers
  //console.log(rr.headers['x-next-page'])
  //console.log(rr.headers)

  if(!!headers['x-next-page'] && headers['x-next-page'] > 1){
    //console.log('next page ')
    myurl = url+`&page=${rr.headers['x-next-page']}`
    progress = (headers['x-page']/headers['x-total-pages'])*100
    progress = Math.round(progress)
    axios.get(myurl)
    .then((r)=>{
      root = treerizeResponse(root, treeFromResponse(r, ui.repoProvider)) 
      //uiChangerValue('repo',R.clone(root))
      uiChangerValue('repoLoadingProgress',progress)
      rr = r
      retrieveRestOfTree(root, rr, url)
      //if(!!rr.headers['x-next-page'] && rr.headers['x-next-page'] > 1){
      //  retrieveRestOfTree(root, rr, url)
      //}
      return r
    })
  }
  else{
    uiChangerValue('repo',R.clone(root))
    uiChangerValue('repoLoading',false)
  }
}
function getRepoTree(){
  let url = repoUrl(ui.repoProvider, ui.repoUser, ui.repoName, ui.repoBranch)
  //console.log('rul',url)
  axios.get(url)
  .then((r)=>{
    //console.log('response',r, treeFromResponse(r,ui.repoProvider))
    //console.log('response',r)
    let repoTree = initTreerizeResponse(treeFromResponse(r, ui.repoProvider)) 
    uiChangerValue('mainLoading',false)
    uiChangerValue('repo',R.clone(repoTree))
    if(ui.repoProvider === 'gitlab'){
      uiChangerValue('repoLoading',true)
      retrieveRestOfTree(repoTree, r, url) 
    }
    return r
  })
  .then( r =>{
    if(!!r.data.truncated){
      uiChangerValue('repoTruncated',true)
    }
  })
}

export default {
  toggleFolder,
  findFolder,
  openFile,
  recalcDividers,
  changeLeaf,
  getRepoTree,
}
export {
  toggleFolder,
  findFolder,
  openFile,
  recalcDividers,
  changeLeaf,
  getRepoTree,
}
