import { action } from 'mobx';
import { ui } from '../stores'
import common from './common'
import {filePresent} from '../utils/repo'

const uiChangerValue = common.attrChangerValue(ui)

function toggler(uuid){
  let f = findFolder(ui.repo, uuid)
  if(f){
    f._isOpen = !f._isOpen
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
        findFolder(c,id)
      }
    }
  }
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

export default {
  toggleFolder,
  findFolder,
  openFile,
  recalcDividers,
  changeLeaf,
}
export {
  toggleFolder,
  findFolder,
  openFile,
  recalcDividers,
  changeLeaf,
}
