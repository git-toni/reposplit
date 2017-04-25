import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import R from 'ramda'
import {detectLanguage, evolveDimensions, evolveDimensionsPC} from '../utils/styles'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, github } from 'react-syntax-highlighter/dist/styles';
import IconMaximize from 'react-icons/lib/md/zoom-out-map'
import IconMinimize from 'react-icons/lib/md/dashboard'

import CodeMirror from 'react-codemirror'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/ruby/ruby')


function activeClass(active, pos){
  return active === pos ? 'activePanel' : ''
}
class Viewpanel extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let {maximizedPanel, el, onClosePanel, onMaximizePanel, onMinimizePanel, pos, activePanel} = this.props
    let finalStyle = Object.assign({}, evolveDimensionsPC(this.props.coord))
    let options ={
      lineNumbers: false,
      mode: 'ruby',
      scrollbarStyle: null,
    }
    let code = ''
    if(el.content){
      code = new Buffer.from(el.content,'base64').toString('ascii')
    }
    if(!!maximizedPanel && maximizedPanel !== pos){
      return null
    }
    return(
      //<div onDragOver={(e)=> e.preventDefault()} onDrop={(e)=> e.preventDefault()} className={this.props.className} style={finalStyle}>
      <div className={this.props.className +' '+ (activeClass(activePanel, pos))} 
        style={finalStyle} onClick={this.props.onActivatePanel.bind(null,pos)}>
        <span className='panel-filename'>
          /{el.path.join('/')}
          {el.path.length > 0 ? '/' : ''}
          <b>{el.name}</b>
        </span>
        <div className="buttonry">
          { maximizedPanel === pos ?
          <span className="minimize" onClick={onMinimizePanel}> 
            <IconMinimize /> 
          </span>
            :
            <span className="maximize" onClick={onMaximizePanel.bind(null, pos)}> 
              <IconMaximize /> 
            </span>
          }
          &nbsp; 
          <span className="close" onClick={onClosePanel.bind(null, pos)}> X </span>
        </div>
        <SyntaxHighlighter wrapLines={true} language={detectLanguage(el.name)} style={docco}>
           {code}
        </SyntaxHighlighter>
      </div>
      )
      //<CodeMirror value={code} options={options} />
      //<SyntaxHighlighter language='ruby' style={docco}>
      //   {code}
      // </SyntaxHighlighter>
  }
  getPosition(){
    let {pos, state} = this.props
    let {panelTL, panelTR, panelBR, panelBL} = state
    let left=0, top=0
    switch(pos){
      case 'TL':
        break
      case 'TR':
        if(panelTL){
          left = panelTL.width
        }
        else if(paneBL){
          left = panelBL.width
        }
        break
      case 'BL':
        if(panelTL){
          top = panelTL.height
        }
        break
      case 'BR':
        if(panelTR){
          top = panelTR.height
        }
        if(paneBL){
          left = panelBL.width
        }
        else if(panelTL){
          left = panelTL.width
        }
        break
    }
    return {top, left}
  }
}

export default Viewpanel
