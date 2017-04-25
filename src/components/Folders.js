import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import R from 'ramda'
import {evolveDimensions, evolveDimensionsPC, vh, vw, px, pc} from '../utils/styles'
import {filePresent} from '../utils/repo'
import GithubLogo from 'react-icons/lib/fa/github'
import TreeItem from './TreeItem'

@inject('ui') @observer
class Folders extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let {ui} = this.props
    let finalStyle = evolveDimensionsPC({width: ui.foldersWidth, maxWidth: ui.foldersWidth})
    if(!ui.repoRetrieved) return null
    return(
      <div className={'folders'} style={finalStyle}>
        <span className="repo-title">
        {this.repoLogo()}

        {ui.repoUser+'/'+ui.repoName}
        </span>
        <br/>
        <br/>
        {this.renderRepo()}
        <div className="disable-app">
          Back
        </div>
      </div>
      )
  }
  repoLogo(){
    return(
      <span className="repo-logo">
        <GithubLogo />
      </span>
    )
  }
  renderRepo(){
    let {ui} = this.props
    let repo = ui.repo
    return repo.children.map( c => TreeItem(c, ui.foldersWidth, ui))
  }
}

export default Folders
