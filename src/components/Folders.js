import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import R from 'ramda'
import {evolveDimensions, evolveDimensionsPC, vh, vw, px, pc} from '../utils/styles'
import {filePresent} from '../utils/repo'
import {siteUrl} from '../utils/url'
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
        <div id="app-logo">
          <a href='https://www.google.cat' id="aapp-logo">
            reposplit
          </a>
        </div>
        <br/>
        <span className="repo-title">
        {this.repoLogo()}
        &nbsp;
        <a id='repo-link' href={siteUrl(ui.repoProvider, ui.repoUser, ui.repoName)}>
        {ui.repoUser+'/'+ui.repoName}
        </a>
        </span>
        <br/>
        <br/>
        {this.renderRepo()}
      </div>
      )

      //<div className="disable-app">
      //   <span>
      //     Disable plugin
      //   </span>
      // </div>
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
    //return repo.children.map( c => <TreeItem key={c.name} el={c} containerWidth={ui.foldersWidth} ui={ui} />)
    return repo.children.map( c => TreeItem(c, ui.foldersWidth, ui))
  }
}

export default Folders
