import { action } from 'mobx';
import { ui } from '../stores'
import common from './common'
import repo from './repo'

const uiChangerValue = common.attrChangerValue(ui)

function onClosePanel(pos){
  uiChangerValue(`panel${pos}`,null)
  repo.recalcDividers()
}
function onMaximizePanel(pos){
  uiChangerValue('maximizedPanel',pos)
  repo.recalcDividers()
}
function onMinimizePanel(){
  uiChangerValue('maximizedPanel',null)
  repo.recalcDividers()
}
function activatePanel(p){
  uiChangerValue('activePanel',p)
}

export default {
  onClosePanel,
  onMaximizePanel,
  onMinimizePanel,
  activatePanel,
}
export {
  onClosePanel,
  onMaximizePanel,
  onMinimizePanel,
  activatePanel,
}
