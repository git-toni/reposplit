import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import ReactDraggable from 'react-draggable'
import {Viewpanel} from './'
import {evolveDimensions, evolveDimensionsPC, vh, vw, px, pc} from '../utils/styles'
import {common, panels} from '../actions/'

@inject('ui') @observer
class Viewport extends Component{
  constructor(props){
    super(props)
    this.draggedVertical = this.draggedVertical.bind(this)
    this.draggedLeft = this.draggedLeft.bind(this)
    this.draggedRight = this.draggedRight.bind(this)
    this.draggedFolder = this.draggedFolder.bind(this)
  }
  render(){
    let {ui} = this.props
    let finalStyle = evolveDimensionsPC({width:(100-ui.foldersWidth), maxWidth:(100-ui.foldersWidth)})
    //console.log('divs VLR', ui.divVertical, ui.divLeft, ui.divRight)
    //console.log('panels TL - TR - BL - BR', !!ui.panelTL, !!ui.panelTR, !!ui.panelBL, !!ui.panelBR)
    if(!ui.repoRetrieved) return null
    return(
      <div id='viewport' style={finalStyle}>
        {this.renderPanels()}
      </div>
      )
  }
  renderPanels(){
    let {ui} = this.props
    return(
      [
      this.renderPanel(ui.panelTL, 'TL', ui.panelTL),
      this.renderPanel(ui.panelTR, 'TR', ui.panelTR),
      this.renderPanel(ui.panelBL, 'BL', ui.panelBL),
      this.renderPanel(ui.panelBR, 'BR', ui.panelBR),
      this.renderDividers()
      ]
    )
  }
  renderPanel(p, pos, el){
    const {divVertical, divLeft, divRight, panelTL, panelTR, panelBL, panelBR} = this.props.ui
    const state = {divVertical, divLeft, divRight, panelTL, panelTR, panelBL, panelBR}
    const {ui} = this.props
    //return(<span>hola</span>)
    if(p){
      let coord = this.getPanelPosition(pos)
      //console.log('receiving pos',pos)
      return(
        <Viewpanel 
          activePanel={ui.activePanel}
          coord={coord}
          key={'panel-'+pos}
          pos={pos}
          el={el}
          onClosePanel={panels.onClosePanel}
          onMaximizePanel={panels.onMaximizePanel}
          onMinimizePanel={panels.onMinimizePanel}
          maximizedPanel={this.props.ui.maximizedPanel}
          onActivatePanel={panels.activatePanel}
          className={`Viewpanel ${pos}`}
        />
        )
    }
  }
  getPanelPosition(pos){
    const {ui} = this.props
    let left=0, top=0, width=0, height=0
    switch(pos){
      case 'TL':
        if(ui.divVertical){
          width = ui.divVertical
        }
        else{
          width = 100
        }
        if(ui.divLeft){
          height = ui.divLeft
        }
        else{
          height = 100
        }
        break
      case 'TR':
        if(ui.divVertical){
          width = 100-ui.divVertical//-ui.foldersWidth
          left = ui.divVertical//+ui.foldersWidth
        }
        else{
          width = 100
          left = 0
        }
        if(ui.divRight){
          height = ui.divRight
        }
        else{
          height = 100
        }
        break
      case 'BL':
        if(ui.divVertical){
        width = ui.divVertical
        }
        else{
          width = 100
        }
        if(ui.divLeft){
          height = 100-ui.divLeft
          top = ui.divLeft
        }
        else{
          height = 100
        }
        break
      case 'BR':
        if(ui.divVertical){
        width = 100-ui.divVertical
        left = ui.divVertical
        }
        else{
          width = 100
          left = 0
        }
        if(ui.divRight){
          height = 100-ui.divRight
          top = ui.divRight
        }
        else{
          height = 100
          top = 0
        }
        break
    }
    if(pos === ui.maximizedPanel){
      top = 0
      left = 0
      width = 100
      height = 100
    }
    return {top:top+0.5, left: left+0.5, width:width-0.5, height: height-0.5}
  }
  renderDividers(){
    return(
      [
        this.renderDivTop(),
        this.renderDivLeft(),
        this.renderDivRight()
      ]
    )
  }
  renderDivTop(){
    const {divVertical, divLeft, divRight, panelTL, panelTR, panelBL, panelBR} = this.props.ui
    const {ui} = this.props
    let styles = { 
      left: pc(divVertical),
      width: px(ui.divThick),
      height: vh(100),
      minHeight: vh(100),
      top: vh(0),
    }
    if(divVertical && !ui.maximizedPanel){
      return(
      <div onDragEnd={this.draggedVertical} draggable={true} className='Divider-top' style={styles}>
       </div>
      )

      /*
      <div onDragStart={this.dragStartHandler} onDragEnter={this.onDragOver} onDragOver={this.onDragOver} onDrop={this.onDrop} onDragEnd={this.draggedVertical} draggable={true} className='Divider-top' style={styles}>
        <ReactDraggable
          onDrag={this.draggedVertical}
          axis='x'
        >
          <div className="Divider-top" style={styles}>
          </div>
        </ReactDraggable>
        */

      //<div onDragStart={(e) =>{ e.dataTransfer.setData('text',''); console.log('drag started')} } onDragOver={(e)=> e.preventDefault()} onDragEnd={this.draggedVertical} draggable={true} className='Divider-top' style={styles}>
      // </div>
    }
  }
  onDragOver(e){
    e.preventDefault()
    //e.dataTransfer.dropEffect = 'copy';  // required to enable drop on DIV
  }
  dragStartHandler(e){
    e.dataTransfer.setData('text','')
  }
  renderDivLeft(){
    const {ui} = this.props
    const vwWidth = document.documentElement.clientWidth
    let lag = 0.5
    let styles = { 
      top: vh(ui.divLeft),
      width: pc(( !!ui.divVertical ? ui.divVertical : 100 ) -lag),
      left: pc(0.5),
      height: px(ui.divThick),
    }
    if(ui.divLeft && !ui.maximizedPanel){
      return(
        <div onDragEnd={this.draggedLeft} draggable={true} className='Divider-left' style={styles}>
        </div>
      )
    }
  }
  renderDivRight(){
    const {ui} = this.props
    let lag = 0.5
    let styles = { 
      top: vh(ui.divRight),
      width: pc(( !!ui.divVertical ? 100-ui.divVertical : 100 )-lag),
      left: pc(!!ui.divVertical ? ui.divVertical +0.5 : 0.5),
      height: px(ui.divThick),
    }
    if(ui.divRight && !ui.maximizedPanel){
      return(
        <div onDragEnd={this.draggedRight} draggable={true} className='Divider-right' style={styles}>
        </div>
      )
    }
  }
  draggedFolder(e){
    let {ui} = this.props
    const vwHeight = document.documentElement.clientHeight
    const vwWidth = document.documentElement.clientWidth
    let mouseX = e.clientX
    let mouseY = e.clientY
    let newPos = (mouseX/vwWidth)*100
    //let widthFolders = vwWidth*(ui.foldersWidth/100)
    //let newPos = ((mouseX-widthFolders-10)/(vwWidth-widthFolders))*100 //- widthFolders*100/vwWidth
    //if(mouseX <= widthFolders){
    //  return
    //}
    //console.log('props FOLDERdragged', mouseX, newPos)
    common.attrChangerValue(this.props.ui)('foldersWidth',Math.floor(newPos))
  }
  draggedVertical(e, data){
    let {ui} = this.props
    const vwHeight = document.documentElement.clientHeight
    const vwWidth = document.documentElement.clientWidth
    let mouseX = e.clientX
    let mouseY = e.clientY
    //let newPos = (mouseX/vwWidth)*100
    let widthFolders = vwWidth*(ui.foldersWidth/100)
    let newPos = ((mouseX-widthFolders-10)/(vwWidth-widthFolders))*100 //- widthFolders*100/vwWidth
    //console.log('vwwidth widthfolders clientX mouseX  data.X', vwWidth, widthFolders, mouseX, e.screenX, data.x, data.deltaX, data.lastX)
    //let deltaPc = Number(data.deltaX)/Number(vwWidth)
    //console.log('divVertical data.deltaX', ui.divVertical, deltaPc, ui.divVertical + deltaPc)

    //newPos = ui.divVertical + Number(deltaPc)

    if(mouseX <= widthFolders){
      return
    }
    //console.log('props VERTdragged',widthFolders, newPos)
    common.attrChangerValue(this.props.ui)('divVertical',newPos)
  }
  draggedLeft(e){
    const vwHeight = document.documentElement.clientHeight
    const vwWidth = document.documentElement.clientWidth
    let mouseX = e.clientX
    let mouseY = e.clientY
    let newPos= (mouseY/vwHeight)*100
    
    common.attrChangerValue(this.props.ui)('divLeft',newPos)
  }
  draggedRight(e){
    const vwHeight = document.documentElement.clientHeight
    const vwWidth = document.documentElement.clientWidth
    let mouseX = e.clientX
    let mouseY = e.clientY
    let newPos= (mouseY/vwHeight)*100
    
    common.attrChangerValue(this.props.ui)('divRight',newPos)
  }
}

export default Viewport
