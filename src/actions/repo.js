import axios from 'axios'
import R from 'ramda'
import { action } from 'mobx';
import { ui } from '../stores'
import common from './common'
import {filePresent, treerizeResponse} from '../utils/repo'
import {repoUrl} from '../utils/url'

const uiChangerValue = common.attrChangerValue(ui)
const uiArrayChanger = common.attrChangerArray(ui)

function toggler(el){
  //console.log('found folder',  el.name, findFolder(ui.repo, uuid))
  //console.log('checked folder',  el.name, ui.openFolders.slice())
  let f = findFolder(ui.repo, el.uuid)
  let openFolders = ui.openFolders
  let fo = R.findIndex(R.propEq('uuid',el.uuid))(openFolders)
  console.log('foundfolder',  f.name, f.uuid)
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
  //console.log('root is', root.name)
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
    /*
  if(!el.isOpen){
    //let currentOpen = ui[`panel${choice}`]
    ////el.isOpen = !!el.isOpen ? el.isOpen : choice
    //changeLeaf(el.uuid, choice)
    //if(!!currentOpen){
    //  changeLeaf(currentOpen.uuid, null)
    //  //ui[`panel${choice}`].isOpen = null
    //}
    uiChangerValue(`panel${choice}`,el)
    recalcDividers()
  }
  */
  let fileOpen = filePresent(ui,el)
  //console.log('fileopen',fileOpen)
  if(!fileOpen){
    uiChangerValue(`panel${choice}`,el)
    recalcDividers()
  }
}
//function changeLeaf(uid,)
function setField(field, value){
  return function(el){
    el[field] = value
  }
}

let changeLeaf = action( (uid, value)=>{
  let setValue = action( setField('isOpen',value) )
  ui.applyToUUID(uid, setValue)
}
)

function getRepoTree(){
  let url = repoUrl(ui.repoProvider, ui.repoUser, ui.repoName)
  //console.log('rul',url)
  axios.get(url)
  .then((r)=>{
    //console.log('response here', r)
    let repoTree = treerizeResponse(r.data.tree) 
    //console.log('respotree', repoTree)
    uiChangerValue('repo',R.clone(repoTree))
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
