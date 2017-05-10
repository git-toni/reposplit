import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';
import R from 'ramda'
import {evolveDimensions, evolveDimensionsPC, vh, vw, px, pc} from '../utils/styles'
import {filePresent} from '../utils/repo'
import {siteUrl} from '../utils/url'
import GithubLogo from 'react-icons/lib/fa/github'
import GitBranch from 'react-icons/lib/go/git-branch'
import CircleONotch from 'react-icons/lib/fa/circle-o-notch'
import TreeItem from './TreeItem'

@inject('ui') @observer
class Folders extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let {ui} = this.props
    let finalStyle = evolveDimensionsPC({left: 0, top:0, width: ui.foldersWidth, maxWidth: ui.foldersWidth})
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
        <a id='repo-link' href={siteUrl(ui.repoProvider, ui.repoUser, ui.repoName, ui.repoBranch)}>
        {ui.repoUser+'/'+ui.repoName}
        </a>
        </span>
        <br/>
        <span className="repo-branch">
          <GitBranch/>
          &nbsp;
          {ui.repoBranch}
          &nbsp;
          {this.rLoadingTree()}
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
  rLoadingTree(){
    let {ui} = this.props
    if(!!ui.repoLoading){
      return(
        <span className="retrieving-indicator">
            {pc(ui.repoLoadingProgress)}      
            &nbsp;
            <CircleONotch className='retrieving-indicator spinning'/>
        </span>
      )
      //return(
      //  <div className="loading-indicator">
      //    <span>
      //      Retrieving tree
      //      &nbsp;
      //      <CircleONotch className='spinning'/>
      //    </span>
      //  </div>
      //)
    }
  }
  repoLogo(){
    let {ui} = this.props
    switch(ui.repoProvider){
      case 'github':
        return <GithubLogo />
      case 'gitlab':
        return <b>GLab</b>
        //return <GitlabLogo />
      default:
        return <b>Repo</b>
        //return <GithubLogo />
    }
    //return(
    //  <span className="repo-logo">
    //    <GithubLogo />
    //  </span>
    //)
  }
  renderRepo(){
    let {ui} = this.props
    let repo = ui.repo
    //return repo.children.map( c => <TreeItem key={c.name} el={c} containerWidth={ui.foldersWidth} ui={ui} />)
    return repo.children.map( c => TreeItem(c, ui.foldersWidth, ui))
  }
}

export default Folders
