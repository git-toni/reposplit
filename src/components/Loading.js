import React,{Component} from 'react';  
import {observer, inject} from 'mobx-react';

@inject('ui') @observer
class Loading extends Component{
  constructor(props){
    super(props)
  }
  render(){
    //<span className="icon is-large">
    //     <i className="fa fa-spinner fa-spin"></i>
    //     </span>
    let {ui:{loading}} = this.props
    let isLoading = !!loading ? 'is-loading' : ''
    return(
      <div id='loading'> 
        <a className={`button ${isLoading} is-white`}>
        </a>
        <span>
          {isLoading ? '' : ''}
        </span>
      </div>
    )
  }
}

export default Loading
