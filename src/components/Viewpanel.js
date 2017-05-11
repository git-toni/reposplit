import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import R from 'ramda'
import {detectLanguage, evolveDimensions, evolveDimensionsPC} from '../utils/styles'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, github } from 'react-syntax-highlighter/dist/styles';
import IconMaximize from 'react-icons/lib/md/zoom-out-map'
import IconMinimize from 'react-icons/lib/md/dashboard'
import IconClose from 'react-icons/lib/md/close'

//import CodeMirror from 'react-codemirror'
//require('codemirror/mode/javascript/javascript')
//require('codemirror/mode/ruby/ruby')
//require('codemirror/lib/codemirror.css');


function activeClass(active, pos){
  return active === pos ? 'activePanel' : ''
}
@observer
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
    if(!!el.content){
      code = new Buffer.from(el.content,'base64').toString('ascii')
    }
    if(!!maximizedPanel && maximizedPanel !== pos){
      return null
    }
    //console.log(code)
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
          <span title='Minimize' className="minimize" onClick={onMinimizePanel}> 
            <IconMinimize /> 
          </span>
            :
            <span title='Maximize' className="maximize" onClick={onMaximizePanel.bind(null, pos)}> 
              <IconMaximize /> 
            </span>
          }
          &nbsp; 
          <span title='Close File' className="close" onClick={onClosePanel.bind(null, pos)}> 
            <IconClose /> 
          </span>
        </div>
        <SyntaxHighlighter wrapLines={true} language={detectLanguage(el.name)} style={docco}>
           {code}
        </SyntaxHighlighter>
      </div>
      )
      //<SyntaxHighlighter wrapLines={true} language={detectLanguage(el.name)} style={docco}>
      //     {code}
      //  </SyntaxHighlighter>
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


//let saample = "function createStyleObject(classNames, style) {  \nreturn classNames.reduce((styleObject, className) => {    \nreturn {...styleObject, ...style[className]};  \n}, {});\n} \n\nfunction createClassNameString(classNames) {  \nreturn classNames.join(' ');\n}"

//let rubysample = '# frozen_string_literal: true\n# Capistrano task for Bundler.\n#\n# Add "require \'bundler/capistrano\'" in your Capistrano deploy.rb, and\n# Bundler will be activated after each new deployment.\nrequire "bundler/deployment"\nrequire "capistrano/version"\n\nif defined?(Capistrano::Version) && Gem::Version.new(Capistrano::Version).release >= Gem::Version.new("3.0")\n raise "For Capistrano 3.x integration, please use http://github.com/capistrano/bundler"\nend\n\nCapistrano::Configuration.instance(:must_exist).load do\n  before "deploy:finalize_update", "bundle:install"\n  Bundler::Deployment.define_task(self, :task, :except => { :no_release => true })\n  set :rake, lambda { "#{fetch(:bundle_cmd, "bundle")} exec rake" }\nend\n'
export default Viewpanel
