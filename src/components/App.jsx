import React, {Component} from 'react';  
import {observer, inject} from 'mobx-react';
import {Viewport, Folders, FolderDivider} from './'

@inject('ui') @observer
class App extends Component{
  constructor(props){
    super(props)
  }
  renderMsg(){
    const {session} = this.props
    if(isAuthenticated()){
      return(
        <p className='text-medium'>
          You are now authenticated as <b className='text-info text-large'>{session.userName}</b>.
        </p>
      )
    }
    else{
      return(
        <p>You are <span className='text-danger'>logged out</span>.</p>
      )
    }
  }
  render(){
    const {ui} = this.props
    return(
      <div className='content'>
        <Folders ui={ui} />
        <FolderDivider ui={ui} />
        <Viewport ui={ui}/>
      </div>
    )
  }
}

export default App
