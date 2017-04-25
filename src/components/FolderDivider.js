import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import R from 'ramda'
import {evolveDimensions, evolveDimensionsPC, vh, vw, px, pc} from '../utils/styles'
import {common} from '../actions/'

@observer
class FolderDivider extends Component{
  constructor(props){
    super(props)
    this.draggedFolder = this.draggedFolder.bind(this)
  }
  render(){
    return(
        this.renderDivFolder()
      )

  }
  renderDivFolder(){
    const {ui} = this.props
    const vwWidth = document.documentElement.clientWidth
    let styles = { 
      left: vw(ui.foldersWidth),
      width: px(ui.divThick),
      height: vh(100),
      minHeight: vh(100),
      top: vh(0),
    }
    return(
      <div onDragEnd={this.draggedFolder} draggable={true} className='Divider-folder' style={styles}>
      </div>
    )
  }
  draggedFolder(e){
    let {ui} = this.props
    const vwHeight = document.documentElement.clientHeight
    const vwWidth = document.documentElement.clientWidth
    let mouseX = e.clientX
    let mouseY = e.clientY
    let newPos = (mouseX/vwWidth)*100
    common.attrChangerValue(this.props.ui)('foldersWidth',newPos)
  }
}

export default FolderDivider
